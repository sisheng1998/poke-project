import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
	UserCircleIcon,
	Bars3Icon,
	XMarkIcon,
} from '@heroicons/react/24/outline'

import { logout } from '../redux/user'
import { resetPokemonState } from '../redux/pokemon'
import { useAppDispatch } from '../redux/store'
import type { RootState } from '../redux/store'

const Links = [
	{
		title: 'My Pokemon',
		to: '/',
	},
	{
		title: 'Pokédex',
		to: '/pokedex',
	},
	{
		title: "Catch 'Em All",
		to: '/catch-em-all',
	},
]

const Navbar = () => {
	const dispatch = useAppDispatch()
	const { pathname } = useLocation()

	const { user } = useSelector((state: RootState) => state.user)
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const openMenu = () => {
		setIsOpen(true)
		document.body.classList.add('overflow-hidden')
	}

	const closeMenu = () => {
		setIsOpen(false)
		document.body.classList.remove('overflow-hidden')
	}

	return (
		<>
			<nav className='flex items-center space-x-8 text-lg md:space-x-4'>
				<div className='flex items-center space-x-8 md:hidden'>
					{Links.map((link, index) => (
						<Link
							className={`text-white hover:text-white ${
								pathname === link.to ? 'pointer-events-none' : 'font-normal'
							}`}
							key={index}
							to={link.to}
						>
							{link.title}
						</Link>
					))}
				</div>

				<div className='h-5 w-0.5 bg-white opacity-50 md:hidden'></div>

				<div className='group relative'>
					<UserCircleIcon className='h-7 w-7 cursor-pointer' />

					<div className='pointer-events-none absolute top-full right-0 pt-2 opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100'>
						<div className='space-y-3 overflow-hidden rounded-lg border border-gray-200 bg-white py-3 text-base text-gray-700 shadow-md'>
							<div className='space-y-0.5 px-4'>
								<p className='font-medium text-gray-900'>Trainer</p>
								<p className='w-32 truncate text-sm text-gray-500'>
									{user?.email.split('@')[0]}
								</p>
							</div>

							<hr className='border-gray-200' />

							<p
								className='cursor-pointer px-4 transition hover:text-indigo-600'
								onClick={() => {
									dispatch(resetPokemonState())
									dispatch(logout())
								}}
							>
								Logout
							</p>
						</div>
					</div>
				</div>

				<Bars3Icon
					onClick={openMenu}
					className='hidden h-7 w-7 cursor-pointer md:block'
				/>
			</nav>

			<div
				className={`pointer-events-none fixed inset-0 z-20 bg-black opacity-0 transition duration-300 ${
					isOpen ? 'opacity-30' : ''
				}`}
			></div>

			<div
				className={`fixed top-0 right-0 bottom-0 z-20 flex w-full max-w-xs translate-x-full flex-col space-y-4 bg-white px-6 py-4 text-xl text-gray-700 transition duration-300 ${
					isOpen ? 'translate-x-0' : ''
				}`}
			>
				<XMarkIcon
					onClick={closeMenu}
					className='h-7 w-7 cursor-pointer self-end transition hover:text-indigo-600'
				/>

				{Links.map((link, index) => (
					<Link
						className={`text-gray-700 hover:text-indigo-700 ${
							pathname === link.to ? 'pointer-events-none' : 'font-normal'
						}`}
						key={index}
						to={link.to}
						onClick={closeMenu}
					>
						{link.title}
					</Link>
				))}
			</div>
		</>
	)
}

export default Navbar
