export function handleCountData (orginData, typeData) {
  let tempData = []
  typeData.forEach((item, index) => {
    tempData.push({type: item.code, label: item.label, value: 0})
    orginData.forEach((items) => {
      if (item.code === items.objType) {
        tempData[index].value += Number(items.objPrice)
      }
    })
  })
  return tempData
}