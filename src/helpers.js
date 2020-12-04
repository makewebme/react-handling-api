import { sample } from 'lodash'


// Возвращаем промис, который резолвится через случайный timeout
export const delayRandomly = () => {
  const timeout = sample([ 0, 200, 500, 700, 1000, 3000 ])
  return new Promise(resolve => setTimeout(resolve, timeout))
};

// Дергаем ошибку случайным образом, эмулирую проблему с приходом запроса
// (вдруг, скажем, сеть отвалилась). Шанс 1 к 4.
export const throwRandomly = () => {
  const shouldThrow = sample([ true, false, false, false ])
  if (shouldThrow) throw new Error('Симулированная проблема с сетью')
}
