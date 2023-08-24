# BMI 計算器

六角學院【JavaScript 入門篇 - 學徒的試煉】最終作業

[View the design mockup](https://hexschool.github.io/JavaScript_HomeWork/)

### 功能介紹

* 透過輸入身高與體重來計算身體質量指數 (BMI) (kg/m2)。
* 根據不同的計算結果給予不同的顯示顏色。
* 將每次的計算結果透過列表呈現。

### 實作

* 點擊 `#calculatorBtn` 觸發 click 事件，取得 `#height`, `#weight` 數值。
* `#height`, `#weight` 必須為正數，且不得為空值。
* 將結果儲存在瀏覽器的 `localStorage`，並呈現在網頁上，可透過刪除按鈕移除紀錄。

### 更新紀錄

* 2019/12/3
  * `$ eslint --init`，使用 JavaScript Standard Style
  * 使用 ECMAScript 2015 (ES6) 語法
