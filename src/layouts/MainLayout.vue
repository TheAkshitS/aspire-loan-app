<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
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

        <q-toolbar-title @click="$router.push('/')">
          <!-- <q-img
            alt="Aspire logo"
            src="~assets/aspire-logo.svg"
            style="width: 80px;"
          /> -->
        </q-toolbar-title>

        <q-img
          alt="Aspire logo"
          src="~assets/aspire-logo-round.svg"
          style="width: 20px;"
        />
        <!-- <q-btn flat round dense icon="more_vert" /> -->
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',

  data() {
    return {}
  },
}
</script>
