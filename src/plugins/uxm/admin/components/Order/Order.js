import React, { Component } from "react";
import { inject, observer } from 'mobx-react';
import { Table, Divider, Popconfirm, message, Input, Avatar,Drawer,Icon, Menu, Dropdown  } from 'antd';

// import { Api } from '../../shared/variable'
// import LayoutUser from '../LayoutUser'
//import ItemForm from './ItemForm'
import ItemForm from './OrderForm'

class Item extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: {},
            visible: true
         
        }
    }

    componentDidMount() {

        if(this.props.id) {
            Sapp.UxmAdmin.Api.Order.show(this.props.id).then((res) => {
                console.log(res);
                
                this.setState({
                    item: res.data.data
                })
            }).catch((err) => {
                console.log(err)
            })
        }
        
       
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        if(nextProps.id) {
            Sapp.UxmAdmin.Api.Order.show(nextProps.id).then((res) => {
                //console.log(res.data.data);
                
                this.setState({
                    item: res.data.data
                })
            }).catch((err) => {
                // console.log(err)
            })
        }else{
            this.setState({
                item: {}
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

    // onClose = () => {
    //     this.setState({
    //       visible: false,
    //     });
    //     this.props.history.push('/items')
    //   };

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
            Sapp.UxmAdmin.Api.Item.save(values, this.state.item._id).then((res) => {
                // form.resetFields();
                message.success(res.data.message)
                this.props.onSubmit()
                this.setState({
                    item: {}
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
        console.log(item);
        
        return (
            <div>
                <ItemForm
                    ref={this.saveFormRef}
                    item={this.state.item}
                    handleSubmit={this.handleSubmit}  
                />
         
            </div>
        );
    }
}

export default Item;