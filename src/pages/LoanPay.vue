<template>
  <div class="q-pa-md">
    <div class="text-h6 q-mb-md">All approved loans</div>
    <q-card
      class="q-mb-md"
      flat
      bordered
      v-for="loan in activeLoanList"
      :key="loan.id"
    >
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <!-- <div class="text-overline">Overline</div> -->
          <div class="text-h5 q-mt-sm q-mb-xs" @click="copyloanId(loan.loanId)">
            # {{ loan.loanId }}
          </div>
          <div class="text-caption text-grey">
            <ul>
              <li>Amount to be repaid: S$ {{ loan.amountToBeRepaid }}</li>
              <li>Loan Term: {{ loan.loanTerm }} weeks</li>
            </ul>
          </div>
        </q-card-section>
      </q-card-section>
      <q-separator />

      <q-card-actions class="justify-between">
        <div>
          <q-btn flat round icon="event" />
          <q-btn flat>
            {{ addToDate(loan.createdAt) }}
          </q-btn>
        </div>
        <div>
          <q-btn flat color="secondary" @click="repayLoan(loan)">
            Repay
          </q-btn>
        </div>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { date, copyToClipboard } from 'quasar'

export default {
  computed: {
    ...mapGetters({
      activeLoanList: 'loan/activeLoanList',
    }),
  },

  methods: {
    ...mapActions({
      updateLoan: 'loan/updateLoan',
    }),

    addToDate(selectedDate) {
      return date.formatDate(
        date.addToDate(selectedDate, { days: 7 }),
        'YYYY-MM-DD',
      )
    },

    async copyloanId(text) {
      await copyToClipboard(text)

      await this.$q.notify({
        color: 'positive',
        icon: 'content_copy',
        message: 'LoanID copied.',
      })
    },

    async repayLoan(loan) {
      const payload = {
        id: loan.id,
        payload: {
          amountToBeRepaid: loan.amountToBeRepaid - loan.weeklyRepaymentAmount,
        },
      }

      const response = await this.updateLoan(payload)

      await this.$q.notify({
        color: 'positive',
        icon: 'done',
        message: `Weekly repayment done successfully, remaing amount, S$${response.data.amountToBeRepaid}`,
      })
      await this.$router.push('/')
    },
  },
}
</script>
