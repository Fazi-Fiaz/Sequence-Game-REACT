export const shuffle = doubleDeck => {
  const arr_val = doubleDeck
  for (let ar = 0; ar < arr_val.length; ar++) {
    let j = parseInt(Math.random() * arr_val.length)
    let temp = arr_val[ar]
    arr_val[ar] = arr_val[j]
    arr_val[j] = temp
  }
  return arr_val
}
