module.exports = {
  default: res => res.result,
  conversionRateBetweenTwo: res => (res[0].result / res[1].result).toFixed(2) * 100,
}
