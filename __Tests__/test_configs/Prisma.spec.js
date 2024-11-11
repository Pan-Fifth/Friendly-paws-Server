
const { PrismaClient } = require('@prisma/client');
const prisma = require('../../configs/prisma')

describe('Prisma client', () => {
    it('should have users property', () => {
        expect(prisma.users).toBeDefined();
    });

    it('should have pets property', () => {
        expect(prisma.pets).toBeDefined();
    });

    it('should have events property', () => {
        expect(prisma.events).toBeDefined();
    });
    it('should have adopts property', () => {
        expect(prisma.adopts).toBeDefined();
    });
    it('should have donates property', () => {
        expect(prisma.donates).toBeDefined();
    });
});
