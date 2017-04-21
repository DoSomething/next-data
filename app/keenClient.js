import Keen from 'keen-js';

const client = new Keen({
  projectId: process.env.KEEN_PROJECT_ID,
  readKey: process.env.KEEN_READ_KEY,
});

export default client;
