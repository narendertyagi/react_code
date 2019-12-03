import React, { Component } from "react";
import { inject, observer } from 'mobx-react';
import { Table, Divider, Popconfirm, message, Input, Avatar } from 'antd';

// import { Api } from '../../shared/variable'
// import LayoutUser from '../LayoutUser'
//import ItemForm from './ItemForm'
import InventoryForm from './InventoryForm'

class Inventory extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            items: []
        }
    }

    componentDidMount() {

        Sapp.UxmAdmin.Api.Item.list().then((res) => {            
            this.setState({
                items: res.data.data
            })
        }).catch((err) => {
            // console.log(err)
        })
        
    }

    saveFormRef = (form) => {
        this.form = form;
    }

    handleEdit = (e, record) => {
        e.preventDefault()
        this.setState({
            visible: true,
            item: record
        })
    }

    handleSubmit = (e) => {
        // console.log(description)
        e.preventDefault()
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            values.ids = this.props.ids
            Sapp.UxmAdmin.Api.Inventory.updateItem(values).then((res) => {
                // form.resetFields();
                message.success(res.data)
                this.props.onSubmit()
            }).catch((err) => {
                message.error(err.response.data.message)
                // console.log(err)
            })
        });
    }

    static defaultProps = {
        id: null,
        onSubmit: ()=>{}
    }

    


    render() {

        const {items} = this.state
//console.log(item);

        return (
            <div>
                <InventoryForm
                    ref={this.saveFormRef}
                    items={items}
                    handleSubmit={this.handleSubmit}                   
                />
            </div>
        );
    }
}

export default Inventory;