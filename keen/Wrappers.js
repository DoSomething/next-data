const Keen = require("keen-js");

module.exports = {
  /**
   * Wrap the Keen.io ready callback in a promise.
   *
   * @return {Promise}
   */
  onReady: async () => {
    return new Promise((resolve) => {
      Keen.ready(() => {
        resolve();
      });
    });
  },
}
