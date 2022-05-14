export const formatNumber = (n: number) => `${n > 9 ? n : '0'+n}`

export const formatTime = (t: number) => `${formatNumber(Math.floor(t / 60))}:${formatNumber(Math.floor(t % 60))}`

export const shuffle = (array: Array<any>): Array<any> => {
    const shArray = [...array]
    for (let i = shArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))
      const buf = shArray[j]
      shArray[j] = shArray[i]
      shArray[i] = buf
    }
    return shArray
  }