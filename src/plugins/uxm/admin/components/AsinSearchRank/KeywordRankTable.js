import React, { Component } from "react";
import { Table, Divider, Popconfirm, message, Input, Avatar } from 'antd';

import { Select } from 'antd';
const Option = Select.Option;


class PaymentMethods extends Component { 
    constructor(props) {
        super(props)
        
    }

    static defaultProps = {
        // data: [],
        keywords: [],
        keywordCatalogueItems : {}
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

    handlekeywordSelectChange = (value) => {
        window.dddd = this.props
        const data = Sapp.Util.objValue(this.props.keywordCatalogueItems, ["wooden wall hanger",'items'], [])
        console.log(data)
        this.setState({
            keywords: value,
            data: data
        })
    }

    render() {
       
        const { data} = this.state

        const columns = [
            {
                title: 'Image',
                key: 'imageFeatured',
                render: ((text, record) =>{
                    
                   return (
                        <span>
                            <a href={record.image.url}  target={"_blank"}>
                                <Avatar src={record.image.url} />
                            </a>
                        </span>
                    )
                } ),
                className: 'text-nowrap'
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
                            <a href={'https://www.amazon.in/' + record.link.url}  target={"_blank"}>{record.asin}</a>
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
            
        ];

        return (
            <div>
                <div className="mb-2">
                    <Select
                        ref='keywordSelect'
                        // defaultValue={this.props.keywords}
                        style={{ width: '100%' }}
                        onChange={this.handlekeywordSelectChange}
                    >
                        {this.props.keywords.map(d => <Select.Option key={d}>{d}</Select.Option>)}
                    </Select>
                </div>

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
            </div>
        );
    }
}

export default PaymentMethods;

