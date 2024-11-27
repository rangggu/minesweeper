import { memo, useCallback, useEffect, useMemo } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { leftClickCell, openAllCell, rightClickCell } from "../../store/slices/control"
import { STATUS } from "../../types/constants"
import { calculateCellSize, cn, createArray, getSize } from "../../utils/utils"
import Cell from "./Cell"

export default memo(function Board() {
  const dispatch = useAppDispatch()

  // @NOTE : 렌더링 최적화를 위해 따로 선언
  const width = useAppSelector((state) => state.control.width)
  const height = useAppSelector((state) => state.control.height)
  const board = useAppSelector((state) => state.control.board)
  const status = useAppSelector((state) => state.control.status)
  const { w, h } = getSize(width, height)

  // @NOTE : 초기 배열 생성
  const initialArray = useMemo(() => createArray(width * height, null), [width, height])
  const side = calculateCellSize(w, h, height, width)

  // @NOTE : 좌클릭 이벤트 핸들러
  const handleLeftClick = useCallback(
    (row: number, col: number) => {
      dispatch(leftClickCell({ row, col }))
    },
    [dispatch],
  )

  // @NOTE : 우클릭 이벤트 핸들러
  const handleRightClick = useCallback(
    (row: number, col: number, e: React.MouseEvent) => {
      e.preventDefault()
      dispatch(rightClickCell({ row, col }))
    },
    [dispatch],
  )

  // @NOTE : 게임 오버 및 성공시 모든 셀 오픈
  useEffect(() => {
    if (status === STATUS.GAMEOVER || status === STATUS.SUCCESS) {
      dispatch(openAllCell())
    }
  }, [status])

  return (
    <div
      style={{ width: w, height: h }}
      className={cn(
        "flex items-center justify-center mt-auto bg-gray-800 rounded",
        status === STATUS.GAMEOVER && "pointer-events-none",
      )}
    >
      <div
        className="grid"
        style={{
          gridTemplateRows: `repeat(${height}, ${side}px)`, // 그리드 행 크기
          gridTemplateColumns: `repeat(${width}, ${side}px)`, // 그리드 열 크기
        }}
      >
        {initialArray.map((_, index) => {
          const row = Math.floor(index / width) // 행 인덱스
          const col = index % width // 열 인덱스

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
})
