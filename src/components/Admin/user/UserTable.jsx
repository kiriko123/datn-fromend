import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Popconfirm, Button, message, notification, Divider } from 'antd';
import InputSearch from './InputSearch';
// import { callDeleteUser, callFetchListUser } from '../../../services/api';
import { CloudDownloadOutlined, CloudUploadOutlined, DeleteTwoTone, ExportOutlined, ImportOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import {callDeleteUser, callFetchListUser} from "../../../services/api.js";
import UserViewDetail from "./UserViewDetail.jsx";

import { FaEye } from "react-icons/fa";

// https://stackblitz.com/run?file=demo.tsx
const UserTable = () => {
    const [listUser, setListUser] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [total, setTotal] = useState(0);

    const [isLoading, setIsLoading] = useState(false);

    const [filter, setFilter] = useState("");
    const [sortQuery, setSortQuery] = useState("");

    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [dataViewDetail, setDataViewDetail] = useState(null);

    // useEffect(() => {
    //     fetchUser();
    // }, []);

    useEffect(() => {
        fetchUsers();
    }, [current, pageSize, filter, sortQuery]);

    const fetchUsers = async () => {
        setIsLoading(true)
        let query = `page=${current}&size=${pageSize}`;
        if (filter) {
            query += `&${filter}`
        }
        if (sortQuery) {
            query += `&${sortQuery}`;
        }
        const res = await callFetchListUser(query);
        if (res && res.data) {
            setListUser(res.data.result);
            setTotal(res.data.meta.total)
        }
        setIsLoading(false)
    }

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: true
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: true,
        },
        {
            title: 'Role',
            dataIndex: ['role', 'name'], // Sử dụng cú pháp truy cập sâu để lấy giá trị role name
            sorter: true
        },
        {
            title: 'Action',
            render: (text, record, index) => {
                return (
                    <div style={{ display: 'flex',alignItems: 'center', gap: 15 }}>
                        <FaEye style={{ cursor: 'pointer' }} onClick={() => {
                            setDataViewDetail(record);
                            setOpenViewDetail(true);
                        }} />
                        <Popconfirm
                            placement="leftTop"
                            title={"Xác nhận xóa user"}
                            description={"Bạn có chắc chắn muốn xóa user này ?"}
                            onConfirm={() => handleDeleteUser(record.id)}
                            okText="Xác nhận"
                            cancelText="Hủy"
                        >
                        <span style={{ cursor: "pointer" }}>
                            <DeleteTwoTone twoToneColor="#ff4d4f" />
                        </span>
                        </Popconfirm>
                    </div>
                )
            }
        }
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        if (pagination && pagination.current !== current) {
            setCurrent(pagination.current)
        }
        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize)
            setCurrent(1);
        }
        if (sorter && sorter.field) {
            const q = sorter.order === 'ascend' ? `sort=${sorter.field},asc` : `sort=${sorter.field},desc`;
            setSortQuery(q);
        }
        //console.log('params', pagination, filters, sorter, extra);
    };

    const handleDeleteUser = async (userId) => {
        const res = await callDeleteUser(userId);
        console.log(res);
        if (res?.data?.statusCode && res.data.statusCode===204) {
            message.success('Xóa user thành công');
            fetchUsers();
        } else {
            notification.error({
                message: 'Có lỗi xảy ra',
                description: res.message
            });
        }
    };


    // change button color: https://ant.design/docs/react/customize-theme#customize-design-token
    const renderHeader = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Table List Users</span>
                <span style={{ display: 'flex', gap: 15 }}>
                    <Button
                        icon={<ExportOutlined />}
                        type="primary"
                    >Export</Button>

                    <Button
                        icon={<CloudUploadOutlined />}
                        type="primary"
                    >Import</Button>

                    <Button
                        icon={<PlusOutlined />}
                        type="primary"
                    >Thêm mới</Button>
                    <Button type='ghost' onClick={() => {
                        setFilter("");
                        setSortQuery("")
                    }}>
                        <ReloadOutlined />
                    </Button>


                </span>
            </div>
        )
    }

    const handleSearch = (query) => {
        setFilter(query);
    }

    return (
        <>
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <InputSearch handleSearch={handleSearch}
                                 setFilter={setFilter}
                    />
                </Col>
                <Col span={24}>
                    <Table
                        title={renderHeader}
                        loading={isLoading}

                        columns={columns}
                        dataSource={listUser}
                        onChange={onChange}
                        rowKey="id"
                        pagination={
                            {
                                current: current,
                                pageSize: pageSize,
                                showSizeChanger: true,
                                total: total
                            }
                        }
                    />
                </Col>
                <UserViewDetail
                    openViewDetail={openViewDetail}
                    setOpenViewDetail={setOpenViewDetail}
                    dataViewDetail={dataViewDetail}
                    setDataViewDetail={setDataViewDetail}
                />
            </Row>
        </>
    )
}


export default UserTable;
