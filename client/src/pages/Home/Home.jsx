import React from 'react'
import styles from './Home.module.css'
import Header from '../../components/Header/Header'
import Editor from '../../components/Editor/Editor'

const Home = () => {
  return (
    <div className={styles.home}>
        <Header />
        <Editor />
    </div>
  )
}

export default Home