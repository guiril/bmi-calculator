var calculatorBtn = document.querySelector('#calculatorBtn');
var recordList = document.querySelector('.record-list');
var dataList = JSON.parse(localStorage.getItem('dataKey')) || [];

updateList(dataList);

// 計算 BMI
function getBMI() {
  var height = parseInt(document.querySelector('#height').value) / 100;
  var weight = parseInt(document.querySelector('#weight').value);
  var BMI = (weight / (height * height)).toFixed(2);

  var classification = '';
  var color = '';

  var today = new Date();
  var dd = ('0' + today.getDate()).substr(-2);;
  var mm = ('0' + (today.getMonth() + 1)).substr(-2);;
  var yyyy = today.getFullYear();

  var answer = document.querySelector('#answer');

  if (checkNum(height, weight) === false) {
    return;
  }

  if (BMI < 18.5) {
    classification = '過輕';
    color = '#31BAF9';
  } else if (BMI >= 18.5 && BMI <= 24.9) {
    classification = '理想';
    color = '#86D73E';
  } else if (BMI > 24.9 && BMI <= 29.9) {
    classification = '過重';
    color = '#FF982D';
  } else if (BMI > 29.9 && BMI <= 34.9) {
    classification = '輕度肥胖';
    color = '#FF6C02';
  } else if (BMI > 34.9 && BMI <= 39.9) {
    classification = '中度肥胖';
    color = '#FF6C02';
  } else if (BMI > 39.9) {
    classification = '重度肥胖';
    color = '#FF1200';
  }

  var allData = {
    bmiData: BMI,
    weightData: weight,
    heightData: height,
    classData: classification,
    colorData: color,
    dateData: mm + '-' + dd + '-' + yyyy
  };

  // 更新資料 
  dataList.push(allData);
  localStorage.setItem('dataKey', JSON.stringify(dataList));
  updateList(dataList);

  // 寫入答案
  document.querySelector('#showClassification').innerHTML = classification;
  answer.innerHTML = BMI + '<span>BMI</span><a href="" class="reset-icon"></a>';

  answerStyle(color);
};

// 驗證表單
function checkNum(itemOne, itemTwo) {
  if (isNaN(itemOne) || isNaN(itemTwo)) {
    alert('請輸入數字');
    return false;
  } else if (itemOne < 0 || itemTwo < 0) {
    alert('請輸入有效的數字');
    return false;
  }
}

// 答案樣式
function answerStyle(item) {
  var answerColor = document.querySelector('.showAnswer');
  var resetBorder = document.querySelector('.reset-icon');
  calculatorBtn.style.display = "none";
  answerColor.style.display = "block";
  answerColor.style.color = item;
  resetBorder.style.backgroundColor = item;
}

// 更新紀錄
function updateList(item) {
  var str = '';
  for (var i = 0; i < item.length; i++) {
    var color = item[i].colorData;
    var type = item[i].classData;
    var bmi = item[i].bmiData;
    var weight = item[i].weightData;
    var height = item[i].heightData;
    var date = item[i].dateData;
    str += '<li style="border-color: ' + color + ';"><span class="new-txt">' + type + '</span><span class="regu-txt">BMI</span><span class="new-txt">' + bmi + '</span><span class="regu-txt">Wieght</span><span class="new-txt">' + weight + 'kg</span><span class="regu-txt">Height</span><span class="new-txt">' + (height * 100) + 'cm</span> <span class="regu-txt">' + date + '</span><a href="" data-index="' + i + '">清除</a></li>';
  }
  recordList.innerHTML = str;
}

// 清除單筆資料
function removeData(e) {
  e.preventDefault();
  var index = parseInt(e.target.dataset.index);
  if (e.target.nodeName === 'A') {
    dataList.splice(index, 1);
  }
  updateList(dataList);
  localStorage.setItem('dataKey', JSON.stringify(dataList));
}

// 鍵盤
function checkEnter(e) {
  if (e.target.nodeName === 'INPUT' && e.keyCode === 13) {
    getBMI();
  }
}

var inputBox = document.querySelector('.calculator');

calculatorBtn.addEventListener('click', getBMI, false);
recordList.addEventListener('click', removeData, false);
inputBox.addEventListener('keydown', checkEnter, false);