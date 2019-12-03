import React from 'react'
import { Button, Modal, Form, Input, Radio, Select, Upload, InputNumber, Checkbox} from 'antd';
import {
	message
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
const FormItem = Form.Item;

class FormC extends React.Component {
    state = {
		cost: null,
		gstPercent: null,
        isInclusive: null,
        checkbox: {
            title: true,
            cost: true,
			tag: true,
			packagingCost: true,
			laborCost: true,
			transportationCost: true,
			totalCost: true
        }
        
	}
	static defaultProps = {
		item: {}
    }
    

    handleCostChange = (value) =>{
		let form =this.props.form
		let gstPercent = form.getFieldValue('gst')
		let isInclusive = form.getFieldValue('isGstInclusive')
		this.setState({
			cost:value,
			gstPercent,
			isInclusive
		})
		this.calculateGST(value,gstPercent,isInclusive)
	}

	handleGSTPercentChange = (value) =>{
		let form =this.props.form
		let cost = form.getFieldValue('cost')
		let isInclusive = form.getFieldValue('isGstInclusive')
		this.setState({
			gstPercent:value,
			cost,
			isInclusive
		})
		this.calculateGST(cost,value,isInclusive)

	}

	handleIsInclusiveChange = (value) =>{
		let form =this.props.form
		let cost = form.getFieldValue('cost')
		let gstPercent = form.getFieldValue('gst')
		this.setState({
			isInclusive:value,
			gstPercent,
			cost
		})
		this.calculateGST(cost,gstPercent,value)
	}
	
	calculateGST = (cost,gstPercent,isInclusive) =>{
		let form = this.props.form
		if(cost && gstPercent && isInclusive){
			if(isInclusive=="true"){
				let	costBeforeGST = (cost*100)/(100+gstPercent)
				let gstCost = cost - costBeforeGST
				form.setFieldsValue({'gstCost':(gstCost).toFixed(2)})
				
			}else{
				let	gstCost = (cost/100)*gstPercent;
				form.setFieldsValue({'gstCost':(gstCost).toFixed(2)})
			}

		}
    }
    
    handleCheckboxChange= (e, field) =>{
        this.setState({
            checkbox: Object.assign({}, this.state.checkbox, {[field]: !e.target.checked})
		})
		if(!e.target.checked){
			this.props.form.resetFields();
		}
    }

	
	render() {
		const { visible, onCancel, onCreate, form, item ,items} = this.props;
		const { getFieldDecorator } = this.props.form;
		
		return (

				<Form onSubmit={this.props.handleSubmit} className="compact horizontal" >
                    <FormItem label={<span><Checkbox onChange={(e)=>this.handleCheckboxChange(e, 'title')}>Title</Checkbox></span>}>
						{getFieldDecorator('title', {
						rules: [{ required: !this.state.checkbox.title, message: 'Please input the  title!' }],
						initialValue : item.title
						})(
                        <span>
                            <Input  disabled={this.state.checkbox.title}/>
                        </span>
						)}
					</FormItem>
                    <FormItem label={<span><Checkbox onChange={(e)=>this.handleCheckboxChange(e, 'cost')}>Cost</Checkbox></span>}>
						{getFieldDecorator('cost', {
						rules: [{ required: !this.state.checkbox.cost, message: 'Please input the cost!' }],
						initialValue : item.cost,
					
						})(
						<InputNumber   disabled={this.state.checkbox.cost}	onChange= {this.handleCostChange }/>
						)}
					</FormItem>
                    <FormItem label="Gst">
						{getFieldDecorator('gst', {
						rules: [{ required: !this.state.checkbox.cost, message: 'Please input the gst!' }],
						initialValue : item.gst,
					
						})(
						<InputNumber   disabled={this.state.checkbox.cost}	onChange= {this.handleGSTPercentChange} />
						)}
					</FormItem>
				
					<FormItem label="Gst Inclusive">
						{getFieldDecorator('isGstInclusive', {
						rules: [{ required: !this.state.checkbox.cost, message: 'Please input  isGstInclusive!' }],
						initialValue : item.isGstInclusive,
						
						})(
							<Select
								key={Math.random(3)}
								showSearch
								style={{ width: '100%' }}
								placeholder="is gst inclusive"
								optionFilterProp="children"
								onChange= {this.handleIsInclusiveChange}
                                disabled={this.state.checkbox.cost}
								filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
							>
							
							{/* <Select.Option key={null} value={null}>{'Select'}</Select.Option> */}
								{/* {keywordGroup.map(d => <Select.Option key={d._id}>{d.title}</Select.Option>)} */}
								<Select.Option key={1} value="true">True</Select.Option>
								<Select.Option key={1} value="false">False</Select.Option>
								
								
							</Select>
						)}
					</FormItem>
					
					<FormItem label="Gst cost">
						{getFieldDecorator('gstCost', {
						rules: [{ required: false, message: 'Please input the gstCost!' }],
						initialValue : item.gstCost,
						})(
						<InputNumber disabled  />
						)}
					</FormItem>
					<FormItem label={<span><Checkbox onChange={(e)=>this.handleCheckboxChange(e, 'packagingCost')}>Packaging Cost</Checkbox></span>}>
						{getFieldDecorator('packagingCost', {
						rules: [{ required: !this.state.checkbox.packagingCost, message: 'Please input the packagingCost!' }],
						initialValue : item.packagingCost
						})(
						<InputNumber disabled={this.state.checkbox.packagingCost}  />
						)}
					</FormItem>
					<FormItem label={<span><Checkbox onChange={(e)=>this.handleCheckboxChange(e, 'laborCost')}>Labor Cost</Checkbox></span>}>
						{getFieldDecorator('laborCost', {
						rules: [{ required: !this.state.checkbox.laborCost, message: 'Please input the laborCost!' }],
						initialValue : item.laborCost 
						})(
						<InputNumber disabled={this.state.checkbox.laborCost}  />
						)}
					</FormItem>
					<FormItem label={<span><Checkbox onChange={(e)=>this.handleCheckboxChange(e, 'transportationCost')}>Transportation Cost</Checkbox></span>}>
						{getFieldDecorator('transportationCost', {
						rules: [{ required: !this.state.checkbox.transportationCost, message: 'Please input the transportationCost!' }],
						initialValue : item.transportationCost 
						})(
						<InputNumber disabled={this.state.checkbox.transportationCost}  />
						)}
					</FormItem>
					<FormItem label={<span><Checkbox onChange={(e)=>this.handleCheckboxChange(e, 'totalCost')}>Total Cost</Checkbox></span>}>
						{getFieldDecorator('totalCost', {
						rules: [{ required: !this.state.checkbox.totalCost, message: 'Please input the totalCost!' }],
						initialValue : item.totalCost 
						})(
						<InputNumber disabled={this.state.checkbox.totalCost}  />
						)}
					</FormItem>
                    <FormItem label={<span><Checkbox onChange={(e)=>this.handleCheckboxChange(e, 'tag')}>Tags</Checkbox></span>}>
						{getFieldDecorator('tag', {
						rules: [{ required: !this.state.checkbox.tag, message: 'Please input the  tag!' }],
						initialValue : item.tag
						})(
						<Input disabled={this.state.checkbox.tag} />
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
