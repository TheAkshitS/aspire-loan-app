<template>
  <q-form @submit="onSubmit" @reset="resetForm" data-cy="loan-form">
    <div class="text-h6 q-mb-xl desktop-only">
      Loan application
    </div>

    <q-input
      v-model="form.fullName"
      label="Full name *"
      color="secondary"
      :rules="rules.required"
      data-cy="fullName"
    >
      <template v-slot:append>
        <q-icon name="person" />
      </template>
    </q-input>

    <q-input
      type="email"
      v-model="form.email"
      label="Email *"
      color="secondary"
      :rules="rules.required"
      data-cy="email"
    >
      <template v-slot:append>
        <q-icon name="email" />
      </template>
    </q-input>

    <q-input
      type="tel"
      v-model="form.phone"
      label="Phone no. *"
      color="secondary"
      :rules="rules.required"
      data-cy="phone"
    >
      <template v-slot:append>
        <q-icon name="phone" />
      </template>
    </q-input>

    <q-input
      type="number"
      v-model.number="form.amountRequired"
      label="Amount required *"
      color="secondary"
      :rules="rules.numberRequired"
      data-cy="amountRequired"
    >
      <template v-slot:append>
        <q-icon name="attach_money" />
      </template>
    </q-input>

    <q-input
      type="number"
      v-model.number="form.loanTerm"
      label="Loan term(in weeks) *"
      color="secondary"
      :rules="rules.numberRequired"
      data-cy="loanTerm"
    >
      <template v-slot:append>
        <q-icon name="schedule" />
      </template>
    </q-input>

    <q-toggle
      v-model="formTermsAccepted"
      color="secondary"
      label="I accept the license and terms"
      class="q-my-sm"
      data-cy="formTermsAccepted"
    />

    <div>
      <q-btn
        rounded
        label="Submit"
        type="submit"
        color="secondary"
        data-cy="submit"
      />
      <q-btn
        label="Reset"
        type="reset"
        color="secondary"
        flat
        class="q-ml-sm"
        v-if="isCreateRoute"
      />
    </div>
  </q-form>
</template>

<script>
import { date, uid } from 'quasar'
import { mapActions } from 'vuex'

export default {
  name: 'LoanForm',

  data() {
    return {
      formTermsAccepted: false,
      form: {
        fullName: null,
        email: null,
        phone: null,
        amountRequired: null,
        amountToBeRepaid: null,
        loanTerm: null,
        userId: uid(),
        loanId: uid().slice(0, 5),
        repaymentFrequency: 1, //in weeks
        weeklyRepaymentAmount: null,
        isActive: true,
        isApproved: false,
        createdAt: date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss'),
        updatedAt: null,
      },
      rules: {
        required: [(v) => (v || '').length > 0 || 'Required'],
        numberRequired: [(v) => (v !== null && v > 1) || 'Required'],
      },
    }
  },

  computed: {
    isCreateRoute() {
      return this.$route.name === 'create-loan'
    },
  },

  methods: {
    ...mapActions({
      createLoan: 'loan/createLoan',
    }),

    async onSubmit() {
      if (this.formTermsAccepted !== true) {
        await this.$q.notify({
          color: 'negative',
          icon: 'warning',
          message: 'You need to accept the license and terms first',
        })
      } else {
        this.form.weeklyRepaymentAmount = Number(
          (this.form.amountRequired / this.form.loanTerm).toFixed(3),
        )
        this.form.amountToBeRepaid = this.form.amountRequired

        await this.createLoan(this.form)

        await this.$q.notify({
          color: 'positive',
          icon: 'done',
          message: 'You loan request has been submitted',
        })

        await this.$router.push('/')
      }
    },

    resetForm() {
      this.form = {
        fullName: null,
        email: null,
        phone: null,
        amountRequired: null,
        amountToBeRepaid: null,
        loanTerm: null,
        userId: uid(),
        loanId: uid().slice(0, 5),
        repaymentFrequency: 1,
        weeklyRepaymentAmount: null,
        isActive: true,
        isApproved: false,
        createdAt: date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss'),
        updatedAt: null,
      }

      this.formTermsAccepted = false
    },
  },
}
</script>
