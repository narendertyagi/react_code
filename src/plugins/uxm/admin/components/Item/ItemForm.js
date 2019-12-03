import React from 'react'
import { Button, Modal, Form, Input, Radio, Select, Upload, Icon,InputNumber} from 'antd';
import moment from 'moment';
import {
	message
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
const FormItem = Form.Item;
import ItemCloning from './ItemCloning'



class FormC extends React.Component {
	state = {
		cost: null,
		gstPercent: null,
		isInclusive: null,
		itemType: Sapp.Util.objValue(this.props, ['item','itemType'], null),
		itemsArray: Sapp.Util.objValue(this.props, ['item','bundleItems'], []),
		bundleCost: Sapp.Util.objValue(this.props, ['item','bundleItems'], []).length > 0 ? Sapp.Util.objValue(this.props, ['item','bundleItems'], []).reduce((sum, item)=> {return sum + Sapp.Util.objValue(item, ['itemDetail','cost'],0) }, 0) : 0
	}
	componentDidMount() {
	
	}
	static defaultProps = {

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
		 console.log(isInclusive);

		if(cost && gstPercent && isInclusive){
			// console.log(isInclusive);
			
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

	// handelAvailableQty= (value)=>{
	// 	console.log(value);
	// 	let form =this.props.form
	// 	form.setFieldsValue({'lastQtyUpdated':new Date()})
		
	// }

	handleChange = (value) => {
		this.setState({
			itemType: value
		})
	}

	updateItemsArray = (itemsArray) => {
		let bundleCost = itemsArray.reduce((sum, item)=> {return sum + Sapp.Util.objValue(item, ['itemDetail','cost'],0) }, 0) 
		this.setState({itemsArray, bundleCost})
	}

	render() {
		
		const { item, itemList } = this.props;
		const { getFieldDecorator } = this.props.form;
		const { itemType, itemsArray } =  this.state
		console.log(this.state.lastQtyUpdated)
		console.log(Sapp.Util.objValue(this.props, ['item','bundleItems'], []).length)
		return (
				
				<Form onSubmit={(e)=>this.props.handleSubmit(e, this.state.itemsArray)} className="compact horizontal" >
					{/* <FormItem label="Asin">
						{getFieldDecorator('asin', {
						rules: [{ required: true, message: 'Please input the title of item!' }],
						initialValue : item.asin
						})(
						<Input  />
						)}
					</FormItem> */}
					<FormItem label="Id">						
						<Input disabled value={item._id}/>
					</FormItem>
					<FormItem label="Title">
						{getFieldDecorator('title', {
						rules: [{ required: true, message: 'Please input the  title!' }],
						initialValue : item.title
						})(
						<Input  />
						)}
					</FormItem>

					<FormItem label="Item Type">
						{getFieldDecorator('itemType', {
						rules: [{ required: true, message: 'Please input itemType!' }],
						initialValue : item.itemType == "bundle" ? "bundle" : "single"
						
						})(
							<Select
								key={Math.random(3)}
								showSearch
								style={{ width: '100%' }}
								// placeholder=" Select item type"
								optionFilterProp="children"
								onChange= {this.handleChange}
								filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
							>
							
							{/* <Select.Option key={null} value={null}>{'Select'}</Select.Option> */}
								{/* {keywordGroup.map(d => <Select.Option key={d._id}>{d.title}</Select.Option>)} */}
								<Select.Option key={1}  value="single">Single</Select.Option>
								<Select.Option key={1}  value="bundle">Bundle</Select.Option>
								
								
								
							</Select>
						)}
					</FormItem>
					{itemType == 'bundle' ? <ItemCloning itemDropdown={itemList} itemsArray={itemsArray} updateItemsArray={(itemsArray)=>this.updateItemsArray(itemsArray)}/>: null}
				
					<FormItem label="Sku">
						{getFieldDecorator('sku', {
						rules: [{ required: true, message: 'Please input the sku!' }],
						initialValue : item.sku
						})(
						<Input  />
						)}
					</FormItem>
					<FormItem label="Cost">
						{getFieldDecorator('cost', {
						rules: [{ required: true, message: 'Please input the cost!' }],
						initialValue : item.cost == null ? 0 : item.cost,
					
						})(
							<span>
								<InputNumber onChange= {this.handleCostChange }/>
								{itemType == 'bundle' ? <label style={{marginLeft: 10, color: 'grey'}}>Bundle cost: {this.state.bundleCost}</label> : null}
							</span>
						)}
					</FormItem>
					<FormItem label="Gst">
						{getFieldDecorator('gst', {
						rules: [{ required: true, message: 'Please input the gst!' }],
						initialValue : item.gst == null ? 0 : item.gst,
					
						})(
						<InputNumber  	onChange= {this.handleGSTPercentChange} />
						)}
					</FormItem>
				
					<FormItem label="Gst Inclusive">
						{getFieldDecorator('isGstInclusive', {
						rules: [{ required: true, message: 'Please input  isGstInclusive!' }],
						initialValue : item.isGstInclusive == "true" ? "True" : "False"  ,
						
						})(
							<Select
								key={Math.random(3)}
								showSearch
								style={{ width: '100%' }}
								placeholder="is gst inclusive"
								optionFilterProp="children"
								onChange= {this.handleIsInclusiveChange}
							
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
						initialValue : item.gstCost == null ? 0 : item.gstCost,
						})(
						<InputNumber disabled  />
						)}
					</FormItem>
					<FormItem label="Packaging Cost">
						{getFieldDecorator('packagingCost', {
						rules: [{ required: true, message: 'Please input the packagingCost!' }],
						initialValue : item.packagingCost == null ? 0 : item.packagingCost
						})(
						<InputNumber  />
						)}
					</FormItem>
					<FormItem label="Labor Cost">
						{getFieldDecorator('laborCost', {
						rules: [{ required: true, message: 'Please input the laborCost!' }],
						initialValue : item.laborCost == null ? 0 : item.laborCost
						})(
						<InputNumber  />
						)}
					</FormItem>
					<FormItem label="Transportation Cost">
						{getFieldDecorator('transportationCost', {
						rules: [{ required: true, message: 'Please input the transportationCost!' }],
						initialValue : item.transportationCost == null ? 0 : item.transportationCost
						})(
						<InputNumber  />
						)}
					</FormItem>
					<FormItem label="Total Cost">
						{getFieldDecorator('totalCost', {
						rules: [{ required: true, message: 'Please input the totalCost!' }],
						initialValue : item.totalCost == null ? 0 : item.totalCost
						})(
						<InputNumber  />
						)}
					</FormItem>
					<FormItem label="Available Qty">
						{getFieldDecorator('availableQty', {
						rules: [{ required: false, message: 'Please input the availableQty!' }],
						initialValue : item.availableQty
						})(
						<InputNumber  />
						)}
					</FormItem>
					<FormItem label="Tags">
						{getFieldDecorator('tag', {
						rules: [{ required: false, message: 'Please input the  tag!' }],
						initialValue : item.tag
						})(
						<Input  />
						)}
					</FormItem>
					<FormItem label="Image Uri 1">
						{getFieldDecorator('imageUri1', {
						rules: [{ required: false, message: 'Please input the  imageUri1!' }],
						initialValue : item.imageUri1
						})(
						<Input  />
						)}
					</FormItem>
					<FormItem label="Image Uri 2">
						{getFieldDecorator('imageUri2', {
						rules: [{ required: false, message: 'Please input the imageUri2!' }],
						initialValue : item.imageUri2
						})(
						<Input  />
						)}
					</FormItem>
					<FormItem label="Image Uri 3">
						{getFieldDecorator('imageUri3', {
						rules: [{ required: false, message: 'Please input the imageUri3!' }],
						initialValue : item.imageUri3
						})(
						<Input  />
						)}
					</FormItem>
					<FormItem label="Image Uri 4">
						{getFieldDecorator('imageUri4', {
						rules: [{ required: false, message: 'Please input the imageUri4!' }],
						initialValue : item.imageUri4
						})(
						<Input  />
						)}
					</FormItem>
					<FormItem label="Image Uri 5">
						{getFieldDecorator('imageUri5', {
						rules: [{ required: false, message: 'Please input the  imageUri5!' }],
						initialValue : item.imageUri5
						})(
						<Input  />
						)}
					</FormItem>
					<FormItem label="Note">
						{getFieldDecorator('note', {
						rules: [{ required: false, message: 'Please input the  note!' }],
						initialValue : item.note
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
