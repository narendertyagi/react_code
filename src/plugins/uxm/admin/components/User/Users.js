import React, { Component } from "react";
import { inject, observer } from 'mobx-react';
import { Table, Divider, Popconfirm, message, Input, Avatar, Button, Icon} from 'antd';
import moment from 'moment';

import Uxm from '../'
 //import AntdTableFilterInput from '../shared/AntdTableFilterInput'
 import AntdTableFilterInput from '../Shared/AntdTableFilterInput'
class Users extends Component {
    constructor(props) {
        super(props)
        
        // this.filterControls = {
        //     LfilterInput: () => (<AntdTableFilterInput table={this.t} columnKey={'lastName'} />)
        // } 

        // this.fi = null
    }
    state = {
        pagination: {},
        data: [],
        loading: false,
        filterDropdownVisible: false,
        filtered: false,
    }
    componentDidMount() {
        this.fetch()
        // console.log(this.fi)
    }

    // fitlerText = () => {
    //     this.t.handleFilter({key: 'email'}, 'khanakia@gmail.com')
    // }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination};
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            filters: filters,
        });
    }

    fetch = (params = {}) => {
        // console.log('param:', params);
        this.setState({
            loading: true
        });
        Sapp.UxmAdmin.Api.User.list({
            results: 10,
            ...params}).then((res) => {
                // console.log(res);
                const pagination = { ...this.state.pagination};
                // Read total count from server
                // pagination.total = data.totalCount;
                pagination.total = res.data.total;
                this.setState({
                    loading: false,
                    data: res.data.results,
                    pagination,
                });
            }).catch((err) => {
                message.error(err.response.data.message)
            });
    }
    
    // handleEdit = (e, record) => {
    //     e.preventDefault()
    //     this.props.history.push('/uxm/userEdit/' + record._id)
    // }

    handleView = (e, record) => {
        e.preventDefault()
        this.props.history.push('/user/' + record._id)
    }


    onInputChange = (e) => {
        this.setState({ searchText: e.target.value });
    }

    onSearch = () => {
        const { searchText } = this.state;
        this.setState({
            filterDropdownVisible: false,
            filtered: !!searchText,
        })
        this.t.handleFilter({key: 'email'}, searchText)
    }

    render() {
        // let {LfilterInput} = this.filterControls
        // console.log(LfilterInput.state)
            
        const columns = [
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                  <span>
                  <a href="#" onClick={(e) => this.handleView(e, record)}>View</a>
                  </span>
                ),
            },
            {
                title: 'Created At',
                dataIndex: 'createdAt',
                key: 'createdAt',
                sorter: true,
                render: (text, record) => (
                    <span>
                        {moment(record.createdAt).format('YYYY-MM-DD hh:mm:ss')}
                    </span>
                ),
            },
            {
                title: 'Id',
                dataIndex: '_id',
                key: '_id',
                sorter: true,
                filterDropdown: (<AntdTableFilterInput ref='fi_id' table={this.t} columnKey={'_id'} />),
                filterDropdownVisible: this.refs.fi_id && this.refs.fi_id.state.filterDropdownVisible,
                onFilterDropdownVisibleChange: (visible) => AntdTableFilterInput.onFilterDropdownVisibleChange(visible, this, this.refs.fi_id)
            },
            {
                title: 'First Name',
                dataIndex: 'firstName',
                key: 'firstName',
                sorter: true,
                filterDropdown: (<AntdTableFilterInput ref='fi_firstName' table={this.t} columnKey={'firstName'} />),
                filterDropdownVisible: this.refs.fi_firstName && this.refs.fi_firstName.state.filterDropdownVisible,
                onFilterDropdownVisibleChange: (visible) => AntdTableFilterInput.onFilterDropdownVisibleChange(visible, this, this.refs.fi_firstName)
            },
            {
                title: 'Last Name',
                dataIndex: 'lastName',
                key: 'lastName',
                sorter: true,
                filterDropdown: (<AntdTableFilterInput ref='fi_lastName' table={this.t} columnKey={'lastName'} />),
                filterDropdownVisible: this.refs.fi_lastName && this.refs.fi_lastName.state.filterDropdownVisible,
                onFilterDropdownVisibleChange: (visible) => AntdTableFilterInput.onFilterDropdownVisibleChange(visible, this, this.refs.fi_lastName)
            },

            {
                title: 'Parent Name',
                dataIndex: 'parentDetail.firstName',
                key: 'parentDetail.firstName',
                sorter: true
                // filterDropdown: (<AntdTableFilterInput ref='fi_parentDetail.firstName' table={this.t} columnKey={'parentDetail.firstName'} />),
                // filterDropdownVisible: this.refs.fi_parentDetail.firstName && this.refs.fi_parentDetail.firstName.state.filterDropdownVisible,
                // onFilterDropdownVisibleChange: (visible) => AntdTableFilterInput.onFilterDropdownVisibleChange(visible, this, this.refs.fi_parentDetail.firstName)
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
                sorter: true,
                filterDropdown: (
                    <div className="custom-filter-dropdown">
                      <Input
                        ref={ele => this.searchInput = ele}
                        placeholder="Search name"
                        value={this.state.searchText}
                        onChange={this.onInputChange}
                        onPressEnter={this.onSearch}
                      />
                      <Button type="primary" onClick={this.onSearch}>Search</Button>
                    </div>
                  ),
                // filterIcon: <Icon type="smile-o" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
                filterDropdownVisible: this.state.filterDropdownVisible,
                    onFilterDropdownVisibleChange: (visible) => {
                    this.setState({
                        filterDropdownVisible: visible,
                    }, () => this.searchInput && this.searchInput.focus());
                },
            },
            {
                title: 'Role',
                dataIndex: 'role',
                key: 'role',
                sorter: true,
                filters: [
                    { text: 'Member', value: 'member' },
                    { text: 'Subscriber', value: 'subscriber' },
                    { text: 'Seller', value: 'seller' },
                    { text: 'Sa', value: 'sa' },
                ],
            },
            
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                filters: [
                    { text: 'True', value: true },
                    { text: 'False', value: false },
                ],
                render: (text, record) => (
                    <span>
                        <i className={"fa " + (record.status ? 'fa-check' : 'fa-times')} />
                    </span>
                ),
            },
            
        ];
        return (
            <div>
                <h5>Users</h5>
                {/*<button onClick={this.fitlerText}>Filter</button>*/}
                <Table ref={table => {
                    this.t = table;
                }}  columns={columns}
                    rowKey={record => record._id}
                    dataSource={this.state.data}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}
                    size={'small'}
                    scroll={{ x: 1400 }}
                />
            </div>
        );
    }
}

export default Users;