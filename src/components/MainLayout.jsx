import React, { useState } from 'react';
import AphiaLite from '../assets/aphialight.png';
import Aphia from '../assets/aphia.png';
import { IoBagAddOutline } from "react-icons/io5";
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';



import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    DashboardOutlined,
    ShoppingOutlined,
    DollarOutlined,
    SettingOutlined,
} from '@ant-design/icons'; 

import { Layout, Menu, Button, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const navigate = useNavigate();

    return (
        <Layout style={{ height: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className='flex space-x-3 items-center'>
                    <img className='w-28 p-3 pb-4 ' src={AphiaLite} alt='AphiaLogo' />
                    <span className=' bg-white p-[5px] text-[9px] sm-logo text-orange-500 font-semibold rounded-sm mb-1'>VENDOR</span>
                </div>

                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[""]}
                    onClick={({ key }) => {
                        if (key === "logout") {

                        } else {
                            navigate(key);
                        }
                    }}
                    items={[
                        {
                            key: "",
                            icon: <DashboardOutlined />,
                            label: 'Dashboard',
                        },
                        {
                            key: "catalog",
                            icon: <ShoppingOutlined />,
                            label: 'Catalog',
                            children: [
                                {
                                    key: "add-product",
                                    icon: <IoBagAddOutline />,
                                    label: 'Add Product',
                                },
                                {
                                    key: "product-overview",
                                    icon: <DashboardOutlined />,
                                    label: 'Product Overview',
                                },
                                {
                                    key: "add-category",
                                    icon: <DashboardOutlined />,
                                    label: 'Add Category',
                                },
                            ]
                        },
                        {
                            key: "orders",
                            icon: <DollarOutlined />,
                            label: 'Orders',
                            children: [
                                {
                                    key: "order-list",
                                    icon: <DashboardOutlined />,
                                    label: 'Order List',
                                },
                                {
                                    key: "order-reviews",
                                    icon: <DashboardOutlined />,
                                    label: 'Order Reviews',
                                }
                            ]
                        },
                        {
                            key: "settings",
                            icon: <SettingOutlined />,
                            label: 'Settings',
                            children: [
                                {
                                    key: "edit-profile",
                                    icon: <DashboardOutlined />,
                                    label: 'Edit Profile',
                                },
                                {
                                    key: "delete-account",
                                    icon: <DashboardOutlined />,
                                    label: 'Delete Account',
                                }
                            ]
                        },
                        {
                            key: "helpcenter",
                            icon: <UploadOutlined />,
                            label: 'Help Center',
                            children: [
                                {
                                    key: "message",
                                    icon: <DashboardOutlined />,
                                    label: 'Messages',
                                }
                            ]
                        },
                        {
                            key: "logout",
                            icon: <UploadOutlined />,
                            label: 'Logout',
                        }
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    className='flex justify-between pl-2 pr-5'
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div className='flex gap-3 items-center'>
                        <div className='ml-4'>
                             <Badge badgeContent={1} color="warning">
                                <MailIcon color="action" />
                            </Badge>
                        </div>
                        <div  className='ml-4 mr-4'>
                        <Badge badgeContent={4} color="warning">
                                <NotificationsIcon color="action" />
                            </Badge>
                        </div>

                        <div>
                            <img src={Aphia} alt='imgg' className='w-8'/>
                        </div>
                        <div>
                            <h4 className='mb-0 text-sm font-semibold'>Vendor Name</h4>
                            <p className='mb-0 mr-8 text-xs'>vendor@gmail.com</p>
                        </div>
                    </div>
                </Header>
                <Content
                    className='bg-slate-50'
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        
                    }}
                >
                  <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
export default MainLayout;