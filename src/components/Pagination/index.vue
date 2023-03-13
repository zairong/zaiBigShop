<template>
  <div class="pagination">
    <button :disabled="pageNo === 1" @click="$emit('getPageNo', pageNo - 1)">上一頁</button>
    <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo', 1)" :class="{ active: pageNo === 1 }">1</button>
    <button v-if="startNumAndEndNum.start > 2">···</button>
    <!-- 中間部分 -->
    <!-- 遍歷連續頁碼的結束數位，顯示的是當前頁面大於開始陣列的page -->
    <button v-for="(page, index) in startNumAndEndNum.end" :key="index" v-show="page >= startNumAndEndNum.start"
      @click="$emit('getPageNo', page)" :class="{ active: pageNo === page }">
      {{ page }}
    </button>

    <button v-if="startNumAndEndNum.end < totalPage - 1">···
    </button>
    <button v-if="startNumAndEndNum.end < totalPage" @click="$emit('getPageNo', totalPage)" :class="{ active: pageNo === totalPage }">{{ totalPage }}</button>
    <button :disabled="pageNo == totalPage" @click="$emit('getPageNo', pageNo + 1)">下一頁</button>

    <button style="margin-left: 30px">共 {{ total }} 條</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    // 計算出共多少頁
    totalPage() {
      // 向上取整
      return Math.ceil(this.total / this.pageSize)
    },
    // 計算出連續的頁碼的起始數位和結束數位【連續頁碼的數位：至少是5,才能有連續頁碼】
    startNumAndEndNum() {
      // 先定義兩個變數
      let start = 0,
        end = 0
      // 連續頁碼的數字：至少是5,才能有連續頁碼。所以至少有5頁，也有可能是7
      // 1. 如果資料不夠5頁【不正常現象：總頁數沒有連續頁碼多】
      if (this.continues > this.totalPage) {
        start = 1
        end = this.totalPage
      } else {
        // 正常現象【總頁數>連續頁碼】
        start = this.pageNo - parseInt(this.continues / 2)
        end = this.pageNo + parseInt(this.continues / 2)
        // 2. 把不正常的現象糾正【start數字出現了 0 | 負數】
        if (start < 1) {
          start = 1
          end = this.continues
        }
        // 3. 把不正常的現象糾正【end數字大於總頁碼】
        if (end > this.totalPage) {
          start = this.totalPage - (this.continues - 1)
          end = this.totalPage
        }
      }
      return { start, end }
    },

  }

}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>


