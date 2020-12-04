import React from 'react'


const Arrows = ({ currentId, setCurrentId }) => {
  // Дергаем при нажатии на одну из кнопок
  // и меняем ID в state вышележащего компонента
  const handleChangeId = (e) => {
    if (e.currentTarget.dataset.dec) {
      setCurrentId(id => id > 1 ? id - 1 : 1)
    } else if (e.currentTarget.dataset.inc) {
      setCurrentId(id => id < 15 ? id + 1 : 15)
    }
  }

  // Кнопки переключения ID и индикатор текущего ID
  return (
    <div className='arrows-wrapper'>
      <button onClick={handleChangeId} className='btn' data-dec>Dec</button>
      <span className='counter'>{currentId}</span>
      <button onClick={handleChangeId} className='btn' data-inc>Inc</button>
    </div>
  )
}

export default Arrows
