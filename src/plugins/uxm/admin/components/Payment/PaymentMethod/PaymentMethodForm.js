import React from 'react'
import { Button, Modal, Form, Input, Radio, Select, Upload, Icon} from 'antd';
import {
	message
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
const FormItem = Form.Item;

// import { Api, config } from '../../shared/variable'
// import {Util} from '../../modules/Helper'
// // import {API_CONFIG} from '../../Constant'
// import Auth from '../../modules/Auth'

class FormC extends React.Component {
	componentDidMount() {
		// if(JApp.Auth.check()) {
		//     this.props.history.push('/dashboard')
		//     return false;
		// }
	}
	normFile = (e) => {
		//console.log('Upload event:', e);
		if (Array.isArray(e)) {
		  return e;
		}
		return e && e.fileList;
	}

	onUploadChange = (obj) => {
		const fileName = Sapp.Util.objValue(obj, ['file', 'response', 'fileName'])
		//console.log(fileName)		
		
		if(fileName) {
			this.props.form.setFieldsValue({
				imageFeatured: fileName,
			});
		}
	}
	render() {
		
		const { visible, onCancel, onCreate, form, item, itemCategories } = this.props;
		const { getFieldDecorator } = this.props.form;

		//console.log(itemCategories)

		const itemCategoriesList = Sapp.Util.objValue(itemCategories, ['results'], [])
		// console.log(JApp.apiHost + JApp.apiEndpoints.admin.upload)
		//console.log(itemCategories);
		
		
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
					<FormItem label="Image Url">
						{getFieldDecorator('imageUrl', {
						rules: [{ required: true, message: 'Please input the title of imageUrl!' }],
						initialValue : item.imageUrl
						})(
						<Input  />
						)}
					</FormItem>
					<FormItem label="Short Description">
						{getFieldDecorator('shortDescription', {
						rules: [{ required: true, message: 'Please input the title of shortDescription!' }],
						initialValue : item.shortDescription
						})(
						<TextArea  />
						)}
					</FormItem>
					<FormItem label="Sort Order">
						{getFieldDecorator('sortOrder', {
						rules: [{ required: true, message: 'Please input the title of sortOrder!' }],
						initialValue : item.sortOrder || 0
						})(
						<Input  />
						)}
					</FormItem>
					<FormItem label="Display Status">
                    {getFieldDecorator('status', {
                    rules: [{ required: true, message: 'Please input the permission of Display!' }],
                    initialValue: item.status == true ? "true" : "false",  
                    })(
                        <Select
                            key={Math.random(3)}
                            showSearch
                            style={{ width: "100%" }}
                            placeholder="Select Status"
                            optionFilterProp="children"
                            // onChange={this.handleChange}
                        
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Select.Option key={1} value="true">True</Select.Option>
                            <Select.Option key={2} value="false">False</Select.Option>
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
