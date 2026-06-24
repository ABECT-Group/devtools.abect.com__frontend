import { request } from './client.js'

export const skillsApi = {
  getSkills: () => request('GET', '/api/skills'),
}
