const Graph = require('../src/graph/graph').default

test('setup completed', () => {
  const output = new Graph()

  expect(output).toEqual({ test: true })
})
