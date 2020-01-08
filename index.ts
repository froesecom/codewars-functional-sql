const data: any[] | null = null
const validate = (): void => {
  // do the validation
  1
}


export function query(): any {
  return {
    select: () => (1),
    from: () => (1),
    where: () => (1),
    orderBy: () => (1),
    groupBy: () => (1),
    having: () => (1),
    execute: () => { 
      validate()
      return 1
    }
   }
}
