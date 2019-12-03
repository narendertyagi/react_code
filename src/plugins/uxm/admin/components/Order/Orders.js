import React, { Component } from "react";
import { Table, Divider, Popconfirm, message, Input, Avatar,Select ,Drawer, DatePicker} from 'antd';
const { RangePicker } = DatePicker
import AntdTableFilterInput from './../Shared/AntdTableFilterInput'
import Order from './Order'
import moment from 'moment';
//import ItemCategoryForm from './ItemCategoryForm'
const Option = Select.Option;
// import ItemCategory from './ItemCategory'
class Orders extends Component { 
    constructor(props) {
        super(props)
        
    }
    state = {
        pagination: {
            simple: false,
            showSizeChanger: true,
            showTotal: total => `Total ${total} items`
        },
        data: [],
        loading: false,
        visible: false,
        salesAccount: [],
        salesAccountId : null,
        editId: null,
        CreatedAfter: null,
        CreatedBefore: null
    };



    componentDidMount() {
        this.fetch()
        Sapp.UxmAdmin.Api.SalesAccount.list({}).then((res) => {
            this.setState({
                salesAccount: res.data.data
            });
        })
    }

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
        Sapp.UxmAdmin.Api.Order.list({
            results: 10,
            ...params}).then((res) => {
                const pagination = { ...this.state.pagination};
                // Read total count from server
                // pagination.total = data.totalCount;
                pagination.total = res.data.data.total;
                this.setState({
                    loading: false,
                    data: res.data.data.results,
                    pagination,

                });
            }).catch((error)=>{
                message.error(error.response.data.message)
                // if(error.response.data.message == 'Please log in first.'){
                //     this.logout()
                // }
            })
    }

    syncOrder = () =>{
        this.setState({
            loading: true
        })
        Sapp.UxmAdmin.Api.Order.syncOrder(this.state.salesAccountId, {CreatedAfter: this.state.CreatedAfter, CreatedBefore: this.state.CreatedBefore}).then((res)=>{
            message.success(res.data.data)
            this.fetch()
        })
    }

    handleChange = (id) => {
        this.setState({
            salesAccountId: id
        })
    }

    saveFormRef = (form) => {
        this.form = form;
    }

    onClose = () => {
        this.setState({
          visible: false,
          editId: null
        });
    }
    handleView = (e, record) => {
        e.preventDefault()
       // console.log(record)
        this.setState({
            editId: record._id,
            visible: true,
        })
    }

//     menu = (e,record)=>{
//        // console.log("https://sellercentral.amazon.in/hz/orders/details?_encoding=UTF8&orderId="+record._id);
//          const link = "https://sellercentral.amazon.in/hz/orders/details?_encoding=UTF8&orderId="+record._id
//         return(
//             <Menu>
//             <Menu.Item key="0">
//             <a href="#" onClick={(e) => this.handleView(e, record)}>View</a>
//             </Menu.Item>
//             <Menu.Divider />
//             <Menu.Item key="1">
//             <a href={link} target="_blank" >View Externally</a>
//             </Menu.Item>
//             </Menu>
//         )
// }


    setCreatedAfterDate = (value) => {
        this.setState({
            CreatedAfter: value[0],
            CreatedBefore: value[1]
        })
    }


    render() {
       
        const {salesAccount} = this.state
       //console.log(data);


        const columns = [
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                   
                  <span>

                    <div  className="btn-group">
                        <button type="button" className="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        More actions
                        </button>
                        <div style={{textAlign: 'center'}} className="dropdown-menu">
                            <a href="#" onClick={(e) => this.handleView(e, record)}>View</a>
                            <div className="dropdown-divider"></div>
                            <a href={"https://sellercentral.amazon.in/hz/orders/details?_encoding=UTF8&orderId="+record._id} target="_blank" >View Externally</a>
                        </div>
                   </div>

                        {/* <Dropdown overlay={(e)=>this.menu(e,record)} trigger={['click']}>
                        <a className="ant-dropdown-link" href="#">
                        More actions <Icon type="down" />
                        </a>
                        </Dropdown> */}
                  {/* <a href="#" onClick={(e) => this.handleView(e, record)}>View</a> */}
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
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                sorter: true,
                filterDropdown: (<AntdTableFilterInput ref='fi_status' table={this.t} columnKey={'status'} />),
                filterDropdownVisible: this.refs.fi_status && this.refs.fi_status.state.filterDropdownVisible,
                onFilterDropdownVisibleChange: (visible) => AntdTableFilterInput.onFilterDropdownVisibleChange(visible, this, this.refs.fi_status)
            },
            
            {
                title: 'Account Title',
                dataIndex: 'accountTitle',
                key: 'accountTitle',
                sorter: true,
                filterDropdown: (<AntdTableFilterInput ref='fi_accountTitle' table={this.t} columnKey={'accountTitle'} />),
                filterDropdownVisible: this.refs.fi_accountTitle && this.refs.fi_accountTitle.state.filterDropdownVisible,
                onFilterDropdownVisibleChange: (visible) => AntdTableFilterInput.onFilterDropdownVisibleChange(visible, this, this.refs.fi_accountTitle)
            },
            {
                title: 'Purchase Date',
                dataIndex: 'purchaseDate',
                key: 'purchaseDate',
                sorter: true,
                // filterDropdown: (<AntdTableFilterInput ref='fi_purchaseDate' table={this.t} columnKey={'purchaseDate'} />),
                // filterDropdownVisible: this.refs.fi_purchaseDate && this.refs.fi_purchaseDate.state.filterDropdownVisible,
                // onFilterDropdownVisibleChange: (visible) => AntdTableFilterInput.onFilterDropdownVisibleChange(visible, this, this.refs.fi_purchaseDate)
                render: (text, record) => (
                    <span>
                        {moment(record.purchaseDate).format('YYYY-MM-DD hh:mm:ss')}
                    </span>
                ),
        
            },

            {
                title: 'External Order Id',
                dataIndex: 'externalOrderId',
                key: 'externalOrderId',
                sorter: true,
                filterDropdown: (<AntdTableFilterInput ref='fi_externalOrderId' table={this.t} columnKey={'externalOrderId'} />),
                filterDropdownVisible: this.refs.fi_externalOrderId && this.refs.fi_externalOrderId.state.filterDropdownVisible,
                onFilterDropdownVisibleChange: (visible) => AntdTableFilterInput.onFilterDropdownVisibleChange(visible, this, this.refs.fi_externalOrderId)
            },
            
        ];


        return (
            <div>
            {<h5> 
                Orders
                <Select
                    key={Math.random(3)}
                    showSearch
                    style={{ width: '20%' }}
                    placeholder="Select a Sales Account "
                    optionFilterProp="children"
                    onChange={this.handleChange}
                    value= {this.state.salesAccountId}
                
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    {salesAccount.map(d => <Select.Option key={d._id}>{d.title}</Select.Option>)}
                    {/* <Select.Option key={1} value="5bb5bced85fa536b17f49381">5bb5bced85fa536b17f49381</Select.Option> */}
                    
                    
                </Select>
                <RangePicker className="ml-1" onChange={this.setCreatedAfterDate}/>
                {this.state.salesAccountId && this.state.CreatedAfter && this.state.CreatedBefore ? <button className="btn btn-primary btn-sm ml-1" onClick={this.syncOrder}>Sync Order</button> : null}            
            </h5>}
            
                {/* <h5>Orders <button className="btn btn-primary btn-sm" onClick={this.showModal}>Add New</button></h5> */}

                {/* <ItemCategory
                    
                    item={this.state.item}
                    itemCategories= {this.state.itemCategories}
                /> */}


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
                    scroll={{ x: 1300 }}
                />
                   
                   <Drawer
                    title="Order"
                    placement="right"
                    closable={false}
                    width={620}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    >
                        <Order id={this.state.editId} onSubmit={this.onClose}/>                       
                </Drawer>



            </div>
        );
    }
}

export default Orders;

