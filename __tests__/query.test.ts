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
  })
})
