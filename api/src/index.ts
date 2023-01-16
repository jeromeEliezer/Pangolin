import app from './config/server';
import config from './config/env';

import { debug } from './utils/debug'
import { logcatch, logger } from './utils/logger';

/// server Listenning
app.listen(config.port, () => {
    logger.info('starting express on port %d in %s mode', config.port)
}) 