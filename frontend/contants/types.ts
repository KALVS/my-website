import { Method } from 'axios'

export interface SignedRequest {
  method: Method
  service: string
  region: string
  host: string
  headers: Record<string, string>
  body: string
}

export interface ParticipantType {
  name: string
  number: string
}
