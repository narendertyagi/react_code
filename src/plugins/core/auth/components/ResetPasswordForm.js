import React from 'react'
import {
    Form,
    Icon,
    Input,
    Button,
    Checkbox,
    message
} from 'antd';


// import Auth from '../'
const FormItem = Form.Item;

class NormalForm extends React.Component {

    static defaultProps = {
        id: null,
        code: null,
    }
    
    handleSubmit = async(e) => {
        e.preventDefault();
		// const token = await Sapp.UxmShared.grecaptchaExecute()
		//console.log('aa', token)
        this.props.form.validateFields((err, values) => {
          //  if (!err) {
                //console.log(values)
                values.id = this.props.id
                // values['captcha_token'] = token
                this.props.handleLoaderChange(true)
                Sapp.Auth.resetPassword(values).then(async(response) => {
                    message.success('Password reset successfully.');
                    this.props.handleLoaderChange(false)
                    this.props.history.push('/login')
                }).catch((error) => {
                    this.props.handleLoaderChange(false)
                    message.error(error.response.data.message);

                });
                //console.log('Received values of form: ', values);
           // }
        });
    }
    render() { 
        const {
            getFieldDecorator
        } = this.props.form;
        return (

            <Form onSubmit={this.handleSubmit} className="login-form">
                <div>
                    <h3>Reset Password</h3>
                </div>
               
                <FormItem>
                    {getFieldDecorator('resetToken', { rules: [{ required: true, message: 'Please input your Token!'}],initialValue: this.props.code ? this.props.code : null })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Token" /> )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', { rules: [{ required: true, message: 'Please input your New Password!' }], })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Password" /> )}
                </FormItem>
               
                <FormItem>
                    {/*{getFieldDecorator('remember', { valuePropName: 'checked', initialValue: true, })(
                    <Checkbox>Remember me</Checkbox>
                    )}
                    <a className="login-form-forgot" href="">Forgot password</a>*/}
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Reset Password
                    </Button>
                </FormItem>
            </Form>

        );
    }
}

const UserLogin = Form.create()(NormalForm);

export default UserLogin;
