import { Query } from '../src/index'
let query

describe('Query', () => {
  beforeEach(() => {
    query = new Query()
  })

  describe('#from()', () => {
    test('sets data', () => {
      const spy = jest.spyOn(query, 'data', 'set')
      query.from([])
      expect(spy).toHaveBeenCalled()
      spy.mockRestore()
    })

    test('throws and exception if called more than once', () => {
      expect(() => {
        query.from([])
        query.from([])
      }).toThrowError('FROM called more than once')
    })
  })
})
