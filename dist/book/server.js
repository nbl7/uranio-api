"use strict";
/**
 * Module for Server Atom Book Methods
 *
 * @packageDocumentation
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
exports.has_property = exports.get_full_properties_definition = exports.get_custom_property_definitions = exports.get_property_definition = exports.get_definition = exports.get_all_definitions = exports.get_plural = exports.validate_name = exports.get_names = exports.add_definition = exports.get_dock_definition = exports.get_routes_definition_with_defaults = exports.get_routes_definition = exports.get_route_def = void 0;
// export * from 'uranio-core/book/atom/index';
const urn_lib_1 = require("urn-lib");
const urn_exc = urn_lib_1.urn_exception.init('BOOK_SERVER', 'Book server methods module');
const uranio_core_1 = __importDefault(require("uranio-core"));
const book_client = __importStar(require("./client"));
const calls_1 = require("../routes/calls");
function get_route_def(atom_name, route_name) {
    const routes_def = get_routes_definition_with_defaults(atom_name);
    if (!routes_def || !routes_def[route_name]) {
        throw urn_exc.create_invalid_book(`INVALID_ROUTE_NAME`, `Cannot find route name \`${route_name}\`.`);
    }
    return routes_def[route_name];
}
exports.get_route_def = get_route_def;
function get_routes_definition(atom_name) {
    return book_client.get_routes_definition(atom_name);
}
exports.get_routes_definition = get_routes_definition;
function get_routes_definition_with_defaults(atom_name) {
    const dock_def = get_dock_definition(atom_name);
    if (!dock_def.routes) {
        dock_def.routes = {};
    }
    const server_default_routes = (0, calls_1.return_default_routes)(atom_name);
    for (const [route_name, route_def] of Object.entries(server_default_routes)) {
        dock_def.routes[route_name] = route_def;
    }
    return dock_def.routes;
}
exports.get_routes_definition_with_defaults = get_routes_definition_with_defaults;
function get_dock_definition(atom_name) {
    return book_client.get_dock_definition(atom_name);
}
exports.get_dock_definition = get_dock_definition;
function add_definition(atom_name, atom_definition) {
    return uranio_core_1.default.book.add_definition(atom_name, atom_definition);
}
exports.add_definition = add_definition;
function get_names() {
    return uranio_core_1.default.book.get_names();
}
exports.get_names = get_names;
function validate_name(atom_name) {
    return uranio_core_1.default.book.validate_name(atom_name);
}
exports.validate_name = validate_name;
function get_plural(atom_name) {
    return uranio_core_1.default.book.get_plural(atom_name);
}
exports.get_plural = get_plural;
function get_all_definitions() {
    return uranio_core_1.default.book.get_all_definitions();
}
exports.get_all_definitions = get_all_definitions;
function get_definition(atom_name) {
    return uranio_core_1.default.book.get_definition(atom_name);
}
exports.get_definition = get_definition;
function get_property_definition(atom_name, property_name) {
    return uranio_core_1.default.book.get_property_definition(atom_name, property_name);
}
exports.get_property_definition = get_property_definition;
function get_custom_property_definitions(atom_name) {
    return uranio_core_1.default.book.get_custom_property_definitions(atom_name);
}
exports.get_custom_property_definitions = get_custom_property_definitions;
function get_full_properties_definition(atom_name) {
    return uranio_core_1.default.book.get_full_properties_definition(atom_name);
}
exports.get_full_properties_definition = get_full_properties_definition;
function has_property(atom_name, key) {
    return uranio_core_1.default.book.has_property(atom_name, key);
}
exports.has_property = has_property;
//# sourceMappingURL=server.js.map