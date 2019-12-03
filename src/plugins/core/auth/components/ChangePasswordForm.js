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
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const Id = Sapp.Auth.getUserID()
                values.id = Id
                this.props.handleLoaderChange(true)
                Sapp.Auth.changePassword(values).then((response) => {
                    console.log(values);
                    
                    this.props.handleLoaderChange(false)
                    message.success(response.data.message);
                    Sapp.Auth.logout()
                    this.props.history.push('/login')
                }).catch((error) => {
                    //console.log(error)
                    this.props.handleLoaderChange(false)
                    message.error(error.response.data.message);

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
                    <h3>Change Password</h3>
                </div>
                <FormItem>
				{getFieldDecorator('passwordOld', { rules: [{ required: true, message: Sapp.Auth.translate("changepasswordform.oldpass.required") }], })(
				<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder={Sapp.Auth.translate("changepasswordform.oldpass.placeholder")} /> )}
				</FormItem>
                <FormItem>
				{getFieldDecorator('password', { rules: [{ required: true,  message: Sapp.Auth.translate("changepasswordform.newpass.required") }], })(
				<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder={Sapp.Auth.translate("changepasswordform.newpass.placeholder")} /> )}
				</FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                    {Sapp.Auth.translate("changepasswordform.btn.submit")}
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const UserLogin = Form.create()(NormalForm);

export default UserLogin;
