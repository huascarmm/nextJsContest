const reportDesktop = require("./lighthouse.report.desktop.json");
const reportMobile = require("./lighthouse.report.mobile.json");

const scoreDesktop = reportDesktop.categories.performance.score * 100;
const scoreMobile = reportMobile.categories.performance.score * 100;

console.log(scoreDesktop + " for desktop");
console.log(scoreMobile + " for mobile");

if (scoreDesktop < 80 || scoreMobile < 80) {
  console.error("Performance is less than 80");
}
