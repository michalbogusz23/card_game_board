<template>
  <div class="card flex justify-around items-center shadow-4">
    <div v-if="!reversed">
      <div class="flex justify-around">
        {{this.value}}
      </div>
      <div class="flex justify-around suit">
        <span :style="{color: suitColor}">{{suitSymbol}}</span>
      </div>
    </div>
    <div v-if="reversed" class="reversed">
      ❖
    </div>
  </div>
</template>
<script>
export default {
  name: "GameCard",
  props: {
    value: {
      validator(value) {
        return ["A", "2", "3", "4", "5", "6", "7", "8", "9", "J", "Q", "K"].includes(value)
      }
    },
    suit: {
      validator(value) {
        return ["diamonds", "hearts", "clubs", "spades"].includes(value)
      }
    },
    reversed: Boolean,
  },
  data() {
    return {
      mapSuitToSymbol: {
        "diamonds": "♦",
        "hearts": "♥",
        "clubs": "♣",
        "spades": "♠",
      },
    }
  },
  computed: {
    suitColor() {
      if(["hearts", "diamonds"].includes(this.suit)) return "red";
      return "black";
    },
    suitSymbol() {
      return this.mapSuitToSymbol[this.suit];
    }
  }
}
</script>
<style>
.card {
  /*border: 1px black solid;*/
  background: white;
  color: black;
  width: 40px;
  height: 60px;
  border-radius: 4px;
  font-size: 20px;
  transition: transform 300ms;
}
.suit {
  font-size: 30px;
  line-height: 0.8;
}
.reversed {
  font-size: 40px;
  color: #333333;
}
</style>
