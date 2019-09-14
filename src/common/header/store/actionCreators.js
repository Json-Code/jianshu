import axios from 'axios';
import { fromJS } from 'immutable'

export const searchFocus = () => ({
    type: 'search_focus' 
})

export const searchBlur = () => ({
    type: 'search_blur'
})

export const changeList = (data) => ({
    type: 'change_list',
    data: fromJS(data),
    totalPage: Math.ceil(data.length / 10)
})

export const mouseEnter = () => ({
    type: 'mouse_enter'
})

export const mouseLeave = () => ({
    type: 'mouse_leave'
})

export const changePage = (page) => ({
    type: 'change_page',
    page
})

export const getList = () => {
    return (dispatch) => {
        axios.get('/api/headerList.json').then((res) => {
            const data = res.data;
            dispatch(changeList(data.data))
        }).catch(() => {
            console.log('json get fail')
        })
    }
}