const path = require("path");
const { ESLint } = require("eslint");

const cli = new ESLint();

const buildEslintCommand = async (filenames) => {
  const ignoredIds = await Promise.all(
    filenames.map((file) => cli.isPathIgnored(file))
  );
  const lintableFiles = filenames.filter((_, i) => !ignoredIds[i]);

  if (lintableFiles.length === 0) {
    return `prettier --write ${filenames}`;
  }

  return [
    `next lint --max-warnings=0  --fix --file ${lintableFiles
      .map((f) => path.relative(process.cwd(), f))
      .join(" --file ")}`,
    `prettier --write ${filenames}`,
  ];
};

module.exports = {
  "*.+(j|t)s?(x)": [buildEslintCommand],
  "!(*.+(j|t)s?(x))": (file) => `prettier --write --ignore-unknown ${file}`,
};
