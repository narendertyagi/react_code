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
const qs = require('query-string');
// import Auth from '../'
const FormItem = Form.Item;
class NormalForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.handleLoaderChange(true)
                // console.log(values);
                
                Sapp.Auth.register(values).then(async (response) => {
                    this.props.handleLoaderChange(false)
                    message.success('Successfully registered.');
                    await Sapp.Auth.login(response.data.data)
                    axios.defaults.headers.common['Authorization'] = Sapp.Auth.getAuthorizationHeader()
                    const qparam = qs.parse(this.props.location.search);
                    this.props.history.push(qparam.redirect || '/')
                    //this.props.history.push('/login')
                }).catch((error) => {
                    console.log(error);
                    
                    this.props.handleLoaderChange(false)
                    message.error('Invalid Login');

                });
                // console.log('Received values of form: ', values);
            }
        });
    }
    render() {
        // console.log(this.props)
        const {
            getFieldDecorator
        } = this.props.form;
        return (

            <Form onSubmit={this.handleSubmit} className="login-form">
                <div>
                    <h3>Registration</h3>
                </div>
                <FormItem>
                    {getFieldDecorator('firstName', { rules: [{ required: true, message: 'Please input your firstname!' }], })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="First Name" /> )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('lastName', { rules: [{ required: true, message: 'Please input your lastname!' }], })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Last Name" /> )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('email', { rules: [{ required: true, message: 'Please input your email!' }], })(
                    <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" /> )}
                </FormItem>
                <FormItem>
				{getFieldDecorator('password', { rules: [{ required: true, message: 'Please input your Password!' }], })(
				<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" /> )}
                </FormItem>
                <FormItem>
                    {/*{getFieldDecorator('remember', { valuePropName: 'checked', initialValue: true, })(
                    <Checkbox>Remember me</Checkbox>
                    )}
                    <a className="login-form-forgot" href="">Forgot password</a>*/}
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Register
                    </Button>
                </FormItem>
            </Form>

        );
    }
}

const UserLogin = Form.create()(NormalForm);

export default UserLogin;
