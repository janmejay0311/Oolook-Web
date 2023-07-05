<template>
  <q-layout view="lHr lpR fFf">

    <q-header bordered class="bg-secondary text-primary">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title class="text-weight-bold">
          <span class="gt-sm">{{ $route.name }}</span>
          <q-icon
            class="header-icon q-pa-md lt-md"
            name="fas fa-kiwi-bird"
            size="sm"
            color="primary"
          />
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="left"
      side="left"
      :width="283"
      bordered
      show-if-above
      color="#FFE5EC"
    >
      <q-icon
        class="q-pa-md"
        name="fas fa-kiwi-bird"
        size="lg"
        color="primary"
      />

      <q-list>
        <q-item
          to="/"
          v-ripple
          clickable
          exact
        >
          <q-item-section avatar>
            <q-icon name="home" size="md" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold">Home</q-item-section>
        </q-item>
        <q-item
          to="/about"
          v-ripple
          clickable
          exact
        >
          <q-item-section avatar>
            <q-icon name="help" size="md" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold">About</q-item-section>
        </q-item>

        <q-item
          to="/Topics"
          v-ripple
          clickable
          exact
        >
          <q-item-section avatar>
            <q-icon name="campaign" size="md" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold">Topics</q-item-section>
        </q-item>

        <q-item
          to="/Bookmarks"
          v-ripple
          clickable
          exact
        >
          <q-item-section avatar>
            <q-icon name="book" size="md" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold">Bookmarks</q-item-section>
        </q-item>
      </q-list>

    </q-drawer>

    <q-drawer show-if-above v-model="right" side="right" bordered>
      <q-input
        placeholder="Search Oolook"
        class="q-ma-md"
        outlined
        rounded
        dense
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-list
        separator
        padding
      >
        <q-item class="q-pa-md">
          <q-item-section>
            <q-item-label overline class="text-grey">Weather</q-item-label>
            <q-item-label class="text-weight-bold">Red alert declared in coastal region due to heavy rain forecast!</q-item-label>
            <q-item-label caption>The Department of Meteorology has predicted the occurrence of very heavy rain, accompanied by thunder and lightning, in the coastal region. As a result, a red alert has been declared from the afternoon of July 4 until 8:30 am on July 5.</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="q-pa-md">
          <q-item-section>
            <q-item-label overline class="text-grey">Politics</q-item-label>
            <q-item-label class="text-weight-bold">JD(S) & BJP to fight together in future, says Yediyurappa</q-item-label>
            <q-item-label caption>Senior BJP leader and former Chief Minister of Karnataka, Yediyurappa has said that his party and Janata Dal (S) led by H.D. Kumaraswamy "will fight together in the future".</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="q-pa-md">
          <q-item-section>
            <q-item-label overline class="text-grey">Stock Markets</q-item-label>
            <q-item-label class="text-weight-bold">Back
Senco Gold IPO Day 1: Issue subscribed 69%; retail portion fully booked</q-item-label>
            <q-item-label caption>The initial public offering (IPO) of jewelry brand Senco Gold Ltd opened on Tuesday, July 4, and seems to have garnered attraction from retail investors. The ₹405-crore Senco Gold IPO has been subscribed 69% on day 1 as the public issue received bids for 65.28 lakh shares as against 94.18 lakh shares on the offer</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      left: false,
      right: false
    }
  }
}
</script>

<style lang="sass">
.header-icon
  position: absolute
  bottom: 0
  left: 50%
  transform: translateX(-50%)
</style>