// import { message,TreeSelect ,Tree,Modal } from 'antd';
import { message, Modal } from 'antd';
// import { Modal, Button } from 'antd';
// import styles from '../../../book/manager/less/index.less';
import {getFormTableData} from '../../common/utils/exportData';

export default function(Arbiter, pkey) {
       

    const initState = () => {
        const evts = {
            // 注意不同的输入的表单组件，此处的value值可能会不同，如果对于组件有更改，则需要修改此方法
            submitFormData:(value)=>{


                const {   meDetails  } = this.props

                // { option: option, picture: picture, onFinish: onFinish, title: record.xh, fromInitvalue: fromInitvalue } 
                // 关闭事件  界面 点击表单时间，标题， 表单初始值  主键id 表单id
                const {  fromDefineId,businessId} = meDetails

                let formdata =new FormData()
                formdata.append("fromJson",JSON.stringify(value))
                formdata.append("businessId",businessId)
                formdata.append("fromDefineId",fromDefineId)

                Arbiter.publish('submitBusinessFormData', formdata, { nameSpace: "me.form" }).then((esr) => {

                });

            }
        }
     
        this.setState({ tools: { evts }});
    }
    this.setState({},initState);

}