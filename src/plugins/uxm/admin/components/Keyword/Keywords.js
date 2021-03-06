import React, { Component } from "react";
import { Table, Divider, Popconfirm, message, Input, Avatar, Drawer } from 'antd';
import Keyword from './Keyword'
import AntdTableFilterInput from '../Shared/AntdTableFilterInput'
//import ItemCategoryForm from './ItemCategoryForm'

// import ItemCategory from './ItemCategory'
class Keywords extends Component { 
    constructor(props) {
        super(props)
        
    }
    state = {
       data: [],
       visible: false,
       editId: null
    };



    componentDidMount() {
        this.fetch()
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
        Sapp.UxmAdmin.Api.Keyword.list({
            results: 10,
            ...params}).then((res) => {
                console.log(res);
                
                const pagination = { ...this.state.pagination};
                // Read total count from server
                // pagination.total = data.totalCount;
                // console.log(res)
                pagination.total = res.data.total;
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
          editId: null
        });
    }

    handleEdit = (e, record) => {
        e.preventDefault()
        console.log(record)
        this.setState({
            editId: record._id,
            visible: true,
        })
    }


    render() {
        const {data} = this.state
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
                sorter: true,
                // filterDropdown: (<AntdTableFilterInput ref='fi__id' table={this.t} columnKey={'_id'} />),
                // filterDropdownVisible: this.refs.fi__id && this.refs.fi__id.state.filterDropdownVisible,
                // onFilterDropdownVisibleChange: (visible) => AntdTableFilterInput.onFilterDropdownVisibleChange(visible, this, this.refs.fi__id)
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
                title: 'Keyword Group',
                dataIndex: 'keywordGroupTitle',
                key: 'keywordGroupTitle',
                sorter: true,
                filterDropdown: (<AntdTableFilterInput ref='fi_keywordGroupTitle' table={this.t} columnKey={'keywordGroupTitle'} />),
                filterDropdownVisible: this.refs.fi_keywordGroupTitle && this.refs.fi_keywordGroupTitle.state.filterDropdownVisible,
                onFilterDropdownVisibleChange: (visible) => AntdTableFilterInput.onFilterDropdownVisibleChange(visible, this, this.refs.fi_keywordGroupTitle)
            }
        ];


        return (
            <div>
                <h5>Keywords <button className="btn btn-primary btn-sm" onClick={this.showModal}>Add New</button></h5>

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
                    dataSource={data}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}
                    size={'small'}
                    scroll={{ x: 1000 }}
                />
                 <Drawer
                    title="Keyword"
                    placement="right"
                    closable={false}
                    width={620}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    >
                        <Keyword id={this.state.editId} onSubmit={this.onClose}/>                       
                </Drawer>
                   



            </div>
        );
    }
}

export default Keywords;

