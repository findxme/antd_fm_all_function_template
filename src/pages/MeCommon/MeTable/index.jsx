
import React, {Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { Modal } from 'antd';
import View from './view';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = { table:[] }
}

  render() { 
    const {fdid} =this.props
    return (  
          <View fdid={fdid}/>
     );
  }
}
 
