import axios from "axios";

const client = axios.create({
  baseURL: "https://localhost:5001/api/calculator",
  json: true
});

const formatNumber = num => {
  return parseFloat(num.replace(/,/g, "."));
};

export default {
  async execute(method, resource, data) {
    return client({
      method,
      url: resource,
      data
    }).then(req => {
      return req.data;
    });
  },
  calculate(num1, num2, operator) {
    return this.execute("post", "/calculate", {
      num1: formatNumber(num1),
      num2: formatNumber(num2),
      operatorString: operator
    });
  }
  // add(num1, num2) {
  //   return this.execute("post", "/add", {
  //     num1: formatNumber(num1),
  //     num2: formatNumber(num2),
  //     operatorString: "+"
  //   });
  // },
  // subtract(num1, num2) {
  //   return this.execute("post", "/subtract", {
  //     num1: formatNumber(num1),
  //     num2: formatNumber(num2),
  //     operatorString: "-"
  //   });
  // },
  // multiply(num1, num2) {
  //   return this.execute("post", "/multiply", {
  //     num1: formatNumber(num1),
  //     num2: formatNumber(num2),
  //     operatorString: "*"
  //   });
  // },
  // devide(num1, num2) {
  //   return this.execute("post", "/devide", {
  //     num1: formatNumber(num1),
  //     num2: formatNumber(num2),
  //     operatorString: "/"
  //   });
  // }
};
