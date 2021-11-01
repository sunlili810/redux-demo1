import React, { Component } from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect
} from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.less';
import zhCN from 'antd/es/locale-provider/zh_CN';
import { ConfigProvider } from 'antd';
import login from './pages/login/login';
import warningLog from './pages/reduxPage/warningLog';
import usermanage from './pages/userManage/user';
import store from './store/index';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConfigProvider locale={zhCN}>
          <Router>
            <Switch>
              <Route exact path="/" component={login} />
              <Route exact path="/usermanage" component={usermanage} />
              <Route exact path="/warningLog" component={warningLog} />
            </Switch>
          </Router>
        </ConfigProvider>

      </Provider>
    );
  }
}

export default App;
