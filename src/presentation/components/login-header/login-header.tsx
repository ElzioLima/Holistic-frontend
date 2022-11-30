import Styles from './login-header-styles.scss'
import React, { memo } from 'react'

const LoginHeader: React.FC = () => {
  return (
    <header className={Styles.headerWrap}>
      <h1>Holistic</h1>
    </header>
  )
}

export default memo(LoginHeader)
