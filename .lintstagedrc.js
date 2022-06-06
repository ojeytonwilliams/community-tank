const path = require("path");

const buildEslintCommand = (filenames) =>
  [`next lint --max-warnings=0  --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`, `prettier --write ${filenames}`];

module.exports = {
  "*.+(j|t)s?(x)": [buildEslintCommand],
  "!(*.+(j|t)s?(x))": (file) => `prettier --write ${file}`,
};
