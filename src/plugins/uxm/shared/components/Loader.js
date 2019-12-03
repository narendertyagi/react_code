import React, {Component} from 'react'
import { Spin, Icon  } from 'antd';
let interval
class Loader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: ['Loading','.','.','.']
        }
    }
    componentDidMount(){
        interval = setInterval(()=>{
            let temp = this.state.loader
            temp.push('.')
            this.setState({
                loader: temp
            })
        },500)
    }


    componentWillUnmount(){
        //console.log('clear')
        clearInterval(interval)
    }

    render() {
        const antIcon = <Icon type="loading" style={{ fontSize: 50}} spin />;
        return (
        //    <div style={{marginLeft: '45%', marginTop: '10%'}}>
        //        {this.state.loader}
        //    </div>
        <Spin indicator={antIcon} style={{marginLeft: '45%', marginTop: '15%'}}/>
        )
    }
}


export default Loader;
