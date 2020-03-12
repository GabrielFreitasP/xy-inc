"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var validateInteger = require('mongoose-integer');
var PointOfInterestSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    coordinateX: {
        type: Number,
        min: 0,
        required: true,
        integer: true
    },
    coordinateY: {
        type: Number,
        min: 0,
        required: true,
        integer: true
    }
}, {
    timestamps: true
});
PointOfInterestSchema.plugin(validateInteger);
exports.default = mongoose_1.default.model('PointOfInterest', PointOfInterestSchema);
