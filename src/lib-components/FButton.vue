<template>
  <component
      :is="componentType"
      :disabled="disabled || loading"
      :type="componentType === 'button' ? nativeType : null"
      :to="route"
      :href="href"
      class="f-button inline-flex items-center transition ease-in-out duration-300 cursor-pointer leading-5 font-medium focus:outline-none rounded-md"
      :class="{
      'px-2 h-6 text-sm': size === 'small',
      'px-3 h-8 text-sm': size === 'medium',
      'px-4 py-1 h-10 text-sm': size === 'normal',
      'px-5 py-2 h-12 text-lg': size === 'large',
      'bg-transparent text-primary-900 hover:text-primary-600': styling === 'transparent',
      'text-gray-700 bg-white border border-primary-700 hover:text-gray-700 hover:bg-primary-200 focus:shadow-outline-primary active:text-gray-800 active:bg-gray-50': styling === 'default',
      'text-white bg-primary-600 hover:bg-primary-500 focus:shadow-outline-primary active:bg-primary-50': styling === 'primary',
      'text-primary-800 bg-primary-100 hover:text-primary-900 hover:bg-primary-200 focus:shadow-outline-primary': styling === 'secondary'
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
      validator: value => ['normal', 'small', 'medium'].includes(value)
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
