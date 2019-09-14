import { fromJS } from 'immutable'

const defaultState = fromJS({
    focused: false,
    mouseIn: false,
    list: [],
    page: 1,
    totalPage: 1
})

export default (state = defaultState, action) => {
    if (action.type === 'search_focus') {
/*         return {
            focused: true
        } */

        //immutable对象的set方法，会结合之前的immutable对象的值和设置的值，返回一个全新的对象
        return state.set('focused', true)
    }
    if (action.type === 'search_blur') {
/*         return {
            focused: false
        } */
        //immutable对象的set方法，会结合之前的immutable对象的值和设置的值，返回一个全新的对象
        return state.set('focused', false)
    }
    if (action.type === 'change_list') {
        return state.set('list', action.data).set('totalPage', action.totalPage)
    }
    if (action.type === 'mouse_enter') {
        return state.set('mouseIn', true)
    }
    if (action.type === 'mouse_leave') {
        return state.set('mouseIn', false)
    }
    if (action.type === 'change_page') {
        return state.set('page', action.page)
    }
    return state
}