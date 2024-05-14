import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined, RightCircleTwoTone } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Button } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
const { Content, Sider } = Layout;

// 侧边栏的菜单项
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

export function Dashboard() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Sider
          width="20%"
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{
              height: '100%',
              borderRight: 0,
            }}
            items={items2}
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
            <Breadcrumb items={location.pathname.split('/').map((item, index) => (
              {
                title: <a href={`/${item}`} key={index}>{item}</a>,
              }
            ))} />
            <Button type="primary" shape="circle" onClick={() => {
              localStorage.removeItem('isLogin');
              navigate('/login');
            }} icon={<RightCircleTwoTone />} />
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
