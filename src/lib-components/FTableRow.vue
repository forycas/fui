<template>
  <tr class="transition duration-300" :class="[odd ? 'bg-gray-50' : 'bg-white', {'hover:bg-emerald-100 cursor-pointer': hoverable}]">
    <slot />
  </tr>
</template>

<script>
export default {
  name: 'FTableRow',
  props: {
    odd: Boolean,
    hoverable: {
      type: Boolean,
      default: true
    }
  }
}
</script>
