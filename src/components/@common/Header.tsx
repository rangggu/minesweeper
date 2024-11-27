import { useEffect, useState } from "react"
import { IoClose } from "react-icons/io5"
import { cn } from "../../utils/utils"
import { useDispatch } from "react-redux"
import { setDifficulty } from "../../store/slices/control"

export default function Header() {
  const [open, setOpen] = useState<boolean>(false)
  const [custom, setCustom] = useState<boolean>(false)
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)
  const [mine, setMine] = useState<number>(0)
  const dispatch = useDispatch()

  const setDiff = (width: number, height: number, mineCount: number) => {
    setOpen(false)
    setCustom(false)
    dispatch(setDifficulty({ width: width, height: height, mineCount: mineCount }))
  }

  useEffect(() => {
    if (width && height && mine) {
      dispatch(setDifficulty({ width: width, height: height, mineCount: mine }))
    }
  }, [width, height, mine])

  return (
    <div className="flex items-center justify-between w-full h-10 px-1 border-2 border-pink-400 rounded-t-md z-10">
      <div className="relative">
        <button
          className={cn("px-5 py-0.5 h-7 text-white hover:bg-gray-600 text-xs", open && "bg-gray-600")}
          onClick={() => {
            setOpen(!open)
            setCustom(false)
          }}
        >
          Setting
        </button>
        {open && (
          <ul
            className={cn(
              "absolute -bottom-32 left-0 flex flex-col w-full h-32 bg-gray-600 text-xs text-white list-none",
              custom && "-bottom-48 h-48",
            )}
          >
            <button
              className="flex items-center justify-center h-8 hover:bg-gray-500"
              onClick={() => setDiff(8, 8, 10)}
            >
              Beginner
            </button>
            <button
              className="flex items-center justify-center h-8 hover:bg-gray-500"
              onClick={() => setDiff(16, 16, 40)}
            >
              Intermediate
            </button>
            <button
              className="flex items-center justify-center h-8 hover:bg-gray-500"
              onClick={() => setDiff(32, 16, 100)}
            >
              Expert
            </button>
            <button
              className={cn("flex items-center justify-center h-8 hover:bg-gray-500", custom && "bg-gray-500")}
              onClick={() => setCustom(true)}
            >
              Custom
            </button>
            {custom && (
              <>
                <div className="flex items-center justify-center gap-1 h-8 bg-gray-500">
                  <input
                    className="w-6 h-6 text-center bg-transparent hover:bg-gray-400 focus:bg-gray-400"
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                  />
                  x
                  <input
                    className="w-6 h-6 text-center bg-transparent hover:bg-gray-400 focus:bg-gray-400"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                  />
                </div>
                <div className="flex items-center justify-center gap-1 h-8 bg-gray-500">
                  Mine :
                  <input
                    className="w-6 h-6 text-center bg-transparent hover:bg-gray-400 focus:bg-gray-400"
                    type="number"
                    value={mine}
                    onChange={(e) => {
                      const mine = Number(e.target.value)
                      if (mine <= (width * height) / 3) {
                        setMine(mine)
                      }
                    }}
                  />
                </div>
              </>
            )}
          </ul>
        )}
      </div>
      <button className="flex items-center justify-center w-7 h-7 hover:bg-white hover:bg-opacity-15">
        <IoClose className="w-6 h-6 text-white" />
      </button>
    </div>
  )
}
