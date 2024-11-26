import { CELL_STATE } from "../types/constants"
import { createArray2D } from "./utils"

// @NOTE : 주어진 좌표의 셀 주변 Mine 개수 계산
const getMineCount = (board: CELL_STATE[][], row: number, col: number) => {
  let mineCount = 0

  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1], // 상단 3개
    [0, -1],
    [0, 1], // 좌우 2개
    [1, -1],
    [1, 0],
    [1, 1], // 하단 3개
  ]

  directions.forEach(([dx, dy]) => {
    const newRow = row + dx
    const newCol = col + dy

    // 배열 범위 체크
    if (newRow >= 0 && newRow < board.length && newCol >= 0 && newCol < board[0].length) {
      const cell = board[newRow][newCol]
      if (cell === CELL_STATE.MINE) {
        mineCount++
      }
    }
  })

  return mineCount
}

//@NOTE : 2D 배열로 board, mines 배열 생성
export const initialArray = (
  width: number,
  height: number,
  mineCount: number,
  firstRow?: number,
  firstCol?: number,
) => {
  const board: CELL_STATE[][] = createArray2D(width, height, CELL_STATE.EMPTY)
  const mines: number[][] = createArray2D(width, height, 0)

  // 1. 지뢰 랜덤 배치
  let minePlaced = 0
  while (minePlaced < mineCount) {
    const row = Math.floor(Math.random() * height)
    const col = Math.floor(Math.random() * width)

    if (board[row][col] === CELL_STATE.MINE || (row === firstRow && col === firstCol)) continue

    board[row][col] = CELL_STATE.MINE
    minePlaced++
  }

  // 2. 지뢰 주변 숫자 계산
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (board[row][col] === CELL_STATE.MINE) {
        // 이미 지뢰가 있는 칸은 넘어감
        continue
      }

      const mineCount = getMineCount(board, row, col)

      if (mineCount > 0) {
        board[row][col] = CELL_STATE.NUMBER // 숫자 상태로 변경
        mines[row][col] = mineCount // mines 배열에 주변 지뢰 개수 추가
      }
    }
  }

  return { board, mines }
}

//@NOTE : 주변 빈칸을 탐색하여 여는 재귀 함수
export const openCells = (row: number, col: number, board: number[][], mines: number[][]) => {
  const stack: [number, number][] = [[row, col]]
  const visited = new Set<string>()
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1], // 상단 3개
    [0, -1],
    [0, 1], // 좌우 2개
    [1, -1],
    [1, 0],
    [1, 1], // 하단 3개
  ]

  const isValidCell = (row: number, col: number) => row >= 0 && col >= 0 && row < board.length && col < board[0].length

  while (stack.length > 0) {
    const [currentRow, currentCol] = stack.pop()!
    const cellKey = `${currentRow},${currentCol}`
    const cellState = board[currentRow][currentCol]

    // 방문 체크
    if (visited.has(cellKey)) continue
    visited.add(cellKey)

    // 현재 셀이 빈 칸이면 열기
    if (cellState === CELL_STATE.EMPTY && mines[currentRow][currentCol] === 0) {
      board[currentRow][currentCol] = CELL_STATE.OPENED_EMPTY
    }

    // 주변 셀 탐색
    for (const [dRow, dCol] of directions) {
      const newRow = currentRow + dRow
      const newCol = currentCol + dCol
      const newCellState = board[newRow][newCol]

      if (isValidCell(newRow, newCol) && !visited.has(`${newRow},${newCol}`)) {
        // 숫자면 열기
        if (newCellState === CELL_STATE.NUMBER) {
          board[newRow][newCol] = CELL_STATE.OPENED_NUMBER
        }
        // 빈 칸이면 스택에 추가
        else if (newCellState === CELL_STATE.EMPTY) {
          stack.push([newRow, newCol])
        }
      }
    }
  }

  return board
}
