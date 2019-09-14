import { combineReducers } from 'redux-immutable'
import { reducer as headerReducer} from '../common/header/store'
import { reducer as homeReducer } from '../page/home/store'
import { reducer as detailReducer } from '../page/detail/store'
import { reducer as loginReducer } from '../page/login/store'

export default combineReducers({
    header: headerReducer,
    home: homeReducer,
    detail: detailReducer,
    login: loginReducer
})