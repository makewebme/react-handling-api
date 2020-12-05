import React, { useState, useEffect, useRef } from 'react'

import { delayRandomly, throwRandomly } from './helpers'


const PostData = ({ id }) => {
  // Данные полученного поста
  const [ data, setData ] = useState(null)

  // Место для хранения свежайшего AbortController'а
  const lastAbortController = useRef()

  // Дергаем, когда меняется ID
  useEffect(() => {
    // Опустошаем данные
    setData(null)

    // Если уже есть сохранённый AbortController, то отменяем его
    if (lastAbortController.current) {
      lastAbortController.current.abort()
    }

    // Создаем AbortController для нового запроса и сохраняем его
    const curAbortController = new AbortController()
    lastAbortController.current = curAbortController

    // Делаем запрос на получение поста с текущим ID
    // взятым из state'а компонента выше и сохранем промис
    const curPromise = fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      signal: curAbortController.signal
    })
      .then(res => res.json())
      .then(async data => {
        await delayRandomly()
        throwRandomly()
        return data
      })

    // Обрабатываем ответ сервера
    curPromise.then(
      res => setData(res),
      e => console.warn('fetch failure', e)
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
