const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        name: 'dashboard',
        component: () => import('pages/Dashboard.vue'),
      },
      {
        path: '/loan',
        name: 'create-loan',
        component: () => import('pages/Loan.vue'),
      },
      {
        path: '/loan-pay',
        name: 'pay-loan',
        component: () => import('pages/LoanPay.vue'),
      },
      {
        path: '/admin',
        name: 'admin',
        component: () => import('pages/Admin.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
]

export default routes
