import React from 'react'
import { message, Button, Modal, Form, Input, Radio, Select, Upload, Icon} from 'antd';
const FormItem = Form.Item;



class OrderForm extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		
    }
    
	render() {
		// console.log(this.props)
		const { visible, onCancel, onCreate, form, user } = this.props;
        const { getFieldDecorator } = this.props.form;
		
		return (
            <Form onSubmit={this.props.handleSubmit}  className="formDefault" >
                <FormItem label="Status">
                    {getFieldDecorator('status', {
                    rules: [{ required: true, message: 'Please input the status!' }],
                    initialValue: user.status.toString(), 
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

const FormDefault = Form.create()(OrderForm);

export default FormDefault;
