// NOTE: All code in one file because the codewars GUID can't import multiple files

export type QueryData = any[]

export class Query {
  private _data: QueryData | null = null
  set data(data: QueryData) {
    this._data = data
  }

  from(data: QueryData): void {
    // raise error if already called
    this.data = data
  }

  call() {
    return this.data
  }
}
const sqlQuery = new Query()

export function query(): any {
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
console.log(
  query()
    .from([1])
    .execute()
)
