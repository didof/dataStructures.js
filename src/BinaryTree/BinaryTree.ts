import Node from './Node'

const isPositive = (input: number) => input !== null && input >= 0

export default class BinaryTree {
  root: Node | null

  constructor(value: number) {
    if (value == null) this.root = null
    else this.root = new Node(value)
  }

  static calcMaxNodesAtLevel = (level: number) => {
    if (!isPositive(level)) throw new Error()

    if (level === 0) return 2 ** level
    return 2 * 2 ** level
  }

  static calcMaxNodesAtHeight = (height: number) => {
    if (!isPositive(height)) throw new Error()

    return 2 ** (height + 1) - 1
  }
}
