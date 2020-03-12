"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var auth_1 = __importDefault(require("../config/auth"));
var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    AuthService.prototype.getToken = function (user) {
        var params = { username: user.username };
        var secret = auth_1.default.secret;
        return jsonwebtoken_1.default.sign(params, secret, {
            expiresIn: '1h',
        });
    };
    AuthService.prototype.verifyToken = function (token) {
        var secret = auth_1.default.secret;
        return new Promise(function (resolve, reject) {
            jsonwebtoken_1.default.verify(token, secret, function (err, decoded) {
                if (err)
                    reject(err);
                resolve(decoded.username);
            });
        });
    };
    return AuthService;
}());
exports.default = new AuthService();
