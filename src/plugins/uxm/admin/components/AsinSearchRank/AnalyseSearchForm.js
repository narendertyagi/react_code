import React, { Component } from "react";

import { Select } from 'antd';
const Option = Select.Option;
import { Card } from 'antd';

class Demo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            keywords: this.props.keywords||[],
            asins: this.props.asins||[],
        }
    }

    static defaultProps = {
        httprequest: null
    }

    componentDidMount() {
    
    }

    handleAsinSelectChange = (value) => {
        this.setState({asins: value})
    }

    handlekeywordSelectChange = (value) => {
        this.setState({keywords: value})
    }
    
    sendAjax = () => {
        console.log(this.state.asins)
        console.log(this.state.keywords)

        if(this.props.httprequest && typeof(this.props.httprequest) == 'function') {
            this.props.httprequest(this.state)
            return false
        }

        // axios({
        //     method: 'post',
        //     headers: null,
        //     url: 'http://localhost:6011/aws/keyword_asin_rank/check',
        //     data: {
        //         keywords : this.state.keywords,
        //         asins: this.state.asins
        //     }
        // }).then((res) => {
        //     console.log(res.data)
        //     this.setState({
        //         data: res.data.allAsinItems,
        //         // ajaxData : res.data
        //     })

        // })
    }

    render() {
        return (
            <Card>
                <div className="mb-3">
                    <h6>Asins</h6>
                    <Select
                        ref='asinSelect'
                        mode="tags"
                        defaultValue={this.state.asins}
                        style={{ width: '100%' }}
                        onChange={this.handleAsinSelectChange}
                        tokenSeparators={[',']}
                    >
                    </Select>
                    
                </div>
                <div>
                    <h6>Keywords</h6>
                    <Select
                        ref='keywordSelect'
                        mode="tags"
                        defaultValue={this.state.keywords}
                        style={{ width: '100%' }}
                        onChange={this.handlekeywordSelectChange}
                        tokenSeparators={[',']}
                    >
                    </Select>
                </div>
                <div className="mt-2 text-right">
                    <button className="ant-btn ant-btn-primary" onClick={this.sendAjax}>Analyse</button>
                </div>
            </Card>
        );
    }
}

export default Demo;