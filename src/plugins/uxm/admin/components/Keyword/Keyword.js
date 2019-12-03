import React, { Component } from "react";
import { inject, observer } from 'mobx-react';
import { Table, Divider, Popconfirm, message, Input, Avatar } from 'antd';

// import { Api } from '../../shared/variable'
// import LayoutUser from '../LayoutUser'
//import ItemForm from './ItemForm'
import KeywordForm from './KeywordForm'

class PaymentMethod extends Component {
    constructor(props) {
        super(props)
        this.state = {
            keyword: {} ,    
            keywordGroup: []
        }
    }

    componentDidMount() {
        if(this.props.id){
            Sapp.UxmAdmin.Api.Keyword.show(this.props.id).then((res) => {                
                this.setState({
                    keyword: res.data.data
                })
            })
        }   

        Sapp.UxmAdmin.Api.KeywordGroup.list().then((res) => {            
            this.setState({
                keywordGroup: res.data.data
            })
        }).catch((err) => {
            // console.log(err)
        })
        
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        if(nextProps.id) {
            Sapp.UxmAdmin.Api.Keyword.show(nextProps.id).then((res) => {
                console.log(res.data.data);
                
                this.setState({
                    keyword: res.data.data
                })
            }).catch((err) => {
                // console.log(err)
            })
        }else{
            this.setState({
                keyword: {}
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
            Sapp.UxmAdmin.Api.Keyword.save(values, this.state.keyword._id).then((res) => {
                // form.resetFields();
                message.success(res.data.message)
                this.props.onSubmit()
                this.setState({
                    keyword: {}
                })
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

        const {item} = this.state
//console.log(item);

        return (
            <div>
                <KeywordForm
                    ref={this.saveFormRef}
                    item={this.state.keyword}
                    keywordGroup={this.state.keywordGroup}
                    handleSubmit={this.handleSubmit}                   
                />
            </div>
        );
    }
}

export default PaymentMethod;