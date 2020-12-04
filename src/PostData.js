import React, { useState, useEffect, useRef } from 'react'

import { delayRandomly, throwRandomly } from './helpers'


const PostData = ({ id }) => {
  // Данные полученного поста
  const [ data, setData ] = useState(null)

  // Место для хранения промиса с запросом
  const lastPromise = useRef()

  // Дергаем, когда меняется ID
  useEffect(() => {
    // Опустошаем данные
    setData(null)

    // Делаем запрос на получение поста с текущим ID
    // взятым из state'а компонента выше и сохранем промис
    const curPromise = fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => res.json())
      .then(async data => {
        await delayRandomly()
        throwRandomly()
        return data
      })

    // Сразу сохраняем промис в ref
    lastPromise.current = curPromise

    // Обрабатываем ответ сервера
    curPromise.then(
      res => {
        // Если это тот же промис, то записываем ответ...
        if (curPromise === lastPromise.current) {
          setData(res)
        }
        // ...иначе не записываем и, соответственно, не обновляем компоненты
      },
      e => {
        // Если это тот же промис, то выдаем ошибку соединения...
        if (curPromise === lastPromise.current) {
          console.warn('fetch failure', e)
        }
      }
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
