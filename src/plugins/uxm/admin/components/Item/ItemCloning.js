import React from 'react'
import { message, Button, Modal, Form, Input, Radio, Select, Upload, Icon, InputNumber} from 'antd';
import ItemSelector from './ItemSelector'
const FormItem = Form.Item;
var uuid4 = require('uuid4');
var _ = require('lodash')

class ItemCloning extends React.Component {
	constructor(props) {
		super(props)
	    this.state = { 
            itemsArray: [],
        
		}
    }
    
    static defaultProps = {
        itemDropdown: [],
        updateItemsArray: () => {},
        itemsArray: []
    }
	componentDidMount() {
        if(this.props.itemsArray.length == 0){
            this.setItemsArray()
        }
    }


    setItemFromItemSelector = (uuid, itemId) => {
        const itemDropdown = Sapp.Util.objValue(this.props, ['itemDropdown'])
        let selectedItemDetail = itemDropdown.filter(item => item._id == itemId)
        let items = this.props.itemsArray
        items.map((item)=>{
            console.log(item.id , uuid)
            if(item.id == uuid){
                console.log('yes')
                item.item = selectedItemDetail[0]._id,
                item.itemDetail = selectedItemDetail[0]
            }
        })
        console.log(items)
        this.props.updateItemsArray(items)

    }

    setItemsArray = () => { 
        const itemsArray = [{
            id: uuid4(),
            qty: 1,
            // canDelete: false  
        }]
        this.props.updateItemsArray(itemsArray)
    }


    handleAvailableQty = (value, uuid)=> {
         
        let items = this.props.itemsArray
        items.map((item)=>{
            if(item.id == uuid){
                item.qty = value
            }
        })
        this.props.updateItemsArray(items)
    }
    

    addRow = () => {
        var id = uuid4();
        const items = this.props.itemsArray.concat({
            id: id,
            item: null,
            qty: 1,
            // canDelete: true 
        })
        this.props.updateItemsArray(items)

    }

    deleteRow = (key) => {
        const items = _.filter(this.props.itemsArray, function(o) { return o.id!==key; });
        this.props.updateItemsArray(items)
    }

    renderItem = (item) => {
        const itemDropdown = Sapp.Util.objValue(this.props, ['itemDropdown'])
        return (
            <tr key={item.id}>
                <td><ItemSelector itemDropdown={itemDropdown} updateItems={this.setItemFromItemSelector} item={item.item} uuid={item.id}/></td>
                <td><InputNumber  min={1}  defaultValue={item.qty}   onChange={(e)=>this.handleAvailableQty(e, item.id)} /></td>
                <td><i  onClick={() => this.deleteRow(item.id)} className="fa fa-trash fa-lg" aria-hidden="true" /></td>  
               
            </tr>
        )
    }

	render() {
        // const {items} = this.state
        // const { itemsArray } = this.props
        // console.log(this.props.itemsArray.length)
        // console.log(this.props.itemsArray)
		return (				
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Item</th>
                            <th scope="col">Available Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.itemsArray.map((item) => this.renderItem(item)) }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>
                                <button type="button" className="btn btn-sm btn-primary mt-4" onClick={this.addRow}>Add Item</button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
		);
	}
}


export default ItemCloning;