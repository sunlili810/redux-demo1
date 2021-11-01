import React, { Component } from 'react';
// import { observer } from 'mobx-react';
import Layout from 'components/layout/layout';
import modal from 'components/modal/modal';
// import tabstore from 'store/tablestore';
import { connect } from 'react-redux';
import {
  Table, Modal
} from 'antd';
// import modalConfig from './modalConfig';
// import resetPassdConfig from './resetPassdConfig';
// import resetPassword from './resetPassFun';
// import TabHead from './tabHead';
import './user.less';
import { actionCreators } from './store';

// const store = new tabstore();

class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placelist: [],
      searchFilter: null,
      selectedRowKeys: [],
      selectedRows: [],
      roleList: []
    };

    this.columns = [{
      title: '用户名',
      dataIndex: 'username',
      key: 'username'
    }, {
      title: '用户密码',
      dataIndex: 'password',
      key: 'password'
    },
    {
      title: '用户类型',
      dataIndex: 'usertypeVal',
      key: 'usertype'
    },
    {
      title: '用户状态',
      dataIndex: 'statusVal',
      key: 'status'
    }, {
      title: '操作',
      dataIndex: 'key',
      key: 'key',
      width: 200,
      fixed: 'right',
      render: (text, record, index) => (
        <span>
          <a onClick={() => { this.showEdit(text, record, index); }}>编辑</a>
          <span className="ant-divider" />
          <a onClick={() => { this.deletUser(text, record, index); }}>删除</a>
          <span className="ant-divider" />
          <a onClick={() => { resetPassword(record, this.backFn); }}>修改密码</a>
        </span>
      )
    }];
  }

  // componentDidMount() {
  //   // this.fetch();
  //   // this.fetchRoleList();
  // }

  backFn=() => {
    this.fetch();
  }

  fetch = (params = {}) => {
    const { searchFilter } = this.state;
    const queryParam = {
      loadingFlag: false,
      url: 'emsapi/v1/user/list',
      method: 'post',
      data: {
        numPerPage: store.dataObj.pagination.pageSize,
        page: store.dataObj.pagination.current,
        // filter: searchFilter,
        ...searchFilter,
        ...params
      }
    };
    store.fetchTabData(queryParam);
  };

  handleTableChange = (pagination, filters, sorter) => {
    // store.dataObj.pagination.current = pagination.current;
    // store.dataObj.pagination.pageSize = pagination.pageSize;
    // this.fetch(sorter.field === undefined ? {} : {
    //   sort: [{
    //     name: sorter.field,
    //     sort: sorter.order === 'ascend' ? 'asc' : 'desc'
    //   }]
    // });

    this.props.handlePageChange(pagination.current);

  };

  addUser = () => {
    const that = this;
    const { roleList } = this.state;
    modal.showModel({
      type: 'dialog',
      title: '新增',
      width: '750px',
      Dialog: modalConfig,
      ok: (value, tempitem) => {
        const params = {
          loadingFlag: false,
          url: 'emsapi/v1/user/new',
          method: 'POST',
          data: {
            ...value
          },
          successFn() {
            that.fetch();
            modal.closeModel(tempitem.id);
          }
        };
        store.handleNormal(params);
      },
      param: {
        roleList
      }
    });
  };

  showEdit = (text, record) => {
    const that = this;
    const { roleList } = this.state;
    modal.showModel({
      type: 'dialog',
      title: '编辑',
      width: '750px',
      Dialog: modalConfig,
      ok: (value, tempitem) => {
        const params = {
          loadingFlag: false,
          url: 'emsapi/v1/user/alter',
          method: 'POST',
          data: {
            ...value
          },
          successFn() {
            that.fetch();
            modal.closeModel(tempitem.id);
          }
        };
        store.handleNormal(params);
      },
      param: {
        roleList,
        ...record
      }
    });
  };

  deletUser = (text, record) => {
    const that = this;
    const param = {
      url: 'emsapi/v1/user/del',
      method: 'POST',
      data: {
        ids: [record.id]
      },
      successFn() {
        that.fetch();
        that.setState({ selectedRowKeys: [] });
      }
    };
    modal.showModel({
      type: 'confirm',
      message: '确认删除吗？',
      ok: () => {
        store.handleNormal(param);
      }
    });
  };

  deletMany = () => {
    const that = this;
    const { selectedRows } = this.state;
    if (selectedRows.length === 0) {
      Modal.warning({
        title: '请选择删除项'
      });
    } else {
      const tempArry = Array.from(selectedRows, (x) => x.id);
      const param = {
        url: 'emsapi/v1/user/del',
        method: 'POST',
        data: {
          ids: tempArry
        },
        successFn() {
          that.fetch();
          that.setState({ selectedRowKeys: [] });
        }
      };
      modal.showModel({
        type: 'confirm',
        message: '确认删除吗？',
        ok: () => {
          store.handleNormal(param);
        }
      });
    }
  };

  fetchRoleList = () => {
    const that = this;
    const params = {
      loadingFlag: false,
      url: 'emsapi/v1/role/list',
      method: 'POST',
      data: {

      },
      successFn(data) {
        that.setState({ roleList: data.data });
      }
    };
    store.handleNormal(params);
  };

  searchFn = (value) => {
    store.dataObj.pagination.current = 1;
    this.setState({
      searchFilter: {
        ...value
      }
    }, () => {
      this.fetch();
    });
  };

  onSelectChange = (record, selected, selectedRows) => {
    this.setState({ selectedRowKeys: record, selectedRows: selected });
  };

  render() {
    const { selectedRowKeys, roleList } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    // const datasorce = store.dataObj.list.slice();
    // const tempDataList = Array.from(datasorce, (item) => ({
    //   ...item,
    //   usertypeVal: item.usertype === 1 ? '系统用户' : '项目用户',
    //   statusVal: item.status === 1 ? '正常' : item.status === 2 ? '锁定' : '无效'
    // }));

    const tempDataList = Array.from(this.props.list, (item, index) => ({
      ...item,
      key: index,
      usertypeVal: item.usertype === 1 ? '系统用户' : '项目用户',
      statusVal: item.status === 1 ? '正常' : item.status === 2 ? '锁定' : '无效'
    }));
    console.log(this.props.currentpage);
    return (
      <Layout name="sgw">
        <div className="sgw">
          <div className="container-out">
            <div className="nav-right">
              {/* <TabHead addUser={this.addUser} deletMany={this.deletMany} searchFn={this.searchFn} /> */}
            </div>
            <Table
              className="deviceConfigTab"
              rowSelection={rowSelection}
              columns={this.columns}
              bordered
              dataSource={tempDataList}
              pagination={this.props.pagination}
              // scroll={{ x: 2400, y: 'calc(80vh - 140px)' }}
              onChange={this.handleTableChange}
            />
          </div>
        </div>
      </Layout>
    );
  }

  componentDidMount() {
    // this.fetch();
    // this.fetchRoleList();
    const { currentpage } = this.props;
    const { total } = this.props;
    const { pageSize } = this.props;
    this.props.fetch(currentpage, total, pageSize);
  }
}

const mapState = (state) => ({
  list: state.getIn(['userManage', 'list']),
  currentpage: state.getIn(['userManage', 'pagination', 'current']),
  total: state.getIn(['userManage', 'pagination', 'total']),
  pageSize: state.getIn(['userManage', 'pagination', 'pageSize']),
  pagination: state.getIn(['userManage', 'pagination'])
});

const mapDispatch = (dispatch) => ({
  fetch(currentpage, total, pageSize) {
    dispatch(actionCreators.getHomeInfo(currentpage, total, pageSize));
  },
  handlePageChange(currentpage) {
    dispatch(actionCreators.changePage(currentpage));
    fetch(currentpage);
  }
});

// export default PageComponent;
export default connect(mapState, mapDispatch)(PageComponent);
