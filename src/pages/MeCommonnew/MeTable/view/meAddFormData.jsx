import React, {Component } from 'react';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Table, Button, Icon,Modal } from 'antd';

import ModalDrag from '../../common/utils/view/modalDrag.js';
import { ViewModel } from '../../common/utils/core';
// import Demo from './Demo';
import ModalMe from '../../common/utils/view/modalMe.jsx';
import FormMeCom from '../../MeForm/view/FormMeCom.jsx';
import model from '../model/meDetails.js';

// import action from '../actions';
// 新增的表单 目前新增和详情走一个表单
@ViewModel(model)    
class meAddFormData extends Component {
  constructor(props) {
    super(props);
    this.state = { 
     }
   
  }

  render() { 
    const {  show, meDetails  } = this.props

    // { option: option, picture: picture, onFinish: onFinish, title: record.xh, fromInitvalue: fromInitvalue } 
    // 关闭事件  界面 点击表单时间，标题， 表单初始值  
    const { option,title } = meDetails

      const titleMe = <ModalDrag title={title} />
    return (  
      <div>
    <Modal visible={show}
                title={titleMe}
                {...option}>
           <FormMeCom meDetails={meDetails}/> 
       </Modal>
      </div>
     );
  }
}
 
export default meAddFormData;

