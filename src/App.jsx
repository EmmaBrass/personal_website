import { NavLink, Route, Routes } from "react-router-dom"

import About from "./pages/About.jsx"
import Paintings from "./pages/Paintings.jsx"
import CodeArt from "./pages/CodeArt.jsx"
import Robots from "./pages/Robots.jsx"
import Community from "./pages/Community.jsx"
import FaceValue from "./pages/FaceValue.jsx"

const pages = [
  { path: "/about", label: "About", element: <About /> },
  { path: "/paintings", label: "Paintings", element: <Paintings /> },
  { path: "/code-art", label: "Code Art", element: <CodeArt /> },
  { path: "/robots", label: "Robots", element: <Robots /> },
  { path: "/community", label: "Community", element: <Community /> },
  { path: "/face-value", label: "Face Value", element: <FaceValue /> },
]

export default function App() {
  return (
    <div className="siteShell">
      <header className="topBar">
        <NavLink to="/" className="siteName siteNameLink">
          Emma Brass
        </NavLink>
        <nav className="topNav" aria-label="Main navigation">
          {pages.map((page) => (
            <NavLink
              key={page.path}
              to={page.path}
              className={({ isActive }) =>
                `navButton${isActive ? " navButtonActive" : ""}`
              }
            >
              {page.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="pageMain">
        <Routes>
          <Route path="/" element={<About />} />
          {pages.map((page) => (
            <Route key={page.path} path={page.path} element={page.element} />
          ))}
        </Routes>
      </main>
    </div>
  )
}
