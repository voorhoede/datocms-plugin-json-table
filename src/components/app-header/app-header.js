import React from 'react'
import './app-header.css'

export default function AppHeader() {
  // This header is only a visual component. It shouldn't be picked up by i.e. screen readers.
  return (
    <p aria-hidden="true" className="app-header">
      <span>Name</span>
      <span>Value</span>
    </p>
  )
}
