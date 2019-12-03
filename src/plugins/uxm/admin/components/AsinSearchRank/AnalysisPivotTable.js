import React, { Component } from "react";

import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import Plot from 'react-plotly.js';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';
// create Plotly renderers via dependency injection
const PlotlyRenderers = createPlotlyRenderers(Plot);

class Demo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data : [],
            cols: [],
            rows: [],
        }
    }

    static defaultProps = {
        onMount: () => {},
        data: []
    }

    static getDerivedStateFromProps(props, state) {

        if(props.data.length>0) {
            return {
                state,
                ...{
                    data: props.data,
                    cols: props.cols,
                    rows: props.rows
                }
            }
        }
        return state
    }


    componentDidMount() {
        // window.pt = this.refs.pt
        // pt.sendPropUpdate({aggregatorName: {$set: "List Unique Values"}})
        // pt.sendPropUpdate({"vals":{"$splice":[[0,1,"searchIndex"]]}})

        this.onMount()
    }

    onMount = () => {
        // window.pt = this.refs.pt
        this.props.onMount(this.refs.pt)
    }
    

    render() {
        // console.log('PROPS DATA', this.props.data)
        return (
            <PivotTableUI
                ref={'pt'}
                key={'dd' + Math.round(Math.random(20)*100)}
                data={this.props.data}
                onChange={s => this.setState(s)}
                renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
                cols={this.state.cols}
                rows={this.state.rows}
                {...this.state}
            />
        );
    }
}

export default Demo;