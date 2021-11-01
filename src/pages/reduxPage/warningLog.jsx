import React, { Component } from 'react';
// import { observer } from 'mobx-react';
import { connect } from 'react-redux';
import {
  Table
} from 'antd';
import { actionCreators } from './store';
import './index.less';
// import tabStore from 'store/tablestore';

// const store = new tabStore();
// @observer
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFilter: null,
      selectedRowKeys: [],
      selectedRows: []
    };
    this.columns = [{
      title: '告警名称',
      dataIndex: 'creator',
      key: 'creator',
      width: 200
    }, {
      title: '告警类型',
      dataIndex: 'rulename',
      key: 'rulename',
      width: 100
    }, {
      title: '时间',
      dataIndex: 'optime',
      key: 'optime',
      width: 200
    }, {
      title: '所属设备',
      dataIndex: 'taskid',
      key: 'taskid',
      width: 100
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (text, record, index) => (
        <span>
          {
            record.status !== 1 ? (<a className="unconfirmOp">待确认</a>) : record.confirmrst === 1 ? (<a className="confirmOp">确认</a>) : (<a className="confirmOp">误报</a>)
          }
        </span>
      )
    }
    ];
  }

  // componentDidMount() {
  //   this.fetch();
  // }

  componentWillUnmount() {
    if (this.timer1) {
      clearTimeout(this.timer1);
    }
  }

  // fetch = (params = {}) => {
  //   const { searchFilter } = this.state;
  //   const queryParam = {
  //     loadingFlag: false,
  //     url: '/combo/alarm/current/list',
  //     method: 'get',
  //     data: {
  //       numPerPage: 8,
  //       page: store.dataObj.pagination.current,
  //       // filter: searchFilter,
  //       ...searchFilter,
  //       ...params
  //     }
  //   };
  //   store.fetchTabData(queryParam);
  // };

  handleTableChange = (pagination, filters, sorter) => {
    // store.dataObj.pagination.current = pagination.current;
    // store.dataObj.pagination.pageSize = pagination.pageSize;
    // this.fetch(sorter.field === undefined ? {} : {
    //   sort: [{
    //     name: sorter.field,
    //     sort: sorter.order === 'ascend' ? 'asc' : 'desc'
    //   }]
    // });
    this.props.handlePageChange(pagination);
    //this.props.fetch(this.props.currentpage);
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

  handlemarkclick(deveui) {
    this.fetch(deveui);
  }

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    
    const tempDataList = Array.from(this.props.list, (item, index) => ({
      ...item,
      key: index
    }));

    console.log(this.props.pagination);

    return (
      <div className="warninglogPage" style={{ height: '100%' }}>
        <div className="orderTit">告警日志</div>
        <div className="orderCont">
          <Table
            className="warlogTab"
            columns={this.columns}
            bordered
            dataSource={tempDataList}
            pagination={this.props.pagination}
            // scroll={{ x: 2400, y: 'calc(80vh - 140px)' }}
            onChange={this.handleTableChange}
            //pagination={false}
          />
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.fetch2(this.props.pagination);
  }
}

const mapStateToProps = (state) => ({
  list: state.getIn(['war', 'list']),
  pagination: state.getIn(['war', 'pagination']),
  // currentpage: state.getIn(['war', 'pagination', 'current']),
  // total: state.getIn(['war', 'pagination', 'total'])
});
const mapDispatchToProps = (dispatch) => ({
  fetch2(pagination) {
    dispatch(actionCreators.getHomeInfo(pagination));
  },
  handlePageChange(pagination) {
    dispatch(actionCreators.changePage(pagination));
    this.fetch2(pagination)
  }
});
// export default PageComponent;
export default connect(mapStateToProps, mapDispatchToProps)(PageComponent);
