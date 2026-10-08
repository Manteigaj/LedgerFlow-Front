import api from './api'

type Credentials = {
  username: string
  password: string
}

type LoginResponse = {
  access_token: string
}

export async function login(credentials: Credentials) {
  const { data } = await api.post<LoginResponse>('/auth/login', credentials)

  if (typeof data.access_token !== 'string' || data.access_token.length === 0) {
    throw new Error('A API não retornou um token de acesso válido.')
  }

  return data.access_token
}

export async function register(credentials: Credentials) {
  await api.post('/auth/register', credentials)
}