import connectMongo from '@/lib/mongodb';
import StudentIdCounter from '@/models/studentId';

export async function POST(req) {
  const { studentId } = await req.json();

  if (!studentId) {
    return Response.json({ error: 'studentId is required' }, { status: 400 });
  }

  await connectMongo();

  // Extract counter part from ID — assume format: QCS-I-25-001
  const parts = studentId.split('-');
  const countPart = parts[3]; // '001'

  if (!countPart || isNaN(countPart)) {
    return Response.json({ error: 'Invalid studentId format' }, { status: 400 });
  }

  const extractedCount = parseInt(countPart, 10); // Convert '001' → 1
  const year = new Date().getFullYear();

  let counter = await StudentIdCounter.findOne({ year });

  if (!counter) {
    counter = await StudentIdCounter.create({ year, count: 0 });
  }

  if (extractedCount > counter.count) {
    counter.count = extractedCount;
    await counter.save();
  }

  return Response.json({ currentCount: counter.count }, { status: 200 });
}


export async function GET() {
  await connectMongo();

  const year = new Date().getFullYear();
  const shortYear = String(year).slice(-2);

  let counter = await StudentIdCounter.findOne({ year });

  if (!counter) {
    counter = await StudentIdCounter.create({ year, count: 0 });
  }

  const nextCount = counter.count + 1;
  const padded = String(nextCount).padStart(3, '0');
  const studentId = `QCS-I-${shortYear}-${padded}`;

  return Response.json({ studentId }, { status: 200 });
}
