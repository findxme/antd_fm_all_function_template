import React from 'react';
import moment from 'moment';
import { Spin, Form, Button, Row, Col, Input, DatePicker, TimePicker, Select, TreeSelect, InputNumber, Cascader, Switch, Radio, Checkbox, Upload, Icon, Rate } from 'antd';

import { QuestionCircleOutlined } from '@ant-design/icons';

const { Option, OptGroup } = Select;
export default  class index extends React.Component {
 
        render(){
            const layout = {
                labelCol: { span: 8 },
                wrapperCol: { span: 16 },
              };
              
              const validateMessages = {
                required: '${label} is required!',
                types: {
                  email: '${label} is not validate email!',
                  number: '${label} is not a validate number!',
                },
                number: {
                  range: '${label} must be between ${min} and ${max}',
                },
              };
              const onFinish = values => {
                console.log(values);
              };
            return(
                <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item name= 'name' label="Name"
               rules={[{ 
                type: 'String', 
                min: 0, 
                max: 99,
                required: true ,
                pattern:null,
                message: '请正确输入name!'
                 }]}>
                  <Input  defaultValue={1} />
                </Form.Item>
                <Form.Item name={['user', 'email']} label="Email"  rules={[{ 
                type: 'String', 
                min: 0, 
                max: 99,
                required: true ,
                pattern:null,
                message: '请正确输入name!'
                 }]}>
        <InputNumber defaultValue={1} />
                </Form.Item>
                <Form.Item name={['user', 'email']} label="Email"  rules={[{ 
                type: 'String', 
                min: 0, 
                max: 99,
                required: true ,
                pattern:null,
                message: '请正确输入name!'
                 }]}>
                <Select defaultValue="lucy"  >
                   
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    
                </Select>
                </Form.Item>
                <Form.Item name={['user', 'email']} label="Email"  rules={[{ 
                type: 'String', 
                min: 0, 
                max: 99,
                required: true ,
                pattern:null,
                message: '请正确输入name!'
                 }]}>
                 <DatePicker />
                </Form.Item>

                <Form.Item name={['user', 'email']} label="Email"  rules={[{ 
                type: 'String', 
                min: 0, 
                max: 99,
                required: true ,
                pattern:null,
                message: '请正确输入name!'
                 }]}>
                 <Radio.Group onChange={this.onChange} value={this.state.value}>
        <Radio value={1}>A</Radio>
        <Radio value={2}>B</Radio>
        <Radio value={3}>C</Radio>
        <Radio value={4}>D</Radio>
      </Radio.Group>
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            )
        }
    }
    
    









      



      /**
       * 
       * @param {*} fld 字段的全部信息
       * @param {*} required 是否必填
       * @param {*} edite 是否可编辑
       * @param {*} props 其他相关函数
       * @param {*} defaultVal 默认参数
       */
      const getFormItem = (fld, required, edite, props, defaultVal) => {
        switch (fld.type * 1) {
          case 0:
            return getUserDefFrom(fld, required, edite, props);
          case 1:
            return getStringFrom(fld, required, edite, props);
          case 12:
            return getAreaFrom(fld, required, edite, props, 2);
          case 13:
            return getAreaFrom(fld, required, edite, props, 3);
          case 14:
            return getAreaFrom(fld, required, edite, props, 4);
          case 15:
            return getAreaFrom(fld, required, edite, props, 5);
          case 16:
            return getAreaFrom(fld, required, edite, props, 6);
          case 17:
            return getAreaFrom(fld, required, edite, props, 7);
          case 18:
            return getAreaFrom(fld, required, edite, props, 8);
          case 19:
            return getAreaFrom(fld, required, edite, props, 9);
          case 2:
            return getNumberFrom(fld, required, edite, props);
          case 3:
            return getDate1From(fld, required, edite, props);
          case 31:
            return getDate2From(fld, required, edite, props);
          case 32:
            return getDate3From(fld, required, edite, props);
          case 33:
            return getDate4From(fld, required, edite, props);
          case 34:
            return getDate5From(fld, required, edite, props);
          case 35:
            return getDate6From(fld, required, edite, props);
          case 4:
            return getFormCascader(fld, required, edite, props);
          case 5:
            return getDropDownFrom(fld, required, edite, props);
          case 51:
            return getDropDownTreeFrom(fld, required, edite, props);
          case 6:
            return getEmialFrom(fld, required, edite, props);
          case 7:
            return getCheckFrom(fld, required, edite, props);
          case 71:
            return getRadioFrom(fld, required, edite, props);
          case 72:
            return getSwitchFrom(fld, required, edite, props);
          case 8:
            return getPasswordFrom(fld, required, edite, props);
          case 9:
            return getAttachmentFrom(fld, required, edite, props);
          case 91:
            return getAFrom(fld, required, edite, props);
          case 92:
            return getRateFrom(fld, required, edite, props);
          default:
            return getStringFrom(fld, required, edite, props);
        }
      };





      /*
1：字符串
2：数字
3：日期（年月日）
31：日期（年月日时分秒）
32: 日期（年月）
33：开始日期（年月日）
34：开始日期（年月日时分秒）
35：选择时间
5：下拉
51：树选
6：邮箱
7：网址
8: 密码
9：附件
*/
 // 字段名alias
    // 字段名alias
    //disabled 编辑状态
    /**
     * 
     * @param {*} fld 
     * @param {*} required 
     * @param {*} edite 
     * @param {*} props 
     */
    /**
     * 
     * @param {*} rules 规则
     * @param {*} component 组件
     */
const getStringFrom = (fld, required, edite, props) => { // 1：字符串
    return {
      rules: [{ required, message: edite && `${fld.alias}必须输入!` }],
      component: <Input placeholder={edite && `请输入${fld.alias}` || '<空>'} disabled={!edite} {...props} />,
    };
  };
  
  // 长文本的字符串

  const getAreaFrom = (fld, required, edite, props, rows = 4) => { // 1：字符串
    return {
      rules: [{ required, message: `${fld.alias}必须输入!` }],
      component: <TextArea style={{ marginBottom: 8 }} rows={rows} placeholder={edite && `请输入${fld.alias}` || '<空>'} disabled={!edite} {...props} />,
    };
  };
  
  
  const getNumberFrom = (fld, required, edite, props) => { // 2：数字
    return {
      rules: [{ required, message: `${fld.alias}必须输入!` }],
      component: <InputNumber placeholder={edite && `请输入${fld.alias}` || '<空>'} disabled={!edite} style={{ width: '100%' }} {...props} />,
    };
  };
  
  const getDate1From = (fld, required, edite, props) => { // 3：日期
    return {
      rules: [{ required, message: `${fld.alias}必须输入!` }],
      component: <DatePicker disabled={!edite} locale = {locale} style={{ width: '100%' }} {...props} />,
    };
  };
  
  const getDate2From = (fld, required, edite, props) => { // 31 日期（年月日时分秒）
    return {
      rules: [{ required, message: `${fld.alias}必须输入!` }],
      component: <DatePicker disabled={!edite} locale = {locale} style={{ width: '100%' }} showTime format="YYYY-MM-DD HH:mm:ss" {...props} />,
    };
  };
  
  const getDate3From = (fld, required, edite, props) => { // 32: 日期（年月）
    return {
      rules: [{ required, message: `${fld.alias}必须输入!` }],
      component: <MonthPicker disabled={!edite} locale = {locale} style={{ width: '100%' }} {...props} />,
    };
  };
  
  const getDate4From = (fld, required, edite, props) => { // 33：开始日期（年月日）
    return {
      rules: [{ required, message: `${fld.alias}必须输入!` }],
      component: <RangePicker disabled={!edite} locale = {locale} style={{ width: '100%' }} {...props} />,
    };
  };
  
  const getDate5From = (fld, required, edite, props) => { // 34：开始日期（年月日时分秒）
    return {
      rules: [{ required, message: `${fld.alias}必须输入!` }],
      component: <RangePicker disabled={!edite} locale = {locale} style={{ width: '100%' }} showTime format="YYYY-MM-DD HH:mm:ss" {...props} />,
    };
  };
  
  const getDate6From = (fld, required, edite, props) => { // 35：选择时间
    return {
      rules: [{ required, message: `${fld.alias}必须输入!` }],
      component: <TimePicker locale = {locale} disabled={!edite} {...props} />,
    };
  };
  
  const getDropDownFrom = (fld, required, edite, props) => { // 5：下拉
    return {
      rules: [{ required, message: `${fld.alias}必须选择!` }],
      component: (
        <Select showSearch placeholder={edite && `请选择${fld.alias}` || '<空>'} dropdownStyle={{ maxHeight: 400, overflow: 'auto' }} filterOption={filterOption} disabled={!edite} {...props}>{(fld.values || []).map((obj, i) => <Option key={`${i * 1}`} value={obj.dbval}>{obj.dispval}</Option>)}</Select>
      ),
    };
  };
  
  const getDropDownTreeFrom = (fld, required, edite, props) => { // 51：下拉
    const kv = fld.kv || { title: 'title', key: 'key', value: 'value' };
    return {
      rules: [{ required, message: `${fld.alias}必须选择!` }],
      component: (
        <TreeSelect showSearch treeDefaultExpandAll placeholder={edite && `请选择${fld.alias}` || '<空>'} dropdownStyle={{ maxHeight: 400, overflow: 'auto' }} filterTreeNode={filterTreeNode} disabled={!edite} {...props}>
          {(fld.values || []).map(node => getNode(node, kv))}
        </TreeSelect>
      ),
    };
  };
  
  const getEmialFrom = (fld, required, edite, props) => { // 6：邮箱
    return {
      rules: [{ required, message: `${fld.alias}必须输入!` }, { type: 'email', message: '邮件格式错误' }],
      component: <Input placeholder={edite && `请输入${fld.alias}` || '<空>'} disabled={!edite} {...props} />,
    };
  };
  
  const getCheckFrom = (fld, required, edite, props) => { // 多选
    const { title, key, value } = fld.kv || { title: 'title', key: 'key', value: 'value' };
    return {
      rules: [{ required, message: `${fld.alias}必须输入!` }],
      component: (
        <CheckboxGroup disabled={!edite} {...props}>
          {(fld.values || []).map(node => <Checkbox key={node[key]} value={node[value]}>{node[title]}</Checkbox>)}
        </CheckboxGroup>
      ),
    };
  };
  
  const getRadioFrom = (fld, required, edite, props) => { // 71：单选
    const { title, key, value } = fld.kv || { title: 'title', key: 'key', value: 'value' };
    return {
      rules: [{ required, message: `${fld.alias}必须输入!` }],
      component: (
        <RadioGroup disabled={!edite} {...props}>
          {(fld.values || []).map(node => <Radio key={node[key]} value={node[value]}>{node[title]}</Radio>)}
        </RadioGroup>
      ),
    };
  };
  
  const getSwitchFrom = (fld, required, edite, props) => { // 72：开关
    return {
      rules: [{ required, message: `${fld.alias}必须输入!` }],
      component: <Switch disabled={!edite} {...props} />,
    };
  };
  
  const getPasswordFrom = (fld, required, edite, props) => { // 8: 密码
    return {
      rules: [{ required, message: `${fld.alias}必须输入!` }],
      component: <Input placeholder={edite && `请输入${fld.alias}` || '<空>'} type="password" disabled={!edite} {...props} />,
    };
  };
  
  const getAttachmentFrom = (fld, required, edite, props) => { // 9: 附件
    const { nobtn = false } = props || {};
    return {
      rules: [{ required, message: `${fld.alias}必须输入!` }],
      component: <Upload disabled={!edite} {...props}>{!nobtn && <Button disabled={!edite}><Icon type="upload" />选择文件</Button>}</Upload>
    };
  }
  
  const getAFrom = (fld, required, edite, props) => { //91: 超链接
    return {
      rules: [{ required, message: `${fld.alias}必须输入!` }],
      component: <a {...props}>{props.value}</a>,
    };
  }
  
  const getRateFrom = (fld, required, edite, props) => { //92: 评分
    return {
      rules: [{ required, message: `${fld.alias}必须输入!` }],
      component: <Rate disabled={!edite} {...props} />,
    };
  }
  
  const getFormCascader = (fld, required, edite, props) => {
    return {
      rules: [{ required, message: `${fld.alias}必须选择!` }],
      component: <Cascader placeholder={edite && `请输入${fld.alias}` || '<空>'} changeOnSelect style={{ width: '100%' }} allowClear={false} disabled={!edite} {...props} />,
    };
  };
  
  const getUserDefFrom = (fld, required, edite, props) => {
    return {
      rules: typeof fld.getRules === 'function' ? fld.getRules({ required, message: `${fld.alias}必须输入!` }) : [{ required, message: `${fld.alias}必须输入!` }],
      component: typeof fld.getComponent === 'function' ? fld.getComponent(edite, props) : fld.getComponent,
    };
  };
  
  const getValue = (lx, val) => {
    switch (lx) {
      case 3:
        return val && moment(val.replace(/-/g, '/'), 'YYYY/MM/DD');
      case 31:
        return val && moment(val.replace(/-/g, '/'), 'YYYY/MM/DD hh:mm:ss');
      case 32:
        return val && moment(val.replace(/-/g, '/'), 'YYYY/MM');
      case 35:
        return val && moment(val.replace(/-/g, '/'), 'hh:mm:ss');
      default: return val;
    }
  };