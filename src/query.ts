export type QueryData = any[]

export class QueryError extends Error {
  constructor(message) {
    super(message)
    this.name = 'QueryError'
  }
}

export class Query {
  private _data: QueryData | null = null
  private _selector: Function | null = null

  set data(data: QueryData) {
    this._data = data
  }

  set selector(selector: Function) {
    this._selector = selector
  }

  from(data: QueryData): void {
    if (this._data) {
      throw new QueryError('FROM called more than once')
    }
    this.data = data
  }

  select(selector?: Function): void {
    if (this._selector) {
      throw new QueryError('SELECT called more than once')
    } else if (selector) {
      this.selector = selector
    }
  }

  call(): QueryData | null {
    // TODO: trigger the query
    // iterate over the ._data once and run each of the where/select/clauses, etc in one pass
    // then iterate again to group then maybe again to group... TBD
    // WIP below
    if (this._data && this._selector) {
      // @ts-ignore
      return this._data.map(item => this._selector(item))
    } else {
      return null
    }
  }
}
