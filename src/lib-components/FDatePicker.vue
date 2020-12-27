<template>
  <FInput :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
</template>

<script>
import { formatDate } from '@/utils/date'
import Flatpickr from 'flatpickr'
import { Lithuanian } from 'flatpickr/dist/l10n/lt.js'
import 'flatpickr/dist/flatpickr.min.css'
import 'flatpickr/dist/themes/dark.css'
import FInput from '@/lib-components/FInput'

export default {
  name: 'FDatePicker',
  components: { FInput },
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      $picker: null
    }
  },
  mounted () {
    this.$picker = new Flatpickr(this.$el, {
      allowInput: true,
      locale: Lithuanian,
      onChange: (date) => {
        this.$emit('update:modelValue', formatDate(date))
      }
    })
  },
  unmounted () {
    this.$picker.destroy()
  }
}
</script>
