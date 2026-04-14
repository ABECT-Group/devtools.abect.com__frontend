import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import ComingSoon from './components/ComingSoon/ComingSoon'
import Home from './pages/Home'
import FaviconGenerator from './pages/FaviconGenerator/FaviconGenerator'
import ImageConverter from './pages/ImageConverter/ImageConverter'
import PrivacyPolicy from './pages/PrivacyPolicy'
import WebPConverter from './pages/WebPConverter/WebPConverter'

const IMAGE_CONVERTER_SLUGS = [
  'png-to-jpg', 'webp-to-jpg', 'gif-to-jpg', 'bmp-to-jpg', 'avif-to-jpg', 'tiff-to-jpg',
  'jpg-to-png', 'jpeg-to-png', 'webp-to-png', 'gif-to-png', 'bmp-to-png', 'avif-to-png', 'tiff-to-png',
  'png-to-webp', 'jpg-to-webp', 'jpeg-to-webp', 'gif-to-webp', 'bmp-to-webp', 'avif-to-webp', 'tiff-to-webp',
]

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="favicon-generator" element={<FaviconGenerator />} />
        <Route path="webp-converter" element={<WebPConverter />} />
        {IMAGE_CONVERTER_SLUGS.map(slug => (
          <Route key={slug} path={slug} element={<ImageConverter />} />
        ))}
        <Route path="*" element={<ComingSoon />} />
      </Route>
    </Routes>
  )
}
