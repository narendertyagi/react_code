import React from 'react'
import { Button, Modal, Form, Input, Radio, Select, Upload, Icon} from 'antd';
import {
	message
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
const FormItem = Form.Item;

class FormC extends React.Component {

	static defaultProps = {
		item: {}
	}
	
	render() {
		
		const { visible, onCancel, onCreate, form, item } = this.props;
		const { getFieldDecorator } = this.props.form;
		
		return (

				<Form onSubmit={this.props.handleSubmit} className="compact horizontal" >
					<FormItem label="Title">
						{getFieldDecorator('title', {
						rules: [{ required: true, message: 'Please input the title of PaymentMethod!' }],
						initialValue : item.title
						})(
						<Input  />
						)}
					</FormItem>
					<FormItem>
						<Button type="primary" htmlType="submit" className="login-form-button">
							Submit
						</Button>
					</FormItem> 
				</Form>
			

		);
	}
}

const FormDefault = Form.create()(FormC);

export default FormDefault;
