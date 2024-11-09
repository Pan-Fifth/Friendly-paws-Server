const { createNewUser } = require('../../services/auth-service');
const { getChooseEventBydate } = require('../../services/admin-report-service');
const prisma = require('../../configs/prisma');

describe('createNewUser', () => {
    it('should create a new user with email and hashed password', async () => {
        const mockUser = { id: 1, email: 'test@example.com', password: 'hashedPassword' };
        prisma.users.create = jest.fn().mockResolvedValue(mockUser);

        const result = await createNewUser('hashedPassword', 'test@example.com');
        expect(result).toEqual(mockUser);
        expect(prisma.users.create).toHaveBeenCalledWith({
            data: { email: 'test@example.com', password: 'hashedPassword' },
        });
    });
});
describe('getChooseEventBydate', () => {
    it('should fetch events within specified date range', async () => {
        const mockEvents = [{ id: 1, title_th: 'Event 1', description_th: 'event pet expo', location: 'bangna', date_start: new Date(), date_end: new Date() }];
        prisma.events.findMany = jest.fn().mockResolvedValue(mockEvents);

        const result = await getChooseEventBydate('2024-01-01', '2024-01-02');
        expect(result).toEqual(mockEvents);
        expect(prisma.events.findMany).toHaveBeenCalledWith(expect.any(Object));
    });
});