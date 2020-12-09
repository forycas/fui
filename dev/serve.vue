<script lang="ts">
import { defineComponent } from 'vue'
// Uncomment import and local "components" registration if library is not registered globally.
import { FButton } from '@/entry.esm'
import FFormItem from '@/lib-components/FFormItem.vue'
import FInput from '@/lib-components/FInput.vue'
import FSelect from '@/lib-components/FSelect.vue'

export default defineComponent({
  name: 'ServeDev',
  components: {
    FSelect,
    FInput,
    FFormItem,
    FButton
  },
  data () {
    return {
      selectValue: undefined
    }
  }
})
</script>

<template>
  <div id="app">
    <FButton>Test</FButton>
    <FButton>Test 2</FButton>

    <FFormItem label="Test form item" prop="test">
      <FInput />
    </FFormItem>

    <FFormItem label="Test select" prop="select">
      <FSelect v-model="selectValue" :options="[]" />
    </FFormItem>
  </div>
</template>
