import { combineReducers } from "@reduxjs/toolkit"
import mineReducer from "../slices/mine/index"

const reducer = combineReducers({
  mine: mineReducer,
})

export default reducer
