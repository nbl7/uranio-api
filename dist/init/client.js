"use strict";
/**
 * Init module
 *
 * @packageDocumentation
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const urn_lib_1 = require("urn-lib");
const client_1 = __importDefault(require("uranio-core/client"));
const default_conf_1 = require("../client/default_conf");
const default_env_1 = require("../client/default_env");
const register = __importStar(require("../reg/client"));
const required = __importStar(require("../req/client"));
const conf = __importStar(require("../conf/client"));
const env = __importStar(require("../env/client"));
const log = __importStar(require("../log/client"));
function init(config, register_required = true) {
    client_1.default.init(config, false);
    env.set_from_env(default_env_1.api_client_env);
    client_1.default.conf.set_from_file();
    if (config) {
        conf.set(default_conf_1.api_client_config, config);
    }
    if (register_required) {
        _register_required_atoms();
    }
    _validate_api_variables();
    _validate_api_book();
    conf.set_initialize(true);
    env.set_initialize(true);
    log.init(urn_lib_1.urn_log);
    urn_lib_1.urn_log.debug(`Uranio api client initialization completed.`);
}
exports.init = init;
function _register_required_atoms() {
    const required_atoms = required.get();
    for (const [atom_name, atom_def] of Object.entries(required_atoms)) {
        register.atom(atom_def, atom_name);
    }
}
function _validate_api_variables() {
    // TODO NOTHING TO CHECK YET
}
/**
 * NOTE:
 * Maybe this should be before compilation and not at runtime?
 */
function _validate_api_book() {
    // TODO DONE IN SERVER?
}
//# sourceMappingURL=client.js.map