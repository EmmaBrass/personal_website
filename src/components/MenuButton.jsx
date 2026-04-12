import React from "react"
import menuPhoto from "../assets/menu.jpg"

export default function MenuButton({ isOpen, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`menuBtn ${isOpen ? "open" : ""}`}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      <span className="menuIcon" aria-hidden="true">
        <span className="burger">
          <span className="line l1" />
          <span className="line l2" />
          <span className="line l3" />
        </span>

        <span
          className="menuPhoto"
          style={{ backgroundImage: `url(${menuPhoto})` }}
        />
      </span>
    </button>
  )
}