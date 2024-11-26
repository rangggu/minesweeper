import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CELL_STATE, STATUS } from "../../../types/constants"
import { initialArray, openCells } from "../../../utils/control"

export interface ControlState {
  board: number[][]
  mines: number[][]
  width: number
  height: number
  status: STATUS
  flagCount: number
  mineCount: number
}

interface CellPosition {
  row: number
  col: number
}

const { board, mines } = initialArray(8, 16, 40)

const initialState = {
  board: board,
  mines: mines,
  width: 8,
  height: 16,
  status: STATUS.READY,
  flagCount: 0,
  mineCount: 40,
}

export const controlSlice = createSlice({
  name: "control",
  initialState,
  reducers: {
    leftClickCell(state, action: PayloadAction<CellPosition>) {
      const { row, col } = action.payload
      const cellState = state.board[row][col]

      // 게임 상태가 READY 이고 첫 클릭 셀에 지뢰가 있으면
      if (state.status === STATUS.READY) {
        if (cellState === CELL_STATE.MINE) {
          const { board, mines } = initialArray(state.width, state.height, state.mineCount, row, col)
          // 지뢰 재배치
          state.board = board
          state.mines = mines
        }
      }

      if (
        cellState === CELL_STATE.OPENED_NUMBER ||
        cellState === CELL_STATE.OPENED_EMPTY ||
        cellState === CELL_STATE.OPENED_MINE
      ) {
        return
      }

      // 지뢰 클릭
      if (cellState === CELL_STATE.MINE) {
        state.board[row][col] = CELL_STATE.OPENED_MINE
        state.status = STATUS.GAMEOVER
      }
      // 숫자 클릭
      else if (cellState === CELL_STATE.NUMBER) {
        state.board[row][col] = CELL_STATE.OPENED_NUMBER
      }
      // 빈 칸 클릭
      else if (cellState === CELL_STATE.EMPTY) {
        state.board = openCells(row, col, state.board, state.mines)
        state.board[row][col] = CELL_STATE.OPENED_EMPTY
      }

      state.status = STATUS.RUN // 게임 상태를 RUN으로 변경
    },

    rightClickCell(state, action: PayloadAction<CellPosition>) {
      const { row, col } = action.payload
      const cellState = state.board[row][col]

      if (state.status === STATUS.GAMEOVER || state.status === STATUS.SUCCESS) return
      if (
        cellState === CELL_STATE.OPENED_EMPTY ||
        cellState === CELL_STATE.OPENED_NUMBER ||
        cellState === CELL_STATE.OPENED_MINE
      ) {
        return
      }

      // 깃발 꽂기 (지뢰 o)
      if (cellState === CELL_STATE.MINE) {
        console.log("isMine")
        state.board[row][col] = CELL_STATE.FLAGGED_MINE
      }
      // 깃발 꽂기 (지뢰 x)
      else if (cellState === CELL_STATE.NUMBER || cellState === CELL_STATE.EMPTY) {
        console.log("not Mine")
        state.board[row][col] = CELL_STATE.FLAGGED_NON_MINE
      }
      // 깃발 제거
      else if (cellState === CELL_STATE.FLAGGED_MINE || cellState === CELL_STATE.FLAGGED_NON_MINE) {
        state.board[row][col] = CELL_STATE.EMPTY
      }
    },
  },
})

export const { leftClickCell, rightClickCell } = controlSlice.actions

export default controlSlice.reducer
