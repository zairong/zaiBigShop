<template>
  <div>
    <TypeNav />
    <ListContainer />
    <Floor v-for="floor in floorList  " :key="floor.id" :list="floor" />
  </div>
</template>

<script>
import { mapState } from "vuex"
import ListContainer from "@/views/Home/ListContainer"
import Floor from "@/views/Home/Floor"
export default {
  name: "Home",
  components: {
    ListContainer,
    Floor
  },
  mounted() {
    this.$store.dispatch("home/getFloorList")
  },
  computed: {
    ...mapState('home', ["floorList"])
  }
}
</script>

<style>

</style>