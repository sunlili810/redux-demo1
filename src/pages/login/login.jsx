import React, { Component } from 'react';
import {
  Form, Icon, Input, Button, Checkbox
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginStore from 'store/loginstore';
import logo from 'images/login-logo.png';
import lg02 from 'images/lg02.png';
import './login.less';
import Header from '../header/header';
import { actionCreators } from '../reduxPage/store';
import CryptoJS from 'crypto-js/crypto-js';

const FormItem = Form.Item;
const loginUrl = 'login';
const store = new LoginStore();

class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleLogo: logo
    };
    this.loginSuccess = this.loginSuccess.bind(this);
    // this.loginFalse = this.loginFalse.bind(this);
  }

  componentWillMount() {
  }

  encryption = (userValue, passValue) => {
    const flag = Math.floor((Math.random() * 65536 * 65535) + 1);
    const key1 = flag.toString(16);
    const key2 = 'claa2019';
    const username = userValue;
    const key = CryptoJS.enc.Latin1.parse(key1 + key2);
    const iv = CryptoJS.enc.Latin1.parse(key1 + key2);
    // 加密
    let encrypted = CryptoJS.AES.encrypt(username, key, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding });
    // console.log(`encrypted: ${encrypted}`);
    // 解密
    // const decrypted = CryptoJS.AES.decrypt(encrypted, key, { iv, padding: CryptoJS.pad.ZeroPadding });
    // // console.log(`decrypted: ${decrypted.toString(CryptoJS.enc.Utf8)}`);


    const parameters = {
      username: encrypted.toString()
    };

    const password = passValue;
    encrypted = CryptoJS.AES.encrypt(password, key, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding });
    parameters.password = encrypted.toString();

    const appnonceKey = CryptoJS.enc.Latin1.parse('claa2019claa2019');
    const appnonceIv = CryptoJS.enc.Latin1.parse('claa2019claa2019');
    const encryptedAppnonce = CryptoJS.AES.encrypt(key1, appnonceKey, { iv: appnonceIv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding });

    parameters.appnonce = encryptedAppnonce.toString();
    // const str = JSON.stringify(parameters);
    return parameters;
  };
  onFinish = (values) => {
    localStorage.setItem('username', values.userName);
    const tempParameters = this.encryption(values.userName, values.password);
    const param = {
      loadingFlag: false,
      url: '/appext/reactbaseapp/login',
      method: 'POST',
     // data: tempParameters,
      data: {
        loginname: values.userName,
        agentpwd: values.password,
        projectid: 'T20210330P1001'
      },
      querySuccess: this.loginSuccess
    };
    store.login(param);
  };
  // handleSubmit = (e) => {
  //  e.preventDefault();
  //  this.props.form.validateFields((err, values) => {
  //    if (!err) {
  //      // console.log('Received values of form: ', values);
  //      localStorage.setItem('username', values.userName);
  //      const param = {
  //        loadingFlag: false,
  //        url: '/appext/reactbaseapp/login',
  //        method: 'POST',
  //        data: {
  //          loginname: values.userName,
  //          agentpwd: values.password
  //        },
  //        querySuccess: this.loginSuccess
  //      };
  //      store.login(param);
  //    }
  //  });
  // };

  loginSuccess(data) {
    localStorage.setItem('token', data.data.token);
    localStorage.setItem('menuObj', JSON.stringify(data.data));
    localStorage.setItem('projectid', data.data.projectid);
    //
    // store.data.menuObj = {
    //  layoutTitle: data.data.layoutTitle,
    //  menulist: List
    // };
    // const myIndex = `${window.routername}/upload`;
    // this.props.history.push(myIndex);
    this.props.history.push('/warningLog');
  }

  render() {
    // const { getFieldDecorator } = this.props.form;
    const { titleLogo } = this.state;
    // const tempFieldData = [];
    // for (const [key, value] of entries(param)) {
    //  tempFieldData.push({
    //    name: key,
    //    value
    //  });
    // }
    return (
      <div className="login">
        <Header devname="测试" />
        <div className="container-out">
          {/* <img src={lg02} className="bflogo" alt="" /> */}
          <div className="container">
            <div className="content">
              <div className="logo">
                {/* <img src={titleLogo} alt="" /> */}
                登录
              </div>
              <Form  initialValues={{ port: '51000' }} onFinish={this.onFinish} className="login-form">
                <FormItem name="userName" rules={[{ required: true, message: '请输入用户名!' }]}>
                  <Input size="large" prefix={<UserOutlined />} placeholder="用户名" />
                </FormItem>
                <FormItem name="password" rules={[{ required: true, message: '请输入密码!' }]}>
                  <Input size="large" prefix={<LockOutlined />} type="password" placeholder="密码" />
                </FormItem>
                <FormItem>
                  {/* {getFieldDecorator('remember', { */}
                  {/* valuePropName: 'checked', */}
                  {/* initialValue: true */}
                  {/* })(<Checkbox>记住密码</Checkbox>)} */}
                  {/* <a className="login-form-forgot" href="">忘记密码</a> */}
                  <Button type="primary" size="large" htmlType="submit" className="login-form-button">
                    登录
                  </Button>
                  {/* <Button type="primary" size="large" onClick={this.loginFalse} className="login-form-button"> */}
                  {/* 登录 */}
                  {/* </Button> */}
                  {/* <a href="">注册</a> */}
                </FormItem>
              </Form>
            </div>
            {/* { */}
            {/* window.apiUrl.split('/')[3] === 'zt_zayw' ? ( */}
            {/* <div style={{ textAlign: 'center', margin: '50px 0 0' }}> */}
            {/* <img src={claa} alt="" style={{ width: '60%' }} /> */}
            {/* </div> */}
            {/* ) : '' */}
            {/* } */}
          </div>
        </div>
      </div>
    );
  }
}

PageComponent.propTypes = {
  // form: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
export default PageComponent;
