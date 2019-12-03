import React from 'react'
import { Button, Modal, Form, Input, Radio, Select, Upload, Icon,InputNumber} from 'antd';
import {
	message
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
const FormItem = Form.Item;



class FormC extends React.Component {
	componentDidMount() {
	
	}
	static defaultProps = {

    }

	render() {
		
		const { item  } = this.props;
		const { getFieldDecorator } = this.props.form;
		// const scdetails  = Sapp.Util.objValue(item,['scdetail'],[])
		console.log(item);


		return (

				<Form onSubmit={this.props.handleSubmit} className="compact horizontal" >
			
					<FormItem label="Title">
						{getFieldDecorator('title', {
						rules: [{ required: true, message: 'Please input the title of title!' }],
						initialValue : item.title
						})(
						<Input  />
						)}
					</FormItem>
                    <FormItem label="AccountType">
						{getFieldDecorator('AccountType', {
						rules: [{ required: true, message: 'Please input the title of AccountType!' }],
						initialValue : item.AccountType
                    })(
                        <Select
                            key={Math.random(3)}
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Select account type "
                            optionFilterProp="children"
                            // onChange={this.handleChange}
                        
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                        
                        {/* <Select.Option key={null} value={null}>{'Select'}</Select.Option> */}
                            {/* {keywordGroup.map(d => <Select.Option key={d._id}>{d.title}</Select.Option>)} */}
                            <Select.Option key={1} value="Amazon">Amazon</Select.Option>
                            <Select.Option key={1} value="Flipkart">Flipkart</Select.Option>
                            
                            
                            
                        </Select>
                    )}
					</FormItem>
                    <FormItem label="Client Id">
						{getFieldDecorator('clientId', {
						rules: [{ required: false, message: 'Please input clientId!' }],
						initialValue : item.clientId
						})(
						<Input  />
						)}
					</FormItem>
                    <FormItem label="Client SecretKey">
						{getFieldDecorator('clientSecretKey', {
						rules: [{ required: false, message: 'Please input clientSecretKey!' }],
						initialValue : item.clientSecretKey
						})(
						<Input  />
						)}
					</FormItem>
					<FormItem label="Account Code">
						{getFieldDecorator('accountCode', {
						rules: [{ required: false, message: 'Please input accountCode!' }],
						initialValue : item.accountCode
						})(
						<Input  />
						)}
					</FormItem>
                    <FormItem label="Email">
						{getFieldDecorator('email', {
						rules: [{ required: true, message: 'Please input email!' }],
						initialValue : item.email
						})(
						<Input  />
						)}
					</FormItem>
					<FormItem label="Sync inventory">
						{getFieldDecorator('syncInventory', {
						rules: [{ required: true, message: 'Please input syncinventory!' }],
						initialValue : item.syncInventory == "true" ? "true"  : "false",
						 
						
						})(
							<Select
								key={Math.random(3)}
								showSearch
								style={{ width: '100%' }}
								// placeholder=" Select item type"
								optionFilterProp="children"
								filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
							>
							
							{/* <Select.Option key={null} value={null}>{'Select'}</Select.Option> */}
								{/* {keywordGroup.map(d => <Select.Option key={d._id}>{d.title}</Select.Option>)} */}
								<Select.Option key={1}  value="true">True</Select.Option>
								<Select.Option key={1}  value="false">False</Select.Option>
								
								
								
							</Select>
						)}
					</FormItem>
					<FormItem label="Sync order">
						{getFieldDecorator('syncOrder', {
						rules: [{ required: true, message: 'Please input syncOrder!' }],
						initialValue : item.syncOrder == "true" ? "true"  : "false",
						 
						
						})(
							<Select
								key={Math.random(3)}
								showSearch
								style={{ width: '100%' }}
								// placeholder=" Select item type"
								optionFilterProp="children"
								filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
							>
							
							{/* <Select.Option key={null} value={null}>{'Select'}</Select.Option> */}
								{/* {keywordGroup.map(d => <Select.Option key={d._id}>{d.title}</Select.Option>)} */}
								<Select.Option key={1}  value="true">True</Select.Option>
								<Select.Option key={1}  value="false">False</Select.Option>
								
								
								
							</Select>
						)}
					</FormItem>
                    <FormItem label="Merchant">
						{getFieldDecorator('merchant', {
						rules: [{ required: false, message: 'Please input merchant!' }],
						initialValue : item.merchant
						})(
						<Input  />
						)}
					</FormItem>
					<FormItem label="Country">
						{getFieldDecorator('country', {
						rules: [{ required: false, message: 'Please input country!' }],
						initialValue : item.country
						})(
							<Select
								key={Math.random(3)}
								showSearch
								style={{ width: '100%' }}
								placeholder="Select country type "
								optionFilterProp="children"
								// onChange={this.handleChange}
							
								filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
							>
							
							{/* <Select.Option key={null} value={null}>{'Select'}</Select.Option> */}
								{/* {keywordGroup.map(d => <Select.Option key={d._id}>{d.title}</Select.Option>)} */}
								<Select.Option key={1} value="IN">India</Select.Option>
								<Select.Option key={1} value="USA">USA</Select.Option>
								<Select.Option key={1} value="JP">Japan</Select.Option>
								
								
								
							</Select>
						)}
					</FormItem>
					<FormItem label="Cookie">
						{getFieldDecorator('cookie', {
						rules: [{ required: false, message: 'Please input the cookie!' }],
						initialValue : item.cookie
						})(
						<TextArea  />
						)}
					</FormItem>
					 <FormItem label="Remarks">
						{getFieldDecorator('remarks', {
						rules: [{ required: false, message: 'Please input  remarks!' }],
						initialValue : item.remarks
						})(
						<TextArea  />
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
