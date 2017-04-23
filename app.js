require('dotenv').config();

const console = require('keypunch');
console.info(`next-data starting up...`);

const json2csv = require('json2csv');

const { onReady } = require('./keen/Wrappers');
const { makeClient } = require('./keen/Client');
const client = makeClient();

const { run } = require('./dashboard');
const conversionFields = require('./dashboard/conversions');

async function start() {
  await onReady();
  const result = await run(client, conversionFields, '7656');
  const csv = json2csv(result);
  console.log(csv);

  require('fs').writeFileSync('./data.csv', csv);
}

start().catch(err => console.error(err));
