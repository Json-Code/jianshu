import React, {Component} from 'react';
import { CSSTransition } from 'react-transition-group'
import {
    HeaderWrapper,
    Logo,
    Nav,
    NavItem,
    SearchWrapper,
    NavSearch,
    Addition,
    Button,
    SearchInfo,
    SearchInfoTitle,
    SearchInfoSwitch,
    SearchInfoItem,
    SearchInfoList
} from './style'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as actionCreators from './store/actionCreators'
import { actionCreators as loginActionCreators} from '../../page/login/store'

class Header extends Component {
    getListArea() {
        const { focused, list, page, mouseIn, handleMouseEnter, handleMouseLeave, handleChangePage, totalPage} = this.props;
        const newList = list.toJS()
        const pageList = [];
    
        if (newList.length) {
            for (let i = ((page - 1) * 10); i < page * 10; i++) {
                pageList.push(
                    <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
                )
            }
        }
    
        if(focused || mouseIn) {
            return (
                <SearchInfo
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <SearchInfoTitle>
                        热门搜索
                        <SearchInfoSwitch onClick={() => handleChangePage(page, totalPage, this.spinIcon)}>
                            <i ref={(icon) => {this.spinIcon = icon}} className="iconfont spin">&#xe851;</i>
                            换一换
                        </SearchInfoSwitch>
                    </SearchInfoTitle>
                    <SearchInfoList>
                        {pageList}
                    </SearchInfoList>
                </SearchInfo>           
            )
        } else {
            return null;
        }
    }
    render() {
        return (
            <HeaderWrapper>
                <Logo></Logo>
                <Nav>
                    <NavItem className='left active'>首页</NavItem>
                    <NavItem className='left'>下载App</NavItem>
                    {
                        this.props.login ? <NavItem onClick={this.props.logout} className='right'>退出</NavItem> : 
                        <Link to="/login"><NavItem className='right'>登录</NavItem></Link>
                    }
                    <NavItem className="right">
                        <i className='iconfont'>&#xe636;</i>
                    </NavItem>
                    <SearchWrapper>
                        <CSSTransition
                            in={this.props.focused}
                            timeout={200}
                            classNames="slide"
                        >
                            <NavSearch
                                className={this.props.focused ? 'focused' : ''}
                                onFocus={this.props.handleInputFocus}
                                onBlur={this.props.handleInputBlur}
                            ></NavSearch>
                        </CSSTransition>
                        <i 
                            className={this.props.focused ? 'focused iconfont zoom' : 'iconfont zoom'}
                        >&#xe63d;</i>
                        {this.getListArea(this.props)}
                    </SearchWrapper>
                </Nav>
                <Addition>
                    <Button className='writting'>
                        <i className='iconfont'>&#xe615;</i>
                        写文章
                    </Button>
                    <Button className='reg'>注册</Button>
                </Addition>
            </HeaderWrapper>
        )
    }


}

const mapStateToProps = (state) => {
    return {
        focused: state.getIn(['header', 'focused']),
        //focused: state.get('header').get('focused')
        list: state.getIn(['header', 'list']),
        page: state.getIn(['header', 'page']),
        mouseIn: state.getIn(['header', 'mouseIn']),
        totalPage: state.getIn(['header', 'totalPage']),
        login: state.getIn(['login', 'login'])
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        handleInputFocus() {
            dispatch(actionCreators.getList())
            dispatch(actionCreators.searchFocus())
        },
        handleInputBlur() {
            dispatch(actionCreators.searchBlur())
        },
        handleMouseEnter() {
            dispatch(actionCreators.mouseEnter( ))
        },
        handleMouseLeave() {
            dispatch(actionCreators.mouseLeave())
        },
        handleChangePage(page, totalPage, spin) {
            let originAngel = spin.style.transform.replace(/[^0-9]/ig, '')
            if (originAngel) {
                originAngel = parseInt(originAngel, 10)
            } else {
                originAngel = 0
            }
            spin.style.transform = 'rotate('+ (originAngel + 360) +'360deg)'
            if (page < totalPage) {
                dispatch(actionCreators.changePage(page + 1))
            } else {
                dispatch(actionCreators.changePage(1))
            }
        },
        logout() {
            dispatch(loginActionCreators.logout())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);