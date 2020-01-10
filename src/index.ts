import { Query, QueryData } from './query'
import { BoolFunc } from './types'

interface QueryWrapper {
  from: Function
  select: Function
  execute: Function
  where: Function
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
    where: function(whereFunc?: BoolFunc): QueryWrapper {
      sqlQuery.where(whereFunc)
      return this
    },
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
    .where(() => {})
    .from([1, 2])
    .select(d => d * 2)
    .execute()
)
