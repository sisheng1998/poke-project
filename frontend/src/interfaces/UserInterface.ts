export interface UserState {
	isAuthenticated: boolean
	user: User | null
	loading: boolean
	registered: boolean
	errorMessage: string
}

export interface User {
	id?: number
	email: string
	password?: string
	re_password?: string
	created_at?: string
}
