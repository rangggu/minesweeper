interface ILayoutProps {
  children: React.ReactNode
}

export default function Layout(props: ILayoutProps) {
  const { children } = props

  return <div>{children}</div>
}
