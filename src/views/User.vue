<template>
  <div class="page-wrapper">
    <product-detail
      v-if="currentUser"
      :product="currentUser"
    ></product-detail>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductDetail from '@/components/ProductDetail'

export default {
  components: { UserDetail },
  props: {
    id: String
  },
  computed: {
    ...mapGetters('users', ['getUserById']),
    currentProduct() {
      return this.getUserById(this.id)
    }
  }
}
</script>
