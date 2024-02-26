import { faker } from '@faker-js/faker';
import { mapToSnakeCase, mapToCamelCase } from '../../../../src/application/helpers/object-key-mapper.helper';

describe('SRC :: APPLICATION :: HELPERS :: OBJECT KEY MAPPER', () => {
  const camelCaseDataMock = {
    name: faker.person.fullName(),
    myAge: faker.number.int({ min: 1, max: 100 }),
    countryOfOrigin: faker.location.countryCode('alpha-3')
  };

  const snakeCaseDataMock = {
    name: camelCaseDataMock.name,
    my_age: camelCaseDataMock.myAge,
    country_of_origin: camelCaseDataMock.countryOfOrigin
  };

  describe('Given call #mapToSnakeCase', () => {
    describe('When receiving an object with the name of the keys in camel case', () => {
      test('should return an object with a key name in snake case', async () => {
        expect(mapToSnakeCase(camelCaseDataMock)).toStrictEqual(snakeCaseDataMock);
      });
    });
  });

  describe('Given call #mapToCamelCase', () => {
    describe('When receiving an object with the name of the keys in snake case', () => {
      test('should return an object with a key name in camel case', async () => {
        expect(mapToCamelCase(snakeCaseDataMock)).toStrictEqual(camelCaseDataMock);
      });
    });
  });
});
