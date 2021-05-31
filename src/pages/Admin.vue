<template>
  <div>
    <div class="q-pa-lg">
      <q-table
        title="All loans"
        :data="data"
        :columns="columns"
        row-key="name"
        :selected-rows-label="getSelectedString"
        selection="multiple"
        :selected.sync="selected"
      />
    </div>
  </div>
</template>

<script>
export default {
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
          // format: (val) => `${val}`,
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

      data: [
        {
          fullName: 'Akshit S',
          email: 'akshit@gmail.com',
          phone: '8888888888',
          amountRequired: 10000,
          loanTerm: 3,
          userId: 'd8be7e2f-7428-4195-817d-83e04da73999',
          loanId: 'b0c90',
          repaymentFrequency: 1,
          isActive: true,
          createdAt: '2021-05-31 19:58:54',
          updatedAt: null,
        },
      ],
    }
  },
  methods: {
    getSelectedString() {
      return this.selected.length === 0
        ? ''
        : `${this.selected.length} record${
            this.selected.length > 1 ? 's' : ''
          } selected of ${this.data.length}`
    },
  },
}
</script>
