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

  return csv;
}

async function start() {
  bot.hello((message) => {
    console.info('Bot started...');
  });

  bot.message(async (message) => {
    const userMsg = message.text;
    if (!userMsg || !userMsg.includes(magicPhrase)) return;

    const channel = message.channel;
    const campaignId = parseInt(userMsg.split(magicPhrase)[1] || null);
    const data = await calculate(campaignId);

    slack.files.upload({
      token,
      content: data,
      filename: `phoenix-next-campaign-${campaignId || 'all'}.csv`,
      filetype: 'csv',
      channels: channel,
    }, (err, msg) => {
      if (err) console.error('error uploading csv');
      else console.info('csv posted to slack');
    });
  });

  bot.listen({ token });
}

start().catch(err => console.error(err));
