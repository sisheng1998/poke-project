import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { PokemonState } from '../interfaces/PokemonInterface'
import axiosPrivate from '../utils/axiosPrivate'

export const getAllPokemon = createAsyncThunk(
	'pokemon/allpokemon',
	async (_, thunkAPI) => {
		try {
			const res = await axiosPrivate.get('/pokemon/allpokemon/')

			if (res.status === 200) {
				return res.data
			}
		} catch (error) {
			return thunkAPI.rejectWithValue('Unable to get data.')
		}
	}
)

export const getMyPokemon = createAsyncThunk(
	'pokemon/mypokemon',
	async (_, thunkAPI) => {
		try {
			const res = await axiosPrivate.get('/pokemon/mypokemon/')

			if (res.status === 200) {
				return res.data
			}
		} catch (error) {
			return thunkAPI.rejectWithValue('Unable to get data')
		}
	}
)

const initialState = {
	allPokemon: [],
	myPokemon: [],
	loading: false,
	errorMessage: '',
} as PokemonState

const pokemonSlice = createSlice({
	name: 'pokemon',
	initialState,
	reducers: {
		resetPokemonState: () => initialState,
		addPokemon: (state, action) => {
			state.myPokemon = [...state.myPokemon, action.payload]
		},
		releasePokemon: (state, action) => {
			state.myPokemon = state.myPokemon.filter(
				(pokemon) => pokemon.id !== action.payload
			)
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllPokemon.pending, (state) => {
				state.loading = true
				state.errorMessage = ''
			})
			.addCase(getAllPokemon.fulfilled, (state, action) => {
				state.allPokemon = action.payload
				state.loading = false
				state.errorMessage = ''
			})
			.addCase(getAllPokemon.rejected, (state, action) => {
				state.loading = false
				state.errorMessage = action.payload as string
			})
			.addCase(getMyPokemon.pending, (state) => {
				state.loading = true
				state.errorMessage = ''
			})
			.addCase(getMyPokemon.fulfilled, (state, action) => {
				state.myPokemon = action.payload
				state.loading = false
				state.errorMessage = ''
			})
			.addCase(getMyPokemon.rejected, (state, action) => {
				state.loading = false
				state.errorMessage = action.payload as string
			})
	},
})

export const { resetPokemonState, addPokemon, releasePokemon } =
	pokemonSlice.actions
export default pokemonSlice.reducer
