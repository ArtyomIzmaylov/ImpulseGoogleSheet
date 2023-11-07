"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const analytics_1 = require("./modules/analytics");
const managers_1 = require("./modules/managers");
const extractors_1 = require("./modules/extractors");
const handler_1 = require("./modules/handler");
(0, analytics_1.analytics)('Helo');
const message = 'hello nodeJS';
const managerRepository = new managers_1.ManagerRepository();
const studentExtractor = new extractors_1.StudentExtractor();
const managerAsmik = managerRepository.getByNick('@asmikguak');
const studentEgor = studentExtractor;
const managerExtractor = new extractors_1.ManagerExtractor(studentExtractor, managerAsmik);
const statusHandler = new handler_1.StatusHandler();
const messageExtractor = new extractors_1.MessageExtractor(managerExtractor, statusHandler);
console.log(messageExtractor.extract());
//# sourceMappingURL=main.js.map