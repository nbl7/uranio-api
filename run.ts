/**
 * Web run module
 *
 * @packageDocumentation
 */

import {urn_log} from 'urn-lib';

urn_log.defaults.log_level = urn_log.LogLevel.FUNCTION_DEBUG;

import urn_web from 'urn_web';

const express_service = urn_web.service.express.create();

express_service.listen(3000, () => {
	urn_log.debug(`Listening on port 3000...`);
});

