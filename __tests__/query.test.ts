import { Query } from '../src/query'
let query

describe('Query', () => {
  beforeEach(() => {
    query = new Query()
  })

  describe('#from()', () => {
    it('sets data', () => {
      const spy = jest.spyOn(query, 'data', 'set')
      query.from([])
      expect(spy).toHaveBeenCalled()
      spy.mockRestore()
    })

    it('throws and exception if called more than once', () => {
      expect(() => {
        query.from([])
        query.from([])
      }).toThrowError('FROM called more than once')
    })
  })

  describe('#select()', () => {
    describe('given a function argument', () => {
      // to it
    })

    describe('not given a function argument', () => {
      // to it
    })

    it('throws and exception if called more than once with an argument', () => {
      expect(() => {
        query.select(() => {})
        query.select(() => {})
      }).toThrowError('SELECT called more than once')
    })
  })
})
