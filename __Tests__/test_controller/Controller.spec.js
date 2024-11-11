const { sendEmail, getProfile } = require('../../controllers/user-controller');
const { getUserProfile } = require('../../services/user-service');
const createError = require('../../utils/createError');
const sendEmailByNodemailer = require('../../utils/send-email');
const jwt = require('jsonwebtoken');

jest.mock('jsonwebtoken');
jest.mock('../../utils/send-email');
jest.mock('../../utils/createError');

describe('sendEmail Controller', () => {
    it('should send an email if data is valid', async () => {
        const req = {
            headers: { authorization: 'Bearer validToken' },
            body: { recipient: 'test@example.com', subject: 'Test', message: 'Hello' }
        };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();

        jwt.verify.mockImplementation(() => ({ googleId: '123' }));
        sendEmailByNodemailer.mockResolvedValue({ success: true, message: 'Email sent' });

        await sendEmail(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Email sent' });
    });

    it('should return 400 if required fields are missing', async () => {
        const req = {
            headers: { authorization: 'Bearer validToken' },
            body: { subject: 'Test' }
        };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();

        await sendEmail(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Please provide all required fields' });
    });

    it('should return 401 if token is invalid', async () => {
        const req = {
            headers: { authorization: 'Bearer invalidToken' },
            body: { recipient: 'test@example.com', subject: 'Test', message: 'Hello' }
        };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();

        jwt.verify.mockImplementation(() => { throw new Error('Invalid token'); });

        await sendEmail(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Unauthorized: Invalid or expired token',
            error: expect.any(Error)
        });
    });

});


jest.mock('../../services/user-service');
jest.mock('../../utils/createError');

describe('getProfile Controller', () => {
    it('should return user profile if user exists', async () => {
        const req = { user: { id: 1 } };
        const res = { json: jest.fn() };
        const next = jest.fn();

        getUserProfile.mockResolvedValue({ id: 1, firstname: 'John', lastname: 'Doe' });

        await getProfile(req, res, next);

        expect(res.json).toHaveBeenCalledWith({ id: 1, firstname: 'John', lastname: 'Doe' });
    });

    it('should call createError if user is not found', async () => {
        const req = { user: { id: 2 } };
        const res = { json: jest.fn() };
        const next = jest.fn();

        getUserProfile.mockResolvedValue(null);

        await getProfile(req, res, next);

        expect(createError).toHaveBeenCalledWith(404, 'User not found');
    });
});