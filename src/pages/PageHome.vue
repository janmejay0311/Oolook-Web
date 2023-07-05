<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height">
      <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
        <div class="col">
          <q-input
            v-model="newOolookContent"
            class="new-oolook"
            placeholder="What's happening?"
            maxlength="280"
            bottom-slots
            counter
            autogrow
          >
            <template v-slot:before>
              <q-avatar size="xl">
                <img src="https://en.gravatar.com/userimage/237151191/dc12b80ad177dd1705b9193266bf6c2b.png">
              </q-avatar>
            </template>
          </q-input>
        </div>
        <div class="col col-shrink">
          <q-btn
            @click="addNewOolook"
            :disable="!newOolookContent"
            class="q-mb-lg"
            color="primary"
            label="Oolook"
            rounded
            unelevated
            no-caps
          />
        </div>
      </div>

      <q-separator
        class="divider"
        color="grey-2"
        size="10px"
      />

      <q-list separator>
        <transition-group
          appear
          enter-active-class="animated fadeIn slow"
          leave-active-class="animated fadeOut slow"
        >
          <q-item
            v-for="oolook in oolooks"
            :key="oolook.id"
            class="oolook q-py-md"
          >
            <q-item-section avatar top>
              <q-avatar size="xl">
                <img src="https://en.gravatar.com/userimage/237151191/dc12b80ad177dd1705b9193266bf6c2b.png">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-subtitle1">
                <strong>J Singh</strong>
                <span class="text-grey-7">
                  @danny__connell 
                  <br class="lt-md">&bull; {{ oolook.date | relativeDate }}
                </span>
              </q-item-label>
              <q-item-label class="oolook-content text-body1">{{ oolook.content }}</q-item-label>
              <div class="oolook-icons row justify-between q-mt-sm">
                <q-btn
                  color="grey"
                  icon="far fa-comment"
                  size="sm"
                  flat
                  round
                />
                <q-btn
                  color="grey"
                  icon="fas fa-retweet"
                  size="sm"
                  flat
                  round
                />
                <q-btn
                  @click="toggleLiked(oolook)"
                  :color="oolook.liked ? 'pink' : 'grey'"
                  :icon="oolook.liked ? 'fas fa-heart' : 'far fa-heart'"
                  size="sm"
                  flat
                  round
                />
                <q-btn
                  @click="deleteOolook(oolook)"
                  color="grey"
                  icon="fas fa-trash"
                  size="sm"
                  flat
                  round
                />
              </div>
            </q-item-section>
          </q-item>
        </transition-group>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import db from 'src/boot/firebase'
import { formatDistance } from 'date-fns'

export default {
  name: 'PageHome',
  data() {
    return {
      newOolookContent: '',
      oolooks: [
        // {
        //   id: 'ID1',
        //   content: 'Be your own hero, its cheaper than a movie ticket.',
        //   date: 1611653238221,
        //   liked: false
        // },
        // {
        //   id: 'ID2',
        //   content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat justo id viverra consequat. Integer feugiat lorem faucibus est ornare scelerisque. Donec tempus, nunc vitae semper sagittis, odio magna semper ipsum, et laoreet sapien mauris vitae arcu.',
        //   date: 1611653252444,
        //   liked: true
        // },
      ]
    }
  },
  methods: {
    addNewOolook() {
      let newOolook = {
        content: this.newOolookContent,
        date: Date.now(),
        liked: false
      }
      // this.oolooks.unshift(newOolook)
      db.collection('oolooks').add(newOolook).then(function(docRef) {
        console.log('Document written with ID: ', docRef.id)
      }).catch(function(error) {
        console.error('Error adding document: ', error)
      })
      this.newOolookContent = ''
    },
    deleteOolook(oolook) {
      db.collection('oolooks').doc(oolook.id).delete().then(function() {
        console.log('Document successfully deleted!');
      }).catch(function(error) {
        console.error('Error removing document: ', error);
      })
    },
    toggleLiked(oolook) {
      db.collection('oolooks').doc(oolook.id).update({
        liked: !oolook.liked
      })
      .then(function() {
        console.log('Document successfully updated!')
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error)
      })
    }
  },
  filters: {
    relativeDate(value) {
      return formatDistance(value, new Date())
    }
  },
  mounted() {
    db.collection('oolooks').orderBy('date').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        let oolookChange = change.doc.data()
        oolookChange.id = change.doc.id
        if (change.type === 'added') {
          console.log('New oolook: ', oolookChange)
          this.oolooks.unshift(oolookChange)
        }
        if (change.type === 'modified') {
          console.log('Modified oolook: ', oolookChange)
          let index = this.oolooks.findIndex(oolook => oolook.id === oolookChange.id)
          Object.assign(this.oolooks[index], oolookChange)
        }
        if (change.type === 'removed') {
          console.log('Removed oolook: ', oolookChange)
          let index = this.oolooks.findIndex(oolook => oolook.id === oolookChange.id)
          this.oolooks.splice(index, 1)
        }
      })
    })
  }
}
</script>

<style lang="sass">
.new-oolook
  textarea
    font-size: 19px
    line-height: 1.4 !important
.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4
.oolook:not(:first-child)
  border-top: 1px solid rgba(0, 0, 0, 0.12)
.oolook-content
  white-space: pre-line
.oolook-icons
  margin-left: -5px
</style>
