import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import ComingSoon from './components/ComingSoon/ComingSoon'
import Home from './pages/Home'
import WebPConverter from './pages/WebPConverter/WebPConverter'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="webp-converter" element={<WebPConverter />} />
        <Route path="*" element={<ComingSoon />} />
      </Route>
    </Routes>
  )
}
