import Styles from './signup-styles.scss'
import { signUpState, Input, Output, SubmitButton, FormStatus } from './components'
import { currentAccountState } from '@/presentation/components'
import { Validation } from '@/presentation/protocols'
import { AddAccount, GetAddress } from '@/domain/usecases'

import { useHistory, Link } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import React, { useEffect } from 'react'

type Props = {
  validation: Validation
  getAddress: GetAddress
  addAccount: AddAccount
}

const SignUp: React.FC<Props> = ({ validation, addAccount, getAddress }: Props) => {
  const resetSignUpState = useResetRecoilState(signUpState)
  const { setCurrentAccount } = useRecoilValue(currentAccountState)
  const history = useHistory()
  const [state, setState] = useRecoilState(signUpState)

  useEffect(() => resetSignUpState(), [])
  useEffect(() => validate('name'), [state.name])
  useEffect(() => validate('email'), [state.email])
  useEffect(() => validate('password'), [state.password])
  useEffect(() => validate('passwordConfirmation'), [state.passwordConfirmation])
  useEffect(() => validate('cep'), [state.cep])
  useEffect(() => {
    console.log(JSON.stringify({state: state}))
    if (state.cep.length === 8) {
      const fetchData = async () => {
        const data = await updateState({cep: state.cep})
      }
      fetchData()
        .catch(console.error)
    } else {
      if (state.addressState) {
        setState(old => ({...old, street: '', complement: '', neighborhood: '', locality: '', uf: '', addressState: false}))
      }
    }
  }, [state.cep])

  const validate = (field: string): void => {
    const { name, email, password, passwordConfirmation, cep } = state
    const formData = { name, email, password, passwordConfirmation, cep }
    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setState(old => ({ ...old, isFormInvalid: !!old.nameError || !!old.emailError || !!old.passwordError || !!old.passwordConfirmationError || !!old.cepError }))
  }

  const updateState = async (value: any): Promise<void> => {
    const data = await getAddress.get({ cep: value.cep })
    setState(old => ({
      ...old,
      ...value,
      ...data,
      addressState: true
    }))
    return
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) {
        return
      }
      setState(old => ({ ...old, isLoading: true }))
      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })
      setCurrentAccount(account)
      history.replace('/')
    } catch (error) {
      setState(old => ({
        ...old,
        isLoading: false,
        mainError: error.message
      }))
    }
  }

  return (
    <div className={Styles.signupWrap}>
      <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
        <Input type="text" name="name" placeholder="Digite seu nome" />
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha" />
        <Input type="text" name="cep" placeholder="Digite seu CEP" />
        <Output type="text" name="logradouro" value={state.street} />
        <Output type="text" name="complemento" value={state.complement} />
        <Output type="text" name="bairro" value={state.neighborhood} />
        <Output type="text" name="localidade" value={state.locality} />
        <Output type="text" name="UF" value={state.uf} />

        <SubmitButton text="Cadastrar" />
        <Link data-testid="login-link" replace to="/login" className={Styles.link}>Voltar Para Login</Link>
        <FormStatus />
      </form>
    </div>
  )
}

export default SignUp
