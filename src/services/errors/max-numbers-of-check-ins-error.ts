export class MaxNumbersOfCheckInsError extends Error {
  constructor () {
    super('Max number os check-ins reached.')
  }
}
