/**
 * Route types module
 *
 * @packageDocumentation
 */

import {AtomName} from '../cln/types';

import {dock_book} from 'uranio-books/routes';

import {default_routes} from '../routes/client';

// type AtomDockProp<A extends AtomName> = typeof dock_book[A]['dock'];

export type RouteDefaultName =
	keyof typeof default_routes extends string ?
	keyof typeof default_routes :
	never;

// This format is preferable than abstracting the types becase it will show
// all the possibilities when a string doesn't match one of the route name.
// export type RouteName<A extends AtomName> =
//   'routes' extends keyof AtomDockProp<A> ?
//   keyof AtomDockProp<A>['routes'] | RouteDefaultName:
//   RouteDefaultName;

// export const a:RouteName<'user'> = '';

export type RouteCustomName<A extends AtomName> =
	'routes' extends keyof typeof dock_book[A]['dock'] ?
	keyof typeof dock_book[A]['dock']['routes'] :
	never;

export type RouteName<A extends AtomName> =
	RouteCustomName<A> | RouteDefaultName;

// export type RouteName<A extends AtomName> =
//   RouteCustomName<A> | RouteDefaultName;

// export const a:RouteName<'product'> = 'pippos';

// export function a<A extends AtomName>():void{
//   const a:RouteName<A> = 'insertd';
//   console.log(a);
// }
