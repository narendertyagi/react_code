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
		
		const { visible, onCancel, onCreate, form, item ,keywordGroup} = this.props;
		const { getFieldDecorator } = this.props.form;
		// const itemCategoriesList = Sapp.Util.objValue(itemCategories, ['results'], [])
		console.log(keywordGroup);
		
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

					<FormItem label="Keyword Group">
						{getFieldDecorator('keywordGroup', {
							rules: [],
							initialValue: item.keywordGroup
						})(
							<Select
								key={Math.random(3)}
								showSearch
								style={{ width: '100%' }}
								placeholder="Select a keyword "
								optionFilterProp="children"
								// onChange={this.handleChange}
							
								filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
							>
							
							<Select.Option key={null} value={null}>{'Select'}</Select.Option>
								{keywordGroup.map(d => <Select.Option key={d._id}>{d.title}</Select.Option>)}
								{/* <Select.Option key={1} value="5bb5bced85fa536b17f49381">5bb5bced85fa536b17f49381</Select.Option> */}
								
								
							</Select>
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
