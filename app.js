require('dotenv').config();

const console = require('keypunch');
console.info(`next-data starting up...`);

const json2csv = require('json2csv');

const { onReady } = require('./keen/Wrappers');
const { makeClient } = require('./keen/Client');
const client = makeClient();

const { run } = require('./dashboard');
const conversionFields = require('./dashboard/conversions');

const slack = require('slack');
const bot = slack.rtm.client();
const token = process.env.SLACK_TOKEN;
const magicPhrase = process.env.MAGIC_PHRASE;

async function calculate(campaignId) {
  await onReady();
  const result = await run(client, conversionFields, campaignId);
  const csv = json2csv(result);

  require('fs').writeFileSync('./data.csv', csv);
  return csv;
}

calculate(7656).catch(err => console.error(err));

//TODO
// - list of cohort queries, use the same naming scheme
// - the cohort function wrapper handles placing the vars in it
// - what generates the cohorts? is that in the dashboard/index.js for now?
