const log = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params);
  }
};

module.exports = { log };
