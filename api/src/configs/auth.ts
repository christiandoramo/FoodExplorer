const authConfig = {
    jwt: {
        secret: process.env.AUTH_SECRET || 'default',
        refreshSecret: process.env.REFRESH_SECRET || 'default',
        expiresIn: '1h',
        refreshExpiresIn: '7d',
    }

}

export default authConfig