#!/usr/bin/env node

/**
 * API generate module
 *
 * @packageDocumentation
 */

import dotenv from 'dotenv';
const result = dotenv.config();

if(result.error){
	throw result.error;
}

export * from './register';

import * as uranio from './main';
uranio.init({
	connect_on_init: false,
	superuser_create_on_init: false,
	log_debug_info: false,
	dev_log_debug_info: false
});

import {api_client_config} from '../client/default_conf';

import * as util from '../util/server';

let urn_command = 'all';

for(const argv of process.argv){
	const splitted = argv.split('=');
	if(
		splitted[0] === 'urn_command'
		&& typeof splitted[1] === 'string'
		&& splitted[1] !== ''
	){
		urn_command = splitted[1];
	}
}

switch(urn_command){
	case 'atoms':
	case 'schema':{
		util.generate.schema_and_save();
		break;
	}
	case 'client-config':{
		util.generate.client_config_and_save(api_client_config);
		break;
	}
	default:{
		util.generate.schema_and_save();
		util.generate.client_config_and_save(api_client_config);
		break;
	}
}

