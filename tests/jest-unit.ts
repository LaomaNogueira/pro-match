import jestBaseConfig from './jest.config';

export default {
  ...jestBaseConfig,
  displayName: 'unit-tests',
  testRegex: 'unit/.*\\.spec\\.ts$'
};
