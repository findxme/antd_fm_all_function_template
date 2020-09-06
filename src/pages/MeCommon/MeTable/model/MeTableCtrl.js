// import { message,TreeSelect ,Tree,Modal } from 'antd';
import { message, Modal, Divider } from 'antd';
// import { Modal, Button } from 'antd';
// import styles from '../../../book/manager/less/index.less';
import { getFormTableData } from '../../common/utils/exportData';
import { getFormItem } from '../../MeForm/view/FormUtils.js';
import moment from 'moment';
export default function (Arbiter, pkey) {

  const {fdid} =this.props
  const fromDefineId=fdid
  // 给一个序号供给展示使用// 按钮权限
  const Action = {
    title: 'Action',
    key: 'action',
    fixed: 'right',
    width: 250,
    render: (text, record, index) => (
      <span>
        <a onClick={() => editMeData(text, record, index)}> 修改 </a>
        <Divider type="vertical" />
        <a>删除</a>
      </span>
    ),
  }

  const editMeData = (text, record, index) => {
    const { meDetails, table: { fields }, tools } = this.state || {};
    const { evts } = tools || {}
    const { onQuery } = evts || {}
    // 界面
    const picture = pictureFrom(fields, 'edit')
    // 表单默认值 （colName：value）
    const initValueToFrom = fromInitvalue(fields, record)
    // initValueToFrom.CREAT_TIME= moment(initValueToFrom.CREAT_TIME, 'YYYY-MM-DD')


    const option = { pkey, onCancel: () => this.setState({ meDetails: null }) };
    if (meDetails) this.setState({ meDetails: null }, () => this.setState({
      meDetails: {
        option: option, picture: picture, title: record.xh,
        initValueToFrom: initValueToFrom, businessId: record.BID,
        fromDefineId: fromDefineId, type: 'edit',
        onQuery: onQuery
      }
    }))
    else this.setState({
      meDetails: {
        option: option, picture: picture, title: record.xh,
        initValueToFrom: initValueToFrom, businessId: record.BID,
        fromDefineId: fromDefineId, type: 'edit',
        onQuery: onQuery
      }
    });
  }


  /**
        *  渲染界面
        * @param {*} fld 字段的全部信息
        * @param {*} required 是否必填
        * @param {*} edite 是否可编辑
        * @param {*} props 其他相关函数
        * @param {*} defaultVal 默认参数
        */
  const pictureFrom = (fields, type) => {
    const parameters = formatFormParameters(fields)
    const pictureDiv = parameters.map((item) => {
      return getFormItem({ ...item, type })
    })
    return pictureDiv;

  }
  const fromInitvalue = (fields, record) => {
    let initValueToFrom = []

    for (let item of fields) {
      let { colName, visible, fieldName, keyTypeList ,fieldType,pattern} = item
      if (visible === 1) {
        if (keyTypeList != null) {
          for (let item of keyTypeList) {
            if (item.text === record[fieldName]) {
              initValueToFrom[colName] = item.id
              break;
            }
          }
        } else {
          // 对时间类的展示进行处理
          if(fieldType==="DATETIME"){
            initValueToFrom[colName]  = moment(record[fieldName], pattern)
      
          }else{
          initValueToFrom[colName] = record[fieldName]
          }

        }
      }
    }
    return initValueToFrom;

  }


  // 格式化数据 格式成渲染界面组件所需要的字段数据
  const formatFormParameters = (fields) => {
    let fieldsList = []
    for (let item of fields) {
      // 字段名 中文展示 是否必填 字段类型
      let { colName, visible, required, editable } = item
      let fieldsJson = {}
      if (visible === 1) {
        fieldsJson.fld = item
        fieldsJson.required = required
        fieldsJson.edite = editable
        fieldsJson.props = null
        // fieldsJson.fieldType=fieldType
        fieldsList.push(fieldsJson)
      }
    }
    return fieldsList

  }


  const query = (param) => {
    const { page: { pageNo = 1, pageSize = 10 } = {} = {} } = this.state;
    goPage(pageNo, pageSize, param);
  };
  const goPage = (pg, size, param) => {
    this.setState({ loading: true, selectedRows: [] }, () => {
      Arbiter.publish('getFmBaseToDefineId', { fromDefineId:fromDefineId,...param, pageNo: pg, pageSize: size }, { nameSpace:pkey }).then(([{ data }]) => {
        const { success,code,msg,error} = data
        if(!success){
            message.error(msg+error)
        }else{
          const { data: { fmData: fmDataRs=[], fields: fieldsRs={}, total: totalRs=null } = {} ,success,code,msg,error} = data
          // 格式化查询出的数据
        let { columns = [], source, total, fields, formId, colWidthSum } = getFormTableData(fmDataRs, fieldsRs, totalRs)
        columns.push(Action)
        const table = { columns: columns, dataSource: source, bordered: true };
        const { tools } = this.state
        const { evts: { onQuerySearch } } = tools
        this.setState({ table: { table, colWidthSum, fields }, loading: false, page: { pageNo: pg, pageSize: size, totalRs }, meSearchCtrl: { tableFields: fields, onQuerySearch: onQuerySearch } });
       } }).catch(e => this.setState({ loading: false }, () => message.error(e.message)));
    });
  };

  const initState = () => {
    const evts = {
      // 查询通用方法
      onQuery: (param) => {
        query({ param });
      },
      // table勾选触发
      onSelectChange: (selectedRowKeys, selectedRows) => {
        const { dataBid } = this.state;
        let BIdataBidD = selectedRows && selectedRows.map(element => {
          return element.BID
        });
        this.setState({ selectedRowKeys, dataBid: BIdataBidD });
      },
      // 分页查询
      goPage: (pg, size) => {
        goPage(pg, size)
      },
      // 删除触发的弹框
      onDelDataMe: () => {
        const { tools } = this.state;
        const { evts: { hideModal } } = tools;
        Modal.confirm({
          title: '删除选中的数据',
          content: 'Bla bla ...删除,小心喔',
          okText: '确认',
          onOk: hideModal,
          cancelText: '取消',
        });
      },
      // 删除点击ok触发
      hideModal: () => {
        const { dataBid } = this.state;
        const businessIds = dataBid.join(",")
        Arbiter.publish('deleteData', { fromDefineId:fromDefineId,businessIds: businessIds }, { nameSpace:pkey }).then(([rest]) => {
          const { success, code, error, data ,msg} = rest.data
          if (success && code === 200) {
            message.success(data)
            this.setState({
              selectedRowKeys: [],
              page:{pageNo:1}
            })
             query()
           
          } else {
            if (error != null && error != '') {
              message.error(error+msg)
            } else {
              message.error('未知错误！')
            }
          }
        })
      },
      // 表单提交时间
    
      // 重置的事件 和提交表单的时间
      onQuerySearch: (param) => {
        this.setState({
          selectedRowKeys: []
        })
        query(param)
      },
      // 点击表单新增按钮
      addFormData: () => {
        const { meAddFormData, table: { fields }, tools } = this.state;
        const { evts } = tools || {}
        const { onQuery } = evts || {}
        const picture = pictureFrom(fields, 'add')
        const option = { pkey, onCancel: () => this.setState({ meAddFormData: null }) };
        if (meAddFormData) this.setState({ meAddFormData: null }, () => this.setState({
          meAddFormData: {
            option: option, picture: picture, title: "新增",
            initValueToFrom: null, businessId: null, fromDefineId: fromDefineId,
            type: 'add', onQuery: onQuery
          }
        }))
        else this.setState({
          meAddFormData: {
            option: option, picture: picture, title: "新增",
            initValueToFrom: null, businessId: null, fromDefineId: fromDefineId,
            type: 'add', onQuery: onQuery
          }
        });

      }
    }

    this.setState({ tools: { evts } }, evts.onQuery);
  }
  this.setState({
    loading: true, tools: null, meDetails: null, meAddFormData: null, selectedRowKeys: [], meSearchCtrl: {},
    dataBid: [], page: { pageNo: 1, pageSize: 10, totalRs: 0 }, table: {}, Action: Action
  }, initState);

}