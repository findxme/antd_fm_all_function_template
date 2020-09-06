/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-nested-ternary */
/* eslint-disable lines-between-class-members */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Table, Pagination, Menu } from 'antd';
import debounce from 'lodash/debounce';
import PanelView from './PanelCtrl';
import { addEvent, removeEvent} from '../utils';

import styles from './index.less';

const getMenu = (items, target, left, top, action) => {
  const menus = Array.isArray(items) ? items : (items && items.show && Array.isArray(items.menus) ? items.menus : []);
  if (menus.length < 1) return null;
  const select = (e) => {
    const {item: {props: {data}}} = e;
    action(data);
  };
  return (
    <div style={{position: 'fixed', left, top, zIndex: 1000}}>
      <Menu style={{border: '1px solid #e8e8e8', borderRadius: '4px'}} onSelect={select}>
        {
            menus.map((menu, i) => (
              <Menu.Item key={`${i * 1}`} className={styles.menu} data={{menu, target}}>
                <a target="_blank" rel="noopener noreferrer">{menu.name}</a>
              </Menu.Item>
            ))
          }
      </Menu>
    </div>
  );
};

const ContentTip = (props) => {
  const {style = {}, msg, msgStyle = {}} = props;
  return (
    <div style={{height: '100%', width: '100%', display: 'flex', flexWrap: 'nowarp', justifyContent: 'center', alignItems: 'center', ...style}}>
      <span style={{fontSize: '18px', fontWeight: 900, color: '#40a9ff', ...msgStyle}}>{msg}</span>
    </div>
  );
}

function getPagination(page) {
  const {current = 1, pageSize = 50, total = 0, onChange, setSize, sizeList = ['50', '100', '200']} = page;
  return (
    <Pagination
      showSizeChanger
      showQuickJumper
      size="small"
      style={{float: 'right'}}
      current={current}
      pageSize={pageSize}
      total={total}
      onChange={onChange || setSize}
      onShowSizeChange={setSize || onChange}
      pageSizeOptions={sizeList}
      showTotal={() => `显示 ${Math.min((current - 1) * pageSize + 1, total)} 到 ${Math.min(total, current * pageSize)}, 共 ${total} 记录 `}
    />
  );
}

function getTable(table, y) {
  const {rowKey = 'gid', width = false, source = [], columns = [], props = {}} = table;
  const data = {
    rowKey,
    size: 'small',
    bordered: true,
    pagination: false,
    scroll: {x: width, y},
    className: styles['table-self-def'],
    ...props,
    columns,
    dataSource: source,
  };
  return columns.length > 0 ? <Table {...data} /> : <ContentTip msg="正在初始化" />;
}

export default class TableCtrl extends React.Component {
  state = { y: false, show: false, left: 0, top: 0}
  componentDidMount() {
    const $target = this.refTable;
    this.needResize = () => { const {scrollHeight, clientHeight } = $target; return scrollHeight > clientHeight; };
    const resize = () => {
      if (this.needResize()) {
        const uy = $target.offsetHeight - $target.querySelector('.ant-table-thead') - 2;
        if (uy !== this.state.y) this.setState({ y: uy});
      }
      else this.setState({ y: false });
    };
    this.resize = debounce(resize, 100);
    addEvent(window, 'resize', this.resize);
    const {menus = {}} = this.props;
    const {menuState = false} = menus; // model ? 1 = 自己带有菜单 ：2 = 需要获取
    if (menuState) {
      this.handleClick = () => { if (this.state.show) this.setState({show: false}); };
      addEvent(document, 'click', this.handleClick);
    }
    document.oncontextmenu = () => false;
    if (this.needResize()) { this.resize(); }
  }
  componentDidUpdate() {
    if (this.needResize()) { this.resize(); }
  }
  componentWillUnmount() {
    removeEvent(window, 'resize', this.resize);
    if (this.handleClick) removeEvent(document, 'click', this.handleClick);
  }
  render() {
    const {y, show, left, top} = this.state;
    const {loading, loadmsg = '正在加载中', page, table, menus = {}} = this.props;
    const {menuState, action, getMenus} = menus;
    const data = {...table};
    if (menuState) {
      data.props = {
        ...data.props,
        onRow: (record) => ({onContextMenu: (e) => {
          const {clientX, clientY} = e;
          this.target = record;
          this.setState({show: true, left: clientX, top: clientY + 8});
          if (typeof (getMenus) === 'function') getMenus(record);
        }})};
    }

    return (
      
      <PanelView loading={loading} loadmsg={loadmsg} footer={page && <div className={styles['table-page']}>{getPagination(page)}</div> || null}>
        
        <div ref={c => { this.refTable = c; }} className={styles['table-content']}>
          {getTable(data, y)}
          {show && getMenu(menus.menuItems, this.target, left, top, action)}
        </div>
      </PanelView>
    );
  }
}

export {ContentTip};
