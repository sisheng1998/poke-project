import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import userReducer from './user'
import pokemonReducer from './pokemon'

const store = configureStore({
	reducer: {
		user: userReducer,
		pokemon: pokemonReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store
