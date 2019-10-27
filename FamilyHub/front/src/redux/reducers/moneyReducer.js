
import { ADD_TOTALMONTH,ADD_ALLCATEGORY,ADD_SPENDMONTH } from '../actionNames/moneyActionNames';

const initState = {
  totalMonth: [],
  allCategory:[],
  thisMonthTotal:[],
  title: '',
  text: '',
  currentDate: '',
  dateEnd: '',
  periodic: false,
  period: '',
  selected: {},
  calendars: '',
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case ADD_TOTALMONTH:
        // console.log('!!!!!!!!!!!!!!!!!!!!!!!',action.payload.coockie);
      return {
        ...state,
        totalMonth: action.payload,
      };
      case ADD_ALLCATEGORY:
      return {
        ...state,
        allCategory: action.payload,
      };
      case ADD_SPENDMONTH:
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',action.payload);
        
        return {
          ...state,
          thisMonthTotal: action.payload,
        };

    default:
      return state;
  }
}
