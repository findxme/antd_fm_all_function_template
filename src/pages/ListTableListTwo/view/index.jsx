import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button,Radio ,DatePicker , Divider, Dropdown, Menu, message, Input } from 'antd';
import React, {Component } from 'react';
import { ViewModel } from '../../../common/utils/core';
import model from '../model';
import action from '../actions';
import Demo from './Demo';
import { connect } from 'dva';
import moment from 'moment';
@connect(state => ({ bookEnter: state.bookEnter }))
@ViewModel(model, action)

class TableList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      dateOld:'2020-07',
      dateNew:undefined
     }
   
  }

  onChange=({methodName:methodName},params,evts)=>{
  
    this.props.dispatch({
      type: `bookEnter/${methodName}`,
      payload: params,
      callback:evts,
    });
  }
  callback=()=> {
   alert("qweqw")
  }

  // true是禁用 false是不禁用
  disabledDate=(current)=>{
      let currentPeriodDays =this.calculateAccountPeriod("2021-01")
  
    // let periodYear = currentPeriodDays.split('-')[0];  // 跨年时需要重新修改  获取到这个账期月的年份
    // let periodMonth = currentPeriodDays.split('-')[1];


    let newPeriodStart =currentPeriodDays[0];   // 最近账期月的起始时间
    let newPeriodEnd = currentPeriodDays[1];  //  最近账期的结束时间
    let currentD =moment( current._d).format('YYYY-MM-DD').replaceAll('-','');  //这个日历的每一个时间
    let nowDay =moment( new Date()).format('YYYY-MM-DD').replaceAll('-',''); // 当前系统时间
    // 如果当前时间在账期里面，则禁用掉除开当前时间到账期结束以外的时间
    if(nowDay>=newPeriodStart&&nowDay<=newPeriodEnd){
// alert(nowDay <currentD)
      // 系统时间小于当前时间，禁用，系统时间大于账期时间，禁用
    return current &&  currentD< nowDay || current && currentD > newPeriodEnd ;
    }
    
    else{
      return current && currentD < newPeriodStart || current && currentD > newPeriodEnd || current && currentD < nowDay;
 
    }
  }
  // 根据账期月计算最新的应该账期月的起始时间 考虑跨年
  calculateAccountPeriod(currentPeriod){
    let currentPeriodDays=[];
    let monthFormat =null;
    let preMonthFormat =null;
    let periodYearEnd=null;
    let periodYearStart=null;
    let periodYear = currentPeriod.split('-')[0];  // 跨年时需要重新修改  获取到这个账期月的年份
    let periodMonth = currentPeriod.split('-')[1];

    monthFormat = (parseInt(periodMonth) > 9)?parseInt(periodMonth):('0'+parseInt(periodMonth)); //  此处可以是为了把月份数字变成符合日期格式的字符串，也就是两位数 此处不需要 因为 periodMonth此时就是符合条件的
 
    if(parseInt(periodMonth)===1){
      periodYearStart=parseInt(periodYear)-1
      periodYearEnd=periodYear
      preMonthFormat='12'
    }else{
      periodYearStart=periodYear
      periodYearEnd=periodYear
      preMonthFormat = ((parseInt(periodMonth)-1) > 9)?(parseInt(periodMonth)-1):('0'+(parseInt(periodMonth)-1)); // 账期月减去1 ，这个账期所在的真实月份是   账期月-1到账期月
    }
    let newPeriodStart = periodYearStart +  preMonthFormat + '26';   // 最近账期月的起始时间
    let newPeriodEnd = periodYearEnd + monthFormat + '25';  //  最近账期的结束时间
    currentPeriodDays.push(newPeriodStart)
    currentPeriodDays.push(newPeriodEnd)
    return  currentPeriodDays

  }
  defaultPickerValue(){
    let currentPeriodDays =this.calculateAccountPeriod("2021-01")

    
console.log(moment( moment( currentPeriodDays[0]).format('YYYYMM')));

    return       moment( moment( currentPeriodDays[0]).format('YYYYMM'));  
  }

  dateRender=(current)=>{

    // // // 计算出账期范围
    // let currentPeriodDays =calculateAccountPeriod()
    // 当前时间
    // let nowDay =moment( new Date()).format('YYYY-MM-DD').replaceAll('-',''); // 当前系统时间
    const style = {};
    style.padding= '3px 0';
    style.color= 'rgba(0, 0, 0, 0.65)';

    // style.color=' #fff'
    style.cursor=' pointer';
    let currentPeriodDays =this.calculateAccountPeriod("2021-01")
    let nowDay =moment( new Date()).format('YYYY-MM-DD').replaceAll('-',''); // 当前系统时间
    if(currentPeriodDays[0]<=nowDay&&nowDay<=currentPeriodDays[1]){
      if(nowDay<=moment( current._d).format('YYYY-MM-DD').replaceAll('-','')&&moment( current._d).format('YYYY-MM-DD').replaceAll('-','')<=currentPeriodDays[1]){
        
        return (<div className="ant-picker-cell-inner" style={style}>
        {current.date()}
      </div>)
      }else{
        return (<div className="ant-picker-cell-inner" >
        {current.date()}
      </div>)
      }

    }else  if(nowDay<currentPeriodDays[0]&&currentPeriodDays[0]<=moment( current._d).format('YYYY-MM-DD').replaceAll('-','')&&moment( current._d).format('YYYY-MM-DD').replaceAll('-','')<=currentPeriodDays[1]){
      return (<div className="ant-picker-cell-inner" style={style}>
      {current.date()}
    </div>)
    }else{
      return (<div className="ant-picker-cell-inner" >
      {current.date()}
    </div>)
    }

//     const style = {};
//     if (current.date() === 1) {
// style.padding= '3px 0';
//     style.color= 'rgba(0, 0, 0, 0.65)';
//     style.cursor=' pointer';
//     }
//     return (
//     <div className="ant-calendar-date" style={style}>
//         {current.date()}
//       </div>
 
//     );


  }

  onChangeDateDiff=()=>{
    const {dateOld} =this.state
  const dateMth=  dateOld.split('-')[1]; 
  let dateYer=  dateOld.split('-')[0]; 
let diffMth=parseInt(dateMth)-7

let diffMth2=12
if(diffMth<0){
  diffMth2= diffMth2+diffMth+1;
  dateYer= parseInt(dateYer)-1
} else if(diffMth===0){
  diffMth2=1;
 
}
else{
  diffMth2=diffMth+1
}
const a=  ((parseInt(diffMth2)) > 9)?(parseInt(diffMth2)):('0'+(parseInt(diffMth2)));
this.setState({
  dateNew: `${dateYer}`+`${a}`
})
    return `${dateYer}`+'-'+`${a}`
    }
  render() { 

    const {value} = this.props.bookEnter || {};
    return (  
      <div>
        <Button onClick={()=>this.onChange( {methodName:'handleSubmit'},{},{})}>测试</Button>
        <Button onClick={()=>onQuery("asdas")}>123</Button>
        <Radio.Group onChange={(e)=>this.onChange({methodName:'onChange'},{toolParams:e})} value={value}>
        <Radio value={1}>A</Radio>
        <Radio value={2}>B</Radio>
        <Radio value={3}>C</Radio>
        <Radio value={4}>D</Radio>
      </Radio.Group>
      <DatePicker  
      disabledDate={(current)=>this.disabledDate(current)}
       defaultPickerValue={ ()=>this.defaultPickerValue()  }
        dateRender={(current)=>this.dateRender(current)}
        />

<DatePicker  
      disabledDate={(current)=>this.disabledDate(current)}
       defaultPickerValue={ ()=>this.defaultPickerValue()  }
        // dateRender={(current)=>this.dateRender1(current)}
        />

<Button onClick={()=>this.onChangeDateDiff()}>测试日期相减</Button>
    <span>{this.state.dateOld}</span>
    <span>adsdasd</span>
    <span>{this.state.dateNew}</span>


    <Demo/>
      </div>
     );
  }
}
 
export default TableList;





























// import { DownOutlined, PlusOutlined } from '@ant-design/icons';
// import { Button,Radio ,DatePicker , Divider, Dropdown, Menu, message, Input } from 'antd';
// import React, {Component } from 'react';
// import { ViewModel } from '../../../common/utils/core';
// import model from '../model';
// import action from '../actions';
// import { connect } from 'dva';
// import moment from 'moment';
// @connect(state => ({ bookEnter: state.bookEnter }))
// @ViewModel(model, action)

// class TableList extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {  }
   
//   }

//   onChange=({methodName:methodName},{parameter:e})=>{
//     this.props.dispatch({
//       type: `bookEnter/${methodName}`,
//       payload: e,
//     });
//   }

// //   onChange=(date, dateString)=> {
// //     console.log(date, dateString);
// //   }

// //   // true是禁用 false是不禁用
// //   disabledDate=(current)=>{
// //       debugger
// //       let currentPeriodDays =this.calculateAccountPeriod("2020-01")
  
// //     // let periodYear = currentPeriodDays.split('-')[0];  // 跨年时需要重新修改  获取到这个账期月的年份
// //     // let periodMonth = currentPeriodDays.split('-')[1];


// //     let newPeriodStart =currentPeriodDays[0];   // 最近账期月的起始时间
// //     let newPeriodEnd = currentPeriodDays[1];  //  最近账期的结束时间
// //     let currentD =moment( current._d).format('YYYY-MM-DD').replaceAll('-','');  //这个日历的每一个时间
// //     let nowDay ='20200729'; // 当前系统时间
// //     // 如果当前时间在账期里面，则禁用掉除开当前时间到账期结束以外的时间
// //     if(nowDay>=newPeriodStart&&nowDay<=newPeriodEnd){
// // // alert(nowDay <currentD)
// //       // 系统时间小于当前时间，禁用，系统时间大于账期时间，禁用
// //     return current &&  currentD< nowDay || current && currentD > newPeriodEnd ;
// //     }
    
// //     else{
// //       return current && currentD < newPeriodStart || current && currentD > newPeriodEnd || current && currentD < nowDay;
 
// //     }
// //   }
// //   // 根据账期月计算最新的应该账期月的起始时间 考虑跨年
// //   calculateAccountPeriod(currentPeriodDays){
// //     let a=[];
// //     let monthFormat =null;
// //     let preMonthFormat =null;
// //     let periodYear2=null;
// //     let periodYear = currentPeriodDays.split('-')[0];  // 跨年时需要重新修改  获取到这个账期月的年份
// //     let periodMonth = currentPeriodDays.split('-')[1];

// //     monthFormat = (parseInt(periodMonth) > 9)?parseInt(periodMonth):('0'+parseInt(periodMonth)); //  此处可以是为了把月份数字变成符合日期格式的字符串，也就是两位数 此处不需要 因为 periodMonth此时就是符合条件的
 
// //     if(parseInt(periodMonth)===1){
// //       periodYear2=parseInt(periodYear)-1
// //       preMonthFormat='12'
// //     }else{
// //       periodYear2=periodYear
// //       preMonthFormat = ((parseInt(periodMonth)-1) > 9)?(parseInt(periodMonth)-1):('0'+(parseInt(periodMonth)-1)); // 账期月减去1 ，这个账期所在的真实月份是   账期月-1到账期月
// //     }
// //     let newPeriodStart = periodYear2 +  preMonthFormat + '26';   // 最近账期月的起始时间
// //     let newPeriodEnd = periodYear + monthFormat + '25';  //  最近账期的结束时间
// //     a.push(newPeriodStart)
// //     a.push(newPeriodEnd)
// //     return  a

// //   }



//   render() { 

//     const {value} = this.props.bookEnter || {};
//     return (  
//       <div>
//         <Button onClick={()=>this.onChange( {methodName:'handleSubmit'},{})}>测试</Button>
//         <Button onClick={()=>onQuery("asdas")}>123</Button>
//         <Radio.Group onChange={(e)=>this.onChange({methodName:'onChange'},{parameter:e})} value={value}>
//         <Radio value={1}>A</Radio>
//         <Radio value={2}>B</Radio>
//         <Radio value={3}>C</Radio>
//         <Radio value={4}>D</Radio>
//       </Radio.Group>
//       <DatePicker onChange={this.onChange()} disabledDate={(current)=>this.disabledDate(current)}/>



//       </div>
//      );
//   }
// }
 
// export default TableList;

