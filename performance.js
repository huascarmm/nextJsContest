const report = require("./lighthouse.report.desktop.json");
const performanceScore = report.categories.performance.score * 100;
console.log(report.categories.performance.score * 100);

if (performanceScore < 80) {
  throw Error("Performance is less than 80");
}
