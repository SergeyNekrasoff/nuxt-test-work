<template>
  <div class="container">
    <div class="grid">
      <productList></productList>
    </div>
  </div>
</template>

<script>
const productList = () => import('@/components/ProductList')

export default {
  components: { productList }
}
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.grid {
  max-width: 1200px;
  width: 90%;
  min-width: 320px;
}
</style>
