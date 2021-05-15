import Node from './Node'

export default class BinaryTree {
  root: Node | null

  constructor(value: number) {
    if (value == null) this.root = null
    else this.root = new Node(value)
  }
}
