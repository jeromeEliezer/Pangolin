import debug from 'debug';

import app from './config/server';
import config from './config/env';
import database from './config/database';
import { logcatch, logger } from './utils/logger';

const initialize = async () => {
    try {
        const start = performance.now()
        await database();
        // Server
        app.listen(config.port, () => {
            logger.info('starting express on port %d in %s mode', config.port)
        })
        const end = performance.now()
        debug(`initialization took ${end - start} ms`)
    } catch (e) {
        logcatch(e, 'initialization error')
    }
}
initialize();
