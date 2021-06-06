<template>
  <div class="q-pa-lg">
    <q-table
      title="All loans"
      :rows="allLoans"
      :columns="columns"
      row-key="loanId"
      :selected-rows-label="checkboxClicked"
      selection="single"
      v-model:selected="selectedColumn"
    />

    <q-footer class="bg-white">
      <q-toolbar class="center">
        <q-toolbar-title class="text-grey text-body2">
          <q-icon name="info" />
          This page will only be getting shown to the Admin.
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <q-dialog v-model="showConfirmApproval" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">
            You are sure you want to approve the loan?
          </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Yes" color="secondary" @click="approveLoan" />
          <q-btn flat label="No" color="secondary" @click="denyLoan" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'admin',

  data() {
    return {
      showConfirmApproval: false,
      selectedColumn: [],
      columns: [
        {
          name: 'loanId',
          align: 'left',
          label: 'Loan ID',
          field: 'loanId',
        },
        {
          name: 'isApproved',
          label: 'Approved',
          field: 'isApproved',
          align: 'left',
          format: (val) => (val === true ? 'Yes' : 'No'),
        },
        {
          name: 'fullName',
          required: true,
          label: 'Full Name',
          align: 'left',
          field: 'fullName',
          sortable: true,
        },
        {
          name: 'email',
          align: 'left',
          label: 'E-mail',
          field: 'email',
          sortable: true,
        },
        {
          name: 'amountRequired',
          label: 'Amount required',
          field: 'amountRequired',
          sort: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
          format: (val) =>
            `S$ ${new Intl.NumberFormat({ maximumSignificantDigits: 2 }).format(
              val,
            )}`,
        },
        {
          name: 'amountToBeRepaid',
          label: 'Amount to be repayed',
          field: 'amountToBeRepaid',
          sort: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
          format: (val) =>
            `S$ ${new Intl.NumberFormat({ maximumSignificantDigits: 2 }).format(
              val,
            )}`,
        },
        { name: 'loanTerm', label: 'Loan Term (years)', field: 'loanTerm' },
        {
          name: 'isActive',
          label: 'Active',
          field: 'isActive',
          align: 'left',
          format: (val) => (val === true ? 'Yes' : 'No'),
        },
        {
          name: 'createdAt',
          label: 'Created at',
          field: 'createdAt',
          align: 'left',
          sortable: true,
          // sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
        },
      ],
    }
  },

  computed: {
    ...mapState('loan', ['allLoans']),
  },

  methods: {
    ...mapActions({
      updateLoan: 'loan/updateLoan',
      getAllLoans: 'loan/getAllLoans',
    }),

    checkboxClicked() {
      if (this.selectedColumn[0].isApproved) {
        this.selectedColumn = []

        return this.$q.notify({
          color: 'warning',
          icon: 'warning',
          message: 'This loan is already approved.',
        })
      }

      this.showConfirmApproval = true
    },

    async approveLoan() {
      const payload = {
        id: this.selectedColumn[0].id,
        payload: {
          isApproved: true,
        },
      }

      await this.updateLoan(payload)
      await this.getAllLoans()

      this.showConfirmApproval = false

      return this.$q.notify({
        color: 'positive',
        icon: 'done',
        message: 'Loan approved.',
      })
    },

    denyLoan() {
      this.selectedColumn = []
      this.showConfirmApproval = false
    },
  },
}
</script>
