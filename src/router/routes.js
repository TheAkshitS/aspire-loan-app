
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', name: 'dashboard', component: () => import('pages/Dashboard.vue') },
      { path: '/loan', name: 'create-loan', component: () => import('pages/Loan.vue') },
      { path: '/loan/:id', name: 'update-loan', component: () => import('pages/Loan.vue') },
      { path: '/pay-loan/:id', name: 'pay-loan', component: () => import('pages/LoanPay.vue') },
      { path: '/admin', name: 'admin', component: () => import('pages/Admin.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
