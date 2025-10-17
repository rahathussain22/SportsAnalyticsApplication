import React, { useState } from 'react'
import '../assets/styles/QuickAction.css'

function QuickAction() {
  const [activeIndex, setActiveIndex] = useState(0)

  const actionList = [
    "Add New Sport",
    "Add New League",
    "Create Article"
  ]

  return (
    <div className="quickAction">
      <h2>Quick Action</h2>
      <ul>
        {actionList.map((action, index) => (
          <li
            key={index}
            className={activeIndex === index ? 'active' : ''}
            onClick={() => setActiveIndex(index)}
          >
            {action}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default QuickAction
