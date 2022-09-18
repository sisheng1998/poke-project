import { ChangeEvent, FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ArrowPathIcon } from '@heroicons/react/24/outline'

import ErrorMessage from '../components/ErrorMessage'

import { login } from '../redux/user'
import type { RootState } from '../redux/store'
import { useAppDispatch } from '../redux/store'

const Login = () => {
	const dispatch = useAppDispatch()

	const { loading, errorMessage } = useSelector(
		(state: RootState) => state.user
	)

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})

	const { email, password } = formData

	const onChange = (e: ChangeEvent<HTMLInputElement>) =>
		setFormData({ ...formData, [e.target.name]: e.target.value })

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		dispatch(login({ email, password }))
	}

	return (
		<>
			<h1 className='text-center text-4xl font-bold'>Login</h1>
			<p className='mt-1 text-center text-xl'>Welcome to Poke Project!</p>

			<form onSubmit={onSubmit} className='mt-6 rounded-lg bg-white p-6 shadow'>
				{errorMessage && (
					<ErrorMessage errorMessage={errorMessage} classes='!justify-start' />
				)}

				<div>
					<label htmlFor='email' className='required-input-label'>
						Email
					</label>
					<input
						type='email'
						name='email'
						placeholder='Enter your email'
						required
						value={email}
						onChange={onChange}
					/>
				</div>

				<div className='mt-4'>
					<label htmlFor='password' className='required-input-label'>
						Password
					</label>
					<input
						type='password'
						name='password'
						placeholder='Enter your password'
						required
						minLength={8}
						value={password}
						onChange={onChange}
					/>
				</div>

				<button className='mt-9 w-full' type='submit' disabled={loading}>
					{loading ? (
						<ArrowPathIcon className='mx-auto h-7 w-7 animate-spin' />
					) : (
						'Login'
					)}
				</button>
			</form>

			<p className='mt-6 text-center'>
				Don't have an account? <Link to='/sign-up'>Sign Up</Link>
			</p>
		</>
	)
}

export default Login
