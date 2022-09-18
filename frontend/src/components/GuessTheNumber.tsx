import { useState, ChangeEvent, FormEvent } from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

import { GuessTheNumberProps } from '../interfaces/ComponentInterface'
import axiosPrivate from '../utils/axiosPrivate'

import type { RootState } from '../redux/store'
import { useAppDispatch } from '../redux/store'
import { addPokemon } from '../redux/pokemon'

const GuessTheNumber = ({
	level,
	pokemon,
	answer,
	maxNumber,
	endGame,
}: GuessTheNumberProps) => {
	const dispatch = useAppDispatch()

	const { user } = useSelector((state: RootState) => state.user)

	const [round, setRound] = useState<number>(1)
	const [number, setNumber] = useState<number | ''>('')
	const [message, setMessage] = useState<string>('')
	const [ended, setEnded] = useState<boolean>(false)
	const [catchSuccess, setCatchSuccess] = useState<boolean>(false)

	const catchPokemon = async () => {
		try {
			const body = JSON.stringify({
				level,
				pokemon: pokemon.id,
				owner: user?.id,
			})

			const res = await axiosPrivate.post('/pokemon/addpokemon/', body)

			if (res.status === 201) {
				dispatch(addPokemon(res.data))
				toast.success('Pokemon captured!')
				setCatchSuccess(true)
			}
		} catch (error) {
			toast.error('Please try again later.')
		}
	}

	const onChange = (e: ChangeEvent<HTMLInputElement>) =>
		setNumber(+e.target.value)

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		setNumber('')

		if (number === answer) {
			setMessage(
				`It took you ${round} round(s) to guess the correct number, which is ${answer}.`
			)
			setEnded(true)
			return
		} else {
			let hint

			if (number >= answer + 10) {
				hint = 'too high'
			} else if (number > answer) {
				hint = 'higher'
			} else if (number <= answer - 10) {
				hint = 'too low'
			} else {
				hint = 'lower'
			}

			setMessage(`Your guess, ${number}, is ${hint}.`)
		}

		setRound((prev) => prev + 1)
	}

	return (
		<>
			<h3 className='mb-2 text-xl font-bold'>Guess the Number</h3>

			<p>A wild {pokemon.name} appeared!</p>

			<p className='mt-1 mb-3'>
				Pick a number between <strong>1</strong> and{' '}
				<strong>{maxNumber}</strong>.
			</p>

			<div className='mb-3 h-full max-h-28 overflow-auto rounded-lg border border-gray-200 bg-gray-50 p-4'>
				<h4 className='mb-1 font-bold'>Round {round}</h4>
				<p className={ended ? 'text-green-600' : 'text-red-600'}>{message}</p>
			</div>

			{ended && (
				<div className='space-y-1'>
					{round <= 3 ? (
						<p>You may press the "Catch" button below to catch the pokemon.</p>
					) : (
						<p>The pokemon already return to the wild. Try harder next time.</p>
					)}

					{catchSuccess && (
						<p className='text-green-600'>
							Gotcha! <strong>{pokemon.name}</strong> was caught!
						</p>
					)}
				</div>
			)}

			<div className='mt-auto'>
				{ended ? (
					round <= 3 && !catchSuccess ? (
						<button className='mt-9 self-start' onClick={catchPokemon}>
							Catch {pokemon.name}!
						</button>
					) : (
						<button className='mt-9 self-start' onClick={() => endGame()}>
							Return Back
						</button>
					)
				) : (
					<form
						className='mt-9 flex md:flex-col md:space-y-3'
						onSubmit={onSubmit}
					>
						<input
							className='rounded-tr-none rounded-br-none md:rounded-tr-lg md:rounded-br-lg'
							type='number'
							placeholder='Guess a number'
							required
							value={number}
							onChange={onChange}
							min={1}
							max={maxNumber}
							step={1}
						/>
						<button
							className='rounded-tl-none rounded-bl-none md:rounded-tl-lg md:rounded-bl-lg'
							type='submit'
						>
							Submit
						</button>
					</form>
				)}
			</div>
		</>
	)
}

export default GuessTheNumber
