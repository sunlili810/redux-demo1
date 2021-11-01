import axios from 'axios';
import { fromJS } from 'immutable';
// import tabStore from 'store/tablestore';
import Ajax from 'util/ajax';
import * as constants from './constants';

// const tabstore = new tabStore();

const changHomeData = (result) => ({
  type: constants.CHANGE_HOME_DATA,
  list: result,
  totalNum: 2
});

// const addHomeList = (list, nextPage) => ({
//   type: constants.ADD_ARTICLE_LIST,
//   list: fromJS(list),
//   nextPage
// });
//
export const getHomeInfo = (pagination) => (dispatch) => {
  // axios.get('/api/home.json').then((res) => {
  //   const result = res.data.data;
  //   dispatch(changHomeData(result));
  // });
  const queryParam = {
    loadingFlag: false,
    url: '/appm/qos/task/queryqostasks',//'/combo/alarm/current/list',
    method: 'get',
    data: {
      numPerPage: 1,
      page: pagination.current ? pagination.current:pagination.toJS().current,
      // filter: searchFilter,
      // ...searchFilter,

      projectid: 'T20210330P1001'
    },
    successFn(data) {
      dispatch(changHomeData(data));
    }
  };
  Ajax.fetch(queryParam);
};

export  const changePage = (pagination) =>(dispatch) =>{
  console.log(pagination);
  dispatch({
    type:constants.change_page,
    pagination
  });
}

//
// export const getMoreList = (page) => (dispatch) => {
//   axios.get(`/api/homeList.json?page=${page}`).then((res) => {
//     const result = res.data.data;
//     dispatch(addHomeList(result, page + 1));
//   });
// };
//
// export const toggleTopShow = (show) => ({
//   type: constants.TOGGLE_SCROLL_TOP,
//   show
// });
