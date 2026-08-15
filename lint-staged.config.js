module.exports = {
  'apps/web/**/*.{js,jsx}': (files) =>
    `pnpm --filter @lingualink/web exec eslint --fix ${files.join(' ')}`,
};
