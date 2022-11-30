import { AddressModel } from '@/domain/models'

export interface GetAddress {
  get: (params: GetAddress.Params) => Promise<GetAddress.Model>
}

export namespace GetAddress {
  export type Params = {
    cep: string
  }

  export type Model = AddressModel
}
