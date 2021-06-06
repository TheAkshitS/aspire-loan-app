<template>
  <q-layout view="lHh Lpr lFf">
    <q-header v-if="$q.platform.is.mobile">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="arrow_back"
          aria-label="Back"
          v-show="$route.name !== 'dashboard'"
          @click="$router.go(-1)"
        />

        <q-toolbar-title @click="$router.push('/')" />

        <q-img
          alt="Aspire logo"
          src="~assets/aspire-logo-round.svg"
          style="width: 20px;"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="showLeftDrawer"
      v-if="$q.platform.is.desktop"
      class="bg-primary"
      :width="500"
    >
      <div class="q-px-xl text-white">
        <q-img
          alt="Aspire logo"
          src="~assets/aspire-logo-big.svg"
          style="width: 7.8rem; margin-top: 2.5rem;"
        />

        <div class="q-mb-xs q-mt-xl text-h5 text-weight-bold">
          Let's get started
        </div>

        <div class="q-mt-sm">
          We are excited to have you here. To get started, please go through the
          get cash form.
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',

  data() {
    return {
      showLeftDrawer: true,
    }
  },
}
</script>
