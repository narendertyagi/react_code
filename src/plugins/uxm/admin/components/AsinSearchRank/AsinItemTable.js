import React, { Component } from "react";
import { Table, Divider, Popconfirm, message, Input, Avatar } from 'antd';


class PaymentMethods extends Component { 
    constructor(props) {
        super(props)
        
    }

    static defaultProps = {
        data: []
    }
    state = {
        pagination: {
            pageSize: 500
        },
        data: [],
        loading: false,
        visible: false,
        item: {},
        itemCategories: []
    };



    componentDidMount() {
        
    }


    render() {
       
        const { data} = this.props

        const columns = [
            {
                title: 'Image',
                key: 'imageFeatured',
                render: ((text, record) =>{
                    
                   return (
                          <span>
                            <a href={record.image}  target={"_blank"}>
                                <Avatar src={record.image} />
                            </a>
                        </span>
                    )
                } ),
                className: 'text-nowrap'
            },
            {
                title: 'keywords',
                dataIndex: 'keywords',
                key: 'keywords',
                sorter: true,
                width: '200px'
            },
           
            {
                title: 'Asin',
                dataIndex: 'asin',
                key: 'asin',
                sorter: true,
                width: '200px',
                render: ((text, record) =>{
                   return (
                        <span>
                            <a href={record.linkUrl}  target={"_blank"}>{record.asin}</a>
                        </span>
                      )
                    
                }), 
            },
            {
                title: 'Brand',
                dataIndex: 'brandName',
                key: 'brandName',
                sorter: true,
                width: '200px'
            },
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
                sorter: true,
            },
            {
                title: 'buyPrice',
                dataIndex: 'buyPrice',
                key: 'buyPrice',
                sorter: true,
            },
            {
                title: 'rating',
                dataIndex: 'rating',
                key: 'rating',
                sorter: true,
            },
            {
                title: 'ratingsCount',
                dataIndex: 'ratingsCount',
                key: 'ratingsCount',
                sorter: true,
            },
            {
                title: 'searchIndex',
                dataIndex: 'searchIndex',
                key: 'searchIndex',
                sorter: true,
            },
            {
                title: 'searchIndexDesc',
                dataIndex: 'searchIndexDesc',
                key: 'searchIndexDesc',
                sorter: true,
            },

            
        ];


        return (
            <div>
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
                    scroll={{ x: 1500 }}
                />
            </div>
        );
    }
}

export default PaymentMethods;

