import Node from './Node'

type searchCb = (node: Node, count: number) => boolean | void
type NodeTuple = [Node, number]

export default class SLL {
  head: Node | null
  length: number

  constructor() {
    this.head = null
    this.length = 0
  }

  get first() {
    return this.head
  }

  get last() {
    return this.findAtPosition(this.length - 1)
  }

  /**
   * Utilities
   */

  _traverse(cb: searchCb, startNode = this.head): NodeTuple | null {
    let node = startNode
    let count = 0

    while (node) {
      const stop = cb(node, count)

      if (stop) return [node, count]

      node = node.next

      count++
    }

    return null
  }

  _getNext(node: Node, position = 1): Node | null {
    if (position < 0) return null

    let nextNode = node
    for (let i = 0; i < position; i++) {
      nextNode = nextNode.next!
    }

    return nextNode
  }

  _concatenate(...values: number[]) {
    const headNode = new Node(values.shift()!)
    let tailNode: Node
    function hook(node: Node) {
      if (values.length === 0) {
        tailNode = node
        return node
      }
      const nextNode = new Node(values.shift()!)
      node.next = nextNode
      hook(nextNode)
    }
    hook(headNode)
    return [headNode, tailNode!]
  }

  /**
   * Modifiers
   */

  /**
   * Insertion
   */
  unshift(...values: number[]) {
    const backupHead = this.head

    if (values.length === 1) {
      const node = new Node(values[0], backupHead)
      this.head = node
    } else {
      const chain = this._concatenate(...values)
      this.head = chain[0]
      chain[1].next = backupHead
    }

    this.length += values.length
    return this
  }

  push(...values: number[]) {
    let output

    if (values.length === 1) {
      const node = new Node(values[0])
      if (this.length === 0) {
        this.head = node
      } else {
        this.last![0].next = node
      }

      output = node
    } else {
      const chain = this._concatenate(...values)
      if (this.length === 0) {
        this.head = chain[0]
      } else {
        this.last![0].next = chain[0]
      }

      output = chain[1]
    }

    this.length += values.length

    return output
  }

  insertAfter(position: number, ...values: number[]) {
    if (typeof position !== 'number' || position < 0) return
    if (position > this.length) return
    if (this.length === 0) return this.unshift(...values)
    if (position === this.length - 1) return this.push(...values)

    const leftNode = this.findAtPosition(position)![0]
    const rightNode = leftNode.next

    if (values.length === 1) {
      const node = new Node(values[0], rightNode)
      leftNode.next = node
    } else {
      let chain = this._concatenate(...values)
      leftNode.next = chain[0]
      chain[1].next = rightNode
    }

    this.length += values.length

    return this
  }

  insertBefore(position: number, ...values: number[]) {
    if (typeof position !== 'number' || position < 0) return
    if (position > this.length) return
    if (this.length === 0) return this.unshift(...values)
    if (position === 0) return this.unshift(...values)

    const leftNode = this.findAtPosition(position - 1)![0]
    const rightNode = leftNode.next

    if (values.length === 1) {
      const node = new Node(values[0], rightNode)
      leftNode.next = node
    } else {
      let chain = this._concatenate(...values)
      leftNode.next = chain[0]
      chain[1].next = rightNode
    }

    this.length += values.length

    return this
  }

  /**
   * Deletion
   */

  shift() {
    if (this.length === 0) return null

    const node = this.head!
    this.head = node.next
    this.length--

    return node
  }

  pop() {
    switch (this.length) {
      case 0:
        return null
      case 1:
        const node = this.head
        this.head = null
        this.length--
        return node!
      default:
        const penultimateNode = this.findAtPosition(this.length - 2)![0] as Node
        const lastNode = penultimateNode.next!

        penultimateNode.next = null
        this.length--

        return lastNode
    }
  }

  delete(cb: searchCb): NodeTuple | false {
    if (this.length === 0) return false

    let previousNode: Node
    let found = false

    const output = this._traverse((node, position) => {
      if (cb(node, position)) {
        found = true
        return found
      }
      if (!found) previousNode = node
    })

    if (!output) return false

    if (!previousNode!) return [this.shift(), 0] as NodeTuple

    previousNode!.next = previousNode!.next!.next

    this.length--

    return output
  }

  deleteByValue(
    target: number,
    allRecurrences = false
  ): NodeTuple | NodeTuple[] | false {
    if (this.length === 0) return false

    let output: NodeTuple | NodeTuple[]
    if (!allRecurrences) {
      let previousNode: Node
      let shouldCut = false

      this._traverse((node, position) => {
        if (node.value === target) {
          if (position === 0) {
            output = [this.shift()!, position]
          } else if (position === this.length - 1) {
            output = [this.pop()!, position]
          } else {
            shouldCut = true
            output = [node, position]
          }
          return true
        }
        previousNode = node
      })

      if (shouldCut) previousNode!.next = previousNode!.next!.next

      this.length--
    } else {
      output = []
      const previousNodes: Node[] = []
      let previousNode: Node

      this._traverse((node, position) => {
        if (node.value === target) {
          ;(output as NodeTuple[]).push!([node, position] as NodeTuple)
          previousNodes.push(previousNode)
        }
        previousNode = node
      })

      previousNodes.forEach(node => {
        if (!node) {
          this.shift()
          return
        }

        node.next = node.next!.next
      })

      this.length -= output.length - 1
    }
    return output!
  }

  deleteAtPosition(
    position: number,
    amount = 1
  ): NodeTuple | NodeTuple[] | false {
    if (this.length === 0) return false

    if (position === 0 && amount === 1) return [this.shift(), 0] as NodeTuple
    if (position + amount > this.length) return false

    let leftNode = this.findAtPosition(position - 1)![0]
    let deletedNode: Node

    if (amount === 1) {
      deletedNode = leftNode.next!
      leftNode.next = deletedNode!.next
    } else {
      deletedNode = this._getNext(leftNode, amount)!
      leftNode.next = deletedNode!.next
      position += amount - 1
    }

    this.length -= amount

    return [deletedNode, position]
  }

  clear() {
    this.head = null
    this.length = 0
    return this
  }

  /**
   * Search
   */

  find(cb: searchCb) {
    return this._traverse(cb)
  }

  findByValue(target: number, allRecurrences = false) {
    if (!allRecurrences) return this._traverse(node => node.value === target)

    const output: NodeTuple[] = []
    this._traverse((node, position) => {
      if (node.value === target) output.push([node, position])
    })
    return output
  }

  findAtPosition(position: number) {
    return this._traverse((_, count) => position === count)
  }

  /**
   * Loops
   */
  knotByPosition(position: number) {
    if (position >= this.length - 1) return false
    const knotNode = this.findAtPosition(position)![0]
    this.last![0].next = knotNode
    return this
  }

  detectLoopbyLength(): NodeTuple | false {
    const node = this._traverse((_, position) => position > this.length)
    if (node) {
      return [node[0], node[1] - this.length]
    } else {
      return false
    }
  }

  detectLoopFloydCycleFindingAlgorithm() {
    let slowPointer = this.head
    let fastPointer = this.head

    let counter = 0
    while (slowPointer !== null && fastPointer !== null) {
      counter++
      slowPointer = slowPointer.next
      fastPointer = fastPointer.next!.next

      if (slowPointer === fastPointer) return [slowPointer, counter]
    }
    return false
  }

  /**
   * Converters
   */

  toArray() {
    const array: number[] = []
    this._traverse(node => {
      array.push(node.value)
    })
    return array
  }
}
