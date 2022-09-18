import { Link } from 'react-router-dom'

import Logo from '../images/logo.png'
import Navbar from './Navbar'

const Header = () => {
	return (
		<header className='fixed top-0 z-10 w-full bg-indigo-600 text-white shadow'>
			<div className='mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4'>
				<Link
					className='flex items-center text-xl font-medium text-white hover:text-white'
					to='/'
				>
					<img
						className='mr-3 h-8 w-8 md:h-7 md:w-7'
						src={Logo}
						alt='Logo'
						width={32}
						height={32}
					/>
					Poke Project
				</Link>

				<Navbar />
			</div>
		</header>
	)
}

export default Header
