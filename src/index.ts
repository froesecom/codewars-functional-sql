import { Query, QueryData } from './query'

interface QueryWrapper {
  from: Function
  select: Function
  execute: Function
}

export function query(): any {
  const sqlQuery = new Query()

  return {
    select: function(selector?: Function): QueryWrapper {
      sqlQuery.select(selector)
      return this
    },
    from: function(data: QueryData): QueryWrapper {
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
//     .select(() => {})
//     .execute()
// )
