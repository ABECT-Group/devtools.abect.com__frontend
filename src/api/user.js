import { request } from './client.js'

export const userApi = {
  getMe:       (token)           => request('GET',    '/api/users/me',                     { token }),
  deleteMe:    (token)           => request('DELETE', '/api/users/me',                     { token }),
  getBalance:  (token)           => request('GET',    '/api/tokens/balance',               { token }),
  getHistory:  (token, page = 1) => request('GET',    `/api/tokens/history?page=${page}`,  { token }),
}
