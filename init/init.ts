/**
 * Init module
 *
 * @packageDocumentation
 */

import {urn_exception} from 'urn-lib';

const urn_exc = urn_exception.init('INIT_API_MODULE', `Api init module`);

import urn_core from 'uranio-core';

import {api_config} from '../conf/defaults';

import {default_routes} from '../routes/client';

import * as types from '../types';

import * as conf from '../conf/';

import * as book from '../book/';

export function init(config?:types.Configuration)
		:void{
	
	urn_core.init(config);
	
	if(typeof config === 'undefined'){
		urn_core.conf.set_from_env(api_config);
	}else{
		urn_core.conf.set(api_config, config);
	}
	_validate_api_variables();
	_validate_api_book();
	
	conf.set_initialize(true);
}

/**
 * NOTE:
 * Maybe this should be before compilation and not at runtime?
 */
function _validate_api_book(){
	_validate_dock_url_uniqueness();
	_validate_route_name();
}

function _validate_dock_url_uniqueness(){
	const dock_defs = book.dock.get_all_definitions();
	const urls:string[] = [];
	for(const [atom_name, dock_def] of Object.entries(dock_defs)){
		if(urls.includes(dock_def.url)){
			throw urn_exc.create_not_initialized(
				`INVALID_BOOK_DOCK_URL`,
				`Ivalid dock url value [${dock_def.url}]. Url already in use.` +
				` atom_name [${atom_name}]`
			);
		}
		urls.push(dock_def.url);
	}
}

function _validate_route_name(){
	const dock_defs = book.dock.get_all_definitions();
	const invalid_route_names:string[] = _get_default_route_name();
	for(const [_atom_name, dock_def] of Object.entries(dock_defs)){
		if(typeof dock_def.routes === 'object'){
			for(const [route_name, _route_def] of Object.entries(dock_def.routes)){
				if(invalid_route_names.includes(route_name)){
					throw urn_exc.create_not_initialized(
						`INVALID_BOOK_ROUTE_NAME`,
						`Ivalid route name [${route_name}].` +
						` Route name already in use by the system.`
					);
				}
			}
		}
	}
}

function _get_default_route_name(){
	const route_names:string[] = [];
	for(const route_name in default_routes){
		route_names.push(route_name);
	}
	return route_names;
}

function _validate_api_variables(){
	_check_number_values();
}

function _check_number_values(){
	if(api_config.request_auto_limit < 0){
		throw urn_exc.create_not_initialized(
			`INVALID_REQUEST_AUTO_LIMIT`,
			`Config request_auto_limit value cannot be smaller than 0.`
		);
	}
	if(api_config.service_port < 0){
		throw urn_exc.create_not_initialized(
			`INVALID_SERVIE_PORT`,
			`Config service_port value cannot be smaller than 0.`
		);
	}
}
