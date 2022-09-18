import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useAppDispatch } from './redux/store'
import { checkAuth } from './redux/user'

import AppLayout from './layouts/AppLayout'
import AuthLayout from './layouts/AuthLayout'

import Login from './pages/Login'
import SignUp from './pages/SignUp'

import MyPokemon from './pages/MyPokemon'
import Pokedex from './pages/Pokedex'
import CatchEmAll from './pages/CatchEmAll'

const App = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(checkAuth())

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<Routes>
				<Route element={<AppLayout />}>
					<Route path='/' element={<MyPokemon />} />
					<Route path='/pokedex' element={<Pokedex />} />
					<Route path='/catch-em-all' element={<CatchEmAll />} />
				</Route>

				<Route element={<AuthLayout />}>
					<Route path='/login' element={<Login />} />
					<Route path='/sign-up' element={<SignUp />} />
				</Route>

				<Route path='*' element={<Navigate replace to='/' />} />
			</Routes>

			<ToastContainer
				position='top-right'
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</>
	)
}

export default App
