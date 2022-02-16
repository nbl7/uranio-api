/**
 * Route middleware module
 *
 * @packageDocumentation
 */

import jwt from 'jsonwebtoken';

import {urn_util, urn_response, urn_return, urn_exception, urn_log} from 'urn-lib';

const urn_ret = urn_return.create(urn_log.util.return_injector);

const urn_exc = urn_exception.init('EXPRESS_MDLW', 'Express middlewares');

import core from 'uranio-core';

import * as conf from '../conf/index';

import * as insta from '../nst/index';

import * as book from '../book/index';

import * as types from '../types';

import {schema} from '../sch/index';

// import {return_default_routes} from '../routes/server';

import {partial_api_request_to_atom_request} from '../util/request';

import * as req_validator from './validate';

export async function route_middleware<A extends schema.AtomName, R extends schema.RouteName<A>, D extends schema.Depth = 0>(
	api_request:types.Api.Request<A,R,D>
):Promise<urn_response.General<any, any>>{
	_log_route_request(api_request);
	const auth_reponse = await _authorization(api_request);
	if(auth_reponse){
		api_request = auth_reponse;
	}
	api_request = _limit(api_request);
	return await _validate_and_call(api_request);
}

export async function auth_route_middleware<A extends schema.AtomName, R extends schema.RouteName<A>, D extends schema.Depth = 0>(
	api_request: types.Api.Request<A,R,D>,
	auth_handler: types.AuthHandler<A,R,D>
):Promise<urn_response.General<any, any>>{
	_log_auth_route_request(api_request);
	if(typeof auth_handler !== 'function'){
		throw urn_exc.create(`INVALID_AUTH_HANDLER`, `Missing or invalid auth handler.`);
	}
	return await _auth_validate_and_call(api_request, auth_handler);
}

async function _authorization<A extends schema.AtomName, R extends schema.RouteName<A>, D extends schema.Depth = 0>(
	api_request:types.Api.Request<A,R,D>
):Promise<false | types.Api.Request<A,R,D>> {
	// const route_def = _get_route_def(api_request);
	const route_def = book.get_route_def(api_request.atom_name, api_request.route_name);
	if(core.bll.auth.is_public_request(api_request.atom_name, route_def.action)){
		return false;
	}
	const auth_token = _get_auth_token(api_request);
	if(!auth_token){
		return false;
	}
	try{
		const decoded = jwt.verify(auth_token, conf.get(`jwt_private_key`)) as core.types.Passport;
		api_request.passport = decoded;
		return api_request;
	}catch(e){
		const ex = e as any;
		throw urn_exc.create_unauthorized(`INVALID_TOKEN`, `Invalid token.`, ex);
	}
}

async function _validate_and_call<A extends schema.AtomName, R extends schema.RouteName<A>, D extends schema.Depth = 0>(
	api_request: types.Api.Request<A,R,D>
){
	
	// const route_def = _get_route_def(api_request);
	const route_def = book.get_route_def(api_request.atom_name, api_request.route_name);
	
	urn_log.fn_debug(`Router ${route_def.method} [${api_request.atom_name}] ${api_request.full_path}`);
	
	_validate_route(api_request);
	
	if(!urn_util.object.has_key(route_def, 'call') || !route_def.call){
		return urn_ret.return_error(
			404,
			`Route call not implemented.`,
			`ROUTE_CALL_NOT_IMPLEMENTED`,
			`Route call not implemented.`
		);
	}
	
	let call_response = await route_def.call(api_request);
	// call_response.headers = {
	//   'Access-Control-Allow-Origin': 'http://localhost:4444',
	//   // 'Access-Control-Allow-Credentials': true
	// };
	call_response = core.atom.util
		.hide_hidden_properties(api_request.atom_name, call_response);
	
	const urn_response = urn_ret.return_success('Success', call_response);
	
	return urn_response;
	
}

async function _auth_validate_and_call<A extends schema.AtomName, R extends schema.RouteName<A>, D extends schema.Depth = 0>(
	auth_route_request: types.Api.Request<A,R,D>,
	handler: types.AuthHandler<A,R,D>,
){
	const dock_def = book.get_dock_definition(auth_route_request.atom_name);
	
	// if(!dock_def){
	//   throw urn_exc.create_invalid_book(
	//     `INVALID_DOCK_DEF`,
	//     `Cannot auth validate and call. Invalid dock def.`
	//   );
	// }
	
	urn_log.fn_debug(`Router Auth ${dock_def.url} [${auth_route_request.atom_name}]`);
	
	_auth_validate(auth_route_request);
	
	const auth_token = await handler(auth_route_request);
	
	const urn_response = urn_ret.return_success('Success', {
		token: auth_token,
		headers: {
			'urn-auth-token': auth_token,
			// 'Access-Control-Allow-Origin': 'http://192.168.1.69',
			// 'Access-Control-Allow-Credentials': true
		},
		multi_value_headers: {
			// "Set-Cookie": [`urn-auth-token=${auth_token}; SameSite=Strict; HttpOnly; Secure`]
			// "Set-Cookie": [`urn-auth-token=${auth_token}; SameSite=Strict; HttpOnly`]
			// "Set-Cookie": [`urn-auth-token=${auth_token}; Domain=localhost; HttpOnly`]
			"Set-Cookie": [`urn-auth-token=${auth_token}; HttpOnly`]
			// "Set-Cookie": [`urn-auth-token=${auth_token}; Domain=192.168.1.69; HttpOnly`]
		}
	} as types.Api.AuthResponse);
	
	return urn_response;
	
}

function _auth_validate<A extends schema.AtomName, R extends schema.RouteName<A>, D extends schema.Depth = 0>(
	api_request:types.Api.Request<A,R,D>
):void{
	
	urn_log.fn_debug(`Validate Auth Route [${api_request.atom_name}]`);
	
	req_validator.empty(api_request.params, 'params');
	req_validator.empty(api_request.query, 'query');
	
}

function _validate_route<A extends schema.AtomName, R extends schema.RouteName<A>, D extends schema.Depth = 0>(
	api_request:types.Api.Request<A,R,D>
):void{
	
	// const route_def = _get_route_def(api_request);
	const route_def = book.get_route_def(api_request.atom_name, api_request.route_name);
		
	urn_log.fn_debug(`Validate Route ${route_def.url} [${api_request.atom_name}]`);
	
	if(route_def.method !== types.RouteMethod.POST){
		req_validator.empty(api_request.body, 'body');
		req_validator.empty(api_request.file, 'file');
	}
	
	if(route_def.url.indexOf(':') !== -1){
		const param_names:string[] = [];
		const folds = route_def.url.split('/');
		for(let i = 0; i < folds.length; i++){
			const splitted = folds[i]!.split(':');
			if(splitted.length === 2){
				param_names.push(splitted[1]!);
			}
		}
		req_validator.only_valid_param_keys(api_request.params, param_names);
	}else{
		req_validator.empty(api_request.params, 'params');
	}
	
	if(route_def.query){
		req_validator.only_valid_query_keys(api_request.query, route_def.query);
		// if(Array.isArray(route_def.query)){
		//   for(let i = 0; i < route_def.query.length; i++){
		//     api_request.query[route_def.query[i]! as types.RouteQueryParam<A,R>] =
		//       req_validator.process_request_query<A>(
		//         api_request.query[route_def.query[i]! as types.RouteQueryParam<A,R>]
		//       ) as any;
		//   }
		// }
	}else{
		req_validator.empty(api_request.query, 'query');
	}
	
}

function _limit<A extends schema.AtomName, R extends schema.RouteName<A>, D extends schema.Depth = 0>(
	api_request:types.Api.Request<A,R,D>
){
	let options = (api_request.query as any)?.options;
	if(!options){
		options = {};
	}
	if(!options.limit || options.limit > conf.get(`request_auto_limit`)){
		options.limit = conf.get(`request_auto_limit`);
	}
	(api_request.query as any).options = options;
	return api_request;
}

// function _get_route_def<A extends schema.AtomName, R extends schema.RouteName<A>, D extends schema.Depth = 0>(
//   api_request:types.Api.Request<A,R,D>
// ):types.Book.Definition.Dock.Routes.Route<A,R,D>{
//   const cloned_atom_dock = {
//     ...book.get_definition(api_request.atom_name).dock
//   };
//   const default_routes = return_default_routes(api_request.atom_name);
//   if(!cloned_atom_dock.routes){
//     cloned_atom_dock.routes = default_routes;
//   }else{
//     cloned_atom_dock.routes = {
//       ...default_routes,
//       ...cloned_atom_dock.routes
//     };
//   }
//   if(!(cloned_atom_dock.routes as any)[api_request.route_name as string]){
//     throw urn_exc.create(`INVALID_ROUTE_NAME`, `Invalid route name.`);
//   }
//   return (cloned_atom_dock.routes as any)[api_request.route_name as string]! as types.Book.Definition.Dock.Routes.Route<A,R,D>;
// }

function _log_route_request<A extends schema.AtomName, R extends schema.RouteName<A>, D extends schema.Depth = 0>(
	api_request: types.Api.Request<A,R,D>
):void{
	const request_shape = partial_api_request_to_atom_request(api_request);
	const bll_reqs = insta.get_bll_request();
	bll_reqs.insert_new(request_shape).catch((ex) => {
		console.error('CANNOT LOG REQUEST', ex);
		// ****
		// TODO save on file CANNOT LOG
		// ****
		return request_shape;
	});
}

function _log_auth_route_request<A extends schema.AtomName, R extends schema.RouteName<A>, D extends schema.Depth = 0>(
	auth_request: types.Api.Request<A,R,D>
):void{
	const request_shape = partial_api_request_to_atom_request(auth_request);
	const auth_request_clone = {...request_shape};
	if(auth_request_clone.body){
		const body = JSON.parse(auth_request_clone.body);
		body.password = '[DELETED]';
		auth_request_clone.body = JSON.stringify(body);
	}
	
	const bll_reqs = insta.get_bll_request();
	bll_reqs.insert_new(auth_request_clone).catch((ex) => {
		console.error('CANNOT LOG AUTH REQUEST', ex);
		// ****
		// TODO save on file CANNOT LOG
		// ****
		return request_shape;
	});
}

function _get_auth_token<A extends schema.AtomName, R extends schema.RouteName<A>, D extends schema.Depth = 0>(
	api_request:types.Api.Request<A,R,D>
):string | false{
	const headers = api_request.headers;
	if(!headers){
		return false;
	}
	if(typeof headers.cookie === 'string'){
		const cookies = headers.cookie.split(';');
		for(const cookie of cookies){
			const trimmed = cookie.trim();
			const splitted = trimmed.split('=');
			if(splitted[0] === 'urn-auth-token'){
				return splitted[1];
			}
		}
	}
	const auth_header = headers['urn-auth-token'];
	const header_auth_token = (Array.isArray(auth_header)) ? auth_header[0] : auth_header;
	if(typeof header_auth_token === 'string'){
		return header_auth_token;
	}
	return false;
}

