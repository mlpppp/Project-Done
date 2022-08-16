import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
// components

export default function HomePg() {
  const { user } =  useAuthContext()
  return (
    <div>
      <div className="dash-board">
        <h2>Dashboard</h2>
        <ul>

        </ul>
      </div>
    </div>
  )
}
