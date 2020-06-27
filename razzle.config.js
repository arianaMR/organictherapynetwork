module.exports = {
  plugins: [
    'scss',
    {
      name: 'typescript',
      options: {
        useBabel: true,
        useEslint: true,
        forkTsChecker: {
          tslint: undefined,
          watch: './src',
        },
      },
    },
  ],
};
