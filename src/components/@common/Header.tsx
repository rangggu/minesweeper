import { useState } from "react"
import { IoClose } from "react-icons/io5"
import { cn } from "../../utils/utils"

export default function Header() {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <div className="flex items-center justify-between w-full h-10 px-1 border-2 border-pink-400 rounded-t-md z-10">
      <div className="relative">
        <button
          className={cn("px-4 py-0.5 text-white hover:bg-gray-600", open && "bg-gray-600")}
          onClick={() => setOpen(!open)}
        >
          Setting
        </button>
        {open && (
          <ul className="absolute -bottom-32 left-0 flex flex-col w-full h-32 bg-gray-600 text-xs text-white list-none">
            <button className="flex items-center justify-center h-8" onClick={() => setOpen(false)}>
              Beginner
            </button>
            <button className="flex items-center justify-center h-8" onClick={() => setOpen(false)}>
              Intermediate
            </button>
            <button className="flex items-center justify-center h-8" onClick={() => setOpen(false)}>
              Expert
            </button>
            <button className="flex items-center justify-center h-8" onClick={() => setOpen(false)}>
              Custom
            </button>
          </ul>
        )}
      </div>
      <button className="flex items-center justify-center w-7 h-7 hover:bg-white hover:bg-opacity-15">
        <IoClose className="w-6 h-6 text-white" />
      </button>
    </div>
  )
}
