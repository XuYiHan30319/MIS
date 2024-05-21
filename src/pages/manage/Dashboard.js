import React, { useEffect } from 'react';
import { RightCircleTwoTone } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Button } from 'antd';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { isLogin } from '../../utils/authorize';
const { Content, Sider } = Layout;


export function Dashboard() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin()) {
      navigate('/manage/login');
    }
  }, [navigate]);

  const renderMenuItems = (menuData, userPrivilege) => {
    const menus = JSON.parse(menuData);
    console.log(userPrivilege)
    console.log(menuData)
    const buildMenuItems = (menus, parent = "") => {
      const result = [];
      for (const menu of menus) {
        if (menu.parent === parent && (!menu.allowUser || menu.allowUser.includes(userPrivilege))) {
          const children = buildMenuItems(menus, menu.title);
          const menuItem = {
            key: menu.title,
            label: menu.title,
            children: children.length > 0 ? children : null,
            onClick: () => {
              if (menu.parent !== "") {
                navigate("/manage/dashboard" + menu.path);
              }
            },
          };
          result.push(menuItem);
        }
      }
      return result;
    };
    let items = buildMenuItems(menus);

    return items;
  };

  const items = renderMenuItems(localStorage.getItem("menus"), localStorage.getItem("privilege"));

  const pathItems = useLocation().pathname.split('/').filter(item => item);
  const pathLength = pathItems.length;
  const reallpathItems = pathItems.map((item, index) => ({
    key: index,
    title: index === pathLength - 1 ? (
      <span>{item}</span>
    ) : (
      <Link to={`/${pathItems.slice(0, index + 1).join('/')}`}>{item}</Link>
    )
  }));
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Sider
          width="20%"
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['权限管理']}
            style={{
              height: '100%',
              borderRight: 0,
            }}
            items={items}
          />
        </Sider>
        <Layout
          style={{
            padding: '0 24px 24px',
            flex: '1 1 auto',
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '16px 0',
          }}>
            <Breadcrumb items={reallpathItems} />
            <div>
              <span style={{ marginRight: 16 }}>welcome {localStorage.getItem('username')}</span>
              <Button type="primary" shape="circle" onClick={() => {
                localStorage.removeItem('isLogin');
                navigate('/manage/login');
              }} icon={<RightCircleTwoTone />} />
            </div>
          </div>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};


