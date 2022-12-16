import { atom } from 'recoil'

export const signUpState = atom({
  key: 'signUpState',
  default: {
    isLoading: false,
    isFormInvalid: true,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    cep: '',
    street: '',
    complement: '',
    neighborhood: '',
    locality: '',
    uf: '',
    addressState: false,
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: '',
    cepError: '',
    mainError: ''
  }
})
