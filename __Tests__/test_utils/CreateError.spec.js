const createError = require('../../utils/createError');

describe('createError Utility', () => {
    it('should throw an error with the specified statusCode and message', () => {
        const statusCode = 400;
        const message = 'Bad Request';

        try {
            createError(statusCode, message);
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error.statusCode).toBe(statusCode);
            expect(error.message).toBe(message);
        }
    });

    it('should throw an error with a different statusCode and message', () => {
        const statusCode = 404;
        const message = 'Not Found';

        try {
            createError(statusCode, message);
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error.statusCode).toBe(statusCode);
            expect(error.message).toBe(message);
        }
    });
});
