import React from 'react'
import NavBar from '../NavBar';

export default function MainLayout({ children }) {
  return (
    <div>
      <NavBar/>
      <div className="container mt-4">
        {children}
      </div>
    </div>
  )
}
