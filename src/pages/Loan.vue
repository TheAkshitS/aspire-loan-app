<template>
  <div v-if="$q.platform.is.mobile" class="container bg-primary">
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

  <div v-if="$q.platform.is.desktop" class="q-ma-xl">
    <loan-form class="q-pa-xl" />
  </div>
</template>

<script>
import LoanForm from 'src/components/LoanForm.vue'

export default {
  name: 'Loan',

  components: {
    LoanForm,
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
