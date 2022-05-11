const fse = require('fs-extra');
const path = require('path');
const plugin = require('@parcel/plugin');

const getConfig = (projectRoot, logger) => {
  const config = fse.readJsonSync(path.join(projectRoot, 'package.json'))
    .staticFiles;

  if (!config) {
    logger.error({
      message: '❌  Missing property staticFiles in package.json!',
    });
  }

  if (!Array.isArray(config)) {
    logger.error({
      message: '❌  Property staticFiles in package.json is not an array!',
    });
  }

  return config;
};

const copyFiles = (origin, destination, logger) => {
  try {
    fse.copySync(origin, destination);
    logger.info({
      message: `✅  Successfully copied ${origin} ===> ${destination}.`,
    });
  } catch (err) {
    throw err;
  }
};

module.exports = new plugin.Reporter({
  async report({ event, options, logger }) {
    if (event.type === 'buildSuccess') {
      try {
        // Get all dist dir from targets, we'll copy static files into them
        const targets = new Set(
          event.bundleGraph
            .getBundles()
            .filter((b) => b.target && b.target.distDir)
            .map((b) => b.target.distDir)
        );

        const config = getConfig(options.projectRoot, logger);
        config.forEach(({ origin, destination }) => {
          for (const target of targets) {
            copyFiles(origin, path.join(target, destination), logger);
          }
        });
      } catch (err) {
        logger.error({
          message: `🚨  Error: ${err.message}`
        });
      }
    }
  },
});
