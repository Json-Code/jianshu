import React, { Component } from 'react'
import { connect } from 'react-redux'
import List from './component/List'
import Recommend from './component/Recommend'
import Topic from './component/Topic'
import Writer from './component/Writer'
import { getHomeInfo } from './store/actionCreators'
import { 
    HomeWrapper,
    HomeLeft,
    HomeRight,
    BackTop
} from './style'
import { actionCreators } from './store'

class Home extends Component {
    handleScrollTop() {
        window.scrollTo(0, 0)
    }

    render() {
        return (
            <HomeWrapper>
                <HomeLeft>
                    <img className="banner-img" src="//upload-images.jianshu.io/upload_images/3301720-db890fabf626e0ac.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp" alt=""></img>
                    <Topic></Topic>
                    <List></List>
                </HomeLeft>
                <HomeRight>
                    <Recommend></Recommend>
                    <Writer></Writer>
                </HomeRight>
                { this.props.showScroll ? <BackTop onClick={this.handleScrollTop}>回到顶部</BackTop> : null} 
            </HomeWrapper>
        )
    }

    componentDidMount() {
        this.props.changeHomeData()
        this.bindEvent()
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.props.changeScrollTopShow)
    }

    bindEvent() {
        window.addEventListener('scroll', this.props.changeScrollTopShow)
    }
}

const mapState = (state) => ({
    showScroll: state.getIn(['home', 'showScroll'])
})

const mapDispath = (dispatch) => ({
    changeHomeData() {
        const action = getHomeInfo()
        dispatch(action)
    },
    changeScrollTopShow() {
        if (document.documentElement.scrollTop > 100) {
            dispatch(actionCreators.toggleTopShow(true))
        } else {
            dispatch(actionCreators.toggleTopShow(false))
        }
    }
})
export default connect(mapState, mapDispath)(Home)