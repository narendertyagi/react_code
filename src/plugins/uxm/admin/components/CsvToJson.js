import React from 'react'
import { Modal, Form, Input, Radio, Select, Upload, Button, Icon, message,} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
const FormItem = Form.Item;

import { CSVReader } from 'react-papaparse';
class FormC extends React.Component {
    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
        this.state = {
            length: 0
        }
      }
    
      handleReadCSV = (data) => {
        //    console.log(data.data); 
           this.setState({
            length: data.data.length
        })     
           Sapp.UxmAdmin.Api.Inventory.csvToJson(data.data, this.props.salesAccountId).then((res) => {
            console.log(res);
            message.success(res.data.data)
        }).catch((err) => {
            console.log(err)
        }) 
    
      }
    
      handleOnError = (err, file, inputElem, reason) => {
        console.log(err);
      }
    
      handleImportOffer = () => {
        this.fileInput.current.click();
      }
    
      render() {
        //   console.log(this.props.salesAccountId);
          
        return (
          <span>
            <CSVReader
              onFileLoaded={this.handleReadCSV}
              inputRef={this.fileInput}
              style={{display: 'none'}}
              onError={this.handleOnError}
              configOptions={{
                header: true,
                // step: function(row) { /* Stream */
                //   console.log("Row:", row.data);
              //  },
              }}
            />
            <button  className="btn btn-primary btn-sm  ml-3" onClick={this.handleImportOffer}>Import csv file</button>
            {this.state.length == 0 ? null : <div style={{textAlign:"center"}}>{"Wait updating " + this.state.length + " records"}</div>}
          </span>
        );
      }
}

const FormDefault = Form.create()(FormC);

export default FormDefault;
