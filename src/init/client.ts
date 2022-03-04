/**
 * Init module
 *
 * @packageDocumentation
 */

import {urn_log} from 'urn-lib';

import core_client from 'uranio-core/client';

import {api_client_config} from '../client/defaults';

import * as register from '../reg/client';

import * as required from '../req/client';

import * as types from '../client/types';

import * as conf from '../conf/client';

import * as log from '../log/client';

export function init(config?:types.ClientConfiguration, register_required=true)
		:void{
	
	log.init(urn_log.defaults);
	
	core_client.init(config, false);
	
	conf.set_from_env(api_client_config);
	if(config){
		conf.set(api_client_config, config);
	}
	
	if(register_required){
		_register_required_atoms();
	}
	
	conf.set_initialize(true);
	
	urn_log.defaults.log_level = conf.get(`log_level`);
}

function _register_required_atoms(){
	const required_atoms = required.get();
	for(const [atom_name, atom_def] of Object.entries(required_atoms)){
		register.atom(atom_def as any, atom_name as any);
	}
}

