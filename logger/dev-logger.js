const { format, createLogger, transports } = require('winston');

const { timestamp, combine, printf, errors } = format;

function buildDevLogger() {
  const logFormat = printf(
    // eslint-disable-next-line no-shadow
    ({ level, message, timestamp, stack }) => `${timestamp} ${level}: ${stack || message}`,
  );

  return createLogger({
    format: combine(
      format.colorize(),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: true }),
      logFormat,
    ),
    transports: [new transports.Console()],
  });
}

module.exports = buildDevLogger;
