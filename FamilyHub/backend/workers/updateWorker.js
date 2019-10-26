/* eslint-disable no-await-in-loop */
const { workerData, parentPort } = require('worker_threads');
const db = require('mongoose');
const axios = require('axios');
require('dotenv').config();
const Timeline = require('../models/Timeline');
const User = require('../models/User');

db.connect('mongodb+srv://root:z1qx2wc3e@cluster0-ser1y.mongodb.net/nomadapp?retryWrites=true&w=majority', {
  useNewUrlParser: true,
});

async function updateByCalendar() {
  console.log('start worker');
  const users = await User.find();
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    await checkToken(user);
    await updateCalendar(user);
  }
  setTimeout(updateByCalendar, 30 * 1000);
}
async function checkToken(user) {
  if (new Date() > new Date(user.tokenExpires - 15 * 60 * 1000)) {
    const res = await axios.post('https://oauth2.googleapis.com/token', {
      refresh_token: user.refreshToken,
      client_id: process.env.clientId,
      client_secret: process.env.clientSecret,
      grant_type: 'refresh_token',
    });
    const accessToken = res.data.access_token;
    user.token = accessToken;
    user.tokenExpires = new Date().setHours(new Date().getHours() + 1);
    await user.save();
    console.log(`token updated for user ${user.firstName} ${user.lastName}`);
  }
}
async function updateCalendar(user) {
  const events = await axios.get(`https://www.googleapis.com/calendar/v3/calendars/primary/events`, {
    params: {},
    headers: { Authorization: `Bearer ${user.token}` },
  });
  
  
  const eventsWithLoc = events.data.items.filter(
    el => !!el.location && new Date(el.end.dateTime || el.end.date) >= new Date(),
  );
  const userTimeline = await Timeline.find({ userId: user._id });
  console.log(`worker see ${eventsWithLoc.length} events in google on user ${user.firstName} ${user.lastName}`);

  for (let i = 0; i < eventsWithLoc.length; i++) {
    const event = eventsWithLoc[i];
    
    if (!userTimeline.some((el) => el.googleId === event.id)) {
      console.log(`worker find new event ${event.location}`);
     
      const placeObj = await axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURI(event.location)}&key=${
          process.env.apiKey
        }`,
      );
      const { lat, lng } = placeObj.data.results[0].geometry.location;
      const placePicHash = placeObj.data.results[0].photos[0].photo_reference;
      console.log(placeObj.data.results[0].photos[0].photo_reference);
      const placePic = await axios.get(
        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=${placePicHash}&key=${process.env.apiKey}`,
      );

      const src = placePic.request._redirectable._currentUrl;

      const timeline = new Timeline({
        userId: user._id,
        dateStart: event.start.dateTime || event.start.date,
        dateEnd: event.end.dateTime || event.end.date,
        place: event.location,
        src,
        lat,
        lng,
        googleId: event.id,
      });
      await timeline.save();
      console.log('add new time line');
    }
  }
}

updateByCalendar();
