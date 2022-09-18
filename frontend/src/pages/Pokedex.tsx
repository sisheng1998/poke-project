import { useSelector } from 'react-redux'

import Title from '../components/Title'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import PokemonCard from '../components/PokemonCard'

import type { RootState } from '../redux/store'

const Pokedex = () => {
	const { allPokemon, myPokemon, loading, errorMessage } = useSelector(
		(state: RootState) => state.pokemon
	)

	const ownedPokemonId = Array.from(
		new Set(myPokemon.map(({ pokemon }) => pokemon))
	)

	return loading ? (
		<Loading />
	) : (
		<>
			<Title title='Pokédex'>
				<p className='text-xl font-medium'>
					<span className='text-sm font-normal text-gray-500'>Completed:</span>{' '}
					{ownedPokemonId.length}{' '}
					<span className='font-normal text-gray-500'>/</span>{' '}
					{allPokemon.length}
				</p>
			</Title>

			{errorMessage && <ErrorMessage errorMessage={errorMessage} />}

			{allPokemon.length !== 0 && (
				<div className='grid grid-cols-4 gap-6 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1'>
					{allPokemon.map((pokemon, index) => (
						<PokemonCard
							key={index}
							pokemon={pokemon}
							id={index + 1}
							owned={ownedPokemonId.includes(index + 1)}
						/>
					))}
				</div>
			)}
		</>
	)
}

export default Pokedex
