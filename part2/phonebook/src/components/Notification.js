import React from 'react'

const Notification = ({ notification }) => {
  const { type } = notification

  return (
    <React.Fragment>
      {notification !== null && (
        <div className={`notification ${type}`}>{notification.message}</div>
      )}
    </React.Fragment>
  )
}

export default Notification
