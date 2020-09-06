// import { message,TreeSelect ,Tree,Modal } from 'antd';
import { message, Modal, Divider } from 'antd';
// import { Modal, Button } from 'antd';
// import styles from '../../../book/manager/less/index.less';
import { getFormTableData } from '../../common/utils/exportData';
import moment from 'moment';
export default function (Arbiter, pkey) {


  const initState = () => {
    const evts = {
      // 注意不同的输入的表单组件，此处的value值可能会不同，如果对于组件有更改，则需要修改此方法
      submitFormData: (value) => {
        const { meDetails } = this.props
        // { option: option, picture: picture, onFinish: onFinish, title: record.xh, fromInitvalue: fromInitvalue } 
        // 关闭事件  界面 点击表单时间，标题， 表单初始值  主键id 表单id
        const { fromDefineId, businessId, onQuery, option, type } = meDetails || {}
        for (let key in value){
          // 处理时间格式化的，判断这个value是不是时间格式，如果是的格式化时间格式
          const {_isAMomentObject=false} = value[key] || {}
          if(_isAMomentObject){
            value[key]=moment(value[key]).format("YYYY/MM/DD")
          }
        }
        const { onCancel } = option
        // 修改走的方法
        if (type === 'edit') {
          let formdata = new FormData()
          formdata.append("fromJson", JSON.stringify(value))
          formdata.append("businessId", businessId)
          formdata.append("fromDefineId", fromDefineId)
          this.setState({ loading: true }, () => {
          Arbiter.publish('submitBusinessFormData', formdata, { nameSpace: pkey }).then(([{ data: rest }]) => {
            console.log(rest);
            const { code, success, msg } = rest
            if (success) {
              onQuery()
              onCancel()
              message.success("修改成功！")
            } else {
              onCancel()
              message.error("修改失败！"+msg+error)
            }
          }).catch(e => this.setState({ loading: false }, () => message.error(e.message)));
        });

        }else{
          // 新增走的方法
          let formdata = new FormData()
          formdata.append("fromJson", JSON.stringify(value))
          formdata.append("fromDefineId", fromDefineId)
          this.setState({ loading: true }, () => {
          Arbiter.publish('submitBusinessStartFormData', formdata, { nameSpace: pkey }).then(([{ data: rest }]) => {
            console.log(rest);
            const { code, success, msg,error } = rest
            if (success) {
              // 成功后关闭弹框和重置
              onQuery()
              onCancel()
              message.success("新增成功！")
            } else {
              onCancel()
              message.error("新增失败！"+msg+error)
            }
          }).catch(e => this.setState({ loading: false }, () => message.error(e.message)));
        });
        }
      }
    }

    this.setState({ tools: { evts } }, evts.onQuery);
  }
  this.setState({loading: false}, initState);

}