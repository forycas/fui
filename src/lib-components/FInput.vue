<template>
  <input :type="type"
         :value="modelValue"
         @input="$emit('update:modelValue', $event.target.value)"
         class="appearance-none shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
         :class="{
           'bg-gray-200': disabled || readonly,
           'cursor-not-allowed': disabled
         }"
  />
</template>

<script>
export default {
  name: 'FInput',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    modelValue: {
      type: String,
      default: ''
    },
    readonly: Boolean,
    disabled: Boolean
  }
}
</script>
