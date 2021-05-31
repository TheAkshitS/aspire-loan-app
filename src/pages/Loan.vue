<template>
<div>
  <div class="container bg-primary mobile-only">
    <div class="q-pa-md text-white">
      <div class="text-h6">Get cash</div>
      <div>
        We are excited to have you here. To get started, please fill the below
        form.
      </div>
    </div>

    <q-dialog v-model="showFormDialog" seamless position="bottom">
      <q-card class="q-pa-lg card-top-rounded">
        <loan-form />
      </q-card>
    </q-dialog>
  </div>

  <div class="q-ma-xl desktop-only">
    <loan-form class="q-pa-xl" />
  </div>
</div>
</template>

<script>
import LoanForm from 'src/components/LoanForm.vue'

export default {
  name: 'Loan',

  components: {
    LoanForm
  },

  data() {
    return {
      showFormDialog: this.$q.platform.is.mobile ? true : false,
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  position: fixed;
}
</style>