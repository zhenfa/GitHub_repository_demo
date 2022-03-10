import {createStore} from 'redux'
//引用為Search組件使用的reducer
import searchReducer from './Reducers/stateReducer'

export default createStore(searchReducer);
