<template>
  <div class="mb-6">
    <label :for="`form-item--${prop}`" class="block text-sm font-medium leading-5 text-gray-700" :class="{'text-red-600': error.length}">
      {{ label }}
    </label>

    <div class="mt-1 relative rounded-md shadow-sm">
      <slot />

      <div v-if="error.length" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <svg class="h-5 w-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
    <div v-if="error.length" class="absolute">
      <p class="mt-1 text-xs text-red-600">{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FFormItem',
  props: {
    prop: {
      type: String,
      required: true
    },
    label: String,
    error: {
      type: String,
      default: ''
    }
  }
}
</script>
