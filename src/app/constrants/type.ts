export const TokenType = {
    AccessToken: 'AccessToken',
    RefreshToken: 'RefreshToken'
} as const

export const Role = {
    superAdmin: 'superAdmin',

} as const

export const RoleValues = [Role.superAdmin] as const
