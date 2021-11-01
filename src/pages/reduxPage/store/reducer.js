import { fromJS, toJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS(
  {
    list: [],
    searchFilter: null,
    pagination: {
      pageSize: 1,
      current: 1,
      total: 10,
      showSizeChanger: true,
      showQuickJumper: true
    },
    toeletlist: []
  }
);

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
  switch (action.type) {
    case constants.CHANGE_HOME_DATA:
      return state.merge({
        list: action.list,        
        pagination:Object.assign({},state.get('pagination').toJS(),{
          total: action.totalNum
        }
        )
        
      });
    case constants.change_page:
      return state.merge({
        pagination:{...state.get('pagination'),...{
          current:action.current,
          pageSize:action.pageSize
        }} 
      });
    // case constants.ADD_ARTICLE_LIST:
    //   return addArticleList(state, action);
    // case constants.TOGGLE_SCROLL_TOP:
    //   return state.set('showScroll', action.show);
    default:
      return state;
  }
};
