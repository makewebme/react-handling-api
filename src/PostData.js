import React, { useState, useEffect } from 'react'


const PostData = ({ id }) => {
  // Данные полученного поста
  const [ data, setData ] = useState(null)

  // Дергаем, когда меняется ID
  useEffect(() => {
    // Опустошаем данные
    setData(null)

    // Делаем запрос на получение поста с текущим ID
    // взятым из state'а компонента выше
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => res.json())
      .then(
        (result) => setData(result), // Дергаем если данные успешно получены
        (e) => console.warn('fetch failure', e) // Дергаем, если произошла ошибка запроса
      )
  }, [ id ])

  // Отображаем данные поста или лоадер
  return (
    <div className='post-wrapper'>
      {data ? (
        <div>
          <h2>
            ID: {data.id}<br/>
            {data.title}
          </h2>
        </div>
      ) : 'Loading...'}
    </div>
  )
}

export default PostData
