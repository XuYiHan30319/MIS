import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined, RightCircleTwoTone, InsuranceOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Button } from 'antd';
import { Outlet, useNavigate, useLocation,Link } from 'react-router-dom';
const { Content, Sider } = Layout;


export function Dashboard() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  // 侧边栏的菜单项
  
  const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined, InsuranceOutlined].map((icon, index) => {
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

  const navigate = useNavigate();
  const pathItems = useLocation().pathname.split('/').filter(item => item);
  const pathLength = pathItems.length;

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
            <Breadcrumb>
              {pathItems.map((item, index) => (
                <Breadcrumb.Item key={index}>
                  {index === pathLength - 1 ? (
                    <span>{item}</span>
                  ) : (
                    <Link to={`/${pathItems.slice(0, index + 1).join('/')}`}>{item}</Link>
                  )}
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
            <div>
              <span style={{ marginRight: 16 }}>welcome {localStorage.getItem('username')}</span>
              <Button type="primary" shape="circle" onClick={() => {
                localStorage.removeItem('isLogin');
                navigate('/login');
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
