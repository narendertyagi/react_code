import Dashboard from './components/Common/Dashboard'

const routes = [
    {
        path: '/',
        exact: true,
        component: Dashboard,
        layout: 'dash',
        showInMenu: false,
        title: 'Dashboard',
        roles: ['sa'],
        priority: 0
    },
]

export default routes