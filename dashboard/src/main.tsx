import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router'

import PrivateRoute from './helper/privateRoute.tsx'
import NotFound from './pages/404/404page.tsx'
import Navbar from './components/navbar/index.tsx'
import WeatherDashboard from './pages/weather/index.tsx'
import Quotes from './pages/quotable/index.tsx'
import SignUp from './pages/signup/index.tsx'
import SignIn from './pages/signin/index.tsx'

function Layout() {
  const location = useLocation()

  const showNavBarOn = ['/', '/quotable']

  const show = showNavBarOn.includes(location.pathname)

  return (
    <>
      {show && <Navbar />}

      <Routes>

        <Route index element={
          <PrivateRoute>
            <WeatherDashboard />
          </PrivateRoute>}
        />

        <Route path="quotable" element={
          <PrivateRoute>
            <Quotes />
          </PrivateRoute>
        } />

        <Route path='signin' element={<SignIn />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='*' element={<NotFound />} />

      </Routes>

    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Layout />
  </BrowserRouter>
)
