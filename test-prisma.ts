import { prisma } from './src/lib/prisma';
async function test() {
  const result = await prisma.appointment.findMany();
  console.log('Appointments:', result);
}
test().catch(console.error);
