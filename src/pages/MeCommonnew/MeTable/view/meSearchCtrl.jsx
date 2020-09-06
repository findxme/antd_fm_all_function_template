import React, { Component } from 'react';
import { Form, Input, Button, Space, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;
import { ViewModel } from '../../common/utils/core';

import model from '../model/meSearchCtrl.js';

@ViewModel(model)
class meSearchCtrl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectItem: []
    }
  }
  componentWillMount() {

  }

  onFinish = (value) => {
    console.log(value);
  }


  render() {
    const { tableFields=[] } = this.state  || {}
    const { tools } = this.state || {};
    const { evts } = tools || {};
    const fieldsLen=tableFields===null?0:tableFields.length 

    const { onValuesChange, onFinish, onResetQuery } = evts || {};
    return (

      <Form name="tableForm" onFinish={onFinish}
        onValuesChange={onValuesChange}
        autoComplete="off">
        <Form.List name="tables">

          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map(field => (
                  <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                    <Form.Item
                      {...field}
                      name={[field.name, 'meName']}
                      fieldKey={[field.fieldKey, 'meName']}
                      rules={[{ required: true, message: '请选择字段名' }]}

                    >
                      <Select style={{ width: 120 }} labelInValue  >
                        {tableFields && tableFields.map(item => (<Option value={item.colName} key={item.colName}>{item.fieldAlias}</Option>))}
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
                      {...field}
                      name={[field.name, 'meValue']}
                      fieldKey={[field.fieldKey, 'meValue']}
                      rules={[{ required: true, message: '请输入！' }]}
                    >
                      <Input placeholder="请输入条件" />
                    </Form.Item>
                    <MinusCircleOutlined
                      onClick={() => {
                        remove(field.name);
                      }}

                    />
                  </Space>
                ))}

                {(tableFields != null && tableFields.length != 0) ? <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                  >
                    <PlusOutlined />
                  </Button>

                  <Button type="primary" htmlType="submit">
                    提交
            </Button>

                  <Button type="primary" onClick={onResetQuery}>
                    重置
            </Button>
                </Form.Item> : ''}
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

