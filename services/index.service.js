const logger = require('../logger');

const get = async () => {
  try {
    logger.info('hahahahahahaha');
    const response = {
      success: true,
      message: 'done bro',
      data: {},
    };
    return {
      check: true,
      data: response,
    };
  } catch (err) {
    logger.error(`IndexService get error: ${err}`);
    return {
      check: false,
      data: null,
    };
  }
};

const post = async () => {
  try {
    logger.info('hahahahahahaha');
    const response = {
      success: true,
      message: 'done bro',
      data: {},
    };
    return {
      check: true,
      data: response,
    };
  } catch (err) {
    logger.error(`IndexService post error: ${err}`);
    return {
      check: false,
      data: null,
    };
  }
};

module.exports = {
  get,
  post,
};
