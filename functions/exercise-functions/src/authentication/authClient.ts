import { OAuth2Client, UserRefreshClient } from 'google-auth-library'

export const authClient = new OAuth2Client({
  clientId: process.env['CLIENT_ID'],
  clientSecret: process.env['CLIENT_SECRET'],
  redirectUri: 'postmessage',
})

export const getUserRefreshClient = (refreshToken: string): UserRefreshClient =>
  new UserRefreshClient({
    clientId: process.env['CLIENT_ID'],
    clientSecret: process.env['CLIENT_SECRET'],
    refreshToken,
  })
