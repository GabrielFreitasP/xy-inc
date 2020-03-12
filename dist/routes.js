"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = __importDefault(require("./middleware/auth"));
var AuthController_1 = __importDefault(require("./controllers/AuthController"));
var PointsOfInterestController_1 = __importDefault(require("./controllers/PointsOfInterestController"));
var routes = express_1.Router();
routes.get('/ping', function (_, res) { return res.send({
    success: true,
    message: 'Server OK'
}); });
routes.post('/token', AuthController_1.default.getToken);
routes.post('/pointsOfInterest', auth_1.default, PointsOfInterestController_1.default.create);
routes.get('/pointsOfInterest', auth_1.default, PointsOfInterestController_1.default.listAll);
routes.get('/pointsOfInterest/byProximity', auth_1.default, PointsOfInterestController_1.default.listByProximity);
exports.default = routes;
