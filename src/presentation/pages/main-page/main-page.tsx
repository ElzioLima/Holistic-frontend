import Styles from './main-page-styles.scss'
import { Header, Footer } from '@/presentation/components'
import React from 'react'

const MainPage: React.FC = () => {
  return (
    <div className={Styles.MainPageWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Acesso Liberado</h2>
      </div>
      <Footer />
    </div>
  )
}

export default MainPage
