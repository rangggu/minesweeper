import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CELL_STATE, STATUS } from "../../../types/constants"
import { initialArray, isGameSuccess, openCells, updateFlagged } from "../../../utils/control"
export interface ControlState {
  board: number[][]
  mines: number[][]
  width: number
  height: number
  status: STATUS
  flagCount: number
  flaggedCells: { key: string; state: number }[]
  mineCount: number
}

interface CellPosition {
  row: number
  col: number
}

const savedDiff = localStorage.getItem("difficulty")
const parsedDiff = savedDiff ? JSON.parse(savedDiff) : { width: 16, height: 16, mineCount: 40 }
const { board, mines } = initialArray(parsedDiff.width, parsedDiff.height, parsedDiff.mineCount)

const initialState: ControlState = {
  board: board,
  mines: mines,
  width: parsedDiff.width,
  height: parsedDiff.height,
  status: STATUS.READY,
  flagCount: 0,
  flaggedCells: [],
  mineCount: parsedDiff.mineCount,
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
        state.status = STATUS.RUN
      }

      if (state.board[row][col] === CELL_STATE.OPENED_NUMBER || state.board[row][col] === CELL_STATE.OPENED_EMPTY) {
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

      // 성공 여부 확인
      if (isGameSuccess(state.board)) {
        state.status = STATUS.SUCCESS
      }
    },

    rightClickCell(state, { payload }: PayloadAction<CellPosition>) {
      const { row, col } = payload
      const cellState = state.board[row][col]

      if (state.status === STATUS.GAMEOVER || state.status === STATUS.SUCCESS) return
      if (cellState === CELL_STATE.OPENED_EMPTY || cellState === CELL_STATE.OPENED_NUMBER) {
        return
      }

      // // 깃발 꽂기 (지뢰 o)
      if (cellState === CELL_STATE.MINE) {
        state.board[row][col] = CELL_STATE.FLAGGED_MINE
        updateFlagged(state, row, col, cellState, true)
      }
      // 깃발 꽂기 (지뢰 x)
      else if (cellState === CELL_STATE.NUMBER || cellState === CELL_STATE.EMPTY) {
        state.board[row][col] = CELL_STATE.FLAGGED_NON_MINE
        updateFlagged(state, row, col, cellState, true)
      }
      // 깃발 제거
      else if (cellState === CELL_STATE.FLAGGED_MINE || cellState === CELL_STATE.FLAGGED_NON_MINE) {
        updateFlagged(state, row, col, cellState, false)
      }

      // 성공 여부 확인
      if (isGameSuccess(state.board)) {
        state.status = STATUS.SUCCESS
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
              return cell
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

      // 로컬 스토리지 저장
      localStorage.setItem("difficulty", JSON.stringify({ width, height, mineCount }))
    },
  },
})

export const { leftClickCell, rightClickCell, openAllCell, reloadBoard, setDifficulty } = controlSlice.actions

export default controlSlice.reducer
