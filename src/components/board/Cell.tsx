import { useAppSelector } from "../../hooks/redux"
import { CELL_STATE } from "../../types/constants"
import { FaBomb, FaFlag } from "react-icons/fa6"
import { cn } from "../../utils/utils"
import { BiSolidBomb } from "react-icons/bi"

interface ICellProps {
  row: number
  col: number
  width: number | string
  height: number | string
  cellState: number
  onLeftClick: () => void
  onRightClick: (event: React.MouseEvent) => void
}

export default function Cell(props: ICellProps) {
  const { row, col, width, height, cellState, onLeftClick, onRightClick } = props
  const mines = useAppSelector((state) => state.control.mines)
  const OPENED =
    cellState === CELL_STATE.OPENED_EMPTY ||
    cellState === CELL_STATE.OPENED_MINE ||
    cellState === CELL_STATE.OPENED_NUMBER

  const getCellText = (state: CELL_STATE) => {
    switch (state) {
      case CELL_STATE.EMPTY:
      case CELL_STATE.NUMBER:
      case CELL_STATE.MINE:
        return ""

      case CELL_STATE.FLAGGED_MINE:
      case CELL_STATE.FLAGGED_NON_MINE:
        return <FaFlag className="relative top-[1px] w-4 h-4 text-pink-600" />

      case CELL_STATE.OPENED_MINE:
        return <BiSolidBomb className="relative top-[1px] w-6 h-6 -rotate-45 text-black" />

      case CELL_STATE.OPENED_NUMBER:
        return mines[row][col]

      case CELL_STATE.OPENED_EMPTY:
        return ""

      default:
        return "?"
    }
  }

  return (
    <div
      className={cn(
        "relative border-2 border-gray-400 cursor-default bg-gray-700",
        OPENED ? "bg-gray-500" : "hover:bg-gray-600",
        cellState === CELL_STATE.OPENED_NUMBER && "text-pink-100 text-xl",
        row !== 0 && "border-t-0",
        col !== 0 && "border-l-0",
      )}
      style={{ width: width, height: height }}
      onClick={onLeftClick}
      onContextMenu={onRightClick}
    >
      <div className="absolute flex items-center justify-center w-full h-full">{getCellText(cellState)}</div>
    </div>
  )
}
