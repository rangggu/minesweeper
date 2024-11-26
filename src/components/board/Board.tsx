import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { leftClickCell, rightClickCell } from "../../store/slices/control"
import { calculateCellSize, createArray } from "../../utils/utils"
import Cell from "./Cell"

export default function Board() {
  const width = useAppSelector((state) => state.control.width)
  const height = useAppSelector((state) => state.control.height)
  const board = useAppSelector((state) => state.control.board)
  const dispatch = useAppDispatch()

  const initialArray = createArray(width * height, null)
  const side = calculateCellSize(500, 564, height, width)

  const handleLeftClick = (row: number, col: number) => {
    dispatch(leftClickCell({ row, col }))
  }

  const handleRightClick = (row: number, col: number, e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(rightClickCell({ row, col }))
  }

  return (
    <div className="flex items-center justify-center w-[500px] h-[564px] mt-auto bg-gray-800 rounded">
      <div
        className="grid"
        style={{ gridTemplateRows: `repeat(${height}, ${side}px)`, gridTemplateColumns: `repeat(${width}, ${side}px)` }}
      >
        {initialArray.map((_, index) => {
          const row = Math.floor(index / width) // 열 = 몫
          const col = index % width // 행 = 나머지

          return (
            <Cell
              key={`${row}_${col}`}
              row={row}
              col={col}
              width={side}
              height={side}
              cellState={board[row][col]}
              onLeftClick={() => handleLeftClick(row, col)}
              onRightClick={(e) => handleRightClick(row, col, e)}
            />
          )
        })}
      </div>
    </div>
  )
}
