import jestBaseConfig from './jest.config';

export default {
  ...jestBaseConfig,
  displayName: 'integration-tests',
  testRegex: 'integration/.*\\.spec\\.ts$'
};
