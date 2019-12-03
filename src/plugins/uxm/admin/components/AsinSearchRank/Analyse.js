import React, { Component } from "react";
import AnalyseSearchForm from './AnalyseSearchForm'
import AnalysisPivotTable from './AnalysisPivotTable'
import KeywordRankTable from './KeywordRankTable'
import AsinItemTable from './AsinItemTable'

import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;


class Analyse extends Component {
    constructor(props) {
        super(props)

        this.state = {
            keywords: ['wooden wall hanger'],
            asins: ['B078L1MS5H', 'B07HXSSD3M'],
            // data : [{"keywords":"wooden wall hanger", "title":"Shunkk Wooden Wall Hanger,Wall Hooks,Cloth Hanger,Bag Hanger (Set Of 2)","asin":"B078L1MS5H","searchIndex":2,"searchIndexDesc":998,"ratingsCount":8,"rating":3.2,"buyPrice":375},{"keywords":"wooden wall hanger", "title":"jeoga Bamboo Wooden Wall Mounted Foldable Peg Rack (Yellow)","asin":"B07HXSSD3M","searchIndex":13,"searchIndexDesc":987,"ratingsCount":1,"rating":5,"buyPrice":210}],
            data: {
                allAsinItems: [],
                keywordCatalogueItems: []
            }
        }
    }

    componentDidMount() {

    }

   
    analyseAsins = (data) => {
        axios({
            method: 'post',
            headers: null,
            url: 'http://localhost:6011/aws/keyword_asin_rank/check',
            data: {
                keywords :data.keywords,
                asins:data.asins
            }
        }).then((res) => {
            console.log(res.data)
            this.setState({
                data: res.data,
                keywords: data.keywords
                // ajaxData : res.data
            })

        })
    }

    pivotOnMount = (pt) => {
        pt.sendPropUpdate({aggregatorName: {$set: "List Unique Values"}})
    }

    render() {
        console.log(this.state.data)

        // let flat = Sapp.Util.objValue(item, ['flat'], 'N/A')
        
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <AnalyseSearchForm httprequest={this.analyseAsins} 
                            keywords={['wooden wall hanger']}
                            asins={['B078L1MS5H', 'B07HXSSD3M']}
                        />
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-md-12">
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="Pivot" key="1">
                                <AnalysisPivotTable 
                                    data={this.state.data.allAsinItems}
                                    cols={['keywords']}
                                    rows={['asin', 'title']}
                                    onMount={this.pivotOnMount}
                                />
                            </TabPane>

                            <TabPane tab="Asin Items" key="2">
                                <AsinItemTable data={this.state.data.allAsinItems} />
                            </TabPane>
                            <TabPane tab="Searched Items" key="3">
                                <KeywordRankTable keywords={this.state.keywords} keywordCatalogueItems={this.state.data.keywordCatalogueItems} />
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
        );
    }
}

export default Analyse;