"use strict";
/**
 * Module for Server Atom Book Methods
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
exports.has_property = exports.get_properties_definition = exports.get_custom_properties_definition = exports.get_property_definition = exports.get_definition = exports.get_all_definitions = exports.get_plural = exports.validate_auth_name = exports.validate_name = exports.get_names = exports.add_definition = exports.add_route_definition = exports.get_dock_definition = exports.get_routes_definition = exports.get_route_definition = exports.get_dock_url = void 0;
const urn_lib_1 = require("urn-lib");
const urn_exc = urn_lib_1.urn_exception.init('BOOK_SERVER', 'Book server methods module');
const uranio_core_1 = __importDefault(require("uranio-core"));
const book_client = __importStar(require("./client"));
function get_dock_url(atom_name) {
    return book_client.get_dock_url(atom_name);
}
exports.get_dock_url = get_dock_url;
function get_route_definition(atom_name, route_name) {
    const routes_def = get_routes_definition(atom_name);
    if (!routes_def || !routes_def[route_name]) {
        throw urn_exc.create_invalid_book(`INVALID_ROUTE_NAME`, `Cannot find route name \`${route_name}\`.`);
    }
    return routes_def[route_name];
}
exports.get_route_definition = get_route_definition;
function get_routes_definition(atom_name) {
    return book_client.get_routes_definition(atom_name);
}
exports.get_routes_definition = get_routes_definition;
function get_dock_definition(atom_name) {
    return book_client.get_dock_definition(atom_name);
}
exports.get_dock_definition = get_dock_definition;
function add_route_definition(atom_name, route_name, route_definition) {
    return book_client.add_route_definition(atom_name, route_name, route_definition);
}
exports.add_route_definition = add_route_definition;
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
function validate_auth_name(atom_name) {
    return uranio_core_1.default.book.validate_auth_name(atom_name);
}
exports.validate_auth_name = validate_auth_name;
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
function get_custom_properties_definition(atom_name) {
    return uranio_core_1.default.book.get_custom_properties_definition(atom_name);
}
exports.get_custom_properties_definition = get_custom_properties_definition;
function get_properties_definition(atom_name) {
    return uranio_core_1.default.book.get_properties_definition(atom_name);
}
exports.get_properties_definition = get_properties_definition;
function has_property(atom_name, key) {
    return uranio_core_1.default.book.has_property(atom_name, key);
}
exports.has_property = has_property;
//# sourceMappingURL=server.js.map