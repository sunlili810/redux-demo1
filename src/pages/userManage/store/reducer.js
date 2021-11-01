import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
  list: [],
  searchFilter: null,
  pagination: {
    pageSize: 4,
    current: 1,
    total: 10,
    showSizeChanger: true,
    showQuickJumper: true
  }
});

// const changeHomeData = (state, action) => state.merge({
//   topicList: fromJS(action.topicList),
//   articleList: fromJS(action.articleList),
//   recommendList: fromJS(action.recommendList)
// });
//
// const addArticleList = (state, action) => state.merge({
//   articleList: state.get('articleList').concat(action.list),
//   articlePage: action.nextPage
// });

export default (state = defaultState, action) => {
  // console.log(state.toJS());
  // const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case constants.CHANGE_HOME_DATA:
      return state.merge({
        list: action.list,
        // total: action.totalNum,
        pagination: {
        //   // ...state.pagination,
          pageSize: 4, // state.pagination.pageSize,
          current: action.currentpage,
          total: action.totalNum
        }

      });

      // newState.list = action.list;
      // newState.total= action.totalNum;
      // newState.pagination.current=action.currentpage;
      // newState.pagination.total=action.totalNum
      // return newState;

    case constants.change_page:
      return state.merge({
        pagination: {
          pageSize: 4, // state.pagination.pageSize,
          current: action.currentpage
          // total: action.totalNum
        }
      });
    default:
      return state;
  }
};
