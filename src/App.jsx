import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import useAuthStore from './store/authStore'
import './store/themeStore.js'
import Home from './pages/Home/Home'
import NotFound from './pages/NotFound/NotFound'
import CompressImage from './pages/CompressImage/CompressImage'
import MetaTagsGenerator from './pages/MetaTagsGenerator/MetaTagsGenerator'
import FaviconGenerator from './pages/FaviconGenerator/FaviconGenerator'
import ImageConverter from './pages/ImageConverter/ImageConverter'
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy'
import WebPConverter from './pages/WebPConverter/WebPConverter'
import OGImageGenerator from './pages/OGImageGenerator/OGImageGenerator'
import JsonLdGenerator from './pages/JsonLdGenerator/JsonLdGenerator'
import AiPage from './pages/AiPage/AiPage'
import About from './pages/About/About'
import TextConverter from './pages/TextConverter/TextConverter'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import ResetPassword from './pages/ResetPassword/ResetPassword'
import Profile from './pages/Profile/Profile'
import ProfileAccount from './pages/Profile/ProfileAccount'
import ProfileUsage from './pages/Profile/ProfileUsage'
import ProfileBilling from './pages/Profile/ProfileBilling'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import AuthLayout from './components/AuthLayout/AuthLayout'

const TEXT_CONVERTER_SLUGS = [
  'html-to-markdown', 'markdown-to-html',
  'html-to-jsx',      'jsx-to-html',
  'html-to-tsx',      'tsx-to-html',
  'json-to-csv',      'csv-to-json',
  'xml-to-json',      'json-to-xml',
  'yaml-to-json',     'json-to-yaml',
  'base64-encode',    'base64-decode',
]

const IMAGE_CONVERTER_SLUGS = [
  'png-to-jpg', 'webp-to-jpg', 'gif-to-jpg', 'bmp-to-jpg', 'avif-to-jpg', 'tiff-to-jpg',
  'jpg-to-png', 'jpeg-to-png', 'webp-to-png', 'gif-to-png', 'bmp-to-png', 'avif-to-png', 'tiff-to-png',
  'png-to-webp', 'jpg-to-webp', 'jpeg-to-webp', 'gif-to-webp', 'bmp-to-webp', 'avif-to-webp', 'tiff-to-webp',
  'heic-to-jpg', 'heic-to-webp',
]

const COMPRESS_SLUGS = ['compress-jpg', 'compress-png', 'compress-webp']

const SCHEMA_GENERATOR_SLUGS = [
  'product-schema-generator',
  'article-schema-generator',
  'faq-schema-generator',
  'organization-schema-generator',
  'local-business-schema-generator',
  'breadcrumb-schema-generator',
]

export default function App() {
  const init     = useAuthStore(s => s.init)
  const navigate = useNavigate()

  useEffect(() => {
    init().then(() => {
      const returnPath = sessionStorage.getItem('auth:return')
      if (returnPath && useAuthStore.getState().user) {
        sessionStorage.removeItem('auth:return')
        navigate(returnPath, { replace: true })
      }
    })
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="about" element={<About />} />
        {TEXT_CONVERTER_SLUGS.map(slug => (
          <Route key={slug} path={slug} element={<TextConverter />} />
        ))}
        <Route path="meta-tags-generator" element={<MetaTagsGenerator />} />
        <Route path="og-image-generator" element={<OGImageGenerator />} />
        {SCHEMA_GENERATOR_SLUGS.map(slug => (
          <Route key={slug} path={slug} element={<JsonLdGenerator />} />
        ))}
        <Route path="ai/*" element={<AiPage />} />
        <Route path="favicon-generator" element={<FaviconGenerator />} />
        <Route path="webp-converter" element={<WebPConverter />} />
        {IMAGE_CONVERTER_SLUGS.map(slug => (
          <Route key={slug} path={slug} element={<ImageConverter />} />
        ))}
        {COMPRESS_SLUGS.map(slug => (
          <Route key={slug} path={slug} element={<CompressImage />} />
        ))}
        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<Profile />}>
            <Route index        element={<ProfileAccount />} />
            <Route path="usage"   element={<ProfileUsage />} />
            <Route path="billing" element={<ProfileBilling />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="login"           element={<Login />} />
        <Route path="register"        element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password"  element={<ResetPassword />} />
      </Route>
    </Routes>
  )
}
