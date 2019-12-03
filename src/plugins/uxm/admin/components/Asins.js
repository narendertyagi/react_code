import React, { Component } from "react";
import { Table, Divider, Popconfirm, message, Input, Avatar,Drawer, Button,Icon, Menu, Dropdown, Modal } from 'antd';

import AntdTableFilterInput from './Shared/AntdTableFilterInput'
//import ItemCategoryForm from './ItemCategoryForm'
 import Asin from './Asin'
 import Asinsimport from './AsinImport'
// import { Button } from "antd/lib/radio";
class Asins extends Component { 
    constructor(props) {
        super(props)
        
    }
    state = {
        pagination: {},
        data: [],
        loading: false,
        visible: false,
        editId: null,
        importVisible: false
    };



    componentDidMount() {
        this.fetch()
        //this.fetchAll()
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

    // fetchAll = () => {
    //     Sapp.UxmAdmin.Api.PaymentMethod.list().then((res) => {
    //         this.setState({
    //             itemCategories: res.data
    //         })
    //     }).catch((err) => {
    //         // console.log(err)
    //         message.error(err.response.data.message)
    //     })
    // }

    fetch = (params = {}) => {
       // console.log('param:', params);
        this.setState({
            loading: true
        });
        Sapp.UxmAdmin.Api.Asin.list({
            results: 10,
            ...params}).then((res) => {
                console.log(res)
                const pagination = { ...this.state.pagination};
                // Read total count from server
                // pagination.total = data.totalCount;
                // console.log(res)
                pagination.total = res.data.total;
                this.setState({
                    loading: false,
                    data: res.data.data,
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
        // this.props.history.push('/asin/import')
        this.setState({
            importVisible: true,
          });
    }

    syncAsin = () =>{
        
         
        Sapp.UxmAdmin.Api.Asin.sync().then((res) => {
        }).catch((err) => {
            console.log(err)
        })
    }

    handleResync =(e,record) =>{
        e.preventDefault()
         console.log(record._id);
         
        Sapp.UxmAdmin.Api.Asin.reSync(record._id).then((res) => {
        }).catch((err) => {
            console.log(err)
        })
    }

    handleCancel = () => {
        this.setState({ visible: false });
    }

    saveFormRef = (form) => {
        this.form = form;
    }

    onClose = () => {
        this.setState({
          visible: false,
          editId: null,
          importVisible: false
        });
    }

    handleEdit = (e, record) => {
        e.preventDefault()
       // console.log(record)
        this.setState({
            editId: record._id,
            visible: true,
        })
    }

    // handleEdit = (e, record) => {
    //     e.preventDefault()
    //     // this.props.contactStore.contact_group_item = data
    //     this.setState({
    //         visible: true,
    //         item: record
    //     })
    // }

    // handleEdit = (e, record) => {
    //     e.preventDefault()
    //     this.props.history.push('/item/'+record._id)
    // }

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

    //  menu = (e,record)=>{
    //             return(
    //                 <Menu>
    //                 <Menu.Item key="0">
    //                 <a href="#" onClick={(e) => this.handleEdit(e, record)}>Edit</a>
    //                 </Menu.Item>
    //                 <Menu.Divider />
    //                 <Menu.Item key="1">
    //                 <a href="#" onClick={(e) => this.handleResync(e, record)} >Resync</a>
    //                 </Menu.Item>
    //                 </Menu>
    //             )
    //  }
       
   


    render() {
       
        const { data} = this.state
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
                        <a href="#" onClick={(e) => this.handleEdit(e, record)}>Edit</a>
                            <div className="dropdown-divider"></div>
                            <a href="#" onClick={(e) => this.handleResync(e, record)} >Resync</a>
                        </div>
                   </div>

                  {/* <Dropdown overlay={(e)=>this.menu(e,record)} trigger={['click']}>
                    <a className="ant-dropdown-link" href="#">
                       More actions <Icon type="down" />
                    </a>
                  </Dropdown> */}
                      {/* <Button type="primary" ghost onClick={(e) => this.handleResync(e, record)} >Resync Asin</Button> */}
                  {/* <Button type="primary" >Resync Asin</Button> */}
                  {/* <Divider type="vertical" /> */}
                  {/* <a href="#" onClick={(e) => this.handleEdit(e, record)}>Edit</a> */}
                  {/* <Divider type="vertical" />
                 {/*  <Popconfirm title="Are you sure delete this?" onConfirm={() => this.handleDelete(record._id)} okText="Yes" cancelText="No">
                      <a href="#">Delete</a>
                  </Popconfirm> */}
                  {/*<i className="icon ion-trash-a clickable" onClick={() => this.handleDelete(record.id)}></i>*/}
                 
                  </span>
                ),
                width:170
            },
            {
                title: 'Id',
                dataIndex: '_id',
                key: '_id',
                sorter: true
            },
            {
                title: 'Asin',
                dataIndex: 'asin',
                key: 'asin',
                sorter: true,
                filterDropdown: (<AntdTableFilterInput ref='fi_asin' table={this.t} columnKey={'asin'} />),
                filterDropdownVisible: this.refs.fi_asin && this.refs.fi_asin.state.filterDropdownVisible,
                onFilterDropdownVisibleChange: (visible) => AntdTableFilterInput.onFilterDropdownVisibleChange(visible, this, this.refs.fi_asin)
            },
            {
                title: 'Item Skues',
                dataIndex: 'itemSkues',
                key: 'itemSkues',
                sorter: true,
                filterDropdown: (<AntdTableFilterInput ref='fi_itemSkues' table={this.t} columnKey={'itemSkues'} />),
                filterDropdownVisible: this.refs.fi_itemSkues && this.refs.fi_itemSkues.state.filterDropdownVisible,
                onFilterDropdownVisibleChange: (visible) => AntdTableFilterInput.onFilterDropdownVisibleChange(visible, this, this.refs.fi_itemSkues)
            },
            {
                title: 'Item Name',
                dataIndex: 'item_name',
                key: 'item_name',
                sorter: true,
                filterDropdown: (<AntdTableFilterInput ref='fi_item_name' table={this.t} columnKey={'item_name'} />),
                filterDropdownVisible: this.refs.fi_item_name && this.refs.fi_item_name.state.filterDropdownVisible,
                onFilterDropdownVisibleChange: (visible) => AntdTableFilterInput.onFilterDropdownVisibleChange(visible, this, this.refs.fi_item_name)
            },
            {
                title: 'Item Title',
                dataIndex: 'itemTitles',
                key: 'itemTitles',
                sorter: true,
                filterDropdown: (<AntdTableFilterInput ref='fi_itemTitles' table={this.t} columnKey={'itemTitles'} />),
                filterDropdownVisible: this.refs.fi_itemTitles && this.refs.fi_itemTitles.state.filterDropdownVisible,
                onFilterDropdownVisibleChange: (visible) => AntdTableFilterInput.onFilterDropdownVisibleChange(visible, this, this.refs.fi_itemTitles)
            },


            {
                title: 'Sold By Seller',
                dataIndex: 'soldBySeller',
                key: 'soldBySeller',
                sorter: true,
                filterDropdown: (<AntdTableFilterInput ref='fi_soldBySeller' table={this.t} columnKey={'soldBySeller'} />),
                filterDropdownVisible: this.refs.fi_soldBySeller && this.refs.fi_soldBySeller.state.filterDropdownVisible,
                onFilterDropdownVisibleChange: (visible) => AntdTableFilterInput.onFilterDropdownVisibleChange(visible, this, this.refs.fi_soldBySeller)
            },
            {
                title: 'Brand Name',
                dataIndex: 'brand_name',
                key: 'brand_name',
                sorter: true,
                filterDropdown: (<AntdTableFilterInput ref='fi_brand_name' table={this.t} columnKey={'brand_name'} />),
                filterDropdownVisible: this.refs.fi_brand_name && this.refs.fi_brand_name.state.filterDropdownVisible,
                onFilterDropdownVisibleChange: (visible) => AntdTableFilterInput.onFilterDropdownVisibleChange(visible, this, this.refs.fi_brand_name)
            },
            
            {
                title: 'Category Id',
                dataIndex: 'categoryId',
                key: 'categoryId',
                sorter: true,
                filterDropdown: (<AntdTableFilterInput ref='fi_categoryId' table={this.t} columnKey={'categoryId'} />),
                filterDropdownVisible: this.refs.fi_categoryId && this.refs.fi_categoryId.state.filterDropdownVisible,
                onFilterDropdownVisibleChange: (visible) => AntdTableFilterInput.onFilterDropdownVisibleChange(visible, this, this.refs.fi_categoryId)
            },
            {
                title: 'External Product Id',
                dataIndex: 'external_product_id',
                key: 'external_product_id',
                sorter: true,
                filterDropdown: (<AntdTableFilterInput ref='fi_external_product_id' table={this.t} columnKey={'external_product_id'} />),
                filterDropdownVisible: this.refs.fi_external_product_id && this.refs.fi_external_product_id.state.filterDropdownVisible,
                onFilterDropdownVisibleChange: (visible) => AntdTableFilterInput.onFilterDropdownVisibleChange(visible, this, this.refs.fi_external_product_id)
            },
            {
                title: 'External Product Id type',
                dataIndex: 'external_product_id_type',
                key: 'external_product_id_type',
                sorter: true,
                filterDropdown: (<AntdTableFilterInput ref='fi_external_product_id_type' table={this.t} columnKey={'external_product_id_type'} />),
                filterDropdownVisible: this.refs.fi_external_product_id_type && this.refs.fi_external_product_id_type.state.filterDropdownVisible,
                onFilterDropdownVisibleChange: (visible) => AntdTableFilterInput.onFilterDropdownVisibleChange(visible, this, this.refs.fi_external_product_id_type)
            },
           
            // {
            //     title: 'Manufacturer',
            //     dataIndex: 'manufacturer',
            //     key: 'manufacturer',
            //     sorter: true,
            //     filterDropdown: (<AntdTableFilterInput ref='fi_manufacturer' table={this.t} columnKey={'manufacturer'} />),
            //     filterDropdownVisible: this.refs.fi_manufacturer&& this.refs.fi_manufacturer.state.filterDropdownVisible,
            //     onFilterDropdownVisibleChange: (visible) => AntdTableFilterInput.onFilterDropdownVisibleChange(visible, this, this.refs.fi_manufacturer)
            // },
           
            {
                title: 'Our Price',
                dataIndex: 'ourPrice',
                key: 'ourPrice',
                sorter: true,
                // filterDropdown: (<AntdTableFilterInput ref='fi_title' table={this.t} columnKey={'title'} />),
                // filterDropdownVisible: this.refs.fi_title && this.refs.fi_title.state.filterDropdownVisible,
                // onFilterDropdownVisibleChange: (visible) => AntdTableFilterInput.onFilterDropdownVisibleChange(visible, this, this.refs.fi_title)
            },
            {
                title: 'Shipping Price',
                dataIndex: 'ourShippingPrice',
                key: 'ourShippingPrice',
                sorter: true,
                // filterDropdown: (<AntdTableFilterInput ref='fi_title' table={this.t} columnKey={'title'} />),
                // filterDropdownVisible: this.refs.fi_title && this.refs.fi_title.state.filterDropdownVisible,
                // onFilterDropdownVisibleChange: (visible) => AntdTableFilterInput.onFilterDropdownVisibleChange(visible, this, this.refs.fi_title)
            },
            {
                title: 'Total Price',
                dataIndex: 'ourPriceTotal',
                key: 'ourPriceTotal',
                sorter: true,
                // filterDropdown: (<AntdTableFilterInput ref='fi_title' table={this.t} columnKey={'title'} />),
                // filterDropdownVisible: this.refs.fi_title && this.refs.fi_title.state.filterDropdownVisible,
                // onFilterDropdownVisibleChange: (visible) => AntdTableFilterInput.onFilterDropdownVisibleChange(visible, this, this.refs.fi_title)
            },
           
        ];


        return (
            <div>
              {/* <h5> Asins </h5> */}
                <h5>Asins 
                 <div style={{marginLeft:10}} className="btn-group">
                    <button type="button" className="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dropdown
                    </button>
                    <div className="dropdown-menu">
                        <button className="dropdown-item"onClick={this.syncAsin}>Sync Asin</button>
                        <div className="dropdown-divider"></div>
                        <button className="dropdown-item" onClick={this.showModal}>Import Asin</button>
                    </div>
                </div>
                </h5>
             
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
                    scroll={{ x: 1800 }}
                />
                     <Drawer
                    title="Asin"
                    placement="right"
                    closable={false}
                    width={620}
                    onClose={this.onClose}
                    visible={this.state.visible || this.state.importVisible}
                    >
                    
                      {this.state.visible ? <Asin id={this.state.editId} onSubmit={this.onClose}/> :<Asinsimport onSubmit={this.onClose}/> }                     
                </Drawer>
            </div>
        );
    }
}

export default Asins;

