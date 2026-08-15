module.exports = {
  '**/*.{ts,tsx}': (files) => `eslint --fix ${files.join(' ')}`,
};
