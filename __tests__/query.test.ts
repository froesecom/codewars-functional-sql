import { Query } from '../src/query'
let query

describe('Query', () => {
  beforeEach(() => {
    query = new Query()
  })

  describe('#call()', () => {
    it('applies the selector to each datum', () => {
      const data = [{ value: 1 }, { value: 2 }]
      const selector = datum => datum.value
      query.from(data)
      query.select(selector)
      expect(query.call()).toEqual([1, 2])
    })

    describe('where logic', () => {
      const data = [
        { value: 1, name: 'jane' },
        { value: 1, name: 'bill' },
        { value: 3, name: 'bill' },
        { value: 3, name: 'jane' },
      ]
      const nIsOne = item => item.value === 1
      const isBill = item => item.name === 'bill'

      it('filters data using where function', () => {
        query.from(data)
        query.where(nIsOne)
        expect(query.call()).toEqual([
          { value: 1, name: 'jane' },
          { value: 1, name: 'bill' },
        ])
      })

      it('uses "and" logic for muliple where functions', () => {
        query.from(data)
        query.where(nIsOne)
        query.where(isBill)
        expect(query.call()).toEqual([{ value: 1, name: 'bill' }])
      })
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
