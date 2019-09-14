import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    RecommendWraper, 
    RecommendItem 
} from '../style'

class Recommend extends Component {
    render() {
        return (
            <RecommendWraper>
                {
                    this.props.list.map((item) => {
                        return <RecommendItem imgUrl={item.get('imgUrl')} key={item.get('id')}></RecommendItem>
                    })
                }
            </RecommendWraper>
        )
    }
}

const mapState = (state) => ({
    list: state.getIn(['home', 'recommendList'])
})

export default connect(mapState, null)(Recommend)