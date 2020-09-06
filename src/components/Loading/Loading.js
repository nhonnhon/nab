import React from 'react'
import PropTypes from 'prop-types'

import './Loading.scss'

const Loading = props => {
  const { text, extraText } = props
  return (
    <div className="loading-container">
      <div className="loading" />
      <span id="loading-text">{text}</span>
      <div className="loading-container__extraText ">
        <p className="loading-container__extraText__text text white">{extraText}</p>
      </div>
    </div>
  )
}

Loading.propTypes = {
  text: PropTypes.string,
}

Loading.defaultProps = {
  text: 'loading',
}

export default Loading
