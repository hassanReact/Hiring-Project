import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      name: 'Alice',
      email: 'alice@example.com',
      role: 'admin',
      otp: '123456',
      otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 min from now
    },
    {
      name: 'Bob',
      email: 'bob@example.com',
      role: 'user',
      otp: '654321',
      otpExpiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 min from now
    },
  ];

  for (const userData of users) {
    const user = await prisma.user.create({ data: userData });
    console.log(`Created user: ${user.email}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
