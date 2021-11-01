import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form, TreeSelect, Button, Divider, Input
} from 'antd';

const FormItem = Form.Item;
class pageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.searchListFn = this.searchListFn.bind(this);
  }

  componentDidMount() {
  }

  searchListFn() {
    const { form } = this.props;
    const { validateFields } = form;
    validateFields((errors, values) => {
      if (errors) {
        return;
      }
      const tempName = values.username !== '' && values.username !== undefined ? values.username.replace(/^\s+|\s+$/g, '') : undefined;
      const data = {
        ...values,
        username: tempName
      };
      const { searchFn } = this.props;
      searchFn(data);
    });
  }


  render() {
    const {
      addUser, deletMany, openLock, form
    } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form layout="horizontal" onSubmit={this.handleSubmit} style={{ display: 'inline-block', textAlign: 'left', verticalAlign: 'middle' }}>
        <div style={{ textAlign: 'left' }}>

          {/* <FormItem label="用户ID：" hasFeedback {...{ labelCol: { span: 7 }, wrapperCol: { span: 17 } }} style={{ display: 'inline-block' }}> */}
          {/* {getFieldDecorator('id', { */}
          {/* rules: [ */}
          {/* { */}
          {/* required: false, */}
          {/* message: '' */}
          {/* } */}
          {/* ] */}
          {/* })(<Input />)} */}
          {/* </FormItem> */}

          <FormItem label="用户名：" {...{ labelCol: { span: 7 }, wrapperCol: { span: 17 } }} style={{ display: 'inline-block' }}>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: false,
                  message: ''
                }
              ]
            })(<Input autoComplete="off" />)}
          </FormItem>
          <div style={{
            display: 'inline-block', textAlign: 'left', minWidth: '311px', marginLeft: '10px'
          }}
          >
            <FormItem
              wrapperCol={{ span: 24 }}
              className="footer"
            >
              <span className="ant-divider" />
              <Button type="primary" onClick={this.searchListFn}>查询</Button>
              <span className="ant-divider" />
              <Button className="btn-add" type="primary" onClick={deletMany}>批量删除</Button>
              <Divider type="vertical" />
              <Button className="btn-add" type="primary" onClick={addUser}>添加</Button>
            </FormItem>
          </div>
        </div>
      </Form>
    );
  }
}

pageComponent.propTypes = {
  form: PropTypes.object.isRequired,
  addUser: PropTypes.func.isRequired,
  deletMany: PropTypes.func.isRequired,
  searchFn: PropTypes.func.isRequired
};
export default Form.create()(pageComponent);
