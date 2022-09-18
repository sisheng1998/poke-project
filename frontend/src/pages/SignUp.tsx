import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ArrowPathIcon, CheckIcon } from '@heroicons/react/24/outline'

import ErrorMessage from '../components/ErrorMessage'

import type { RootState } from '../redux/store'
import { register, resetRegistered } from '../redux/user'
import { useAppDispatch } from '../redux/store'

const SignUp = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const { registered, loading, errorMessage } = useSelector(
		(state: RootState) => state.user
	)

	const [formData, setFormData] = useState({
		email: '',
		password: '',
		re_password: '',
	})

	const { email, password, re_password } = formData

	const onChange = (e: ChangeEvent<HTMLInputElement>) =>
		setFormData({ ...formData, [e.target.name]: e.target.value })

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		dispatch(register({ email, password, re_password }))
	}

	const backToLogin = () => {
		navigate('/login')

		dispatch(resetRegistered())
	}

	return registered ? (
		<div className='rounded-lg bg-white p-8 text-center shadow'>
			<CheckIcon className='mx-auto h-16 w-16 rounded-full bg-green-100 p-3 text-green-600' />

			<h3 className='mt-4 text-3xl font-bold text-green-600'>Success</h3>

			<p className='mt-1 text-lg'>
				Your account has been successfully created!
			</p>

			<button className='mt-9' onClick={backToLogin}>
				Back to Login
			</button>
		</div>
	) : (
		<>
			<h1 className='text-center text-4xl font-bold'>Sign Up</h1>
			<p className='mt-1 text-center text-xl'>Sign up for an account.</p>

			<div className='mt-6 rounded-lg bg-white p-6 shadow'>
				<form onSubmit={onSubmit}>
					{errorMessage && (
						<ErrorMessage
							errorMessage={errorMessage}
							classes='!justify-start'
						/>
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

					<div className='mt-4'>
						<label htmlFor='re_password' className='required-input-label'>
							Confirm Password
						</label>
						<input
							type='password'
							name='re_password'
							placeholder='Retype your password'
							required
							minLength={8}
							value={re_password}
							onChange={onChange}
						/>
					</div>

					<button className='mt-9 w-full' type='submit' disabled={loading}>
						{loading ? (
							<ArrowPathIcon className='mx-auto h-7 w-7 animate-spin' />
						) : (
							'Sign Up'
						)}
					</button>
				</form>
			</div>

			<p className='mt-6 text-center'>
				Already have an account? <Link to='/login'>Login</Link>
			</p>
		</>
	)
}

export default SignUp
