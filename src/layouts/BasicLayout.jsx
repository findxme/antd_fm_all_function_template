/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
import React, { useEffect,useState  } from 'react';
import { Link, useIntl, connect, history } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { Result, Button } from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { getAuthorityFromRouter } from '@/utils/utils';
import logo from '../assets/logo.svg';
import {HomeOutlined, PicLeftOutlined, SmileOutlined, SettingOutlined,} from '@ant-design/icons';
const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);

/**
 * use Authorized check all menu item
 */
// const menuDataRender = menuList =>
//   menuList.map(item => {
//     const localItem = {
//       ...item,
//       children: item.children ? menuDataRender(item.children) : undefined,
//     };
//     return Authorized.check(item.authority, localItem, null);
//   });

const defaultFooterDom = (
  <DefaultFooter
    copyright={`${new Date().getFullYear()} 蚂蚁金服体验技术部出品`}
    links={[
      {
        key: 'Ant Design Pro',
        title: 'Ant Design Pro',
        href: 'https://pro.ant.design',
        blankTarget: true,
      },
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/ant-design/ant-design-pro',
        blankTarget: true,
      },
      {
        key: 'Ant Design',
        title: 'Ant Design',
        href: 'https://ant.design',
        blankTarget: true,
      },
    ]}
  />
);

const BasicLayout = props => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
  } = props;
  /**
   * constructor
   */

  const [menuData, setMenuData] = useState([]);

  const menuDataRender=[
  
          {
            path: '/',
            redirect: '/welcome',
          },
          {
            path: '/welcome',
            name: 'welcome',
            icon:<SettingOutlined/>,
            component: './Welcome',
          },
          {
            path: '/admin',
            name: '管理页面',
            icon: <SettingOutlined/>,
            component: './Admin',
            children: [
              {
                path: '/admin/sub-page',
                name: 'sub-page',
                icon:<SettingOutlined/>,
                component: './Welcome',
               
              },
              {
                name: 'list.table-list',
                icon:<SettingOutlined/>,
                path: '/list',
                component: './ListTableList',
              },
              {
                name: '通用组件',
                icon:<SettingOutlined/>,
                path: '/listtablelist',
                component: './ListTableListTwo',
               
              },
            ],
          },
          {
            path: '/mecommon',
            name: '通用页面',
            icon: <SettingOutlined/>,
            component: './mecommon',
            children: [
              {
                name: '通用表格',
                icon:<SettingOutlined/>,
                path: '/MeCommon/MeTable',
                // path: '/listtablelist',
                component: './MeCommon/MeTable',
               
              },
              {
                name: '图书',
                icon:<SettingOutlined/>,
                path: '/MeCommonnew/MeTable',
                // path: '/listtablelist',
                component: './MeCommonnew/MeTable',
               
              },
              {
                name: '测试',
                icon:<SettingOutlined/>,
                path: '/meText',
                component: './meText',
               
              }, {
                name: '测试2',
                icon:<SettingOutlined/>,
                path: '/meText2',
                component: './meText2',
               
              },{
                name: '测试3',
                icon:<SettingOutlined/>,
                path: '/meText3',
                component: './meText3',
               
              }
              // ,{
              //   name: '查询表单',
              //   icon:<SettingOutlined/>,
              //   path: '/MeCommon/MeForm',
              //   component: './MeCommon/MeForm',
              // },
            ],
          },
          
          {
            component: './404',
          }
    
    
  ]
 
  useEffect(() => {
    // if (dispatch) {
    //   dispatch({
    //     type: 'user/fetchCurrent',
    //   });
    // }
    setMenuData(menuDataRender || []);
  }, []);
  /**
   * init variables
   */

  const handleMenuCollapse = payload => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  }; // get children authority

  const authorized = getAuthorityFromRouter(props.route.routes, location.pathname || '/') || {
    authority: undefined,
  };
  const { formatMessage } = useIntl();
  return (
    <ProLayout
      logo={logo}
      formatMessage={formatMessage}
      onCollapse={handleMenuCollapse}
      onMenuHeaderClick={() => history.push('/')}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || !menuItemProps.path) {
          return defaultDom;
        }

        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: formatMessage({
            id: 'menu.home',
          }),
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      footerRender={() => defaultFooterDom}
      menuDataRender={()=>menuData}
      rightContentRender={() => <RightContent />}
      {...props}
      {...settings}
    >
      <Authorized authority={authorized.authority} noMatch={noMatch}>
        {children}
      </Authorized>
    </ProLayout>
  );
};

export default connect(({ global, settings }) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
