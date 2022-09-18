import { TitleProps } from '../interfaces/ComponentInterface'

const Title = ({ title, children }: TitleProps) => {
	return (
		<div className='mb-6 flex items-baseline justify-between'>
			<h1 className='text-3xl font-bold md:text-2xl'>{title}</h1>
			{children}
		</div>
	)
}

export default Title
