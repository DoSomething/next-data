const Keen = require("keen-js");
const projectId = process.env.KEEN_PROJECT_ID;
const readKey = process.env.KEEN_READ_KEY;

module.exports = {
  /**
   * Get the Keen.io client.
   *
   * @return {Keen}
   */
  makeClient: () => {
    const client = new Keen({
      projectId,
      readKey
    });

    client.perform = async (query) => {
      return new Promise((resolve) => {
        client.run(query, (err, res) => resolve(res));
      });
    };

    return client;
  }
}
