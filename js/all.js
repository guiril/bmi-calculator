var calculatorBtn = document.querySelector('#calculatorBtn');
var recordList = document.querySelector('.record-list');
var dataList = JSON.parse(localStorage.getItem('dataKey')) || [];

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
    return
  }

  if (BMI < 18.5) {
    classification = '過輕';
    color = '#31BAF9'
  } else if (BMI >= 18.5 && BMI <= 24.9) {
    classification = '理想';
    color = '#86D73E'
  } else if (BMI > 24.9 && BMI <= 29.9) {
    classification = '過重';
    color = '#FF982D'
  } else if (BMI > 29.9 && BMI <= 34.9) {
    classification = '輕度肥胖';
    color = '#FF6C02'
  } else if (BMI > 34.9 && BMI <= 39.9) {
    classification = '中度肥胖';
    color = '#FF6C02'
  } else if (BMI > 39.9) {
    classification = '重度肥胖';
    color = '#FF1200'
  }


  var bodyData = {
    'bmiData': BMI,
    'weightData': weight,
    'heightData': height,
    'classData': classification,
    'colorData': color,
    'dateData': mm + '-' + dd + '-' + yyyy
  };

  // 更新資料 
  dataList.push(bodyData);
  updateList(dataList);
  localStorage.setItem('dataKey', JSON.stringify(dataList));

  // 寫入答案
  document.querySelector('#showClassification').innerHTML = classification;
  answer.innerHTML = BMI + '<span>BMI</span><a href="" class="reset-icon"><i class="fas fa-redo"></i></a>';

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
    str += '<li style="border-color: ' + item[i].colorData + ';"><span class="new-txt">' + item[i].classData + '</span><span class="regu-txt">BMI</span><span class="new-txt">' + item[i].bmiData + '</span><span class="regu-txt">Wieght</span><span class="new-txt">' + item[i].weightData + 'kg</span><span class="regu-txt">Height</span><span class="new-txt">' + (item[i].heightData * 100) + 'cm</span> <span class="regu-txt">' + item[i].dateData + '</span><a href="" data-index="' + i + '">清除</a></li>';
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
  localStorage.setItem('dataKey', JSON.stringify(dataList));
  updateList(dataList);
}


// 頁面載入事件
window.onload = init;

function init() {
  // 鍵盤事件
  var inputBox = document.querySelectorAll('.input-box');
  for (var i = 0; i < inputBox.length; i++) {
    inputBox[i].onkeypress = keyPress;
  }
  updateList(dataList);
}

function keyPress(e) {
  if (e.keyCode === 13) {
    getBMI();
  }
}

calculatorBtn.addEventListener('click', getBMI, false);
recordList.addEventListener('click', removeData, false);