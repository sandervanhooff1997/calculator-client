<template>
  <div id="app" class="pt-5">
    <div class="container">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
      <div class="calculator shadow-md p-3 mb-5 bg-white rounded">
        <div class="calculator-display">
          <div class="calculator-display-answer container-fluid">
            <span>&nbsp;{{ answer }}</span>
          </div>
          <div class="calculator-display-sum container-fluid">
            <span>&nbsp;{{ display }}</span>
          </div>
        </div>
        <div class="calculator-buttons container-fluid">
          <div class="row">
            <div class="col-sm calculator-button">
              <button @click="clear()" class="rounded">C</button>
            </div>
            <div class="col-sm calculator-button">
              <button @click="sign()" class="rounded">+/-</button>
            </div>
            <div class="col-sm calculator-button">
              <button disabled class="rounded"></button>
            </div>
            <div class="col-sm calculator-button">
              <button @click="addOperator('+')" :disabled="!canAddOperator" class="rounded">+</button>
            </div>
          </div>

          <div class="row">
            <div class="col-sm calculator-button">
              <button @click="pressNumber('1')" class="rounded">1</button>
            </div>
            <div class="col-sm calculator-button">
              <button @click="pressNumber('2')" class="rounded">2</button>
            </div>
            <div class="col-sm calculator-button">
              <button @click="pressNumber('3')" class="rounded">3</button>
            </div>
            <div class="col-sm calculator-button">
              <button @click="addOperator('-')" :disabled="!canAddOperator" class="rounded">-</button>
            </div>
          </div>

          <div class="row">
            <div class="col-sm calculator-button">
              <button @click="pressNumber('4')" class="rounded">4</button>
            </div>
            <div class="col-sm calculator-button">
              <button @click="pressNumber('5')" class="rounded">5</button>
            </div>
            <div class="col-sm calculator-button">
              <button @click="pressNumber('6')" class="rounded">6</button>
            </div>
            <div class="col-sm calculator-button">
              <button @click="addOperator('*')" :disabled="!canAddOperator" class="rounded">*</button>
            </div>
          </div>

          <div class="row">
            <div class="col-sm calculator-button">
              <button @click="pressNumber('7')" class="rounded">7</button>
            </div>
            <div class="col-sm calculator-button">
              <button @click="pressNumber('8')" class="rounded">8</button>
            </div>
            <div class="col-sm calculator-button">
              <button @click="pressNumber('9')" class="rounded">9</button>
            </div>
            <div class="col-sm calculator-button">
              <button @click="addOperator('/')" :disabled="!canAddOperator" class="rounded">/</button>
            </div>
          </div>

          <div class="row">
            <div class="col-sm calculator-button">
              <button disabled class="rounded"></button>
            </div>
            <div class="col-sm calculator-button">
              <button @click="pressNumber('0')" class="rounded">0</button>
            </div>
            <div class="col-sm calculator-button">
              <button @click="comma" class="rounded">,</button>
            </div>
            <div class="col-sm calculator-button">
              <button @click="calculate()" :disabled="!canCalculate" class="rounded">=</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";

export default {
  name: "app",
  data() {
    return {
      title: "Rekenmachine",
      description: "Optellen, aftrekken, vermenigvuldigen en delen.",
      num1: "",
      num2: "",
      operator: "",
      answer: ""
    };
  },
  methods: {
    pressNumber(number) {
      if (this.answer != "") this.clear();

      if (this.operator == "") this.num1 += number;
      else this.num2 += number;
    },
    clear() {
      this.num1 = "";
      this.num2 = "";
      this.operator = "";
      this.answer = "";
    },
    addOperator(operator) {
      if (this.num1 != "" && this.num2 == "") {
        this.operator = operator;
      }
    },
    sign() {
      if (this.num1 != "" && this.num2 == "")
        this.num1 = this.signNumber(this.num1);
      else if (this.num2 != "") this.num2 = this.signNumber(this.num2);
    },
    signNumber(number) {
      return number.charAt(0) === "-" ? number.slice(1) : `-${number}`;
    },
    comma() {
      if (this.num2 == "" && this.num1.indexOf(",") === -1) this.num1 += ",";
      else if (this.num2.indexOf(",") === -1 && this.operator != "")
        this.num2 += ",";
    },
    async calculate() {
      if (!this.calculate) return;

      var response = await api.calculate(this.num1, this.num2, this.operator);

      if (response) this.answer = response.answerString;
    }
  },
  computed: {
    display() {
      return `${this.num1} ${this.operator} ${this.num2}`;
    },
    canAddOperator() {
      return this.num1 != "" && this.num2 == "";
    },
    canCalculate() {
      return this.num1 != "" && this.operator != "" && this.num2 != "";
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Poppins:300,500&display=swap");

html,
body,
#app {
  height: 100%;
}
#app {
  background-color: #3fa9fc;
  font-family: "Poppins";
  text-align: center;
  color: #fff;
}
.calculator {
  display: inline-block;
  background: #fff;
  color: #000;
}
.calculator-display-answer {
  font-size: 35px;
  color: #3fa9fc;
}
.calculator-display-sum {
  display: inline-block;
  overflow-x: auto;
  width: 300px;
  white-space: nowrap;
}
.calculator-button {
  padding: 0;
  margin: 5px;
}
.calculator-button button {
  width: 70px;
  height: 70px;
  border: 1px solid rgba(0, 144, 255, 0.1);
  font-size: 30px;
  font-weight: 300;
  line-height: 2.4;
  background: rgba(0, 144, 255, 0.1);
  box-shadow: 0px 5px 0px rgba(0, 144, 255, 0.3);
  position: relative;
  top: 0px;
  transition: all ease 0.1s;
  outline: none;
}
.calculator-button button:active {
  box-shadow: 0 3px 0 rgba(0, 144, 255, 0.3);
  top: 3px;
}
</style>
