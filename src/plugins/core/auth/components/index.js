import React, { Component } from "react";
import Loadable from 'react-loadable';

const Loading = () => <div>Loading...</div>;

const Login = Loadable({
    loader: () => import('./Login'),
    loading: Loading,
});

const Register = Loadable({
    loader: () => import('./Register'),
    loading: Loading,
});
const ForgotPassword = Loadable({
    loader: () => import('./ForgotPassword'),
    loading: Loading,
});
const ResetPassword = Loadable({
    loader: () => import('./ResetPassword'),
    loading: Loading,
});
const ProfileEdit = Loadable({
    loader: () => import('./ProfileEdit'),
    loading: Loading,
});
const ChangePassword = Loadable({
    loader: () => import('./ChangePassword'),
    loading: Loading,
});

// import Register from './Register'
// import ForgotPassword from './ForgotPassword'
// import ResetPassword from './ResetPassword'
// // import Login from './Login'
// import ProfileEdit from './ProfileEdit'
// import ChangePassword from './ChangePassword'
export {
    Register,
    Login,
    ForgotPassword,
    ResetPassword,
    ProfileEdit,
    ChangePassword
}