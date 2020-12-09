<template>
  <select
    :value="modelValue"
    class="mt-1 form-select block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
    @input="$emit('update:modelValue', $event.target.value)"
  >
    <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
  </select>
</template>

<script>
export default {
  name: 'FSelect',
  props: {
    id: String,
    modelValue: {
      type: [Number, String, Object],
      default: null
    },
    options: {
      type: Array,
      default: () => []
    }
  }
}
</script>
