import React, { Component } from "react";
import { inject, observer } from 'mobx-react';
import { Table, Divider, Popconfirm, message, Input, Avatar } from 'antd';

// import { Api } from '../../shared/variable'
// import LayoutUser from '../LayoutUser'
//import ItemForm from './ItemForm'
import ItemMultiEditForm from './ItemMultiEditForm'

class ItemMultiEdit extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        
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
            let count = 0
            for(let value in values){
                if(values[value] == undefined){
                    delete values[value]
                }
                if(values.hasOwnProperty(value)){
                    count ++
                }
            }
            console.log(values)
            console.log(count)
            if(count > 1){
                Sapp.UxmAdmin.Api.Item.updateItem(values).then((res) => {
                // form.resetFields();
                message.success(res.data)
                this.props.onSubmit()
                }).catch((err) => {
                    message.error(err.response.data.message)
                    // console.log(err)
                })
            }
           
        });
    }

    static defaultProps = {
        id: null,
        onSubmit: ()=>{}
    }

    


    render() {

        return (
            <div>
                <ItemMultiEditForm
                    ref={this.saveFormRef}
                    handleSubmit={this.handleSubmit}                   
                />
            </div>
        );
    }
}

export default ItemMultiEdit;