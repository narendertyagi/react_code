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
		onSuccess: function(){},
		onFail: function(){},
	}

    handleSubmit =  async(e) => {
		e.preventDefault();
		// const token = await Sapp.UxmShared.grecaptchaExecute()
		//  console.log('aa', token)
		this.props.form.validateFields((err, values) => {
			// if (!err) {
				// console.log(values)
                // values['captcha_token'] = token
                this.props.handleLoaderChange(true)
                Sapp.Auth.forgotPassword(values).then((response) => {
                    // console.log(response)
                    this.props.handleLoaderChange(false)
                    this.props.onSuccess(response.data.data)
                }).catch((error) => {
                    this.props.handleLoaderChange(false)
                    message.error(error.response.data.message)
                    this.props.onFail(error)

                });
				// console.log('Received values of form: ', values);
			// }
		});
	}

    // handleSubmit = async(e) => {
    //     e.preventDefault();
	// 	const token = await Sapp.UxmShared.grecaptchaExecute()
	// 	 console.log('aa', token)
	// 	this.props.form.validateFields((err, values) => {
	// 		// if (!err) {
	// 			console.log(values)
				
    //             Sapp.Auth.forgotPassword(values).then((response) => {
    //                 console.log(response)
    //                 // this.props.history.push('/')
    //                 this.props.onSuccess(response.data.data)
    //             }).catch((error) => {
    //                 console.log(error.response)
    //                  message.error(error.response.data.message)
    //                 this.props.onFail(error)

    //             });
    //             // console.log('Received values of form: ', values);
    //       //  }
    //     });
    // }
    render() {
        // console.log(this.props)
        const {
            getFieldDecorator
        } = this.props.form;
        return (

            <Form onSubmit={this.handleSubmit} className="login-form">
                <div>
                    <h3>   {Sapp.Auth.translate("forgotform.text")}</h3>
                </div>
               
                <FormItem>
                    {getFieldDecorator('email', { rules: [{ required: true, message: 'Please input your email!' }], })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder=  {Sapp.Auth.translate("forgotform.email.placeholder")} /> )}
                </FormItem>    
               
                <FormItem>
                    {/*{getFieldDecorator('remember', { valuePropName: 'checked', initialValue: true, })(
                    <Checkbox>Remember me</Checkbox>
                    )}
                    <a className="login-form-forgot" href="">Forgot password</a>*/}
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        {Sapp.Auth.translate("forgotform.btn.submit")}
                    </Button>
                </FormItem>
            </Form>

        );
    }
}

const UserLogin = Form.create()(NormalForm);

export default UserLogin;
