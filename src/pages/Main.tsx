import Layout from "../components/layout/Layout"
import Header from "../components/@common/Header"
import Indicator from "../components/Indicator/Indicator"
import Board from "../components/board/Board"

export default function Main() {
  return (
    <Layout>
      <Header />
      <Indicator />
      <Board />
    </Layout>
  )
}
