import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense } from 'react'
import HomePage from '@pages/Home'
import TestPage from '@pages/Test'
import CardPage from '@pages/Card'
import ScrollToTop from '@common/ScrollToTop'
import LoginPage from '@/pages/Login'
import SignUpPage from '@pages/SignUp'
import Navbar from '@common/Navbar'
import PrivateRoute from './components/auth/PrivateRoute'
import ApplyPage from '@pages/Apply'
import ApplyDone from '@pages/ApplyDone'
import My from '@/pages/My'

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/signup" Component={SignUpPage} />
        <Route path="/card/:id" Component={CardPage} />
        <Route
          path="/apply/:id"
          element={
            <PrivateRoute>
              <Suspense fallback={<></>}>
                <ApplyPage />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/apply/done"
          element={
            <PrivateRoute>
              <ApplyDone />
            </PrivateRoute>
          }
        />
        <Route
          path="/my"
          element={
            <PrivateRoute>
              <My />
            </PrivateRoute>
          }
        />
        <Route path="/test" Component={TestPage} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
