import React from 'react';
import ModalDrag from './modalDrag.js';
import { Spin, Modal, Form, Button ,Row, Col, Icon } from 'antd';
const FormItem = Form.Item
export default class ModalMe extends React.Component {
    render() {

        const {  show, meDetails } = this.props
        const { option, picture,onFinish,title ,record} = meDetails
        const titleM = <ModalDrag title={title} />

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
        return (
            <Modal visible={show}
                title={titleM}
                {...option}>
                    <div>
             
                <Spin spinning={false}>
                    <Form  {...formItemLayout}   initialValues={record}  onFinish={onFinish}>
                        {
                          
                            <div>
                                {
                                    picture.map((obj, j) => {
                                        //   const { local: { col }, fld, value, formProps = {}, formItem: { rules, component }, defaultFileList } = obj;
                                        const { rules, component ,fld } = obj;
                                        return (
                                            // <Col span={Math.ceil(24 / col)} key={`${i * 2 + j + 1}`}>
                                            <FormItem label={fld.fieldAlias} key={j}  name={fld.fieldName}  rules={rules}>
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
                </Spin>
                </div>
            </Modal>
        )
    }
}



