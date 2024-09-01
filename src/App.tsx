import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '@pages/Home'
import CardPage from '@pages/Card'
import TestPage from '@pages/Test'
import ScrollToTop from '@shared/ScrollToTop'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/card/:id" Component={CardPage} />
        <Route path="/test" Component={TestPage} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
