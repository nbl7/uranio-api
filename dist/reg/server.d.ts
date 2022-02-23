/**
 * Register module
 *
 * @packageDocumentation
 */
import * as types from '../srv/types';
import { schema } from '../sch/server';
export declare function register<A extends schema.AtomName>(atom_definition: types.Book.Definition<A>, atom_name?: string): string;