import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { GetAddress } from '@/domain/usecases'
import { UnexpectedError } from '@/domain/errors'

export class RemoteGetAddress implements GetAddress {
  constructor (
    private readonly baseURL: string,
    private readonly httpClient: HttpClient<RemoteGetAddress.Model>
  ) {}

  async get (params: GetAddress.Params): Promise<GetAddress.Model> {
    const httpResponse = await this.httpClient.request({
      baseURL: `${this.baseURL}/${params.cep}/json`,
      method: 'get'
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return {
        street: httpResponse.body.logradouro, 
        complement: httpResponse.body.complemento,
        neighborhood: httpResponse.body.bairro,
        locality: httpResponse.body.localidade,
        uf: httpResponse.body.uf
      }
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteGetAddress {
  export type Model = GetAddress.Model
}
