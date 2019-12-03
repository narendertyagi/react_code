import React, { Component } from "react";
import { Table, Divider, Popconfirm, message, Input, Avatar,Select,Icon, Menu, Dropdown, Drawer } from 'antd'
import Inventory from './Inventory'
import CsvToJson from './CsvToJson'
import AntdTableFilterInput from './Shared/AntdTableFilterInput'
import InventoryEdit from './InventoryEdit'
const Option = Select.Option;
// import ItemCategory from './ItemCategory'
class inventories extends Component { 
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
        item: {},
        itemCategories: [],
        salesAccount: [],
        linkData:{},
        salesAccountId: null,
        selectedId: [],
        visible: false,
        visibleEditInventory: false
    };



    componentDidMount() {
        this.fetch()
        //this.fetchAll()
        Sapp.UxmAdmin.Api.SalesAccount.list().then((res) => {
             this.setState({
                salesAccount: res.data.data
             })
        }).catch((err) => {
            console.log(err)
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
        Sapp.UxmAdmin.Api.Inventory.list({
            results: 10,
            ...params}).then((res) => {
                console.log(res)
                const pagination = { ...this.state.pagination};
                // Read total count from server
                // pagination.total = data.totalCount;
                // console.log(res)
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

    syncInventory = () =>{
        Sapp.UxmAdmin.Api.Inventory.sync(this.state.salesAccountId).then((res) => {
        }).catch((err) => {
            console.log(err)
        })
        
    }

    handleChange = (value) =>{
        this.setState({salesAccountId: value})
        // Sapp.UxmAdmin.Api.Inventory.sales().then((res) => {
        // }).catch((err) => {
        //     console.log(err)
        // })
    }
    showModal = () => {
        this.setState({
            visible: true
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
          selectedId: [],
          visibleEditInventory: false
        });
    }

    handleEditInventory = (e, record) => {
        e.preventDefault()
       // console.log(record)
        this.setState({
            editId: record._id,
            visibleEditInventory : true,
        })
    }


    handleEdit = () => {
       this.setState({
           visible: true
       })
    }

    handleImportCsv = () => {
        this.setState({
            csvVisible: true
        })
      
    }


    render() {
       
        const {salesAccount, salesAccountId, selectedId} = this.state
      // console.log(linkData.asin);
        const rowSelection = {
            selectedRowKeys: selectedId,
            onChange: (selectedRowKeys, selectedRows) => {
             this.setState({selectedId: selectedRowKeys})
            // let arraySelectedId = selectedRowKeys.split(',');
            // console.log(arraySelectedId)
            }
        };

        const columns = [
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                  <span>
                    <div  className="btn-group">
                        <button type="button" className="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        More actionss
                        </button>
                        <div style={{textAlign: 'center'}} className="dropdown-menu">
                            <a href={`https://sellercentral.amazon.in/abis/listing/edit?asin=${record.asin}&sku=${record.sku}`}  target="_blank">Edit Live</a>
                            <div className="dropdown-divider"></div>
                            <a href={`https://www.amazon.in/dp/${record.asin}`} target="_blank" >View Listing</a>
                            <div className="dropdown-divider"></div>
                            <a href="#" onClick={(e) => this.handleEditInventory(e, record)}>Edit</a>
                        </div>
                   </div>


                       {/* <Dropdown overlay={(e)=>this.menu(e,record)} trigger={['click']}>
                        <a className="ant-dropdown-link" href="#">
                        More actions <Icon type="down" />
                        </a>
                        </Dropdown> */}
               
                 
                  {/* <Divider type="vertical" />
                  <a href="#" onClick={(e) => this.handleEdit(e, record)}>View Listing</a>
                  <Popconfirm title="Are you sure delete this?" onConfirm={() => this.handleDelete(record._id)} okText="Yes" cancelText="No">
                      <a href="#">Delete</a>
                  </Popconfirm> */}
                  {/*<i className="icon ion-trash-a clickable" onClick={() => this.handleDelete(record.id)}></i>*/}
                  </span>
                ),
                width:200
            },
            {
                title: 'Id',
                dataIndex: '_id',
                key: '_id',
                sorter: true
            },

          
            
            {
                title: 'Brand name',
                dataIndex: 'brand_name',
                key: 'brand_name',
                sorter: true,
                filterDropdown: (<AntdTableFilterInput ref='fi_brand_name' table={this.t} columnKey={'brand_name'} />),
                filterDropdownVisible: this.refs.fi_brand_name && this.refs.fi_brand_name.state.filterDropdownVisible,
                onFilterDropdownVisibleChange: (visible) => AntdTableFilterInput.onFilterDropdownVisibleChange(visible, this, this.refs.fi_brand_name),
                width:150
            },
            {
                title: 'Item Titles',
                dataIndex: 'itemTitles',
                key: 'itemTitles',
                sorter: true,
                filterDropdown: (<AntdTableFilterInput ref='fi_itemTitles' table={this.t} columnKey={'itemTitles'} />),
                filterDropdownVisible: this.refs.fi_itemTitles && this.refs.fi_itemTitles.state.filterDropdownVisible,
                onFilterDropdownVisibleChange: (visible) => AntdTableFilterInput.onFilterDropdownVisibleChange(visible, this, this.refs.fi_itemTitles),
                width:150
            },
            
            {
                title: 'External Sku',
                dataIndex: 'externalSku',
                key: 'externalSku',
                sorter: true,
                filterDropdown: (<AntdTableFilterInput ref='fi_externalSku' table={this.t} columnKey={'externalSku'} />),
                filterDropdownVisible: this.refs.fi_externalSku && this.refs.fi_externalSku.state.filterDropdownVisible,
                onFilterDropdownVisibleChange: (visible) => AntdTableFilterInput.onFilterDropdownVisibleChange(visible, this, this.refs.fi_externalSku)
            },
            {
                title: 'Account Code',
                dataIndex: 'accountCode',
                key: 'accountCode',
                sorter: true,
                filterDropdown: (<AntdTableFilterInput ref='fi_accountCode' table={this.t} columnKey={'accountCode'} />),
                filterDropdownVisible: this.refs.fi_accountCode&& this.refs.fi_accountCode.state.filterDropdownVisible,
                onFilterDropdownVisibleChange: (visible) => AntdTableFilterInput.onFilterDropdownVisibleChange(visible, this, this.refs.fi_accountCode)
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
                title: 'Type',
                dataIndex: 'type',
                key: 'type',
                sorter: true,
               
            },
            {
                title: 'Quantity',
                dataIndex: 'quantity',
                key: 'quantity',
                sorter: true,
               
            },
            {
                title: 'Item Sku',
                dataIndex: 'itemSkues',
                key: 'itemSkues',
                sorter: true,
                filterDropdown: (<AntdTableFilterInput ref='fi_itemSkues' table={this.t} columnKey={'itemSkues'} />),
                filterDropdownVisible: this.refs.fi_itemSkues && this.refs.fi_itemSkues.state.filterDropdownVisible,
                onFilterDropdownVisibleChange: (visible) => AntdTableFilterInput.onFilterDropdownVisibleChange(visible, this, this.refs.fi_itemSkues)
            },

          
            // {
            //     title: 'Duplicate Asin Count',
            //     dataIndex: 'duplicateAsinCount',
            //     key: 'duplicateAsinCount',
            //     sorter: true,
            //     filterDropdown: (<AntdTableFilterInput ref='fi_duplicateAsinCount' table={this.t} columnKey={'duplicateAsinCount'} />),
            //     filterDropdownVisible: this.refs.fi_duplicateAsinCount&& this.refs.fi_duplicateAsinCount.state.filterDropdownVisible,
            //     onFilterDropdownVisibleChange: (visible) => AntdTableFilterInput.onFilterDropdownVisibleChange(visible, this, this.refs.fi_duplicateAsinCount),
            //     width:150
            // },
        ];


        return (
            <div>
            {<h5> Inventories   
                <Select
                    key={Math.random(3)}
                    showSearch
                    style={{ width: '20%' }}
                    placeholder="Select a Sales Account "
                    optionFilterProp="children"
                    onChange={this.handleChange}
                    value= {salesAccountId}
                    className="ml-1"
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    {salesAccount.map(d => <Select.Option key={d._id}>{d.title}</Select.Option>)}
                    {/* <Select.Option key={1} value="5bb5bced85fa536b17f49381">5bb5bced85fa536b17f49381</Select.Option> */}
                    
                    
                </Select>
                {this.state.salesAccountId ? <button className="btn btn-primary btn-sm ml-1" onClick={this.syncInventory}>Sync Inventory</button>  : null}
                {this.state.selectedId.length > 0 ? <button className="btn btn-primary btn-sm ml-1" onClick={this.handleEdit} style={{float: 'right'}}>Edit Selected</button> : null}
               {this.state.salesAccountId ? <CsvToJson salesAccountId = {this.state.salesAccountId }/>: null}    </h5>}
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
                    //size={'small'}
                    rowSelection={rowSelection}
                    scroll={{ x: 1300 }}
                />
                 <Drawer
                    title="Inventory"
                    placement="right"
                    closable={false}
                    width={620}
                    onClose={this.onClose}
                    visible={this.state.visible || this.state.visibleEditInventory}
                    >
                       {this.state.visible? <Inventory ids={this.state.selectedId} onSubmit={this.onClose}/> :<InventoryEdit id={this.state.editId} onSubmit={this.onClose}/> }                       
                </Drawer>

            </div>
        );
    }
}

export default inventories;

