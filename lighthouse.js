const { exec } = require("child_process");
const url = process.argv[2];

const lighthouse = exec(
  `lighthouse ${url} --emulated-form-factor mobile --view --quiet --throttling-method=provided --chrome-flags='--headless' --output json --output-path=./lighthouse.report.mobile.json && lighthouse ${url} --emulated-form-factor desktop --view --quiet --throttling-method=provided --chrome-flags='--headless' --output json --output-path=./lighthouse.report.desktop.json
      `,
  (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`lighthouse stdout: ${stdout}`);
  }
);
