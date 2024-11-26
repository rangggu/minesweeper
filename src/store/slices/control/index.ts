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

const { board, mines } = initialArray(16, 16, 40)

const initialState = {
  board: board,
  mines: mines,
  width: 16,
  height: 16,
  status: STATUS.READY,
  flagCount: 0,
  mineCount: 40,
}

export const controlSlice = createSlice({
  name: "control",
  initialState,
  reducers: {
    leftClickCell(state, { payload }: PayloadAction<CellPosition>) {
      const { row, col } = payload

      // 게임 상태가 READY 이고 첫 클릭 셀에 지뢰가 있으면
      if (state.status === STATUS.READY) {
        if (state.board[row][col] === CELL_STATE.MINE) {
          const { board, mines } = initialArray(state.width, state.height, state.mineCount, row, col)
          // 지뢰 재배치
          state.board = board
          state.mines = mines
        }

        //RUN
        state.status = STATUS.RUN
      }

      if (
        state.board[row][col] === CELL_STATE.OPENED_NUMBER ||
        state.board[row][col] === CELL_STATE.OPENED_EMPTY ||
        state.board[row][col] === CELL_STATE.OPENED_MINE
      ) {
        return
      }

      // 지뢰 클릭
      if (state.board[row][col] === CELL_STATE.MINE) {
        state.board[row][col] = CELL_STATE.OPENED_MINE
        // GAMEOVER
        state.status = STATUS.GAMEOVER
      }
      // 숫자 클릭
      else if (state.board[row][col] === CELL_STATE.NUMBER) {
        state.board[row][col] = CELL_STATE.OPENED_NUMBER
      }
      // 빈 칸 클릭
      else if (state.board[row][col] === CELL_STATE.EMPTY) {
        state.board = openCells(row, col, state.board, state.mines)
        state.board[row][col] = CELL_STATE.OPENED_EMPTY
      }
    },

    rightClickCell(state, { payload }: PayloadAction<CellPosition>) {
      const { row, col } = payload
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
        state.board[row][col] = CELL_STATE.FLAGGED_MINE
        state.flagCount++
      }
      // 깃발 꽂기 (지뢰 x)
      else if (cellState === CELL_STATE.NUMBER || cellState === CELL_STATE.EMPTY) {
        state.board[row][col] = CELL_STATE.FLAGGED_NON_MINE
        state.flagCount++
      }
      // 깃발 제거
      else if (cellState === CELL_STATE.FLAGGED_MINE || cellState === CELL_STATE.FLAGGED_NON_MINE) {
        state.board[row][col] = CELL_STATE.EMPTY
      }
    },

    openAllCell(state) {
      state.board = state.board.map((row) =>
        row.map((cell) => {
          switch (cell) {
            case CELL_STATE.MINE:
              return CELL_STATE.OPENED_MINE
            case CELL_STATE.NUMBER:
              return CELL_STATE.OPENED_NUMBER
            case CELL_STATE.EMPTY:
              return CELL_STATE.OPENED_EMPTY
            case CELL_STATE.FLAGGED_MINE:
              return CELL_STATE.OPENED_MINE
            default:
              return cell // 다른 상태는 유지
          }
        }),
      )
    },

    reloadBoard(state) {
      const { board, mines } = initialArray(state.width, state.height, state.mineCount)
      state.board = board
      state.mines = mines
      state.status = STATUS.READY
      state.flagCount = 0
      state.mineCount = state.mineCount
    },

    setDifficulty(state, { payload }: PayloadAction<{ width: number; height: number; mineCount: number }>) {
      const { width, height, mineCount } = payload

      state.width = width
      state.height = height
      state.mineCount = mineCount

      const { board, mines } = initialArray(width, height, mineCount)
      state.board = board
      state.mines = mines
      state.status = STATUS.READY
      state.flagCount = 0
    },
  },
})

export const { leftClickCell, rightClickCell, openAllCell, reloadBoard, setDifficulty } = controlSlice.actions

export default controlSlice.reducer
