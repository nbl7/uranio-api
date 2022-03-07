/**
 * Conf module
 *
 * @packageDocumentation
 */
import { api_client_env } from '../client/default_env';
export { api_client_env as defaults };
import * as types from '../client/types';
export declare function get<k extends keyof Required<types.ClientEnvironment>>(param_name: k): typeof api_client_env[k];
export declare function is_initialized(): boolean;
export declare function set_initialize(is_initialized: boolean): void;
export declare function set_from_env(repo_env: Required<types.ClientEnvironment>): void;
export declare function set(repo_env: Required<types.ClientEnvironment>, config: Partial<types.ClientEnvironment>): void;
