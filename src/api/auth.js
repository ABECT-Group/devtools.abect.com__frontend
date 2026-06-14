import { request } from './client.js'

export const authApi = {
  register:        (email, password, name)  => request('POST', '/api/auth/register',                { body: { email, password, name } }),
  verifyEmail:     (email, code)           => request('POST', '/api/auth/verify-email',             { body: { email, code } }),
  resendCode:      (email)                 => request('POST', '/api/auth/resend-code',              { body: { email } }),
  login:           (email, password)       => request('POST', '/api/auth/login',                    { body: { email, password } }),
  refresh:         ()                      => request('POST', '/api/auth/refresh'),
  logout:          (token)                 => request('POST', '/api/auth/logout',                   { token }),
  forgotPassword:  (email)                 => request('POST', '/api/auth/forgot-password',          { body: { email } }),
  verifyResetCode: (email, code)           => request('POST', '/api/auth/forgot-password/verify',   { body: { email, code } }),
  resetPassword:   (resetToken, password)  => request('POST', '/api/auth/forgot-password/reset',    { body: { resetToken, password } }),
}
