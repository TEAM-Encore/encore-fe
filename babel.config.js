module.exports = (api) => {
  api.cache(true)
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            //         '@': './src',
            //         '@/assets': './assets',
            api: './codegen/__generated__/api_sdk',
          },
        },
      ],
    ],
  }
}
