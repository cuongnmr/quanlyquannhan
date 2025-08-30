import Versions from './components/Versions'

function App(): React.JSX.Element {
  return (
    <article className="prose max-w-none p-4">
      <h1>Quản lý chất lượng chính trị</h1>

      <h3>Tác giả</h3>
      <ul>
        <li>Nguyễn Mạnh Cường</li>
        <li>a6, b2, c4, d2, Lư 575</li>
      </ul>
      <h3>Thông tin ứng dụng</h3>
      <Versions></Versions>
    </article>
  )
}

export default App
