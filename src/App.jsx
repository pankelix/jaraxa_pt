import React from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import DrugDetail from './views/DrugDetail'
import SearchPage from "./views/SearchPage"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/drug/:id" element={<DrugDetail />} />
      </Routes>
    </Router>
  )
}