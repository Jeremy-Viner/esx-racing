<template>
  <div class="trackScreen" ref="trackScreen">
      <div class="mb" style="text-align:end">
        <span>Sign up for alerts when new races start</span>
        <input type="checkbox" @click="toggleAlert" />
      </div>
      <div v-for="(track,index) in trackObject" :key="index">
          <div class="row" :class="{evenRow: index % 2 == 0}">
            <div class="col-md-1 ut-vertAlignCenter center-md"><h4 v-html="index + 1"/></div>
            <div class="col-md-5 ut-vertAlignCenter center-md"><h4 v-html="track.Config.Name"/></div>
            <div class="col-md-3 ut-vertAlignCenter"><button class="btn" @click="setRace(index)">Create Race</button></div>
            <div class="col-md-3 ut-vertAlignCenter"><button class="btn" @click="viewRace(index)">View Race</button></div>
          </div>
      </div>
      <div class="formSlideDown col-md-12" :class="{active:formActive}">
        <div class="p-2">
            <strong class="col-md-6">Race Title*</strong>
            <input type="text" class="col-md-offset-3" v-model="config.title"><br>
            <strong v-if="circuit" class="col-md-6">No. of Laps</strong>
            <input v-if="circuit" class="col-md-offset-3 numberInput" v-model="config.laps">
            <strong v-else class="col-md-12">This is a Sprint Race</strong>
            <input type="hidden" v-model="config.race_id"/>
            <div class="row ut-vertAlignCenter mt center">
              <div class="col-md-6">
                <button class="btn" @click="createRace">Setup Race</button>
              </div>
              <div class="col-md-6">
                <button class="btn" @click="clearRace">Cancel Setup</button>
              </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import Nui from '../utils/Nui';
export default {
  name: 'track-screen',
  props: {
    trackList: []
  },
  data() {
    return {
      selectedRace : 0,
      formActive : false,
      circuit : false,
      config: {
        laps: 1,
        alert: false,
        title: ""
      }
    };
  },
  mounted() {

  },
  methods: {
      setRace: function(index) {
        this.selectedRace = index;
        this.formActive = 1;
        this.circuit = this.$store.state.trackList[index].Config.Type == 'Circuit';
        document.getElementsByClassName('interior-page')[0].scrollTop = 0;
      },
      viewRace: function(index) {
        Nui.send('showRace',{raceId: index + 1})
        Nui.send('closeApp',{})
      },
      createRace: function() {
        if(!this.$store.state.raceApp.joinedRace) {
          if(this.config.title !== "") {
            Nui.send('createRace',{
              raceId: this.selectedRace + 1,
              laps: this.config.laps,
              title: this.$sanitize(this.config.title)
            })
            this.formActive = 0;
            this.$store.state.raceApp.joinedRace = true;
            this.$store.state.raceApp.isOwner = true;
            this.$store.state.raceApp.race_id = this.selectedRace + 1;
          }
        }
        else {
          this.formActive = 0;
          this.$store.state.raceApp.error = "You already are in a race, leave that race first to create a new one";
        }
       
      },
      clearRace: function() {
        this.formActive = 0;
      },
      toggleAlert: function() {
        this.config.alert = !this.config.alert;
        Nui.send('alertSignup',{
          signup: this.config.alert,
        })
      }
  },
  computed: {
    trackObject: function() {
      return this.$store.state.trackList;
    }
  }
};
</script>

<style lang="scss">
</style>
