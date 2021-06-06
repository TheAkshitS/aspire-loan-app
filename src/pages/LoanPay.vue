<template>
  <div class="q-pa-md">
    <div
      class="text-h6 q-mb-md"
      :class="$q.platform.is.mobile ? '' : 'q-mt-lg q-ml-xl'"
    >
      All approved loans
    </div>

    <div
      class="row"
      :class="$q.platform.is.mobile ? 'justify-center' : 'q-ma-xl'"
    >
      <q-card
        class="q-mb-md card-container"
        :class="$q.platform.is.mobile ? '' : 'q-ml-md'"
        flat
        bordered
        v-for="loan in activeLoanList"
        :key="loan.id"
      >
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div
              class="text-h5 q-mt-sm q-mb-xs"
              @click="copyloanId(loan.loanId)"
            >
              # {{ loan.loanId }}
            </div>
            <div class="text-caption text-grey">
              <ul>
                <li>
                  Total loan amount: S${{ formatNumber(loan.amountRequired) }}
                </li>
                <li>
                  Amount still to be repaid: S${{
                    formatNumber(loan.amountToBeRepaid)
                  }}
                </li>
                <li>
                  Weekly payable amount: S${{
                    formatNumber(loan.weeklyRepaymentAmount)
                  }}
                </li>
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

    formatNumber(value) {
      return new Intl.NumberFormat({ maximumSignificantDigits: 2 }).format(
        value,
      )
    },

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

<style lang="scss" scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;

  li {
    margin: 5px 0;
  }

  li:last-child {
    margin-top: 15px;
  }
}
</style>
