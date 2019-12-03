import Path from 'path-parser'
// import 'babel-polyfill';

// import {Auth} from '../../shared/Modules'
import {Register, Login, ForgotPassword, ResetPassword, ChangePassword} from './components'
import { ProfileEdit } from './components/index';
const routes = [
    {
        path: '/',
        exact: true,
        component: Login,
        layout: 'public',
        className: 'removeMinWidth',
        title: 'Login',
        layoutProps: {
            hideLoginLink: true,
            hideRegisterLink: false,
            containerClass: 'layout--flexCenter11'
        }
    },

    {
        path: '/login',
        exact: true,
        component: Login,
        layout: 'public',
        className: 'removeMinWidth',
        title: 'Login',
        layoutProps: {
            hideLoginLink: true,
            hideRegisterLink: false,
            containerClass: 'layout--flexCenter11'
        }
    },
    {
        path: '/forgot_password',
        exact: true,
        component: ForgotPassword,
        layout: 'public',
        className: 'removeMinWidth',
        title: 'Forgot Password',
        name: 'forgotPassword',
        layoutProps: {
            hideLoginLink: false,
            containerClass: 'layout--flexCenter11'
        }
    },
    {
        path: '/reset_password',
        exact: true,
        component: ResetPassword,
        layout: 'public',
        title: 'Reset Password',
        layoutProps: {
            hideLoginLink: false,
            containerClass: 'layout--flexCenter11'
        }
    },

    {
        path: '/change_password',
        exact: true,
        component: ChangePassword,
        className: 'removeMinWidth',
        layout: 'admin',
        title: 'Chnage Password'
    },

    {
        path: '/me',
        exact: true,
        component: ProfileEdit,
        layout: 'admin',
        title: 'Profile'
    },
    {
        path: '/login/:token',
        exact: true,
        component: Login,
        layout: 'public',
        layoutProps: {
            hideLoginLink: true,
            hideRegisterLink: false,
            containerClass: 'layout--flexCenter11'
        }
    },
    {
        path: '/register',
        exact: true,
        component: Register,
        layout: 'public',
        layoutProps: {
            hideLoginLink: false,
            containerClass: ''
            }
        }

]

// if(__isBrowser__ && Sapp.Auth.config.allowProfileEdit) {
//     routes.push({
//         path: '/me',
//         exact: true,
//         component: ProfileEdit,
//         layout: 'admin'
//     })
// }

// if(__isBrowser__ && Sapp.Auth.config.allowRegistration) {
//     routes.push({
//         path: '/register',
//         exact: true,
//         component: Register,
//         layout: 'public',
//         layoutProps: {
//             hideLoginLink: false,
//             containerClass: ''
//         }
//     })
// }

export default routes