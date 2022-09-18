import axios from 'axios'

import store from '../redux/store'
import { refreshAccessToken } from '../redux/user'

const baseURL = process.env.REACT_APP_API_URL

const axiosPrivate = axios.create({
	baseURL,
})

axiosPrivate.interceptors.request.use(
	async (req) => {
		const access = localStorage.getItem('access')

		req.headers = {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `JWT ${access}`,
		}

		return req
	},
	(error) => Promise.reject(error)
)

axiosPrivate.interceptors.response.use(
	(res) => res,
	async (error) => {
		const originalRequest = error.config

		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true

			await store.dispatch(refreshAccessToken({ getPokemon: false }))

			return axiosPrivate(originalRequest)
		}

		return Promise.reject(error)
	}
)

export default axiosPrivate
