"use strict";
/**
 * Api dev module
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
server_1.default.init();
const service = server_1.default.service.create();
service.listen(async () => {
    // const error_bll = uranio.core.bll.basic.create(`error`);
    // console.log(error_bll);
    // const res = await error_bll.find({});
    // console.log(res);
});
// const error_bll = uranio.core.bll.basic.create(`error`);
// console.log(error_bll);
// error_bll.find({}).then((res) => {
//   console.log(res);
// }).catch(err => console.error(err));
// const basic_bll = uranio.core.bll.basic.create('error');
// basic_bll.find_by_id('625bddfde2f65c4d52a57892', {depth: 1}).then((a) => {
// 	console.log(a);
// });
//# sourceMappingURL=dev.js.map