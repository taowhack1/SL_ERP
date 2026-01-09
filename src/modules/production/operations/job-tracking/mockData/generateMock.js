const fs = require('fs');
const moment = require('moment');

const EVENT_TYPES = ['RM_WITHDRAWAL', 'PK_WITHDRAWAL', 'RM_ENTRY', 'PK_ENTRY', 'PLAN_DATE', 'DELIVERY_DATE'];
const PRODUCT_NAMES = ['Standard Product', 'Premium Product', 'Economy Product', 'Custom Product', 'Special Order', 'Bulk Order', 'Express Order', 'Limited Edition', 'Exclusive Product', 'Regular Product'];
const NOTES_SAMPLES = ['Quality checked', 'Waiting for customer confirmation', 'Special materials - handle with care', 'Rush order - urgent', 'Data has been modified', 'Delivered on schedule', 'In production', 'Waiting for additional materials'];

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const jobs = [];
for (let i = 1; i <= 1000; i++) {
  const id = i;
  const jobNo = `J${String(i).padStart(4, '0')}`;
  const name = `${randomElement(PRODUCT_NAMES)} - Batch ${randomInt(1, 100)}`;
  const qty = randomInt(10, 1000);
  const baseDate = moment('2026-01-01').add(randomInt(0, 330), 'days');
  
  const dates = {
    rmWithdrawal: baseDate.format('YYYY-MM-DD'),
    pkWithdrawal: baseDate.clone().add(randomInt(1, 3), 'days').format('YYYY-MM-DD'),
    rmEntry: baseDate.clone().add(randomInt(4, 10), 'days').format('YYYY-MM-DD'),
    pkEntry: baseDate.clone().add(randomInt(11, 15), 'days').format('YYYY-MM-DD'),
    planDate: baseDate.clone().add(randomInt(16, 25), 'days').format('YYYY-MM-DD'),
    deliveryDate: baseDate.clone().add(randomInt(26, 45), 'days').format('YYYY-MM-DD')
  };
  
  const notes = [];
  const notesCount = randomInt(0, 3);
  for (let k = 0; k < notesCount; k++) {
    notes.push({
      id: k + 1,
      jobId: id,
      notes: randomElement(NOTES_SAMPLES),
      updatedAt: moment(dates.rmWithdrawal).add(randomInt(0, 30), 'days').format('YYYY-MM-DD HH:mm:ss')
    });
  }
  
  const events = [];
  const eventCount = randomInt(5, 8);
  let eventId = id * 100;
  for (let k = 0; k < eventCount; k++) {
    const eventType = randomElement(EVENT_TYPES);
    const eventDate = baseDate.clone().add(randomInt(0, 40), 'days').format('YYYY-MM-DD');
    const isActive = Math.random() > 0.1;
    const eventNotes = Math.random() > 0.5 ? [{
      id: 1,
      eventId: eventId,
      notes: randomElement(NOTES_SAMPLES),
      updatedAt: moment(eventDate).add(randomInt(0, 5), 'hours').format('YYYY-MM-DD HH:mm:ss')
    }] : [];
    
    events.push({
      id: eventId++,
      jobId: id,
      eventType,
      date: eventDate,
      isActive,
      createdAt: moment(eventDate).format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment(eventDate).add(randomInt(0, 10), 'hours').format('YYYY-MM-DD HH:mm:ss'),
      notes: eventNotes
    });
  }
  
  jobs.push({ id, jobNo, name, qty, dates, notes, events });
}

console.log(`Generated ${jobs.length} jobs with ${jobs.reduce((s, j) => s + j.events.length, 0)} events`);
fs.writeFileSync('jobStatusReportMockData.json', JSON.stringify({ jobs }, null, 2), 'utf8');
console.log('Mock data saved successfully');
