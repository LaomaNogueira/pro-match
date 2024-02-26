import { app } from '../../src/main/config/app';
import request from 'supertest';
import { EducationLevel } from '../../src/application/use-cases/utils/education-level.enum';

const defaultProsRoute = '/api/v1/pros';
const wrongRoute = '/api/v1/wrongRoute';
let requestBodyMock: any;

beforeEach(() => {
  requestBodyMock = {
    age: 35,
    education_level: EducationLevel.BACHELORS_DEGREE_OR_HIGH,
    past_experiences: {
      sales: true,
      support: false
    },
    internet_test: {
      download_speed: 69.1,
      upload_speed: 5.1
    },
    writing_score: 0.8,
    referral_code: 'token1234'
  };
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('E2E :: PROFESSIONAL API :: "/api/vi/pros"', () => {
  describe('POST /projects', () => {
    const route = `${defaultProsRoute}/projects`;
    describe('When the request was successful', () => {
      test('should return status 200 and an object with projects are assigned to the professional', async () => {
        const response = await request(app).post(route).send(requestBodyMock);

        expect(response.headers['content-type']).toMatch('application/json');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('score');
        expect(response.body).toHaveProperty('selected_project');
        expect(response.body).toHaveProperty('eligible_projects');
        expect(response.body).toHaveProperty('ineligible_projects');
      });

      test('should return status 200, score 0 and selected_project and eligible_projects fields empty, if the professional is under 18 years', async () => {
        requestBodyMock.age = 17;
        const response = await request(app).post(route).send(requestBodyMock);

        expect(response.headers['content-type']).toMatch('application/json');
        expect(response.status).toBe(200);
        expect(response.body.score).toBe(0);
        expect(response.body.selected_project).toHaveLength(0);
        expect(response.body.eligible_projects).toHaveLength(0);
        expect(response.body).toHaveProperty('ineligible_projects');
      });
    });

    describe('When the request fails', () => {
      test('should return status 400 and formatted error message if body data does not pass validation.', async () => {
        requestBodyMock.age = '35';
        requestBodyMock.internet_test.upload_speed = '65.1';

        const response = await request(app).post(route).send(requestBodyMock);

        expect(response.headers['content-type']).toMatch('application/json');
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('status');
        expect(response.body).toHaveProperty('name');
        expect(response.body.message).toBe(
          'age must be a number conforming to the specified constraints; upload_speed must be a number conforming to the specified constraints'
        );
      });

      test('should return status 404 if the wrong route is sent', async () => {
        const response = await request(app).post(wrongRoute).send(requestBodyMock);

        expect(response.status).toBe(404);
      });
    });
  });
});
