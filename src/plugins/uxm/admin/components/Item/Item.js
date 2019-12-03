import React, { Component } from "react";
import { inject, observer } from 'mobx-react';
import { Table, Divider, Popconfirm, message, Input, Avatar,Drawer } from 'antd';

// import { Api } from '../../shared/variable'
// import LayoutUser from '../LayoutUser'
//import ItemForm from './ItemForm'
import ItemForm from './ItemForm'

class Item extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: {},
            visible: true,
            itemList: []
         
        }
    }

    componentDidMount() {
        if(this.props.id) {
            Sapp.UxmAdmin.Api.Item.show(this.props.id).then((res) => {
                console.log(res);
                if(this.props.copy){
                   delete res.data.data._id
                }
                this.setState({
                    item: res.data.data
                })
            }).catch((err) => {
                console.log(err)
            })
        }


        Sapp.UxmAdmin.Api.Item.list().then((res) => {
            //console.log(res);
             
             this.setState({
             itemList: res.data.data
             })
         }).catch((err) => {
             console.log(err)
         })
        
       
    }
    componentWillReceiveProps(nextProps){
       // console.log(nextProps)
        if(nextProps.id) {
            Sapp.UxmAdmin.Api.Item.show(nextProps.id).then((res) => {
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

    handleSubmit = (e, itemsArray) => {
        e.preventDefault()
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            if(values.itemType == 'bundle'){                
                values.bundleItems = itemsArray
            }


            //console.log('Received values of form: ', values);
            // values['description'] = description
            // values['user'] = this.state.item.user
            Sapp.UxmAdmin.Api.Item.save(values, this.state.item._id).then((res) => {
                // form.resetFields();
                //  console.log(res);
                message.success(res.data.message)
                // console.log(this.props);
                
                this.props.onSubmit()   
                //  console.log(this.props);
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

        const {item, itemList} = this.state
        if(itemList.length == 0)
        return <div>Loading... </div>
        return (
            <div>
                <ItemForm
                    ref={this.saveFormRef}
                    item={item}
                    handleSubmit={this.handleSubmit}  
                    itemList={itemList}
                />
         
            </div>
        );
    }
}

export default Item;