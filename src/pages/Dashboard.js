import React, { useEffect } from 'react';
import { RightCircleTwoTone, InsuranceOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Button } from 'antd';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { isLogin } from '../utils/authorize';
const { Content, Sider } = Layout;


export function Dashboard() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  // 侧边栏的菜单项
  useEffect(() => {
    if (!isLogin()) {
      navigate('/login');
    }
  }, [navigate]);

  const items = [InsuranceOutlined].map((icon, index) => {
    return {
      key: `权限管理`,
      icon: React.createElement(icon),
      label: `权限管理`,
      children: [
        {
          key: `用户管理`,
          label: `用户管理`,
          onClick: () => {
            navigate('/dashboard/userControl');
          }
        },
        {
          key: `角色管理`,
          label: `角色管理`,
          onClick: () => {
            navigate('/dashboard/roleControl');
          }
        },
        {
          key: `菜单管理`,
          label: `菜单管理`,
          onClick: () => {
            navigate('/dashboard/menuControl');
          }
        },
      ],
    };
  });

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
