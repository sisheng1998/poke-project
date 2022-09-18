import { useEffect } from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import type { RootState } from '../redux/store'
import { useAppDispatch } from '../redux/store'
import { resetErrorMessage } from '../redux/user'

const AuthLayout = () => {
	const location = useLocation()
	const dispatch = useAppDispatch()

	const { isAuthenticated, loading, errorMessage } = useSelector(
		(state: RootState) => state.user
	)

	useEffect(() => {
		if (errorMessage) {
			dispatch(resetErrorMessage())
		}

		window.scrollTo(0, 0)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location])

	if (isAuthenticated && !loading) return <Navigate to='/' />

	return (
		<div className='mx-auto flex min-h-screen max-w-lg flex-col justify-center p-6'>
			<Outlet />
		</div>
	)
}

export default AuthLayout
