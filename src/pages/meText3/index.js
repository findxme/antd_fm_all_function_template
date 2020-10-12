// import React from 'react';
// import { DataGrid, GridColumn } from 'rc-easyui';
// import { Table } from 'antd'
// import VirtualTable from './VirtualTable.tsx'


import React, { PureComponent } from 'react'
import { Table } from 'shineout'
// import { fetch } from 'doc/data/user'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 1,
      pageSize: 50,
      data: [],
      selectedValue:[]
    }

  }

  componentDidMount() {
    this.fetchData()
  }

  handleScroll = (left, top) => {
    if (top === 1 && !this.state.loading) {
      this.setState({ current: this.state.current + 1 }, this.fetchData)
    }
  }

  fetchData = () => {
    const { current, pageSize } = this.state
    this.setState({ loading: true })
    let a=[]
    for (var i = (current-1)*pageSize; i < data2.length; i++) {
      if(i<(current)*pageSize){
    a.push(data2[i])
      }else{
        break;
      }
    }
    this.setState({ data: [...this.state.data, ...a], loading: false })
  
  }
  handelRowSelect=(selectedValue)=> {
    console.log(selectedValue)
    this.setState({ selectedValue })
  }

  render() {
    const { data, loading } = this.state

    return (

      <Table
        bordered
        data={data}
        loading={loading}
        keygen="id"
        columns={columns}
        style={{ height: 450 }}
        width={2800}
        fixed="both"
        onRowSelect={this.handelRowSelect}
        onScroll={this.handleScroll}
        verticalAlign="middle"
      />
   
    )
  }
}
export default App;




  let data2 = [];
for (let i = 0; i < 10000; i++) {
  data2.push({
    xh: i,
    bookcode: `Edward King ${i}`,
    watermeter: 32,
    steelCode: `London, Park Lane no. ${i}`,
  });
}


const columns = [
  { title: '序号', render: 'xh', key: 'xh', align: 'center', width: 50 },
  { title: '册本编号', render: 'bookcode', key: 'bookcode', align: 'center', width: 100 },
  { title: '水表编号', render: 'watermeter', key: 'watermeter', align: 'center', width: 180 },
  { title: '钢印号', render: 'steelCode', key: 'steelCode', align: 'center', width: 180 },
  { title: '口径', render: 'caliber', key: 'caliber', align: 'center', width: 80 },
  { title: '户名', render: 'clientName', key: 'clientName', align: 'center', width: 250 },
  { title: '地址', render: 'address', key: 'address', align: 'center', width: 250 },
  { title: '上上期读数', render: 'beforeLastRead', key: 'beforeLastRead', align: 'center', width: 100 },
  { title: '上上期水量', render: 'beforeLastWater', key: 'beforeLastWater', align: 'center', width: 100 },
  { title: '上上期核表备注', render: 'beforeLastCheckRemark', key: 'beforeLastCheckRemark', align: 'center', width: 120 },
  { title: '上期读数', render: 'lastRead', key: 'lastRead', align: 'center', width: 80 },
  { title: '上期水量', render: 'lastWater', key: 'lastWater', align: 'center', width: 140 },
  { title: '上期核表备注', render: 'lastCheckRemark', key: 'lastCheckRemark', align: 'center', width: 120 },
  { title: '本期读数', render: 'read_', key: 'aread_', align: 'center', width: 110 },
  { title: '本期水量', render: 'water', key: 'water', align: 'center', width: 80 },
  { title: '水量状态', render: 'waterVolumeStatus', key: 'waterVolumeStatus', align: 'center', width: 250 },
  { title: '异常问题', render: 'waterstatedescription', key: 'waterstatedescription', align: 'center', width: 250 },
  { title: '现场状态', render: 'sitestatename', key: 'sitestatename', align: 'center', width: 250 },
  { title: '抄表时间', render: 'readtime', key: 'readtime', align: 'center', width: 250 },
  { title: '抄表状态', render: 'readmeterstate', key: 'readmeterstate', align: 'center', width: 100, render: (type) => (type === 0 ? '未抄' : (type === 1 ? '已抄' : '未抄')) },
  { title: '核表读数', render: 'checknum', key: 'checknum', align: 'center', width: 100 },
  { title: '核表水量', render: 'checkwater', key: 'checkwater', align: 'center', width: 100 },
  { title: '核查日期', render: 'checkDate', key: 'checkDate', align: 'center', width: 100 },
  { title: '核查时间', render: 'checktime', key: 'checktime', align: 'center', width: 250 },
  // { title: '审核状态', dataIndex: 'auditstate', key: 'auditstate', align: 'center', width: 100,render: (type) => (type === 0 ? '未审核' : (type === 1 ? '已审核' : '未审核')) },
  { title: '核表备注', render: 'checkremark', key: 'checkremark', align: 'center', width: 250 },

  { title: '导入营收时间', render: 'importOrderTime', key: 'importOrderTime', align: 'center', width: 250 },
  { title: '导入营收状态', render: 'importorderstate', key: 'importorderstate', align: 'center', width: 250, render: (type) => (type === 0 ? '未导入' : (type === 1 ? '已导入' : '未导入')) },
  { title: '表位信息', render: 'gaugeInfo', key: 'gaugeInfo', align: 'center', width: 250 },
  { title: '表位备注', render: 'gauge', key: 'gauge', align: 'center', width: 250 },
  { title: '拆表备注', render: 'tearDownRemarks', key: 'tearDownRemarks', align: 'center', width: 250 },
  { title: '备注', render: 'remark', key: 'remark', align: 'center', width: 250, fixed: 'right' },
  // { title: '上上次读数', dataIndex: 'beforeLastTimeRead', key: 'beforeLastTimeRead', align: 'center', width: 100 },
  // { title: '上上月起始抄码', dataIndex: 'beforeLastBeginNum', key: 'beforeLastBeginNum', align: 'center', width: 140 },
  // { title: '上月开账水量', dataIndex: 'lastWater', key: 'lastWater', align: 'center', width: 140 },
  // { title: '上月起始抄码', dataIndex: 'lastBeginNum', key: 'lastBeginNum', align: 'center', width: 80 },
  // { title: '抄表时间', dataIndex: 'readtime', key: 'readtime', align: 'center', width: 100 },
  // { title: '本期抄表状态', dataIndex: 'readmeterstate', key: 'readmeterstate', align: 'center', width: 100,render: (type) => (type === 0 ? '未抄' : (type === 1 ? '已抄' : '未抄')) },

  // { title: '本期核表读数', dataIndex: 'checknum', key: 'checknum', align: 'center',width: 100 },
  // { title: '核表备注', dataIndex: 'checkremark', key: 'checkremark', align: 'center',width: 250 },

  { title: '操作', dataIndex: 'oper', key: 'oper', align: 'center', width: 280, fixed: 'right' },
];
