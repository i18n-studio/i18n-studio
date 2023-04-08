module.exports = {
  displayName: 'frontend',
  globals: {
    'vue-jest': {
      tsConfig: './apps/frontend/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.jsx$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'vue'],
  testTimeout: 10000,
};
