import React, { Component } from "react";
import { inject, observer } from 'mobx-react';
import { Table, Divider, Popconfirm, message, Input, Avatar } from 'antd';

// import { Api } from '../../shared/variable'
// import LayoutUser from '../LayoutUser'
//import ItemForm from './ItemForm'
import PaymentMethodForm from './PaymentMethodForm'

class PaymentMethod extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: {},
            itemCategories: []
         
        }
    }

    componentDidMount() {

        if(this.props.match.params.id) {
            Sapp.UxmAdmin.Api.PaymentMethod.show(this.props.match.params.id).then((res) => {
                this.setState({
                    item: res.data.data
                })
            }).catch((err) => {
                // console.log(err)
            })
        }
        
        Sapp.UxmAdmin.Api.PaymentMethod.list().then((res) => {
            this.setState({
                itemCategories: res.data.data
            })
        }).catch((err) => {
            // console.log(err)
        })

        // Japp.UxmAdmin.Api.ItemCategory.list().then((res) => {
        //     this.setState({
        //         optimizations: res.data.data.results
        //     })
        // }).catch((err) => {
        //     console.log(err)
        // })
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

            //console.log('Received values of form: ', values);
            // values['description'] = description
            // values['user'] = this.state.item.user
            Sapp.UxmAdmin.Api.PaymentMethod.save(values, this.state.item._id).then((res) => {
                // form.resetFields();
                message.success(res.data.message)
                 this.props.history.push('/paymentmethod')
            }).catch((err) => {
                message.error(err.response.data.message)
                // console.log(err)
            })
        });
    }


    render() {

        const {item} = this.state
//console.log(item);

        return (
            <div>
                <h5>Add </h5>
                <PaymentMethodForm
                    ref={this.saveFormRef}
                    item={this.state.item}
                    itemCategories={this.state.itemCategories}
                    handleSubmit={this.handleSubmit}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    
                    
                />

            </div>
        );
    }
}

export default PaymentMethod;