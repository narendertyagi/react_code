import React, { Component } from "react";
import { Table, Divider, Popconfirm, message, Input, Avatar, Drawer  ,Popover, Button,Modal,Tag} from 'antd';
import moment from 'moment';
import AntdTableFilterInput from '../Shared/AntdTableFilterInput'

import LightBox from '../LightBox'

import Item from './Item'
import ItemMultiEdit from './ItemMultiEdit'
class items extends Component { 
    constructor(props) {
        super(props)
        
    }
    state = {
        pagination: {
            simple: false,
            showSizeChanger: true,
            showTotal: total => `Total ${total} items`,
            pageSizeOptions: ['10', '20', '30', '40','100','200','500']
        },
        // pagination: {},
        data: [],
        loading: false,
        visible: false,
        editId: null,
        paginationTemp: {},
        filtersTemp: {},
        sorterTemp: {},
        showLightBox: false,
        images: [],
        visibleMultiEdit: false,
        selectedId: [],
        upDown:null,
        modelVisible:false,
        copy: false,

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
            paginationTemp: pagination,
            filtersTemp:filters,
            sorterTemp:sorter
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
        Sapp.UxmAdmin.Api.Item.list({
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

    showModal = () => {
        this.setState({ visible: true, item: {} });
    }
    
    handleCancel = () => {
        this.setState({ visible: false, visibleMultiEdit: false });
    }

    saveFormRef = (form) => {
        this.form = form;
    }

    onClose = () => {
        const { paginationTemp, filtersTemp, sorterTemp } = this.state
        this.setState({
          visible: false,
          visibleMultiEdit: false,
          selectedId: [],
          editId: null,
          copy:false
    });
        let params = {
            sortField: Sapp.Util.objValue(sorterTemp,['field'], 'createdAt'),
            sortOrder: Sapp.Util.objValue(sorterTemp,['order'], '-1'),
            filters: filtersTemp,
            results: Sapp.Util.objValue(paginationTemp,['pageSize'], 10),
            page: Sapp.Util.objValue(paginationTemp,['current'], 1),

        }
        // this.fetch(params)
     
    }

    handleEdit = (e, record) => {
        e.preventDefault()
       // console.log(record)
        this.setState({
            editId: record._id,
            visible: true,
        })
    }

    handleCopy = (e, record) =>{
        e.preventDefault()
        this.setState({
            editId: record._id,
            visible: true,
            copy:true
        })
    }

    handleDelete = (e, record) =>{
        e.preventDefault()
        Sapp.UxmAdmin.Api.Item.remove(record._id).then((res) => {
            message.success('Item Deleted successfully')
            this.fetch()
       }).catch((err) => {
           // console.log(err)
           message.error(err.response.data.message)
       })
    }

    handleMultiEdit = () => {
        this.setState({
            visibleMultiEdit: true
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
                 //console.log(res.data)
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

    onLightBoxClose = () => {
        this.setState({
            showLightBox: false,
            modelVisible:false
        })
    }

    contents(record){
       // console.log(record);
        
        //  if (record.imageUri2=='' && record.imageUri3=='' && record.imageUri4=='' && record.imageUri5=='' ) {
        //     return(
        //         <span></span>
        //     )
            
        //  }
        return(
            <div style={{float: 'right'}}>
                <img src = {record.imageUri1} max-width="120" height= "120"/>
                <img src = {record.imageUri2} max-width="120" height= "120"/>
                <img src = {record.imageUri3} max-width="120" height= "120"/>
                <img src = {record.imageUri4} max-width="120" height= "120"/>
                <img src = {record.imageUri5} max-width="120" height= "120"/>
            </div>
           
        )
    }


    displayLightBox(record){
        console.log(record)
        let images = []
        let array = ['imageUri1', 'imageUri2', 'imageUri3', 'imageUri4', 'imageUri5']
        array.map(item => {
            if(record[item] !== ''){
                images.push(record[item])
            }
        })
        if(images.length > 0){
            this.setState({
                images,
                showLightBox: true,
                modelVisible:true
            })
        }else{
            message.error('No Images for display')
        }

        
    }

   handelSync = () => {
        Sapp.UxmAdmin.Api.Item.sync().then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err)
        })
    }
    

    onImageClick = (e, record) => {
        e.preventDefault()
        this.displayLightBox(record)
    }

    render() {
       
        const { selectedId } = this.state
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
                            More actions
                            </button>
                            <div style={{textAlign: 'center'}} className="dropdown-menu">
                                <a href="#" onClick={(e) => this.handleEdit(e, record)}>Edit</a>
                                <div className="dropdown-divider"></div>
                                <a href="#" onClick={(e)=> this.onImageClick(e, record)}>Images</a>
                                <div className="dropdown-divider"></div>
                                <a href="#" onClick={(e) => this.handleCopy(e, record)}>Copy Item</a>
                                <div className="dropdown-divider"></div>
                                <a href="#" onClick={(e) => this.handleDelete(e, record)}>Delete Item</a>
                            </div>
                        </div>
                  </span>
                ),
            },
            {
                title: 'Item Image',
                dataIndex: "imageUri1" ,
                key:  "imageUri1" ,
                sorter: true,
                render: (text, record) => {
                    
                    return (
                        <span>
                        <Popover 

                        content={this.contents(record)}
                        >
                                 <img src = {record.imageUri1} max-width="100" height= "120" onClick={(e)=> this.onImageClick(e, record)} />
                        </Popover>
                        
                        </span>
                      
                      )
                }
            },
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
                sorter: true,
                filterDropdown: (<AntdTableFilterInput ref='fi_title' table={this.t} columnKey={'title'} />),
                filterDropdownVisible: this.refs.fi_title && this.refs.fi_title.state.filterDropdownVisible,
                onFilterDropdownVisibleChange: (visible) => AntdTableFilterInput.onFilterDropdownVisibleChange(visible, this, this.refs.fi_title)
            },
            
            {
                title: 'Sku',
                dataIndex: 'sku',
                key: 'sku',
                sorter: true,
                filterDropdown: (<AntdTableFilterInput ref='fi_sku' table={this.t} columnKey={'sku'} />),
                filterDropdownVisible: this.refs.fi_sku && this.refs.fi_sku.state.filterDropdownVisible,
                onFilterDropdownVisibleChange: (visible) => AntdTableFilterInput.onFilterDropdownVisibleChange(visible, this, this.refs.fi_sku)
            },
            // {
            //     title: 'Id',
            //     dataIndex: '_id',
            //     key: '_id',
            //     sorter: true
            // },

            {
                title: 'Available Qty',
                dataIndex: 'availableQty',
                key: 'availableQty',
                sorter: true,
                filterDropdown: (<AntdTableFilterInput ref='fi_availableQty' table={this.t} columnKey={'availableQty'} />),
                filterDropdownVisible: this.refs.fi_availableQty && this.refs.fi_availableQty.state.filterDropdownVisible,
                onFilterDropdownVisibleChange: (visible) => AntdTableFilterInput.onFilterDropdownVisibleChange(visible, this, this.refs.fi_availableQty),
                render: (text, record) => {
                    let color 
                    if (record.availableQty == 0){
                        color = "#ff0000"
                    }
                    else if(record.availableQty <= 10){
                        color = "#fa8c16"
                    }
                     else if (record.availableQty <= 25){
                        color = "#ffff00"
                     }
                     else{
                        color = "#ffffff" 
                     }
                    return (
                        <span >
                              <Tag color={color} style={{color:"black"}}>{record.availableQty}</Tag>
                        </span>
                      
                      )
                }
            },

            {
                title: 'Cost',
                dataIndex: 'cost',
                key: 'cost',
                sorter: true,
                // filterDropdown: (<AntdTableFilterInput ref='fi_title' table={this.t} columnKey={'item_title'} />),
                // filterDropdownVisible: this.refs.fi_title && this.refs.fi_title.state.filterDropdownVisible,
                // onFilterDropdownVisibleChange: (visible) => AntdTableFilterInput.onFilterDropdownVisibleChange(visible, this, this.refs.fi_title)
            },

            {
                title: 'Last Quantity Updated',
                dataIndex: 'lastQtyUpdated',
                key: 'lastQtyUpdated',
                sorter: true,
                render: (text, record) => {
                    return (
                        <span>
                              {record.lastQtyUpdated ? moment(record.lastQtyUpdated).format('YYYY-MM-DD hh:mm:ss'): "N/A"}
                        </span>
                      )
                }
               
            } 
        ];

        // if(this.state.showLightBox){
        //     return (
        //         <LightBox show={this.state.showLightBox} onLightBoxClose={this.onLightBoxClose} images={this.state.images}/>
        //     )
        // }
        return (
            <div>
                <h5>Items <button className="btn btn-primary btn-sm" onClick={this.showModal}>Add New</button>
                {this.state.selectedId.length > 0 ? <button className="btn btn-primary btn-sm ml-1" onClick={this.handleMultiEdit} style={{float: 'right'}}>Edit Selected</button> : null}
                <button className="btn btn-primary btn-sm ml-3" onClick={this.handelSync}>Sync</button>
                </h5>
                <Modal
                    visible={this.state.modelVisible}
                    footer={null}
                    width={0}
                    closable={false}
                >
                    <LightBox show={this.state.showLightBox} onLightBoxClose={this.onLightBoxClose} images={this.state.images}/>
                </Modal>

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
                    rowSelection={rowSelection}
                    scroll={{ x: 1000 }}
                />
                   
                   <Drawer
                    title="Item"
                    placement="right"
                    closable={false}
                    width={670}
                    onClose={this.onClose}
                    visible={this.state.visible || this.state.visibleMultiEdit}
                    destroyOnClose = {true}
                    >
                       {this.state.visible ? <Item id={this.state.editId} copy={this.state.copy} onSubmit={this.onClose}/> :  <ItemMultiEdit ids={this.state.selectedId} onSubmit={this.onClose}/>}                     
                    </Drawer>
                    {/* <Drawer
                    title="Item"
                    placement="right"
                    closable={false}
                    width={670}
                    onClose={this.onClose}
                    visible={this.state.visibleMultiEdit}
                    destroyOnClose = {true}
                    >
                                   <ItemMultiEdit ids={this.state.selectedId} onSubmit={this.onClose} />      
                    </Drawer> */}


            </div>
        );
    }
}

export default items;

