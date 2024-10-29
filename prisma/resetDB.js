require('dotenv').config()
const prisma = require('../configs/prisma')


async function run() {
    await prisma.$executeRawUnsafe('DROP DATABASE group_project5')
    await prisma.$executeRawUnsafe('CREATE DATABASE group_project5')
}

console.log('Reset DB...')
run()
