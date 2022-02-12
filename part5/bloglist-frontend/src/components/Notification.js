import React from 'react'

const Notification = ({ notification }) => {
  const { type, message } = notification

  return (
      notification !== null && (
        <div className={`notification ${type}`}>{message}</div>
      )
  )
}

export default Notification
