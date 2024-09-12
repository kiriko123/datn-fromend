import React, {useState} from 'react';
import {FaReact} from 'react-icons/fa'
import {VscSearchFuzzy} from 'react-icons/vsc';
import {Divider, Badge, Drawer, message, Button, Anchor} from 'antd';
// import './header.scss';
import {useDispatch, useSelector} from 'react-redux';
import {DownOutlined} from '@ant-design/icons';
import {Dropdown, Space} from 'antd';
import {Link, useNavigate} from "react-router-dom";
import {callLogout} from "../../services/api.js";
import {doLogoutAction} from "../../redux/account/accountSlice.js";
import './index.css'
import {FiShoppingCart} from "react-icons/fi";


const Header = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const role = useSelector(state => state.account.user.role.name);
    console.log("check menu", role);
    const user = useSelector(state => state.account.user);
    console.log(user);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleLogout = async () => {
        const res = await callLogout();
        console.log('logout res: ', res);
        if (res && res.statusCode === 200) {
            dispatch(doLogoutAction());
            message.success('Đăng xuất thành công');
            navigate('/auth');
        }
    }

    const items = [
        {
            label: <label style={{cursor: 'pointer'}}>Edit</label>,
            key: 'account',
        },
        ...(role === 'ROLE_ADMIN' ? [{
            label: <label
                style={{cursor: 'pointer'}}
                onClick={() => navigate('/admin')}
            >
                Admin page
            </label>,
            key: 'admin',
        }] : []),
        {
            label: <label
                style={{cursor: 'pointer'}}
                onClick={() => handleLogout()}
            >Log out</label>,
            key: 'logout',
        },
    ];

    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };
    return (
        <>
            <div className="container-fluid">
                <div className="header">
                    <div className="logo">
                        <i className="fas fa-bolt"></i>
                        <a href="http://google.com">好不好</a>
                    </div>
                    <div className="mobileHidden">
                        <nav>
                            <div>
                                <span onClick={() => navigate('/')}> Home</span>
                            </div>
                            <div>
                                <span onClick={() => navigate('/1')}> Product</span>
                            </div>
                            <div>
                                <span onClick={() => navigate('/2')}> Cart</span>
                            </div>
                            <div>
                                <span onClick={() => navigate('/3')}> About</span>
                            </div>
                            {/*<div>*/}
                            {/*<Badge*/}
                            {/*        count={0}*/}
                            {/*        size={"small"}*/}
                            {/*    >*/}
                            {/*        <FiShoppingCart className='icon-cart'/>*/}
                            {/*    </Badge>*/}
                            {/*</div>*/}
                            <div>
                                {!isAuthenticated || user === null ?
                                    <span onClick={() => navigate('/auth')}> Login/Register</span>
                                    :
                                    <Dropdown menu={{items}} trigger={['click']}>
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Space>
                                                <span style={{ fontSize: '16px'}}>
                                                    Welcome: <span style={{textTransform: 'uppercase'}}> {user?.name} </span>
                                                </span>
                                                <DownOutlined/>
                                            </Space>
                                        </a>
                                    </Dropdown>
                                }
                            </div>
                        </nav>
                    </div>
                    <div className="mobileVisible">
                        <Button type="primary" onClick={showDrawer}>
                            <i className="fas fa-bars"></i>
                        </Button>
                        <Drawer
                            placement="right"
                            closable={false}
                            onClose={onClose}
                            visible={visible}
                        >
                            <nav>
                                <div>
                                    <span onClick={() => navigate('/')}> Home</span>
                                </div>
                                <div>
                                    <span onClick={() => navigate('/1')}> Product</span>
                                </div>
                                <div>
                                    <span onClick={() => navigate('/2')}> Cart</span>
                                </div>
                                <div>
                                    <span onClick={() => navigate('/3')}> About</span>
                                </div>
                                {/*<div>*/}
                                {/*<Badge*/}
                                {/*        count={0}*/}
                                {/*        size={"small"}*/}
                                {/*    >*/}
                                {/*        <FiShoppingCart className='icon-cart'/>*/}
                                {/*    </Badge>*/}
                                {/*</div>*/}
                                <div>
                                    {!isAuthenticated || user === null ?
                                        <span onClick={() => navigate('/login')}> Account</span>
                                        :
                                        <Dropdown menu={{items}} trigger={['click']}>
                                            <a onClick={(e) => e.preventDefault()}>
                                                <Space>
                                                    Welcome {user?.name}
                                                    <DownOutlined/>
                                                </Space>
                                            </a>
                                        </Dropdown>
                                    }
                                </div>
                            </nav>
                        </Drawer>
                    </div>

                </div>
            </div>
        </>
    )
};

export default Header;
