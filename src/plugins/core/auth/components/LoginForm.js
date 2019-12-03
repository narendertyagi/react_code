import React from 'react'
import { Link } from 'react-router-dom'
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

class NormalLoginForm extends React.Component {
	componentDidMount() {
	
	}

	static defaultProps = {
		forgotPasswordLink: '/forgot_password',
		registerLink: '/register',
		onSuccess: function(){},
		onFail: function(){},
	}

	// grecaptchaExecute() {
	// 	return new Promise(function(resolve, reject) {
	// 		grecaptcha.ready(function() {
	// 			grecaptcha.execute('6LdG5nsUAAAAADta5qckGzDRgUIdi6FtbF6vsN_R', {action: 'action_name'})
	// 			.then(function(token) {
	// 				// console.log(token)
	// 				// Verify the token on the server.
	// 				resolve(token)
	// 			})
	// 		});
	// 	})
	// }

	 handleSubmit =  async(e) => {
		e.preventDefault();
		// const token = await Sapp.UxmShared.grecaptchaExecute()
		//  console.log('aa', token)
		this.props.form.validateFields((err, values) => {
			// if (!err) {
				//console.log(values)
				// values['captcha_token'] = token
				this.props.handleLoaderChange(true)
				Sapp.Auth.attempt(values).then(async (response) => {
					this.props.handleLoaderChange(false)
					this.props.onSuccess(response)
				}).catch((error) => {
					this.props.handleLoaderChange(false)
					message.error(error.response.data.message);
					this.props.onFail(error)
				});
				// console.log('Received values of form: ', values);
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
					<h3>{Sapp.Auth.translate('loginform.text')}</h3>
				</div>
				<FormItem>
					{getFieldDecorator('username', { 
						rules: [{ required: true, message: Sapp.Auth.translate('loginform.email.required') }], 
						// initialValue: 'khanakia@theuxm.com'
					})(
					<Input  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={Sapp.Auth.translate('loginform.email.placeholder')}/> )}
				</FormItem>
				<FormItem>
					{getFieldDecorator('password', { 
						rules: [{ required: true, message: Sapp.Auth.translate('loginform.pass.required') }], 
						// initialValue: 'admin'
					})(
					<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder={Sapp.Auth.translate('loginform.pass.placeholder')} /> )}
				</FormItem>
				<FormItem>
					{/*{getFieldDecorator('remember', { valuePropName: 'checked', initialValue: true, })(
					<Checkbox>Remember me</Checkbox>
					)}*/}
					<Link className="login-form-forgot" to={this.props.forgotPasswordLink}>{Sapp.Auth.translate('loginform.btn.forgot')}</Link>
					<Button type="primary" htmlType="submit" className="login-form-button">
						{Sapp.Auth.translate('loginform.btn.submit')}
					</Button>
					{Sapp.Auth.config.allowRegistration ?
						<Link className="" to={this.props.registerLink}>{Sapp.Auth.translate('loginform.btn.register')}</Link> : null
					}
				</FormItem>
			</Form>
		);
	}
}

const UserLogin = Form.create()(NormalLoginForm);

export default UserLogin;
