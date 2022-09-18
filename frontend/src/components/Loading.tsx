import { ArrowPathIcon } from '@heroicons/react/24/outline'

const Loading = () => {
	return (
		<div className='flex flex-col items-center justify-center'>
			<ArrowPathIcon className='h-12 w-12 animate-spin text-gray-500' />
			<p className='mt-2 text-lg font-medium'>Loading...</p>
		</div>
	)
}

export default Loading
