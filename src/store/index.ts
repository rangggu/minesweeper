import { configureStore } from "@reduxjs/toolkit"
import reducer from "./reducer/reducer"

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("control")
    if (serializedState) {
      return { control: JSON.parse(serializedState) }
    }
  } catch (err) {
    console.error(err)
  }
  return undefined
}

const initialState = loadState()

const store = configureStore({
  reducer,
  preloadedState: initialState,
})

store.subscribe(() => {
  const state = store.getState()
  try {
    const serializedState = JSON.stringify(state.control)
    localStorage.setItem("control", serializedState)
  } catch (err) {
    console.error(err)
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
