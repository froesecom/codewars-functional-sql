type QueryData = any[]

class Query {
  data: QueryData | null = null

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
