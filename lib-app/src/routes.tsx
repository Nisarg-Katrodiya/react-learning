// import Home from './pages/Home';
import LogIn from './pages/LogIn';
import Register from './pages/Register';
import {FC} from "react";
import Dashboard from './pages/Dashboard';
import Users from './pages/user';
import Book from './pages/book';

type Route = {
	key: string,
	title: string,
	path: string,
	enabled: boolean,
	component: FC
}

export const routes: Array<Route> = [
	{
		key: 'login-route',
		title: 'Login',
		path: '/login',
		enabled: true,
		component: LogIn
	},
	{
		key: 'register-route',
		title: 'Register',
		path: '/register',
		enabled: true,
		component: Register
	},
	{
		key: 'home-route',
		title: 'Home',
		path: '/',
		enabled: true,
		component: Dashboard
	},
	{
		key: 'user-route',
		title: 'Users',
		path: '/users',
		enabled: true,
		component: Users
	},
	{
		key: 'book-route',
		title: 'Books',
		path: '/books',
		enabled: true,
		component: Book
	},
	// { 
	// 	key: 'notfound-route',
	// 	title: 'Not Found',
	// 	path: '*', 
	// 	enabled: true,
	// 	component: NotFound
	// }
]