<template>
  <q-toolbar v-if="$q.platform.is.mobile" class="bg-primary">
    <q-toolbar-title class="text-white center">
      <div>SGD {{ creditLine }}</div>
      <div class="text-subtitle2 q-my-xs">Credit Limit</div>
    </q-toolbar-title>
  </q-toolbar>
  <div class="row wrap justify-center">
    <q-card
      class="card-container center"
      :class="$q.platform.is.mobile ? 'q-ma-lg' : 'q-ma-xl q-pa-xl'"
    >
      <q-card-section>
        <div class="text-h6">What would you like to do today?</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-btn
          color="secondary"
          label="Get cash"
          class="full-width"
          @click="$router.push('/loan')"
        />
        <div class="text-subtitle2 q-mt-md">
          Withdraw funds from your available credit
        </div>
        <div>Disbursed to your bank account in 24 hours</div>
      </q-card-section>

      <q-separator inset />

      <q-card-section class="q-mt-xs" v-if="showLoanPayOption">
        <q-btn
          color="secondary"
          label="Pay"
          class="full-width"
          @click="$router.push('/loan-pay')"
        />
        <div class="text-subtitle2 q-mt-md">
          60 days interest free cedit to make payments
        </div>
        <div>The other party receives the funds instantly, less 2.9%</div>
      </q-card-section>
    </q-card>
  </div>

  <!-- Only for demo purpose -->
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn
      fab
      icon="admin_panel_settings"
      color="secondary"
      @click="$router.push('/admin')"
    />
  </q-page-sticky>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState('loan', ['allLoans']),

    ...mapGetters({
      creditLine: 'loan/creditLimit',
    }),

    showLoanPayOption() {
      const hasApprovedLoan = this.allLoans.find(
        (loan) => loan.isApproved === true,
      )

      return hasApprovedLoan
    },
  },

  async created() {
    await this.getAllLoans()
  },

  methods: {
    ...mapActions({
      getAllLoans: 'loan/getAllLoans',
    }),
  },
}
</script>
