import axios, { AxiosError } from 'axios'

import { REACT_APP_BACKEND_URL } from '../config'
import { ProjectInfo } from '../models/APIModels'
import AuthManager from './AuthManager'

const errors = {
    TOKEN_EXPIRED: 'Your session expired. Please login again',
}

class APIService {
    private endpoints = {
        LOGIN: `${REACT_APP_BACKEND_URL}/login`,
        LOGOUT: `${REACT_APP_BACKEND_URL}/logout`,
        REGISTER: `${REACT_APP_BACKEND_URL}/register`,
        REFRESH_TOKEN: `${REACT_APP_BACKEND_URL}/token`,

        GET_TRANSLATIONS: (languages: Array<string>, dlcs: Array<string>) =>
            `${REACT_APP_BACKEND_URL}/translations?dlc=${dlcs.join(',')}&language=${languages.join(',')}`,
    }

    private injectResponseMessageToError = (error: AxiosError) => {
        if (!error.response) return
        const message = (error.response?.data as any).message
        if (typeof message === 'string') error.message = message
    }

    private fetch = async ({
        url,
        method,
        data,
        _retry,
        noAuth,
    }: {
        url: string
        method: 'get' | 'post' | 'put' | 'delete'
        data?: {
            [_: string]: any
        }
        _retry?: boolean
        noAuth?: boolean
    }): Promise<{ [key: string]: any }> => {
        console.log('Checking token expiration')
        if (!noAuth && AuthManager.isAccessTokenExpired()) {
            console.log('Token is expired')
            await this.tryRefreshingTokenOrLogoutAndThrow()
        }
        try {
            console.log('Fetching the API...', url)
            const realUrl = url.startsWith('http') ? url : `http://${url}`
            const result = await axios(realUrl, {
                method,
                headers: !noAuth
                    ? {
                          ...(AuthManager.authHeader() || {}),
                      }
                    : {},
                data,
            })
            console.log('Fetch succeeded', url)
            return result.data
        } catch (error: unknown) {
            if (!(error instanceof AxiosError)) throw error
            if (error.response && error.response.status === 401) {
                console.log('Received Unauthorized error from server')
                if (_retry) {
                    console.log('The request has already been retried, so we logout')
                    await this.logout()
                    throw new Error(errors.TOKEN_EXPIRED)
                } else {
                    console.log('Trying to refresh the access token')
                    await this.tryRefreshingTokenOrLogoutAndThrow()
                    console.log('Retrying original request with new access token', url)
                    const retryData = await this.fetch({
                        url,
                        method,
                        data,
                        _retry: true,
                    })

                    console.log('Retry succeeded!', url)
                    return retryData
                }
            } else {
                this.injectResponseMessageToError(error)
                throw error
            }
        }
    }

    private tryRefreshingTokenOrLogoutAndThrow = async () => {
        try {
            console.log('Refreshing token')
            await this.refreshToken()
            console.log('Token successfully refreshed')
        } catch (error) {
            console.log('Error refreshing token', error)
            console.log('Logging out user.')
            // error refreshing token
            await this.logout()
            throw new Error(errors.TOKEN_EXPIRED)
        }
    }

    public refreshToken = async () => {
        const refreshToken = AuthManager.getRefreshToken()
        const {
            data: { accessToken },
        } = await axios({
            url: this.endpoints.REFRESH_TOKEN,
            method: 'post',
            data: { token: refreshToken },
        })
        AuthManager.setAccessToken(accessToken)
    }

    public logout = async () => {
        AuthManager.logout()
        const refreshToken = AuthManager.getRefreshToken()
        if (refreshToken) {
            return axios({
                url: this.endpoints.LOGOUT,
                method: 'post',
                data: { token: refreshToken },
            })
        }
        return null
    }

    public login = async (handle: string, password: string) => {
        // const response = await axios.post(this.endpoints.LOGIN, { handle, password })
        const response = await this.fetch({
            url: this.endpoints.LOGIN,
            method: 'post',
            data: { handle, password },
            noAuth: true,
        })
        const { accessToken, refreshToken } = response
        AuthManager.login({ accessToken, refreshToken })
    }

    public createAccount = async (handle: string, name: string, password: string) => {
        await this.fetch({
            url: this.endpoints.REGISTER,
            method: 'post',
            data: { handle, password, name },
            noAuth: true,
        })
        await this.login(handle, password)
    }

    public joinProject = async (
        projectCode: string
    ): Promise<{
        projectId: string
    }> => {
        return (await this.fetch({
            url: `${REACT_APP_BACKEND_URL}/project/join/`,
            method: 'post',
            data: { inviteCode: projectCode },
        })) as { projectId: string }
    }

    public getJoinedProjects = async () => {
        return (await this.fetch({
            url: `${REACT_APP_BACKEND_URL}/project/`,
            method: 'get',
        })) as Array<{
            projectId: string
            projectName: string
            role: 'owner' | 'manager' | 'participant' | 'viewer'
        }>
    }

    public getProjectInfo = async (projectId: string) => {
        return (await this.fetch({
            url: `${REACT_APP_BACKEND_URL}/project/${projectId}`,
            method: 'get',
        })) as ProjectInfo
    }

    public createTask = async (projectId: string, task: {
        name: string
        description: string
        dueDate: string
        assignee: string
    }) => {
        return (await this.fetch({
            url: `${REACT_APP_BACKEND_URL}/project/${projectId}/create_task`,
            method: 'post',
            data: task,
        })) as { taskId: string }
    }
}

export default new APIService()
