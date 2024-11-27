import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { incrementTime } from "../../store/slices/control"
import { STATUS } from "../../types/constants"
import { formatTime } from "../../utils/utils"

export default function Timer() {
  const dispatch = useAppDispatch()

  // @NOTE : 렌더링 최적화를 위해 따로 선언
  const status = useAppSelector((state) => state.control.status)
  const timer = useAppSelector((state) => state.control.timer)

  // @NOTE : 타이머 구현
  useEffect(() => {
    let timer: number | null = null

    if (status === STATUS.RUN) {
      // 시작
      timer = window.setInterval(() => {
        dispatch(incrementTime())
      }, 1000)
    } else if (status === STATUS.GAMEOVER || status === STATUS.SUCCESS) {
      // 중단
      if (timer !== null) {
        window.clearInterval(timer)
      }
    }

    return () => {
      if (timer !== null) {
        window.clearInterval(timer)
      }
    }
  }, [status, dispatch])

  return (
    <div className="text-4xl text-center mt-1.5 my-auto leading-none font-bold text-pink-100">{formatTime(timer)}</div>
  )
}
