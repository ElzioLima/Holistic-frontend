import { FieldValidation } from '@/validation/protocols'
import { InvalidFieldError } from '@/validation/errors'

export class CEPValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate (input: object): Error {
    const cepRegex = /^\d{8}$/
    return (!input[this.field] || cepRegex.test(input[this.field])) ? null : new InvalidFieldError()
  }
}
