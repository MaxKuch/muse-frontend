import React from 'react'
import NewSongs from '../../components/NewSongs'
import PopularSongs from '../../components/PopularSongs'
import Artists from '../../components/Artists'
import Albums from '../../components/Albums'
import Tabs from "../../components/Tabs"
import { ITab } from '../../models/components'
import styles from './MainPage.module.scss'
import { motion, AnimatePresence } from "framer-motion"

interface IModules {
  [key: string]: React.FC
}

const MainPage:React.FC = () => {

  const modules: IModules = {
    new: NewSongs,
    popular: PopularSongs,
    artists: Artists,
    albums: Albums
  }

  const items: ITab[] = [
    {
      value: 'new',
      text: 'Новинки',
    },
    {
      value: 'popular',
      text: 'Популярные',
    },
    {
      value: 'albums',
      text: 'Альбомы'
    },
    {
      value: 'artists',
      text: 'Исполнители'
    }
  ]

  const [CurrentModule, setCurrentModule] = React.useState<{Component: React.FC, key: ITab['value']}>({ key: items[0].value, Component: modules[items[0].value]})

  const onTabChange = (value: ITab['value']) => {
    setCurrentModule({key: value, Component: modules[value]})
  }

  return (
    <>
      <Tabs items={items} onTabChange={onTabChange} />
      <AnimatePresence exitBeforeEnter>
        <motion.div 
          key={CurrentModule.key}
          className={styles.moduleWrapper}
          animate={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -50 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.15, x: { ease: 'backOut'} }}
        >
          <CurrentModule.Component />
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default MainPage