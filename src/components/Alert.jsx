import React from 'react'

const Alert = (props) => {
  return (
    <div className="alert">
        <p>{props.message}</p>
    </div>
  )
}

export default Alert