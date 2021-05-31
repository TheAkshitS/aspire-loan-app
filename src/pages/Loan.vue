<template>
  <div class="container bg-primary">
    <div class="q-pa-md text-white">
      <div class="text-h6">Get cash</div>
      <div>
        We are excited to have you here. To get started, please fill the below
        form.
      </div>
    </div>

    <q-dialog v-model="showFormDialog" seamless position="bottom">
      <q-card class="q-pa-lg card-top-rounded">
        <q-form @submit="onSubmit" @reset="resetForm">
          <q-input
            v-model="form.fullName"
            label="Full name *"
            color="secondary"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Amount is required']"
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
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Amount is required']"
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
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Amount is required']"
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
            lazy-rules
            :rules="[(val) => (val && val > 0) || 'Amount is required']"
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
            lazy-rules
            :rules="[
              (val) => (val !== null && val !== '') || 'Please type your age',
              (val) => (val > 0 && val < 100) || 'Please type a real age',
            ]"
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
          />

          <div>
            <q-btn rounded label="Submit" type="submit" color="secondary" />
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
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { date, uid } from 'quasar'
import { mapActions } from 'vuex'

export default {
  name: 'Loan',

  data() {
    return {
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
      formTermsAccepted: false,
      showFormDialog: true,
    }
  },

  computed: {
    isCreateRoute() {
      return this.$route.name === 'create-loan'
    },
  },

  destroyed() {
    this.resetForm()
  },

  methods: {
    ...mapActions({
      createLoan: 'loan/createLoan'
    }),

    async onSubmit() {
      if (this.formTermsAccepted !== true) {
        await this.$q.notify({
          color: 'negative',
          icon: 'warning',
          message: 'You need to accept the license and terms first',
        })
      } else {
        this.form.weeklyRepaymentAmount = Number((this.form.amountRequired / this.form.loanTerm).toFixed(3))
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

<style lang="scss" scoped>
.container {
  height: 100vh;
  position: fixed;
}
</style>