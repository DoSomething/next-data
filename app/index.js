import Keen from 'keen-js';
import { make } from './dashboards';

import './main.scss';

const client = new Keen({
  projectId: KEEN.PROJECT_ID,
  readKey: KEEN.READ_KEY,
});

client.perform = async (query) => {
  return new Promise((resolve) => {
    client.run(query, (err, res) => resolve(res));
  });
};

Keen.ready(() => {
  for (const config of ['conversion', 'returns', 'entrances', 'test']) {
    const onClick = () => {
      const campaignIdInput = document.getElementById('config-campaign-id');
      const campaignId = parseInt(campaignIdInput.value) || null;
      make(client, campaignId, config);
    };

    document.getElementById(`config-${config}`).onclick = onClick;
  }
});
