import React from 'react'
import { Button, Modal, Form, Input, Radio, Select, Upload, Icon} from 'antd';
import {
	message
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
const FormItem = Form.Item;

class FormC extends React.Component {
    componentDidMount() {
    }

    handleSubmit = (e) => {
      e.preventDefault();
  
      this.props.form.validateFields((err, values) => {
        if (!err) {
           // console.log('Received values of form: ', values);
        }  
		Sapp.UxmAdmin.Api.Asin.asinImport(values).then((res)=>{
			message.success('Asin Import successfully ')
			this.props.onSubmit()
          })
      });
    }
  
    static defaultProps = {
        handleFormSubmit: function(){}
    }
    

	
	render() {
		
		const { visible, onCancel, onCreate, form, item ,keywordGroup} = this.props;
		const { getFieldDecorator } = this.props.form;
		// const itemCategoriesList = Sapp.Util.objValue(itemCategories, ['results'], [])
		//console.log(keywordGroup);
		
		return (

				<Form onSubmit={this.handleSubmit} className="compact horizontal" >

					<FormItem label="Asin">
						{getFieldDecorator('asin', {
							rules: [{ required: true, message: 'Please input your asin!' }],
						})(
						<Input/>
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
