const { authenticate } = require('../../middlewares/authenticate');
const { registerAuthen, loginAuthen, adoptValidationSchema } = require('../../middlewares/validator');
const createError = require('../../utils/createError');
const jwt = require('jsonwebtoken');

describe('Authenticate Middleware', () => {
    it('should proceed if token is valid', () => {
        const req = { headers: { authorization: 'Bearer validToken' } };
        const res = {};
        const next = jest.fn();

        jwt.verify.mockImplementation((token, secret, callback) => {
            callback(null, { user: { id: 1 } });
        });

        authenticate(req, res, next);
        expect(next).toHaveBeenCalled();
    });

    it('should call createError with 401 if token is missing', () => {
        const req = { headers: {} };
        const res = {};
        const next = jest.fn();

        authenticate(req, res, next);
        expect(createError).toHaveBeenCalledWith(401, 'Token missing');
    });
});



jest.mock('../../utils/createError');
jest.mock('jsonwebtoken');

describe('Validation Middleware', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('registerAuthen', () => {
        it('should proceed if data is valid', () => {
            const req = { body: { email: 'test@example.com', password: 'Password123!', confirmPassword: 'Password123!' } };
            const res = {};
            const next = jest.fn();

            registerAuthen(req, res, next);
            expect(next).toHaveBeenCalled();
        });

        it('should return 400 if email is missing', () => {
            const req = { body: { password: 'Password123!', confirmPassword: 'Password123!' } };
            const res = {};
            const next = jest.fn();

            registerAuthen(req, res, next);
            expect(createError).toHaveBeenCalledWith(400, expect.stringContaining('email'));
        });

        it('should return 400 if passwords do not match', () => {
            const req = { body: { email: 'test@example.com', password: 'Password123!', confirmPassword: 'Password124!' } };
            const res = {};
            const next = jest.fn();

            registerAuthen(req, res, next);
            expect(createError).toHaveBeenCalledWith(400, 'Password does not match');
        });
    });

    describe('loginAuthen', () => {
        it('should proceed if data is valid', () => {
            const req = { body: { email: 'test@example.com', password: 'Password123!' } };
            const res = {};
            const next = jest.fn();

            loginAuthen(req, res, next);
            expect(next).toHaveBeenCalled();
        });

        it('should return 400 if password is missing', () => {
            const req = { body: { email: 'test@example.com' } };
            const res = {};
            const next = jest.fn();

            loginAuthen(req, res, next);
            expect(createError).toHaveBeenCalledWith(400, expect.stringContaining('password'));
        });
    });
});
