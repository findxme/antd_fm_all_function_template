import React, { Component } from 'react';
import { Form, Input, Button, Space, Select, DatePicker } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;
import { ViewModel } from '../../common/utils/core';

import model from '../model/meSearchCtrl.js';
import { getFormItem } from '../../MeForm/view/FormUtils.js';
@ViewModel(model)
class meSearchCtrl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectItem: [],
      item: null
    }
  }
  componentWillMount() {

  }

  onFinish = (value) => {
    console.log(value);
  }

  onFieldsChange=(changedFields, allFields)=>{
    console.log(changedFields);
    console.log(allFields);

  }
  render() {
    const { tableFields = [], formDivs=[] } = this.state || {}
    const { tools } = this.state || {};
    const { evts } = tools || {};

    const fieldsLen = (tableFields === null ? 0 : tableFields.length)

    const { onValuesChange, onFinish, onResetQuery,removeDiv } = evts || {};

    return (

      <Form name="tableForm" onFinish={onFinish}
        onValuesChange={onValuesChange}
        autoComplete="off" 
        >
        <Form.List     name="tables">

          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field,j) => (
                  <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                    <Form.Item
                      {...field}
                      name={[field.name, 'meName']}
                      fieldKey={[field.fieldKey, 'meName']}
                      rules={[{ required: true, message: '请选择字段名' }]}

                    >
                      <Select style={{ width: 120 }} labelInValue >
                        {tableFields && tableFields.map((item, j) => (<Option value={item.colName} key={j} >{item.fieldAlias}</Option>))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'meQueryMethod']}
                      fieldKey={[field.fieldKey, 'meQueryMethod']}
                      initialValue='='
                      rules={[{ required: true, message: '请选择类类型' }]}
                    >
                      <Select style={{ width: 120 }}>
                        <Option value="=">等于</Option>
                        <Option value="like">模糊</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      // {...field}
                      name={[field.name, 'meValue']}
                      // name={formDivs.length!=0 && formDivs[j]!=undefined? (formDivs[j].fieldType!="DATETIME"?["formDivs[j].fieldType", 'meValue']: [field.name, 'meValue']):[field.name, 'meValue']}
                      fieldKey={[field.fieldKey, 'meValue']}
                      rules={[{ required: true, message: '请输入！' }]}
                    >
                      {/* 动态判断应该渲染的组件 在表单数据修改的时候回改变 formDivs 这个里面存储了没个组件的个fld也就是item的每一项*/}
                {formDivs.length!=0 && formDivs[j]!=undefined? getFormItem({fld: formDivs[j],required:0,edite:1}).component:<Input placeholder="请输入条件" /> }
                {/* <Input placeholder="请输入条件" /> */}
                    </Form.Item>
                    <MinusCircleOutlined
                      onClick={()=>{
                        removeDiv(field,remove)
                       } }/>
                  </Space>
                ))}
                <Form.Item>
                  {/* 如果要渲染的表单不为空，并且这个的长度不为0 或者表单的长度不等于长度就不渲染这个页面 */}
                  <Space style={{ display: 'flex', marginLeft: 8 }} align="start">   {<Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                  >
                    <PlusOutlined />
                  </Button> }
                  <Button type="primary" htmlType="submit">提交</Button>
                  <Button type="primary" onClick={onResetQuery}>重置 </Button>
                  </Space>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>

        {/* <Form.Item>
          
          </Form.Item> */}
      </Form>

    );
  }
}
export default meSearchCtrl;

