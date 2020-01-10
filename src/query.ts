import { QueryError } from './query_error'
import { BoolFunc } from './types'

export type QueryData = any[]

export class Query {
  private _data: QueryData | null = null
  private _selector: (() => void) | null = null
  private _whereFuncs: BoolFunc[] = []

  call(): QueryData | null {
    // TODO: trigger the query
    // iterate over the ._data once and run each of the where/select/clauses, etc in one pass
    // then iterate again to group then maybe again to group... TBD
    // WIP below
    if (this._data) {
      // @ts-ignore
      return this.runSelect(this.runWhere(this._data))
    } else {
      return null
    }
  }

  from(data: QueryData): void {
    if (this._data) {
      throw new QueryError('FROM called more than once')
    }
    this.data = data
  }

  select(selector?: () => void): void {
    if (this._selector) {
      throw new QueryError('SELECT called more than once')
    } else if (selector) {
      this.selector = selector
    }
  }

  where(whereFunc?: BoolFunc): void {
    if (whereFunc) {
      this._whereFuncs.push(whereFunc)
    }
  }

  private set data(data: QueryData) {
    this._data = data
  }

  private set selector(selector: () => void) {
    this._selector = selector
  }

  private runSelect(data: QueryData): QueryData {
    if (this._selector) {
      // @ts-ignore
      return data.map(item => this._selector(item))
    } else {
      return data
    }
  }

  private runWhere(data: QueryData): QueryData {
    if (this._whereFuncs.length === 0) {
      return data
    } else {
      return data.filter(item => {
        return this._whereFuncs.reduce(
          (shouldSelect: boolean, filterFunction) => {
            return shouldSelect === false ? shouldSelect : filterFunction(item)
          },
          true
        )
      })
    }
  }
}
