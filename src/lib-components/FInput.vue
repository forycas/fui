<template>
  <input :type="type"
         :value="modelValue"
         @input="$emit('update:modelValue', $event.target.value)"
         class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-primary focus:border-primary-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
         :class="{'bg-gray-200 cursor-not-allowed': disabled}"
  />
</template>

<script>
export default {
  name: 'FInput',
  props: {
    type: {
      type: [String, Number],
      default: 'text'
    },
    modelValue: {
      type: String,
      default: ''
    },
    disabled: Boolean
  }
}
</script>
