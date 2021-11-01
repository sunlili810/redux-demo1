import { combineReducers } from 'redux-immutable';
import { reducer as warReducer } from 'pages/reduxPage/store';
import { reducer as userManageReducer } from 'pages/userManage/store';

const reducer = combineReducers({
  war: warReducer,
  userManage: userManageReducer
});

export default reducer;
