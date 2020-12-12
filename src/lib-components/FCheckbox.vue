<template>
  <label
    class="flex flex-grow items-center pb-3 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none transition ease-in-out duration-150"
    :class="{'bg-gray-200 cursor-not-allowed': disabled}">
    <input type="checkbox" :disabled="disabled" :checked="modelValue" @input="$emit('update:modelValue', $event.target.checked)"  class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded mr-2" />
    <template v-if="label">{{ label }}</template>
    <slot v-else />
  </label>
</template>

<script>
export default {
  name: 'FCheckbox',
  props: {
    modelValue: [Boolean, Number],
    disabled: Boolean,
    label: String
  }
}
</script>
