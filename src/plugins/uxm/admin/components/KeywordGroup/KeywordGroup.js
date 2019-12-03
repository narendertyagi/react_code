import React, { Component } from "react";
import { inject, observer } from 'mobx-react';
import { Table, Divider, Popconfirm, message, Input, Avatar } from 'antd';

// import { Api } from '../../shared/variable'
// import LayoutUser from '../LayoutUser'
//import ItemForm from './ItemForm'
import KeywordGroupForm from './KeywordGroupForm'

class PaymentMethod extends Component {
    constructor(props) {
        super(props)
        this.state = {
            keywordGroup: {},
        }
    }

    componentDidMount() {
        if(this.props.id){
            Sapp.UxmAdmin.Api.KeywordGroup.show(this.props.id).then((res) => {
                this.setState({
                    keywordGroup: res.data.data
                })
        })
    }
}

    componentWillReceiveProps(nextProps){
        if(nextProps.id) {
            Sapp.UxmAdmin.Api.KeywordGroup.show(nextProps.id).then((res) => {
                this.setState({
                    keywordGroup: res.data.data
                })
            }).catch((err) => {
                // console.log(err)
            })
        }else{
            this.setState({
                keywordGroup: {}
            })
        }
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
            Sapp.UxmAdmin.Api.KeywordGroup.save(values, this.state.keywordGroup._id).then((res) => {
                // form.resetFields();
                message.success(res.data.message)
                this.props.onSubmit()
                this.setState({
                    keywordGroup: {}
                })
            }).catch((err) => {
                message.error(err.response.data.message)
                // console.log(err)
            })
        });
    }

    render() {

        const {item} = this.state


        return (
            <div>
                <h5>Add </h5>
                <KeywordGroupForm
                    ref={this.saveFormRef}
                    item={this.state.keywordGroup}
                    handleSubmit={this.handleSubmit}                   
                />
            </div>
        );
    }
}

export default PaymentMethod;