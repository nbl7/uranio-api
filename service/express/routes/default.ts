/**
 * Express default route module
 *
 * @packageDocumentation
 */

import express from 'express';

import {urn_log} from 'urn-lib';

import {api_book} from 'uranio-books/api';

import {
	AtomName,
	RouteMethod,
	Book
} from '../../../types';

import {return_default_routes} from '../../routes';

import {route_middlewares} from '../mdlw';

export function create_express_route<A extends AtomName>(atom_name:A)
		:express.Router{
	
	urn_log.fn_debug(`Create Express Default Atom Router [${atom_name}]`);
	
	const router = express.Router();
	
	const atom_api = api_book[atom_name as keyof typeof api_book].api as
		Book.Definition.Api;
	
	if(!atom_api){
		return router;
	}
	
	const default_routes = return_default_routes(atom_name);
	
	// for(const [route_name, route_def] of Object.entries(default_routes)){
	//   switch(route_def.method){
	//     case RouteMethod.GET: {
	//       router.get(route_def.url, route_middlewares(atom_name, route_name));
	//       break;
	//     }
	//     case RouteMethod.POST: {
	//       router.post(route_def.url, route_middlewares(atom_name, route_name));
	//       break;
	//     }
	//     case RouteMethod.DELETE: {
	//       router.delete(route_def.url, route_middlewares(atom_name, route_name));
	//       break;
	//     }
	//   }
	// }
	
	if(!atom_api.routes){
		
		atom_api.routes = default_routes;
		
	}else{
		
		atom_api.routes = {
			...default_routes,
			...atom_api.routes
		};
		
	}
	
	for(const [route_name, route_def] of Object.entries(atom_api.routes)){
		
		switch(route_def.method){
			case RouteMethod.GET: {
				router.get(route_def.url, route_middlewares(atom_name, route_name));
				break;
			}
			case RouteMethod.POST: {
				router.post(route_def.url, route_middlewares(atom_name, route_name));
				break;
			}
			case RouteMethod.DELETE: {
				router.delete(route_def.url, route_middlewares(atom_name, route_name));
				break;
			}
		}
		
	}
		
	return router;
	
}

