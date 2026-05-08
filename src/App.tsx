import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "@/pages/Home"
import Blog from "@/pages/Blog"
import BlogPost from "@/pages/BlogPost"
import Workflows from "@/pages/Workflows"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/workflows" element={<Workflows />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
