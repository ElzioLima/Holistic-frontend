import { FieldValidation } from '@/validation/protocols'
import { InvalidFieldError } from '@/validation/errors'

export class CEPValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate (input: object): Error {
    const emailRegex = /^[0-9]{8}$/
    return (!input[this.field] || emailRegex.test(input[this.field])) ? null : new InvalidFieldError()
  }
}
