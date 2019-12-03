import React, { Component } from "react";
import { Table, Divider, Popconfirm, message, Input, Avatar } from 'antd';


class PaymentMethods extends Component { 
    constructor(props) {
        super(props)
        
    }
    state = {
        pagination: {},
        data: [],
        loading: false,
        visible: false,
        item: {},
        itemCategories: []
    };



    componentDidMount() {
        this.fetch()
        //this.fetchAll()
    }


    fetchAll = () => {
        Sapp.UxmAdmin.Api.PaymentMethod.list().then((res) => {
            this.setState({
                itemCategories: res.data
            })
        }).catch((err) => {
            // console.log(err)
            message.error(err.response.data.message)
        })
    }

    fetch = (params = {}) => {
       // console.log('param:', params);
        this.setState({
            loading: true
        });
        Sapp.UxmAdmin.Api.PaymentMethod.list({
            results: 10,
            ...params}).then((res) => {
                const pagination = { ...this.state.pagination};
                // Read total count from server
                // pagination.total = data.totalCount;
                // console.log(res)
                pagination.total = res.data.total;
                this.setState({
                    loading: false,
                    data: res.data.results,
                    pagination,

                });
            }).catch((error)=>{
                message.error(error.response.data.message)
                // if(error.response.data.message == 'Please log in first.'){
                //     this.logout()
                // }
            })
        }

        // logout = () => {
        //     Japp.Auth.logout()
        //     this.props.history.push('/login')
        // }

    // showModal = () => {
    //     this.setState({ visible: true, item: {} });
    // }
    showModal = () => {
        this.props.history.push('/paymentmethod/add')
    }

    handleCancel = () => {
        this.setState({ visible: false });
    }

    saveFormRef = (form) => {
        this.form = form;
    }

    // handleEdit = (e, record) => {
    //     e.preventDefault()
    //     // this.props.contactStore.contact_group_item = data
    //     this.setState({
    //         visible: true,
    //         item: record
    //     })
    // }

    handleEdit = (e, record) => {
        e.preventDefault()
        this.props.history.push('/paymentmethod/'+record._id)
    }

    handleCreate = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            Sapp.UxmAdmin.Api.PaymentMethod.save(values, this.state.item._id).then((res) => {
                // console.log(res.data)
                message.success(res.data.message)
                this.fetch()
                form.resetFields();
                this.setState({ visible: false });
            }).catch((err) => {
                // console.log(err)
                message.error(err.response.data.message)
            })
        });
    }


    render() {
       
        const {itemCategories, data} = this.state
       //console.log(data);


        const columns = [
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                  <span>
                  <a href="#" onClick={(e) => this.handleEdit(e, record)}>Edit</a>
                  {/* <Divider type="vertical" />
                  <Popconfirm title="Are you sure delete this?" onConfirm={() => this.handleDelete(record._id)} okText="Yes" cancelText="No">
                      <a href="#">Delete</a>
                  </Popconfirm> */}
                  {/*<i className="icon ion-trash-a clickable" onClick={() => this.handleDelete(record.id)}></i>*/}
                  </span>
                ),
            },
            {
                title: 'Id',
                dataIndex: '_id',
                key: '_id',
                sorter: true
            },

            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
                sorter: true
            }
            
        ];


        return (
            <div>
                <Table 
                    ref={table => {
                        this.t = table;
                    }} 
                    columns={columns}
                    rowKey={record => record._id}
                    dataSource={this.state.data}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}
                    size={'small'}
                    scroll={{ x: 1000 }}
                />
            </div>
        );
    }
}

export default PaymentMethods;

