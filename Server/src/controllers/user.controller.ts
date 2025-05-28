import asyncHandler from 'express-async-handler';
import prisma from '../../db/db.config';

const validRoles = ['Builder', 'Broker', 'Property Owner', 'Property Seeker'];

export const assignRole = asyncHandler(async (req: any, res) => {
  const { role } = req.body;
  if (!validRoles.includes(role)) {
    res.status(400);
    throw new Error('Invalid role');
  }

  const user = await prisma.user.update({
    where: { email: req.user.email },
    data: { role },
  });

  res.json({ message: 'Role assigned', role: user.role });
});

export const getProfile = asyncHandler(async (req: any, res) => {
  const user = await prisma.user.findUnique({
    where: { email: req.user.email },
    select: { email: true, name: true, role: true },
  });

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json(user);
});

export const updateName = asyncHandler(async (req: any, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400);
    throw new Error('Name is required');
  }

  const user = await prisma.user.update({
    where: { email: req.user.email },
    data: { name },
  });

  res.json({ message: 'Name updated', name: user.name });
});
