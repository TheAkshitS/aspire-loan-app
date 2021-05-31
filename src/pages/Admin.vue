<template>
  <div>
    <div class="q-pa-lg">
      <q-table
        title="All loans"
        :data="allLoans"
        :columns="columns"
        row-key="loanId"
        :selected-rows-label="getSelectedString"
        selection="multiple"
        :selected.sync="selected"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'admin',

  data() {
    return {
      selected: [],

      columns: [
        {
          name: 'loanId',
          align: 'left',
          label: 'Loan ID',
          field: 'loanId',
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
    getSelectedString() {
      // return this.selected.length === 0
      //   ? ''
      //   : `${this.selected.length} record${
      //       this.selected.length > 1 ? 's' : ''
      //     } selected of ${this.data.length}`
    },
  },
}
</script>
