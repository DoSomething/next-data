import json2csv from 'json2csv';
import Executor from '../Executor';
import conversion from './conversion';
import returns from './returns';
import entrances from './entrances';
import test from './test';
import { makeCsvDownload } from '../helpers';

let processing = false;
const queue = [];

export async function make(client, campaignId, dashboard) {
  if (processing) {
    queue.push([client, campaignId, dashboard]);
    return;
  }

  processing = true;
  console.info(`Starting ${dashboard} for ${campaignId ? campaignId : 'all campaigns'}...`);

  const domElement = document.getElementById('dashboard').textContent = '';

  let queries = [];
  switch (dashboard) {
    case 'conversion': queries = conversion; break;
    case 'returns': queries = returns; break;
    case 'test': queries = test; break;
    case 'entrances': queries = entrances; break;
  }

  const computedDashboard = await Executor(client, campaignId, queries);
  const csv = json2csv(computedDashboard);

  document.getElementById('dashboard').textContent = csv;
  makeCsvDownload(csv, dashboard);

  console.info(`%c Dashboard ${dashboard} result:`, "background: #111; color: #FFF");
  console.info(csv);

  processing = false;

  if (queue.length) {
    console.info(`Iterating over queue...`);
    const next = queue.pop();
    make(...next);
  }
};
