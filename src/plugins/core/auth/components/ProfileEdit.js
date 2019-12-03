import React from 'react'
import {
    Form,
    Icon,
    Input,
    Button,
    Checkbox,
    message,
    Select
} from 'antd';
import Loader from '../../../../components/Loader/Loader'

const FormItem = Form.Item;
class NormalForm extends React.Component {
    constructor(props) {
        super(props)
     
    }
    state = {
        user: {},
        loader: false
    }
 
    componentDidMount() {
        this.fetch()
    }

    fetch=() => {
        Sapp.Auth.me().then((res)=> {
            console.log(res)
            this.setState({
                user: res.data.data
            })
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    loader: true
                })
                Sapp.Auth.meUpdate(values).then((response) => {
                    this.setState({
                        loader: false
                    })
                    message.success(response.data.message)
                }).catch((error) => {
                    this.setState({
                        loader: false
                    })
                    message.error('Error on save.');

                });
                // console.log('Received values of form: ', values);
            }
        });
    }
    render() {
        const {user}= this.state
        const {
            getFieldDecorator
        } = this.props.form;
        return (
            <div>
                <Loader show={this.state.loader} />
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <div>
                        <h3>Edit Profile</h3>
                    </div>
                    <FormItem>
                        {getFieldDecorator('firstName', { rules: [{ required: true, message: 'Please input your firstname!' }], initialValue: user.firstName })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="First Name" /> )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('lastName', { rules: [{ required: true, message: 'Please input your lastname!' }], initialValue: user.lastName })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Last Name" /> )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Save
                        </Button>
                    </FormItem>
                </Form>
            </div>

        );
    }
}

const UserLogin = Form.create()(NormalForm);

export default UserLogin;
