import React from 'react'

const Notification = ({ message }) => {
  return (
    <React.Fragment>
      {message !== null && <div className="error">{message}</div>}
    </React.Fragment>
  )
}

export default Notification
