// NOTE: All code in one file because the codewars GUID can't import multiple files

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
    return this._data
  }
}

export function query(): any {
  const sqlQuery = new Query()

  return {
    // select: () => (1),
    from: function(data: QueryData): void {
      sqlQuery.from(data)
      return this
    },
    // where: () => (1),
    // orderBy: () => (1),
    // groupBy: () => (1),
    // having: () => (1),
    execute: function() {
      return sqlQuery.call()
    },
  }
}

// console.log(
//   query()
//     .from([1])
//     .execute()
// )
