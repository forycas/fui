<template>
  <component
      :is="componentType"
      :disabled="disabled || loading"
      :type="componentType === 'button' ? nativeType : null"
      :to="route"
      :href="href"
      class="f-button inline-flex items-center transition ease-in-out duration-150 cursor-pointer"
      :class="{
      'px-4 py-1 h-10 rounded-md text-sm': size === 'normal',
      'px-2 h-6 rounded-md text-sm': size === 'small',
      'border border-gray-300 leading-5 font-medium text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50': styling === 'default',
      'border border-blue-900 leading-5 font-medium text-white bg-teal-600 bg-white hover:bg-teal-500 focus:outline-none focus:border-teal-300 focus:shadow-outline-teal active:text-teal-800 active:bg-teal-50': styling === 'primary'
    }">
    <slot />
  </component>
</template>

<script>
export default {
  name: 'FButton',
  props: {
    styling: {
      type: String,
      default: 'default',
      validator: value => ['default', 'outlined', 'primary', 'secondary', 'transparent'].includes(value)
    },
    size: {
      type: String,
      default: 'normal',
      validator: value => ['normal', 'small'].includes(value)
    },
    nativeType: {
      type: String,
      default: 'button',
      validator: value => ['button', 'submit'].includes(value)
    },
    loading: Boolean,
    disabled: Boolean,
    href: String,
    route: [String, Object]
  },
  data () {
    return {
      componentType: this.route ? 'router-link' : this.href ? 'a' : 'button'
    }
  }
}
</script>

<style scoped>
.f-button + .f-button {
  margin-left: 1rem;
}
</style>
