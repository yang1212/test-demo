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

export function handlBillDeatailList (orginData, typeData) {
  // orginData中的对象无法添加新属性，不是很懂
  // orginData.forEach((item, index) => {
  //   item['objLabel'] = ''
  // })
  let tempData = []
  orginData.forEach((item, index) => {
    tempData.push({ objDate: item.objDate, objName: item.objName, objPrice: item.objPrice, objType: item.objType, objLabel: '' })
    let temp = typeData.filter((items) => {
      return items.code === item.objType
    })
    tempData[index].objLabel = temp[0].label
  })
  return tempData
}