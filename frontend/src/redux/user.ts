import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { User, UserState } from '../interfaces/UserInterface'
import { getAllPokemon, getMyPokemon } from './pokemon'
import axiosPrivate from '../utils/axiosPrivate'

export const login = createAsyncThunk(
	'users/login',
	async ({ email, password }: User, thunkAPI) => {
		const body = JSON.stringify({ email, password })

		try {
			const res = await fetch(
				`${process.env.REACT_APP_API_URL}/auth/jwt/create/`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
					body,
				}
			)

			const data = await res.json()

			if (res.status === 200) {
				const { dispatch } = thunkAPI

				const { access, refresh } = data

				localStorage.setItem('access', access)
				localStorage.setItem('refresh', refresh)

				dispatch(getUser())
				dispatch(getAllPokemon())
				dispatch(getMyPokemon())

				return data
			} else {
				return thunkAPI.rejectWithValue('Incorrect email / password.')
			}
		} catch (error) {
			return thunkAPI.rejectWithValue('Please try again later.')
		}
	}
)

export const register = createAsyncThunk(
	'users/register',
	async ({ email, password, re_password }: User, thunkAPI) => {
		const body = JSON.stringify({ email, password, re_password })

		try {
			const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/users/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body,
			})

			const data = await res.json()

			if (res.status === 201) {
				return data
			} else {
				let errorMessage = 'Please try again later.'

				if (data.email) {
					errorMessage = 'Account with this email already exist.'
				} else if (data.password) {
					errorMessage = 'Please use strong password.'
				} else if (data.non_field_errors) {
					errorMessage = 'Passwords did not match.'
				}

				return thunkAPI.rejectWithValue(errorMessage)
			}
		} catch (error) {
			return thunkAPI.rejectWithValue('Please try again later.')
		}
	}
)

const getUser = createAsyncThunk('users/me', async (_, thunkAPI) => {
	try {
		const res = await axiosPrivate.get('/auth/users/me/')

		if (res.status === 200) {
			return res.data
		}
	} catch (error) {
		return thunkAPI.rejectWithValue('Please try again later.')
	}
})

export const checkAuth = createAsyncThunk(
	'users/verify',
	async (_, thunkAPI) => {
		const access = localStorage.getItem('access')
		const refresh = localStorage.getItem('refresh')

		if (!access) return thunkAPI.rejectWithValue('Access token not found.')

		const body = JSON.stringify({ token: access })

		try {
			const res = await fetch(
				`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
					body,
				}
			)

			const data = await res.json()

			if (res.status === 200) {
				const { dispatch } = thunkAPI

				dispatch(getUser())
				dispatch(getAllPokemon())
				dispatch(getMyPokemon())

				return data
			} else if (res.status === 401 && refresh) {
				const { dispatch } = thunkAPI

				dispatch(refreshAccessToken({ getPokemon: true }))

				return data
			} else {
				return thunkAPI.rejectWithValue(data)
			}
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const refreshAccessToken = createAsyncThunk(
	'users/refresh',
	async ({ getPokemon }: { getPokemon: boolean }, thunkAPI) => {
		const refresh = localStorage.getItem('refresh')

		const body = JSON.stringify({ refresh })

		try {
			const res = await fetch(
				`${process.env.REACT_APP_API_URL}/auth/jwt/refresh/`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
					body,
				}
			)

			const data = await res.json()

			if (res.status === 200) {
				const { dispatch } = thunkAPI
				const { access } = data

				localStorage.setItem('access', access)
				dispatch(getUser())

				if (getPokemon) {
					dispatch(getAllPokemon())
					dispatch(getMyPokemon())
				}

				return data
			} else {
				return thunkAPI.rejectWithValue(data)
			}
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

const initialState = {
	isAuthenticated: false,
	user: null,
	loading: false,
	registered: false,
	errorMessage: '',
} as UserState

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		resetErrorMessage: (state) => {
			state.errorMessage = ''
		},
		resetRegistered: (state) => {
			state.registered = false
		},
		logout: () => {
			localStorage.removeItem('access')
			localStorage.removeItem('refresh')

			return initialState
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.loading = true
				state.errorMessage = ''
			})
			.addCase(register.fulfilled, (state) => {
				state.registered = true
				state.loading = false
				state.errorMessage = ''
			})
			.addCase(register.rejected, (state, action) => {
				state.loading = false
				state.errorMessage = action.payload as string
			})
			.addCase(login.pending, (state) => {
				state.loading = true
				state.errorMessage = ''
			})
			.addCase(login.fulfilled, (state) => {
				state.isAuthenticated = true
				state.loading = false
				state.errorMessage = ''
			})
			.addCase(login.rejected, (state, action) => {
				state.loading = false
				state.errorMessage = action.payload as string
			})
			.addCase(getUser.pending, (state) => {
				state.loading = true
				state.errorMessage = ''
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.user = action.payload
				state.loading = false
				state.errorMessage = ''
			})
			.addCase(getUser.rejected, (state, action) => {
				state.isAuthenticated = false
				state.loading = false
				state.errorMessage = action.payload as string
			})
			.addCase(checkAuth.pending, (state) => {
				state.loading = true
			})
			.addCase(checkAuth.fulfilled, (state) => {
				state.isAuthenticated = true
				state.loading = false
			})
			.addCase(checkAuth.rejected, (state) => {
				localStorage.removeItem('access')
				localStorage.removeItem('refresh')

				state.loading = false
			})
			.addCase(refreshAccessToken.pending, (state) => {
				state.loading = true
			})
			.addCase(refreshAccessToken.fulfilled, (state) => {
				state.loading = false
			})
			.addCase(refreshAccessToken.rejected, () => {
				localStorage.removeItem('access')
				localStorage.removeItem('refresh')

				return initialState
			})
	},
})

export const { resetErrorMessage, resetRegistered, logout } = userSlice.actions
export default userSlice.reducer
