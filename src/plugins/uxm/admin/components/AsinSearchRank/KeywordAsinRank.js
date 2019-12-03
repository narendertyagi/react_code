import React, { Component } from "react";
import Fullscreen from "react-full-screen";


import { Select } from 'antd';
const Option = Select.Option;

import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import Plot from 'react-plotly.js';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';
// create Plotly renderers via dependency injection
const PlotlyRenderers = createPlotlyRenderers(Plot);

import KeywordRankTable from './KeywordRankTable'
class Demo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            keywords: ['wooden wall hanger'],
            asins: ['B078L1MS5H', 'B07HXSSD3M'],
            data : [{"keywords":"wooden wall hanger", "title":"Shunkk Wooden Wall Hanger,Wall Hooks,Cloth Hanger,Bag Hanger (Set Of 2)","asin":"B078L1MS5H","searchIndex":2,"searchIndexDesc":998,"ratingsCount":8,"rating":3.2,"buyPrice":375},{"keywords":"wooden wall hanger", "title":"jeoga Bamboo Wooden Wall Mounted Foldable Peg Rack (Yellow)","asin":"B07HXSSD3M","searchIndex":13,"searchIndexDesc":987,"ratingsCount":1,"rating":5,"buyPrice":210}],
            ajaxData: {
                asinItems: [],
                items: []
            },
            isFull: false,
        }
    }

    componentDidMount() {
        window.pt = this.refs.pt
        pt.sendPropUpdate({aggregatorName: {$set: "List Unique Values"}})
        // pt.sendPropUpdate({"vals":{"$splice":[[0,1,"searchIndex"]]}})

    }

    goFull = () => {
        this.setState({ isFull: true });
    }

    handleAsinSelectChange = (value) => {
        this.setState({asins: value})
    }

    handlekeywordSelectChange = (value) => {
        this.setState({keywords: value})
    }
    
    analyseAsins = () => {
        console.log(this.state.asins)
        console.log(this.state.keywords)

        axios({
            method: 'post',
            headers: null,
            url: 'http://localhost:6011/aws/keyword_asin_rank/check',
            data: {
                keywords : this.state.keywords,
                asins: this.state.asins
            }
        }).then((res) => {
            console.log(res.data)
            this.setState({
                data: res.data.allAsinItems,
                // ajaxData : res.data
            })

        })
    }

    render() {
        // console.log(this.state.asins)
        // const { items } = this.state.ajaxData
        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
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
                    </div>
                    <div className="col-md-8">
                        <button className="ant-btn ant-btn-primary" onClick={this.analyseAsins}>Analyse</button>
                        
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-md-12">
                    <button onClick={this.goFull}>
                     Go Fullscreen
                    </button>
                    <Fullscreen
                        enabled={this.state.isFull}
                        onChange={isFull => this.setState({isFull})}
                    >
                        <PivotTableUI
                            ref={'pt'}
                            key={'dd' + Math.round(Math.random(20)*100)}
                            data={this.state.data}
                            onChange={s => this.setState(s)}
                            renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
                            cols={['keywords']}
                            rows={['asin', 'title']}
                            {...this.state}
                        />
                    </Fullscreen>

                    </div>

                    <div className="col-md-12 mt-5">
                        {/* <KeywordRankTable data={items} /> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default Demo;