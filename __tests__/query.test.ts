import { Query } from '../src/query'
let query

describe('Query', () => {
  beforeEach(() => {
    query = new Query()
  })

  describe('#call()', () => {
    const data = [{ value: 1 }, { value: 2 }]
    it('applies the selector to each datum', () => {
      const selector = datum => datum.value
      query.from(data)
      query.select(selector)
      expect(query.call()).toEqual([1, 2])
    })

    it('filters data using where function', () => {
      const nIsOne = item => item.value === 1
      query.from(data)
      query.where(nIsOne)
      expect(query.call()).toEqual([{ value: 1 }])
    })

    it('uses and logic for muliple where functions', () => {
      //
    })
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
      it('sets the selector', () => {
        const spy = jest.spyOn(query, 'selector', 'set')
        query.select(() => {})
        expect(spy).toHaveBeenCalled()
        spy.mockRestore()
      })
    })

    describe('not given a function argument', () => {
      it('does not call the setter', () => {
        const spy = jest.spyOn(query, 'selector', 'set')
        query.select()
        expect(spy).not.toHaveBeenCalled()
        spy.mockRestore()
      })
    })

    it('throws and exception if called more than once with an argument', () => {
      expect(() => {
        query.select(() => {})
        query.select(() => {})
      }).toThrowError('SELECT called more than once')
    })
  })
})
