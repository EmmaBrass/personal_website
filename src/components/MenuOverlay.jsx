import React from "react"
import { NavLink } from "react-router-dom"

const links = [
  { to: "/", label: "Home" },
  { to: "/face-value", label: "Face Value" },
  { to: "/community", label: "Community" },
  { to: "/paintings", label: "Paintings" },
  { to: "/painting-robots", label: "Painting Robots" },
  { to: "/about", label: "About" },
]

export default function MenuOverlay({ isOpen, onClose }) {
  return (
    <div className={`overlay ${isOpen ? "show" : ""}`}>
      <button
        className="backdrop"
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        tabIndex={isOpen ? 0 : -1}
      />
      <nav className="panel" aria-label="Site menu">
        <div className="panelTitle">Menu</div>
        <div className="links">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `link ${isActive ? "active" : ""}`}
              onClick={onClose}
              end={l.to === "/"}
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}