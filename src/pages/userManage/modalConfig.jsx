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
    span: 9
  },
  wrapperCol: {
    span: 15
  }
};
const statusList = [
  { id: 1, value: '正常' },
  { id: 2, value: '锁定' },
  { id: 3, value: '无效' }
];
const usertypeList = [
  { id: 1, value: '系统用户' },
  { id: 2, value: '项目用户' }
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

  render() {
    const { form, param } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className="shUserConfig" style={{ position: 'relative' }}>
        <Form layout="horizontal" onSubmit={this.handleSubmit}>
          <FormItem label="用户名：" hasFeedback {...formItemLayout} style={{ display: 'inline-block', width: '48%' }}>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: '请填写用户名'
                }
              ]
            })(<Input autoComplete="off" />)}
          </FormItem>
          {
            this.props.param.password === undefined ? (
              <FormItem label="密码：" hasFeedback {...formItemLayout} style={{ display: 'inline-block', width: '48%' }}>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: '请填写密码'
                    }
                  ]
                })(<Input type="password" autoComplete="off" />)}
              </FormItem>
            ) : ''
          }

          <FormItem label="状态：" hasFeedback {...formItemLayout} style={{ display: 'inline-block', width: '48%' }}>
            {getFieldDecorator('status', {
              // initialValue: devtypelist.length ? devtypelist[0].id : '',
              rules: [
                {
                  required: true,
                  message: '请填写状态'
                }
              ]
            })(<Select>
              {
                statusList.map((item, index) => (<Option key={item.id} value={item.id}>{item.value}</Option>))
              }

            </Select>)}
          </FormItem>
          <FormItem label="角色类型：" hasFeedback {...formItemLayout} style={{ display: 'inline-block', width: '48%' }}>
            {getFieldDecorator('roleid', {
              // initialValue: devtypelist.length ? devtypelist[0].id : '',
              rules: [
                {
                  required: true,
                  message: '请填写类型'
                }
              ]
            })(<Select>
              {
                param.roleList.map((item, index) => (<Option key={item.id} value={item.id}>{item.rolename}</Option>))
              }
            </Select>)}
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
  mapPropsToFields(props) {
    const { param } = props;
    const id = param.id ? param.id : '';
    const username = param.username ? param.username : '';
    const password = param.password ? param.password : '';
    const roleid = param.roleid ? param.roleid : '';
    const status = param.status ? param.status : '';
    return {
      id: Form.createFormField({ value: id }),
      username: Form.createFormField({ value: username }),
      password: Form.createFormField({ value: password }),
      roleid: Form.createFormField({ value: roleid }),
      status: Form.createFormField({ value: status })
    };
  }
})(modalComponent);
