import React, { Component } from 'react';
import {
  Form, Input, Button, Select
} from 'antd';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
//import tabstore from 'store/tablestore';

//const store = new tabstore();
const { Option } = Select;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 19
  }
};
const statusList = [
  { id: 1, value: '正常' },
  { id: 2, value: '锁定' },
  { id: 3, value: '无效' }
];

//@observer
class modalComponent extends Component {
  constructor(props) {
    super(props);
    this.handleOk = this.handleOk.bind(this);
    this.cancelClickHandler = this.cancelClickHandler.bind(this);
  }

  handleOk() {
    const { param } = this.props;
    const { id } = param;
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      const data = {
        ...values,
        id: id || undefined
      };
      this.props.onTrigger('okBtn', data);
    });
  }

  cancelClickHandler() {
    this.props.onTrigger('cancelBtn');
  }

  handleCheckPwd(rules, value, callback) {
    const cfmPwd = this.props.form.getFieldValue('confirm');
    const newpswd = this.props.form.getFieldValue('newpswd');
    if (cfmPwd !== newpswd) {
      callback(new Error('两次密码输入不一致'));
    } else {
      // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
      callback();
    }
  }

  render() {
    const { form, param } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className="resetPassdConfig" style={{ position: 'relative' }}>
        <Form layout="horizontal" onSubmit={this.handleSubmit}>
          <FormItem label="原密码：" hasFeedback {...formItemLayout}>
            {getFieldDecorator('oldpswd', {
              rules: [
                {
                  required: true,
                  message: '请填写原密码'
                }
              ]
            })(<Input type="password" autoComplete="off" style={{ width: '300px' }} />)}
          </FormItem>

          <FormItem label="新密码：" hasFeedback {...formItemLayout}>
            {getFieldDecorator('newpswd', {
              rules: [
                {
                  required: true,
                  message: '请填写新密码'
                }

              ],
              validateFirst: true
            })(<Input type="password" autoComplete="off" style={{ width: '300px' }} />)}
          </FormItem>
          <FormItem label="确认新密码：" hasFeedback {...formItemLayout}>
            {getFieldDecorator('confirm', {
              // initialValue: devtypelist.length ? devtypelist[0].id : '',
              rules: [
                {
                  required: true,
                  message: '请填写确认新密码'
                },
                {
                  validator: (rules, value, callback) => { this.handleCheckPwd(rules, value, callback); }

                }
              ],
              validateFirst: true
            })(<Input type="password" autoComplete="off" style={{ width: '300px' }} />)}
          </FormItem>
          <FormItem
            wrapperCol={{ span: 24 }}
            className="footer"
            style={{ textAlign: 'center' }}
          >
            <Button type="primary" htmlType="submit" onClick={this.handleOk}>
              确定
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.cancelClickHandler}>
              取消
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

modalComponent.propTypes = {
  form: PropTypes.object.isRequired,
  param: PropTypes.object.isRequired,
  onTrigger: PropTypes.func.isRequired
};

export default Form.create({
})(modalComponent);
