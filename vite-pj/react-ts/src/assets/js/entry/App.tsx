import React from 'react'
import ReactDOM from 'react-dom'
import '@css/index.scss'
import Count from '../modules/Count'

ReactDOM.render(
  <React.StrictMode>
    <Count />
  </React.StrictMode>,
  document.getElementById('count')
)
