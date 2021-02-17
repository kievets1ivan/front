<template>
  <div class="logger">
      {{$store.state}}
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .logger{
        position: fixed;
        z-index: 1200;
        top: 80px;
        right: 0;
        max-width: 400px;
        max-height: 300px;
        background: #fff;
        // position: relative;
        overflow: scroll;
        // div{
        //     // position: absolute;
        // }
        // min-width: 100%;
        // min-height: 100%;
    }
</style>