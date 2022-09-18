import { useState } from 'react'
import { useSelector } from 'react-redux'

import Title from '../components/Title'

import generateNumber from '../utils/generateNumber'
import { Pokemon } from '../interfaces/PokemonInterface'
import PokemonCard from '../components/PokemonCard'
import GuessTheNumber from '../components/GuessTheNumber'

import type { RootState } from '../redux/store'

const CatchEmAll = () => {
	const { allPokemon, myPokemon } = useSelector(
		(state: RootState) => state.pokemon
	)

	const ownedPokemonId = Array.from(
		new Set(myPokemon.map(({ pokemon }) => pokemon))
	)

	const [gameStarted, setGameStarted] = useState<boolean>(false)
	const [chosenPokemon, setChosenPokemon] = useState<Pokemon | null>(null)
	const [pokemonLevel, setPokemonLevel] = useState<number>(1)
	const [answer, setAnswer] = useState<number>(1)
	const [maxNumber, setMaxNumber] = useState<number>(100)

	const startGame = () => {
		const index = generateNumber(0, allPokemon.length - 1)
		const level = generateNumber(1, 100)

		let max = 100

		if (level <= 25) {
			max = 25
		} else if (level <= 50) {
			max = 50
		} else if (level <= 75) {
			max = 75
		}

		const answer = generateNumber(1, max)

		setChosenPokemon(allPokemon[index])
		setPokemonLevel(level)
		setAnswer(answer)
		setMaxNumber(max)
		setGameStarted(true)
	}

	const endGame = () => {
		setChosenPokemon(null)
		setPokemonLevel(1)
		setAnswer(1)
		setMaxNumber(100)
		setGameStarted(false)
		window.scrollTo(0, 0)
	}

	return gameStarted ? (
		<>
			<Title title="Catch 'Em All" />

			{chosenPokemon && (
				<div className='grid grid-cols-4 gap-6 lg:grid-cols-2 md:grid-cols-1'>
					<PokemonCard
						id={chosenPokemon.id}
						pokemon={chosenPokemon}
						owned={true}
						level={pokemonLevel}
					>
						{ownedPokemonId.includes(chosenPokemon.id) && (
							<p className='absolute top-3 left-3 rounded-full border border-indigo-600 bg-indigo-100 py-0.5 px-3 font-medium text-indigo-600'>
								Owned
							</p>
						)}
					</PokemonCard>

					<div className='col-span-2 flex flex-col rounded-lg bg-white p-6 shadow hover:shadow-md md:col-auto'>
						<GuessTheNumber
							level={pokemonLevel}
							pokemon={chosenPokemon}
							answer={answer}
							maxNumber={maxNumber}
							endGame={endGame}
						/>
					</div>

					<div className='rounded-lg bg-white p-6 shadow hover:shadow-md lg:col-start-2 lg:row-start-1 md:col-start-auto md:row-start-auto'>
						<h4 className='mb-1 text-lg font-bold text-gray-900'>
							How To Play?
						</h4>
						<p>Guess a number, follow the hint, and repeat.</p>

						<hr className='my-6 text-gray-200' />

						<h4 className='mb-1 text-lg font-bold text-gray-900'>
							Game Control
						</h4>
						<p>Enter your answer and click the submit button.</p>
					</div>
				</div>
			)}
		</>
	) : (
		<div className='mx-auto max-w-md rounded-lg bg-white p-6 shadow-md'>
			<h2 className='text-2xl font-bold'>Game Instruction</h2>

			<ol className='mt-4 ml-4 list-decimal space-y-1.5'>
				<li>
					This is a simple "
					<a
						href='https://www.funbrain.com/games/guess-the-number'
						target='_blank'
						rel='noreferrer'
					>
						Guess the Number
					</a>
					" game to capture the pokemon.
				</li>
				<li>
					Press the "Start Game" button below to start the pokemon catching
					process.
				</li>
				<li>
					A random wild pokemon with random level (1 ~ 100) will be appeared
					once the game started.
				</li>
				<li>
					The higher the level of the pokemon, the higher the difficulty of the
					game.
				</li>
				<li>
					The pokemon will be able to capture if you guess the number correctly
					within 3 rounds, or else the pokemon will return to the wild.
				</li>
				<li>Good luck, trainer!</li>
			</ol>

			<button
				className='mt-9 w-full'
				onClick={startGame}
				disabled={allPokemon.length === 0}
			>
				Start Game
			</button>
		</div>
	)
}

export default CatchEmAll
