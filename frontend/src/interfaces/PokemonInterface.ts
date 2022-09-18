import { ReactNode } from 'react'

export interface Pokemon {
	id: number
	name: string
	hp: number
	attack: number
	defense: number
	type: string
}

export interface Card {
	id: number
	pokemon: Pokemon
	owned?: boolean
	children?: ReactNode
	level?: number
}

export interface MyPokemon {
	id: number
	level: number
	pokemon: number
	captured_at: string
}

export interface PokemonState {
	allPokemon: Pokemon[]
	myPokemon: MyPokemon[]
	loading: boolean
	errorMessage: string
}
