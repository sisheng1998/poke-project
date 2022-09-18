import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import Title from '../components/Title'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import PokemonCard from '../components/PokemonCard'
import axiosPrivate from '../utils/axiosPrivate'
import Pikachu from '../images/pikachu.png'

import type { RootState } from '../redux/store'
import { useAppDispatch } from '../redux/store'
import { releasePokemon } from '../redux/pokemon'

const MyPokemon = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const { allPokemon, myPokemon, loading, errorMessage } = useSelector(
		(state: RootState) => state.pokemon
	)

	const release = async (id: number) => {
		try {
			const body = JSON.stringify({ id })

			const res = await axiosPrivate.post('/pokemon/releasepokemon/', body)

			if (res.status === 200) {
				dispatch(releasePokemon(id))
				toast.success('Pokemon released.')
			}
		} catch (error) {
			toast.error('Please try again later.')
		}
	}

	return loading ? (
		<Loading />
	) : (
		<>
			<Title title='My Pokemon'>
				<p className='text-xl font-medium'>
					<span className='text-sm font-normal text-gray-500'>Owned:</span>{' '}
					{myPokemon.length}
				</p>
			</Title>

			{errorMessage && <ErrorMessage errorMessage={errorMessage} />}

			{myPokemon.length !== 0 ? (
				<div className='grid grid-cols-4 gap-6 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1'>
					{myPokemon.map((pokemon, index) => (
						<PokemonCard
							key={index}
							pokemon={allPokemon.find((x) => x.id === pokemon.pokemon)!}
							id={pokemon.id}
							owned={true}
							level={pokemon.level}
						>
							<button
								onClick={() => release(pokemon.id)}
								className='absolute top-3 right-3 border border-red-600 bg-red-50 px-3 py-1.5 text-sm text-red-600 hover:bg-red-100 hover:shadow-none focus:ring-0 focus:ring-transparent'
							>
								Release
							</button>
						</PokemonCard>
					))}

					<Link
						className='flex min-h-[460px] items-center justify-center rounded-lg border-2 border-dashed border-gray-200 p-6 font-medium text-gray-400 transition hover:border-indigo-600 hover:bg-indigo-50'
						to='/catch-em-all'
					>
						Catch 'Em All
					</Link>
				</div>
			) : (
				<div className='flex flex-col items-center justify-center p-6 text-center'>
					<img src={Pikachu} alt='Pikachu' width={200} height={200} />

					<h3 className='mt-2 mb-4 text-xl'>
						You didn't have any pokemon yet.
					</h3>

					<button onClick={() => navigate('/catch-em-all')}>
						Catch 'Em All
					</button>
				</div>
			)}
		</>
	)
}

export default MyPokemon
