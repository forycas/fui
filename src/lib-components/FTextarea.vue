<template>
  <textarea
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :rows="rows"
    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
  ></textarea>
</template>

<script>
export default {
  name: 'FTextarea',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    rows: {
      type: [String, Number],
      default: 2
    }
  }
}
</script>
