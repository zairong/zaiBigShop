// 引入mockjs模組
import Mock from 'mockjs'
// 把JSON資料格式引入進來[JSON資料格式根本沒有對外暴露，但是可以引入]
// webpack默認對外暴露的：圖片，JSON資料格式
import banner from './banner.json'
import floor from './floor.json'

// mock數據：第一個參數 請求的位址，第二個參數 請求資料
Mock.mock("/mock/banner",{code:200,data:banner}); // 類比首頁大的輪播圖的資料
Mock.mock("/mock/floor",{code:200,data:floor});  // 模擬樓梯floor


