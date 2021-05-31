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
        <loan-form />
      </q-card>
    </q-dialog>
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
      showFormDialog: true,
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