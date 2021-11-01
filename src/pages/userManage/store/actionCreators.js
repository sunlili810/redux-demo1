import axios from 'axios';
import { fromJS } from 'immutable';
// import tabStore from 'store/tablestore';
import Ajax from 'util/ajax';
import * as constants from './constants';

// const tabstore = new tabStore();

const changHomeData = (result,currentpage) => ({
  type: constants.CHANGE_HOME_DATA,
  list: result.data,
  totalNum: result.totalNum,
  currentpage
});

// const addHomeList = (list, nextPage) => ({
//   type: constants.ADD_ARTICLE_LIST,
//   list: fromJS(list),
//   nextPage
// });
//
export const getHomeInfo = (currentpage,total,pageSize) => (dispatch) => {
  const queryParam = {
    loadingFlag: false,
    url: 'emsapi/v1/user/list',
    method: 'post',
    data: {
      numPerPage: pageSize,
      page: currentpage
      // filter: searchFilter,
      // ...searchFilter,
    },
    successFn(data) {
      // console.log(data);
      dispatch(changHomeData(data,currentpage));
    }
  };
  Ajax.fetch(queryParam);
};

export  const changePage = (currentpage) =>(dispatch) =>{
  dispatch({
    type:constants.change_page,
    currentpage
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
