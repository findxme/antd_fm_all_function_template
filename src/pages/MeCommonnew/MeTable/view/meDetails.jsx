import React, {Component } from 'react';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Table, Button, Spin,Modal } from 'antd';

import ModalDrag from '../../common/utils/view/modalDrag.js';
import { ViewModel } from '../../common/utils/core';
// import Demo from './Demo';
import ModalMe from '../../common/utils/view/modalMe.jsx';
import FormMeCom from '../../MeForm/view/FormMeCom.jsx';
import model from '../model/meDetails.js';

// import action from '../actions';
 //  新增和详情的表单
@ViewModel(model)    
class meDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { 
     }
   
  }

  render() { 
    const {  show, meDetails  } = this.props

    const {tools ,loading = true} =this.state  || {};
    const {evts} = tools  || {};
    const {submitFormData}= evts || {};
    // { option: option, picture: picture, onFinish: onFinish, title: record.xh, fromInitvalue: fromInitvalue } 
    // 关闭事件  界面 点击表单时间，标题， 表单初始值  
    const { option,title } = meDetails

      const titleMe = <ModalDrag title={title} />
    return (  
      <div>
   
       <Modal visible={show} loading={true} title={titleMe}
                {...option}>
              <Spin spinning={loading}>
           <FormMeCom meDetails={meDetails} submitFormData={submitFormData}/> 
           </Spin>
       </Modal>
      </div>
     );
  }
}
 
export default meDetails;

