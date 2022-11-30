import { makeViaCEPUrl, makeAxiosHttpClient } from '@/main/factories/http'
import { GetAddress } from '@/domain/usecases'
import { RemoteGetAddress } from '@/data/usecases'

export const makeRemoteGetAddress = (): GetAddress =>
  new RemoteGetAddress(makeViaCEPUrl('/ws'), makeAxiosHttpClient())
