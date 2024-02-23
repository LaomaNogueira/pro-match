import { faker } from '@faker-js/faker';
import { mapToSnakeCase } from '../../../../src/application/helpers/map-to-snake-case.helper';

describe('SRC :: APPLICATION :: HELPERS :: MAP TO SNAKE CASE', () => {
  describe('Given call #mapToSnakeCase', () => {
    describe('When receiving an object with the name of the keys in camel case', () => {
      const originalDataMock = {
        name: faker.person.fullName(),
        myAge: faker.number.int({ min: 1, max: 100 }),
        countryOfOrigin: faker.location.countryCode('alpha-3')
      };

      test('should return an object with a key name in snake case', async () => {
        const expectedDataMock = {
          name: originalDataMock.name,
          my_age: originalDataMock.myAge,
          country_of_origin: originalDataMock.countryOfOrigin
        };

        expect(mapToSnakeCase(originalDataMock)).toStrictEqual(expectedDataMock);
      });
    });
  });
});
