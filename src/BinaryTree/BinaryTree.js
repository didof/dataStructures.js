"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Node_1 = __importDefault(require("./Node"));
var BinaryTree = /** @class */ (function () {
    function BinaryTree(value) {
        if (value == null)
            this.root = null;
        else
            this.root = new Node_1.default(value);
    }
    BinaryTree.calcMaxNodesAtLevel = function (level) {
        if (level == null || level < 0)
            throw new Error();
        return Math.pow(2, level);
    };
    return BinaryTree;
}());
exports.default = BinaryTree;
