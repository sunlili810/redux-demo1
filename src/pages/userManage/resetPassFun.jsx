import modal from 'components/modal/modal';
import { Modal } from 'antd';
import tabstore from 'store/tablestore';
import resetPassdConfig from 'pages/userManage/resetPassdConfig';


const store = new tabstore();

export default function resetPassword(record, backFn) {
  modal.showModel({
    type: 'dialog',
    title: '修改密码',
    width: '550px',
    Dialog: resetPassdConfig,
    ok: (value, tempitem) => {
      const params = {
        loadingFlag: false,
        url: 'emsapi/v1/user/modpswd',
        method: 'POST',
        data: {
          ...value
        },
        successFn() {
          if (backFn) {
            backFn();
          }
          modal.closeModel(tempitem.id);
          let tempModal = null;
          setTimeout(() => {
            tempModal = Modal.success({
              content: '密码修改成功！',
              okText: '知道了'
            });
          }, 500);
          setTimeout(() => { tempModal.destroy(); }, 3000);
        }
      };
      store.handleNormal(params);
    },
    param: {
      ...record
    }
  });
}
