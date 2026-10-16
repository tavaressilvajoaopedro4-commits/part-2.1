import { createBrowserRouter } from 'react-router'
import { SignIn } from './src/pages/auth/sign-in'
import { SignUp } from './src/pages/auth/sign-up'
import { FinallyRegister } from './src/pages/auth/finally-register'
import { Forgot } from './src/pages/auth/forgot'
import { ForgotCompleted } from './src/pages/auth/forgot-completed'

export const router = createBrowserRouter([
    { path: '/sign-in', element: <SignIn /> },
    { path: '/sign-up', element: <SignUp /> },
    { path: '/sign-up/finally-register', element: <FinallyRegister /> },
    { path: '/forgot', element: <Forgot /> },
    { path: '/forgot/send-email', element: <ForgotCompleted /> }
])
