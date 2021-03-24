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
    tempData.push({ objDate: item.objDate, objName: item.objName, objPrice: item.objPrice, objType: item.objType, objLabel: '', id: item._id })
    let temp = typeData.filter((items) => {
      return items.code === item.objType
    })
    tempData[index].objLabel = temp[0].label
  })
  return tempData
}

export function handleMemberInfo(data, name) {
  let tempData = []
  data.forEach((item) => {
    tempData.push({userId: item.userId, imgPath: item.imgPath, userName: name}) // 在原有基础上添加userName属性无法加入，需通过push重组数据
  })
  return tempData
}