import { memo } from "react"
import { useAppSelector } from "../../hooks/redux"
import { getSize } from "../../utils/utils"

interface ILayoutProps {
  children: React.ReactNode
}

export default memo(function Layout(props: ILayoutProps) {
  const { children } = props

  // @NOTE : 렌더링 최적화를 위해 따로 선언
  const width = useAppSelector((state) => state.control.width)
  const height = useAppSelector((state) => state.control.height)
  const { w, h } = getSize(width, height)

  return (
    <div className="flex items-center justify-center w-dvw h-dvh">
      <div
        style={{ minWidth: w, minHeight: h }}
        className="flex flex-col items-center gap-1 p-1 bg-gray-700 rounded-lg"
      >
        {children}
      </div>
    </div>
  )
})
