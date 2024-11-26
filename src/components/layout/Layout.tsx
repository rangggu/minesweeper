interface ILayoutProps {
  children: React.ReactNode
}

export default function Layout(props: ILayoutProps) {
  const { children } = props

  return (
    <div className="flex items-center justify-center w-dvw h-dvh">
      <div className="flex flex-col items-center gap-1 min-w-[500px] min-h-[700px] p-1 bg-gray-700 rounded-lg">
        {children}
      </div>
    </div>
  )
}
