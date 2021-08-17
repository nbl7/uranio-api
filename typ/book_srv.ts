/**
 * Server book type module
 *
 * This module defines the type of the `atom_book` for the Server.
 * It extends the defintion of the Client Book type.
 *
 * In order to copy and reexport namespaces and types we use the syntax
 * `export import`.
 *
 * `type Book` must be redifined.
 *
 * @packageDocumentation
 */

import urn_core from 'uranio-core';

import * as book_cln from './book_cln';

import {Api as ApiRequest} from './request';

import {RouteName} from './route';

export type Book = {
	[k in urn_core.types.AtomName]?: Book.Definition<k>;
}

export namespace Book {
	
	export type BasicDefinition =
		urn_core.types.Book.BasicDefinition &
		{ api?: Definition.Api }
	
	export type Definition<A extends urn_core.types.AtomName> =
		Book.BasicDefinition &
		{ bll?: (passport?:urn_core.types.Passport) => urn_core.bll.BLL<A> }
	
	export namespace Definition {
		
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		// export import Api = book_cln.Book.Definition.Api;
		
		export type Api = book_cln.Book.Definition.Api;
		
		export namespace Api {
			
			export type Routes = book_cln.Book.Definition.Api.Routes;
			
			export namespace Routes {
				
				export type Route<A extends urn_core.types.AtomName, R extends RouteName<A>> = book_cln.Book.Definition.Api.Routes.Route & {
					call?: Route.Call<A,R>
				}
				
				export namespace Route {
					export type Call<A extends urn_core.types.AtomName, R extends RouteName<A>> = (route_request: ApiRequest.Request<A,R>) => any
				}
				
			}
		}
		
		
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		export import Properties = book_cln.Book.Definition.Properties;
		
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		export import Property = book_cln.Book.Definition.Property;
		
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		export import Security = urn_core.types.Book.Definition.Security;
		
	}
	
}