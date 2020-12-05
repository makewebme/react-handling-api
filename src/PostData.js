import React, { useState, useEffect } from 'react'

import { delayRandomly, throwRandomly } from './helpers'


const PostData = ({ id }) => {
  // Данные полученного поста
  const [ data, setData ] = useState(null)

  // Дергаем, когда меняется ID
  useEffect(() => {
    // Опустошаем данные
    setData(null)

    // Создаем AbortController для нового запроса
    const abortController = new AbortController();

    // Делаем запрос на получение поста с текущим ID
    // взятым из state'а компонента выше и сохранем промис
    const curPromise = fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      signal: abortController.signal
    })
      .then(res => res.json())
      .then(async data => {
        await delayRandomly()
        throwRandomly()
        return data
      })

    // Обрабатываем ответ сервера
    curPromise.then(
      res => {
        if (abortController.signal.aborted) {
          return
        }

        setData(res)
      },
      e => console.warn('fetch failure', e)
    )

    // Отменяем запрос, если компонент был за-unmount'чен
    return () => abortController.abort()
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
