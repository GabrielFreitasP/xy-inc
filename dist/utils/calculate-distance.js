"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var calculateDistance = function (point1, point2) {
    var subX = point1.coordX - point2.coordX;
    var subY = point1.coordY - point2.coordY;
    var powX = Math.pow(subX, 2);
    var powY = Math.pow(subY, 2);
    var result = Math.sqrt(powX + powY);
    var distance = Math.abs(result);
    return distance;
};
exports.default = calculateDistance;
