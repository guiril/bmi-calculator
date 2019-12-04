(function () {
  const getEl = (el) => {
    return document.querySelector(el)
  }
  const heightEl = getEl('#height')
  const weightEl = getEl('#weight')
  const calculatorBtn = getEl('#calculatorBtn')
  const answerContainer = getEl('.calculator-answer-container')
  const answerReturn = getEl('.calculator-return')
  const recordList = getEl('.record-list')
  const dataList = JSON.parse(localStorage.getItem('dataKey')) || []

  // 更新紀錄
  const updateList = (item) => {
    let str = ''
    for (var i = 0; i < item.length; i++) {
      const color = item[i].color
      const degree = item[i].degree
      const bmi = item[i].bmi
      const weight = item[i].weight
      const height = item[i].height
      const date = item[i].date
      str += `<li style="border-color: ${color};">
        <span>${degree}</span>
        <span><span class="sm-txt">BMI</span>${bmi}</span>
        <span><span class="sm-txt">Wieght</span>${weight}kg</span>
        <span><span class="sm-txt">Height</span>${height * 100}cm</span>
        <span class="sm-txt">${date}</span>
        <a href="#" data-index="${i}">清除</a>
        </li>`
    }
    recordList.innerHTML = str
  }

  updateList(dataList)

  // 計算 BMI
  const getBMI = (height, weight) => {
    height = parseInt(height) / 100 // 將字串轉成數字
    weight = parseInt(weight)
    const BMI = (weight / (height * height)).toFixed(2) // 取到小數點第二位

    const answerNumber = getEl('#number')
    const answerDegree = getEl('.calculator-degree')

    let degree = ''
    let color = ''

    const currentTime = new Date()
    const dd = ('0' + currentTime.getDate()).substr(-2) // 前面補 0 並取後兩位數字
    const mm = ('0' + (currentTime.getMonth() + 1)).substr(-2)
    const yyyy = currentTime.getFullYear()

    if (BMI < 18.5) {
      degree = '過輕'
      color = '#31BAF9'
    } else if (BMI >= 18.5 && BMI <= 24.9) {
      degree = '理想'
      color = '#86D73E'
    } else if (BMI > 24.9 && BMI <= 29.9) {
      degree = '過重'
      color = '#FF982D'
    } else if (BMI > 29.9 && BMI <= 34.9) {
      degree = '輕度肥胖'
      color = '#FF6C02'
    } else if (BMI > 34.9 && BMI <= 39.9) {
      degree = '中度肥胖'
      color = '#FF6C02'
    } else if (BMI > 39.9) {
      degree = '重度肥胖'
      color = '#FF1200'
    }

    answerNumber.textContent = BMI
    answerDegree.textContent = degree

    calculatorBtn.style.display = 'none'
    answerContainer.style.display = 'flex'
    answerContainer.style.color = color
    answerReturn.style.backgroundColor = color

    const allData = {
      bmi: BMI,
      weight: weight,
      height: height,
      degree: degree,
      color: color,
      date: `${mm}-${dd}-${yyyy}`
    }

    // 更新記錄
    dataList.push(allData)
    localStorage.setItem('dataKey', JSON.stringify(dataList))
    updateList(dataList)
  }

  // 驗證填入的值是否為數字
  const isNumber = () => {
    const heightValue = heightEl.value // 不在全域宣告是因為會讀取到最初的值
    const weightValue = weightEl.value
    if (!heightValue) {
      alert('請輸入身高')
    } else if (!weightValue) {
      alert('請輸入體重')
    } else if (isNaN(heightValue) || isNaN(weightValue)) {
      alert('請輸入數字')
    } else if (heightValue < 0 || weightValue < 0) {
      alert('請輸入有效的數字')
    } else {
      getBMI(heightValue, weightValue)
    }
  }

  // 清除單筆資料
  const removeData = (e) => {
    e.preventDefault()
    var index = parseInt(e.target.dataset.index)
    if (e.target.nodeName === 'A') {
      dataList.splice(index, 1)
    }
    updateList(dataList)
    localStorage.setItem('dataKey', JSON.stringify(dataList))
  }

  // 鍵盤
  const checkEnter = (e) => {
    if (e.keyCode === 13) {
      isNumber()
    }
  }

  calculatorBtn.addEventListener('click', isNumber, false)
  answerReturn.addEventListener('click', () => {
    calculatorBtn.style.display = 'block'
    answerContainer.style.display = 'none'
    heightEl.value = ''
    weightEl.value = ''
  }, false)
  recordList.addEventListener('click', removeData, false)
  heightEl.addEventListener('keydown', checkEnter, false)
  weightEl.addEventListener('keydown', checkEnter, false)
})()
