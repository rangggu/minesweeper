import { combineReducers } from "@reduxjs/toolkit"
import controlReducer from "../slices/control/index"

const reducer = combineReducers({
  control: controlReducer,
})

export default reducer
