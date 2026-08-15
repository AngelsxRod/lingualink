module.exports = {
  '**/*.{ts,tsx}': (files) => {
    const lintable = files.filter((f) => !f.endsWith('.d.ts'));
    return lintable.length ? `eslint --fix ${lintable.join(' ')}` : 'true';
  },
};
