import React, { useState } from 'react'

import Arrows from './Arrows'
import PostData from './PostData'
import './App.css'



const App = () => {
  // ID текущего поста
  const [ currentId, setCurrentId ] = useState(1)

  // Контейнер для кнопок переключения ID и отображения данных поста
  return (
    <div className='wrapper'>
      <Arrows setCurrentId={setCurrentId} currentId={currentId} />
      <PostData id={currentId} />
    </div>
  )
}

export default App
