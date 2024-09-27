import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from '@shared/ScrollToTop'
import Navbar from '@shared/Navbar'

import HomePage from '@pages/Home'
import CardPage from '@pages/Card'
import TestPage from '@pages/Test'
import SigninPage from '@pages/Signin'
import SignupPage from '@pages/Signup'
import ApplyPage from '@pages/Apply'
import ApplyDone from '@pages/ApplyDone'

import PrivateRouter from '@components/auth/PrivateRouter'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/signin" Component={SigninPage} />
        <Route path="/signup" Component={SignupPage} />
        <Route path="/card/:id" Component={CardPage} />
        <Route
          path="/apply/:id"
          element={
            <PrivateRouter>
              <ApplyPage />
            </PrivateRouter>
          }
        />
        <Route
          path="/apply/done"
          element={
            <PrivateRouter>
              <ApplyDone />
            </PrivateRouter>
          }
        />
        <Route path="/test" Component={TestPage} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
