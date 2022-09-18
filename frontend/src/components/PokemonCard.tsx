import { Card } from '../interfaces/PokemonInterface'
import images from '../images/images'
import { CalculateHP, CalculateStats } from '../utils/statsCalculator'

const PokemonCard = ({
	pokemon,
	id,
	owned = false,
	children,
	level = 0,
}: Card) => {
	const pokedexId = '#' + ('00' + id).slice(-3)
	const imageName = pokemon?.name.replace(/[^A-Z0-9]+/gi, '').toLowerCase()
	let typeColor = 'bg-gray-100 text-gray-600'

	if (owned) {
		switch (pokemon?.type.toLowerCase()) {
			case 'grass':
				typeColor = 'bg-green-100 text-green-600'
				break
			case 'fire':
				typeColor = 'bg-red-100 text-red-600'
				break
			case 'water':
				typeColor = 'bg-blue-100 text-blue-600'
				break
			case 'normal':
				typeColor = 'bg-slate-100 text-slate-600'
				break
			case 'electric':
				typeColor = 'bg-yellow-100 text-yellow-600'
				break
			case 'ground':
				typeColor = 'bg-amber-100 text-amber-600'
				break
			case 'fighting':
				typeColor = 'bg-orange-100 text-orange-600'
				break
			case 'rock':
				typeColor = 'bg-stone-100 text-stone-600'
				break
			case 'psychic':
				typeColor = 'bg-purple-100 text-purple-600'
				break
		}
	}

	return (
		<div className='relative rounded-lg bg-white p-6 shadow hover:shadow-md'>
			<div className={`overflow-hidden rounded-lg ${typeColor}`}>
				<img
					className={`w-full ${owned ? '' : 'opacity-30 grayscale'}`}
					src={images[imageName as keyof typeof images]}
					alt={pokemon?.name}
					width={200}
					height={200}
				/>
			</div>

			<p className='mt-4 mb-1 text-sm text-gray-500'>{pokedexId}</p>

			<h3 className='text-xl font-bold'>
				{pokemon?.name}
				{level !== 0 && (
					<span className='ml-2 text-base font-normal text-gray-500'>
						(Lv. {level})
					</span>
				)}
			</h3>

			<p
				className={`mt-2 inline-block rounded-full py-0.5 px-4 font-medium ${typeColor}`}
			>
				{owned ? pokemon?.type : '?????'}
			</p>

			<hr className='mt-5 mb-3 border-gray-200' />

			<div className='flex flex-wrap items-center'>
				<p className='mt-1 mr-4 text-sm text-gray-500'>
					<span className='text-lg font-medium text-gray-900'>
						{owned
							? level !== 0
								? CalculateHP(pokemon?.hp, level)
								: pokemon?.hp
							: '???'}
					</span>{' '}
					HP
				</p>

				<p className='mt-1 mr-4 text-sm text-gray-500'>
					<span className='text-lg font-medium text-gray-900'>
						{owned
							? level !== 0
								? CalculateStats(pokemon?.attack, level)
								: pokemon?.attack
							: '???'}
					</span>{' '}
					ATK
				</p>

				<p className='mt-1 mr-4 text-sm text-gray-500'>
					<span className='text-lg font-medium text-gray-900'>
						{owned
							? level !== 0
								? CalculateStats(pokemon?.defense, level)
								: pokemon?.defense
							: '???'}
					</span>{' '}
					DEF
				</p>
			</div>

			{children}
		</div>
	)
}

export default PokemonCard
