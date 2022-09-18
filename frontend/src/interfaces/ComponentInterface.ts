import { ReactNode } from 'react'
import { Pokemon } from './PokemonInterface'

export interface TitleProps {
	title: string
	children?: ReactNode
}

export interface ErrorMessageProps {
	errorMessage: string
	classes?: string
}

export interface GuessTheNumberProps {
	level: number
	pokemon: Pokemon
	answer: number
	maxNumber: number
	endGame: Function
}
