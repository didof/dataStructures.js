const SLL = require('../src/SinglyLinkedList/SLL').default
const Node = require('../src/SinglyLinkedList/Node').default

describe('operations', () => {
  describe('insertion', () => {
    describe('empty sll', () => {
      const sll = new SLL()
      beforeEach(() => {
        sll.clear()
      })

      describe('unshift', () => {
        test('single', () => {
          sll.unshift(1)
          expect(sll.toArray()).toEqual([1])
        })

        test('multiple', () => {
          sll.unshift(1, 2, 3)
          expect(sll.toArray()).toEqual([1, 2, 3])
        })
      })

      describe('push', () => {
        test('single', () => {
          sll.push(1)
          expect(sll.toArray()).toEqual([1])
        })

        test('multiple', () => {
          sll.push(1, 2, 3)
          expect(sll.toArray()).toEqual([1, 2, 3])
        })
      })

      describe('insertAfter', () => {
        test('single', () => {
          expect(sll.insertAfter(0, 1).toArray()).toEqual([1])
        })

        test('multiple', () => {
          expect(sll.insertAfter(0, 1, 2, 3).toArray()).toEqual([1, 2, 3])
        })
      })

      describe('insertBefore', () => {
        test('single', () => {
          expect(sll.insertBefore(0, 1).toArray()).toEqual([1])
        })

        test('multiple', () => {
          expect(sll.insertBefore(0, 1, 2, 3).toArray()).toEqual([1, 2, 3])
        })
      })
    })

    describe('not empty sll', () => {
      const sll = new SLL()
      beforeEach(() => {
        sll.clear()
        sll.push(4, 5, 6)
      })

      describe('unshift', () => {
        test('single', () => {
          sll.unshift(1)
          expect(sll.toArray()).toEqual([1, 4, 5, 6])
        })

        test('multiple', () => {
          sll.unshift(1, 2, 3)
          expect(sll.toArray()).toEqual([1, 2, 3, 4, 5, 6])
        })
      })

      describe('push', () => {
        test('single', () => {
          sll.push(1)
          expect(sll.toArray()).toEqual([4, 5, 6, 1])
        })

        test('multiple', () => {
          sll.push(1, 2, 3)
          expect(sll.toArray()).toEqual([4, 5, 6, 1, 2, 3])
        })
      })

      describe('insertAfter', () => {
        test('single', () => {
          expect(sll.insertAfter(0, 1).toArray()).toEqual([4, 1, 5, 6])
        })

        test('multiple', () => {
          expect(sll.insertAfter(0, 1, 2, 3).toArray()).toEqual([
            4,
            1,
            2,
            3,
            5,
            6,
          ])
        })
      })

      describe('insertBefore', () => {
        test('single', () => {
          expect(sll.insertBefore(0, 1).toArray()).toEqual([1, 4, 5, 6])
        })

        test('multiple', () => {
          expect(sll.insertBefore(0, 1, 2, 3).toArray()).toEqual([
            1,
            2,
            3,
            4,
            5,
            6,
          ])
        })
      })
    })
  })

  describe('deletion', () => {
    describe('empty sll', () => {
      const sll = new SLL()
      afterEach(() => {
        sll.clear()
      })

      test('shift', () => {
        expect(sll.shift()).toBeNull()
      })

      test('pop', () => {
        expect(sll.pop()).toBeNull()
      })

      test('delete', () => {
        expect(sll.delete(node => node.value === 1)).toBeFalsy()
      })

      test('deleteByValue', () => {
        expect(sll.deleteByValue(1)).toBeFalsy()
      })

      test('deleteAtPosition', () => {
        expect(sll.deleteAtPosition(3)).toBeFalsy()
      })
    })

    describe('not empty sll', () => {
      const sll = new SLL()
      beforeEach(() => {
        sll.clear()
        sll.push(4, 5, 6)
      })

      test('shift', () => {
        const node = sll.shift()
        expect(node).toBeInstanceOf(Node)
        expect(node.value).toEqual(4)
      })

      test('pop', () => {
        const node = sll.pop()
        expect(node).toBeInstanceOf(Node)
        expect(node.value).toEqual(6)
      })

      describe('delete', () => {
        test('not included value', () => {
          expect(sll.delete(node => node.value === 1)).toBeFalsy()
        })

        test('head node', () => {
          const nodeTuple = sll.delete(node => node.value === 4)
          expect(nodeTuple[0]).toBeInstanceOf(Node)
          expect(nodeTuple[1]).toEqual(0)
        })

        test('middle node', () => {
          const nodeTuple = sll.delete(node => node.value === 5)
          expect(nodeTuple[0]).toBeInstanceOf(Node)
          expect(nodeTuple[1]).toEqual(1)
        })

        test('tail node', () => {
          const nodeTuple = sll.delete(node => node.value === 6)
          expect(nodeTuple[0]).toBeInstanceOf(Node)
          expect(nodeTuple[1]).toEqual(2)
        })
      })

      describe('deleteByValue', () => {
        test('not included value', () => {
          const nodeTuple = sll.deleteByValue(1)
          expect(nodeTuple).toBeFalsy()
        })

        test('head node', () => {
          const nodeTuple = sll.deleteByValue(4)
          expect(nodeTuple[0]).toBeInstanceOf(Node)
          expect(nodeTuple[0].value).toEqual(4)
          expect(nodeTuple[1]).toEqual(0)
        })

        test('middle node', () => {
          const nodeTuple = sll.deleteByValue(5)
          expect(nodeTuple[0]).toBeInstanceOf(Node)
          expect(nodeTuple[0].value).toEqual(5)
          expect(nodeTuple[1]).toEqual(1)
        })

        test('tail node', () => {
          const nodeTuple = sll.deleteByValue(6)
          expect(nodeTuple[0]).toBeInstanceOf(Node)
          expect(nodeTuple[0].value).toEqual(6)
          expect(nodeTuple[1]).toEqual(2)
        })

        test('all occurrences', () => {
          sll.push(4)
          const [first, second] = sll.deleteByValue(4, true)
          expect(first[0]).toBeInstanceOf(Node)
          expect(second[0]).toBeInstanceOf(Node)
          expect(first[0].value).toEqual(4)
          expect(second[0].value).toEqual(4)
          expect(first[1]).toEqual(0)
          expect(second[1]).toEqual(3)
        })
      })

      describe('deleteAtPosition', () => {
        test('not valid position', () => {
          const nodeTuple = sll.deleteAtPosition(5)
          expect(nodeTuple).toBeFalsy()
        })

        test('head node', () => {
          const nodeTuple = sll.deleteAtPosition(0)
          expect(nodeTuple[0]).toBeInstanceOf(Node)
          expect(nodeTuple[0].value).toEqual(4)
          expect(nodeTuple[1]).toEqual(0)
        })

        test('middle node', () => {
          const nodeTuple = sll.deleteAtPosition(1)
          expect(nodeTuple[0]).toBeInstanceOf(Node)
          expect(nodeTuple[0].value).toEqual(5)
          expect(nodeTuple[1]).toEqual(1)
        })

        test('tail node', () => {
          const nodeTuple = sll.deleteAtPosition(2)
          expect(nodeTuple[0]).toBeInstanceOf(Node)
          expect(nodeTuple[0].value).toEqual(6)
          expect(nodeTuple[1]).toEqual(2)
        })
      })
    })
  })

  describe('search', () => {
    describe('empty sll', () => {
      const sll = new SLL()
      beforeEach(() => {
        sll.clear()
      })

      test('find', () => {
        expect(sll.find(node => node.value === 1)).toBeNull()
      })

      test('findByValue', () => {
        expect(sll.findByValue(1)).toBeNull()
      })

      test('findAtPosition', () => {
        expect(sll.findAtPosition(3)).toBeNull()
      })
    })

    describe('not empty sll', () => {
      const sll = new SLL()
      beforeEach(() => {
        sll.clear()
        sll.push(4, 5, 6)
      })

      describe('find', () => {
        test('not included value', () => {
          expect(sll.find(node => node.value === 1)).toBeNull()
        })

        test('included value', () => {
          const nodeTuple = sll.find(node => node.value === 4)
          expect(nodeTuple[0]).toBeInstanceOf(Node)
          expect(nodeTuple[0].value).toEqual(4)
          expect(nodeTuple[1]).toEqual(0)
        })
      })

      describe('findByValue', () => {
        test('not included value', () => {
          expect(sll.findByValue(1)).toBeNull()
        })

        test('included value', () => {
          const nodeTuple = sll.findByValue(4)
          expect(nodeTuple[0]).toBeInstanceOf(Node)
          expect(nodeTuple[0].value).toEqual(4)
          expect(nodeTuple[1]).toEqual(0)
        })
      })

      describe('findAtPosition', () => {
        test('not included value', () => {
          expect(sll.findAtPosition(3)).toBeNull()
        })

        test('included value', () => {
          const nodeTuple = sll.findAtPosition(0)
          expect(nodeTuple[0]).toBeInstanceOf(Node)
          expect(nodeTuple[0].value).toEqual(4)
          expect(nodeTuple[1]).toEqual(0)
        })
      })
    })
  })

  describe('loops', () => {
    const sll = new SLL()
    beforeEach(() => {
      sll.clear()
      sll.push(1, 2, 3, 4, 5)
    })

    describe('knots', () => {
      describe('knotByPosition', () => {
        test('empty sll', () => {
          sll.clear()
          expect(sll.knotByPosition(2)).toBeFalsy()
        })

        test('not empty sll, knot on tail', () => {
          expect(sll.knotByPosition(sll.length - 1)).toBeFalsy()
        })

        test('not empty sll, valid knot', () => {
          const loopedSll = sll.knotByPosition(1)
          expect(loopedSll.detectLoopFloydCycleFindingAlgorithm()).toBeTruthy()
        })
      })
    })

    describe('detect', () => {
      beforeEach(() => {
        sll.knotByPosition(3)
      })
      describe('detectLoopbyLength', () => {
        test('empty sll', () => {
          sll.clear()
          expect(sll.detectLoopbyLength()).toBeFalsy()
        })

        test('not empty sll', () => {
          expect(sll.detectLoopbyLength()).toBeTruthy()
        })
      })

      describe('detectLoopFloydCycleFindingAlgorithm', () => {
        test('empty sll', () => {
          sll.clear()
          expect(sll.detectLoopFloydCycleFindingAlgorithm()).toBeFalsy()
        })

        test('not empty sll', () => {
          expect(sll.detectLoopFloydCycleFindingAlgorithm()).toBeTruthy()
        })
      })
    })
  })
})
