import React from 'react'
import { message, Button, Modal, Form, Input, Radio, Select, Upload, Icon, InputNumber} from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;

class ItemSelector extends React.Component {
	constructor(props) {
		super(props)
	    this.state = { 
            value: null
		}
	}
	componentDidMount() {
    }

    handleChange(value, uuid, fn) {
        fn(uuid, value)
      }
    

	render() {
        const {itemDropdown, item, uuid} = this.props
        // console.log(itemDropdown)
		return (				
            <span>                   
                <Select
                showSearch
                style={{ width: 300 }}
                placeholder="Select a Item"
                optionFilterProp="children"
                onChange={(value)=>this.handleChange(value, uuid, this.props.updateItems)}
                defaultValue= {item}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    {itemDropdown.map(d => <Select.Option key={d._id}>{`${d.sku} - ${d.title}`}</Select.Option>)}
                </Select>
            </span>
		);
	}
}


export default ItemSelector;