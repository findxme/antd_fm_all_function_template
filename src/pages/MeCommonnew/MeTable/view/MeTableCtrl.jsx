import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Table, Button, Icon } from 'antd';
import React, { Component } from 'react';
import { ViewModel } from '../../common/utils/core';
import { Skeleton } from 'antd';
// import Demo from './Demo';
import MeSearchCtrl from './meSearchCtrl';
import model from '../model/MeTableCtrl.js';
import MeDetails from './meDetails';

import action from '../actions';
import { connect } from 'dva';

@ViewModel(model, action)
class TableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }

  }

  render() {

    const { toolParams: { active = true } = {} } = this.props;
    const { tools, table: { table, colWidthSum }, selectedRowKeys, loading, page, meSearchCtrl, meDetails,meAddFormData } = this.state || {};
    const { pageNo, pageSize, totalRs } = page
    const { evts } = tools || {};
    const { onSelectChange, goPage, onDelDataMe,addFormData } = evts || {};
    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      total: totalRs, // 数据总数
      pageSize: parseInt(pageSize), // 每页条数
      current: parseInt(pageNo), // 当前页码
      showTotal: ((totalRs) => {
        return `共 ${totalRs} 条`;
      }),
      onChange: goPage
    }


    return (
      <div>

        {table && <div style={{ marginBottom: 16 }}>
          <MeSearchCtrl meSearchCtrl={meSearchCtrl} />
          <Button type="primary" loading={loading} onClick={addFormData}>
            新增
          </Button>
          {hasSelected && <Button type="danger" style={{ marginLeft: 8 }} onClick={onDelDataMe} loading={loading}>
            删除
          </Button>}
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `选中 ${selectedRowKeys.length} 条数据` : ''}
          </span>
          <Table pagination={paginationProps} rowSelection={rowSelection} scroll={{ x: colWidthSum }} {...table} />
        </div>}

        {meDetails && <MeDetails show={active} meDetails={meDetails} />}
        {meAddFormData && <MeDetails show={active} meDetails={meAddFormData} />}
      </div>
    );
  }
}

export default TableList;

