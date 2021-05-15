import Node from './Node';
export default class BinaryTree {
    root: Node | null;
    constructor(value: number);
    static calcMaxNodesAtLevel: (level: number) => number;
}
