import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

import { ErrorMessageProps } from '../interfaces/ComponentInterface'

const ErrorMessage = ({ errorMessage, classes }: ErrorMessageProps) => {
	return (
		<p
			className={`mb-6 flex items-center justify-center font-medium text-red-600 ${
				classes ? classes : ''
			}`}
		>
			<ExclamationTriangleIcon className='mr-2 h-5 w-5' />
			{errorMessage}
		</p>
	)
}

export default ErrorMessage
