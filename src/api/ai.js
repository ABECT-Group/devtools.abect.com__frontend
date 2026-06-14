import { request } from './client.js'

export const aiApi = {
  generateProductSchema: (message, token) =>
    request('POST', '/api/ai/schema-markup/product', { body: { message }, token }),
}
