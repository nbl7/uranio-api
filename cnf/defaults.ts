/**
 * Module for default configuration object
 *
 * @packageDocumentation
 */

import {FullConfiguration} from '../types';

import {core_config} from 'uranio-core/cnf/defaults';

export const api_config:FullConfiguration = {
	
	...core_config,
	
	request_auto_limit: 128,
	
	service: 'express',
	
	service_port: 3000,
	
	lambda: 'netlify',
	
	prefix_api: '/uranio/api',
	
	prefix_log: '/logs'
	
};