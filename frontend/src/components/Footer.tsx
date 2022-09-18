const Footer = () => {
	const year = new Date().getFullYear()

	return (
		<footer className='mt-auto bg-indigo-600 text-white'>
			<div className='mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 md:flex-col md:space-y-1'>
				<p>&copy; {year} - All Rights Reserved</p>
				<p>
					Designed & built by{' '}
					<a
						className='font-normal text-white hover:text-white'
						href='https://sisheng.my/'
						target='_blank'
						rel='noreferrer'
					>
						Sheng
					</a>
				</p>
			</div>
		</footer>
	)
}

export default Footer
