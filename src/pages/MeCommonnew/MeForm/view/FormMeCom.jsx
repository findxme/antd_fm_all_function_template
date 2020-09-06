import React, { Component } from 'react';
import { Spin, Modal, Form, Button ,Row, Col, Icon } from 'antd';

const FormItem =Form.Item

import { ViewModel } from '../../common/utils/core';
import model from '../model';

import action from '../actions';
@ViewModel(model,action)    
class FormMeCom extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 

        const {   meDetails ,submitFormData } = this.props

        // { option: option, picture: picture, onFinish: onFinish, title: record.xh, fromInitvalue: fromInitvalue } 
        // 关闭事件  界面 点击表单时间，标题， 表单初始值  主键id 表单id
        const {  picture,initValueToFrom} = meDetails

        // const {tools} =this.state  || {};
        // const {evts} = tools  || {};
        // const {submitFormData}= evts || {};
      
        return ( 
            <Form  {...formItemLayout}   initialValues={initValueToFrom}  onFinish={submitFormData}>
            {
                <div>
                    {
                        picture.map((obj, j) => {
                            //   const { local: { col }, fld, value, formProps = {}, formItem: { rules, component }, defaultFileList } = obj;
                            const { rules, component ,fld } = obj;
                            return (
                                // <Col span={Math.ceil(24 / col)} key={`${i * 2 + j + 1}`}>
                                <FormItem label={fld.fieldAlias} key={j}  name={fld.colName}  rules={rules}>
                                    {component}
                                    {/* {
                        defaultFileList && defaultFileList.map(item => {
                            return <div className={styles.defaultFileDiv} title={item.name}><Icon className={styles.defaultFileIcon} type="paper-clip" />{item.name}</div>
                        })
                        } */}
                                </FormItem>

                            );
                        })
                    }

                </div>

            }
            <Row>
                <Col span={24} style={{ textAlign: 'center' }}>
                <Button type="primary" htmlType="submit" style={{ margin: '4px' }}>确认</Button>
                </Col>
            </Row>
        </Form>
         );
    }
}
 
export default FormMeCom;


const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 17 },
    },
  };