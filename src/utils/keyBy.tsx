export const keyBy = (arr: any[], key: string | number) =>
  arr.reduce((acc, el) => {
    if (!acc[el[key]]) {
      acc[el[key]] = [el]
    } else {
      acc[el[key]].push(el)
    }
    return acc
  }, {})
