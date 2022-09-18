import { useEffect } from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Header from '../components/Header'
import Footer from '../components/Footer'
import type { RootState } from '../redux/store'

const AppLayout = () => {
	const location = useLocation()
	const access = localStorage.getItem('access')

	const { isAuthenticated, loading, user } = useSelector(
		(state: RootState) => state.user
	)

	useEffect(() => {
		window.scrollTo(0, 0)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location])

	if (!isAuthenticated && !loading && user === null && !access)
		return <Navigate to='/login' />

	return (
		<div className='flex min-h-screen flex-col'>
			<Header />

			<main className='mx-auto mt-16 w-full max-w-7xl px-6 py-12 md:pt-6'>
				<Outlet />
			</main>

			<Footer />
		</div>
	)
}

export default AppLayout
