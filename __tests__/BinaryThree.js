const BinaryTree = require('../src/BinaryTree/BinaryTree').default
const Node = require('../src/BinaryTree/Node').default

describe('instantiation of tree', () => {
  let tree

  afterEach(() => {
    tree = null
  })

  it('should return a tree without a root node if no value is provided', () => {
    tree = new BinaryTree()
    expect(tree.root).toBeNull()
  })
  it('should return a tree with a root node if some value is provided', () => {
    tree = new BinaryTree(42)
    expect(tree.root).toBeInstanceOf(Node)
  })
  it('should be possible to append left and right nodes to root and to its children', () => {
    tree = new BinaryTree(42)
    tree.root.left = new Node(10)
    tree.root.right = new Node(15)
    tree.root.left.left = new Node(1)

    expect(tree.root.value).toEqual(42)
    expect(tree.root.left.value).toEqual(10)
    expect(tree.root.right.value).toEqual(15)
    expect(tree.root.left.left.value).toEqual(1)
  })
})
