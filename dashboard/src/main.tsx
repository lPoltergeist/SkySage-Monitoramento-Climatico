import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router'
import WeatherDashboard from './components/weatherDashboard/index.tsx'
import Navbar from './components/navbar/index.tsx'
import Quotes from './components/quotes/index.tsx'
import SignUp from './components/signup/index.tsx'

import PrivateRoute from './helper/privateRoute.tsx'

function Layout() {
  const location = useLocation()

  const hiddenNavBarOn = ['/']

  const hide = hiddenNavBarOn.includes(location.pathname)

  return (
    <>
      {!hide && <Navbar />}

      <Routes>

        <Route index element={<App />} />
        <Route path='signup' element={<SignUp />} />

        <Route path="weather" element={
          <PrivateRoute>
            <WeatherDashboard />
          </PrivateRoute>}
        />

        <Route path="quotable" element={
          <PrivateRoute>
            <Quotes />
          </PrivateRoute>
        } />

      </Routes>

    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Layout />
  </BrowserRouter>
)
