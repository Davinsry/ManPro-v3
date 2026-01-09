const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const admin = await prisma.user.upsert({
        where: { username: 'admin' },
        update: {},
        create: {
            username: 'admin',
            password: '$2b$10$rq1gGLC3rIASgDKIVaogruKf.4xxOiS4Gsin1LPelr5UA.fOboOfu', // admin123
            name: 'Admin PandawaX45',
        },
    });
    console.log({ admin });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
