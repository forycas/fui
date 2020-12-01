<script lang="ts">
import { defineComponent } from 'vue'
// Uncomment import and local "components" registration if library is not registered globally.
import { FButton } from '@/entry.esm'
import FFormItem from '@/lib-components/FFormItem.vue'
import FInput from '@/lib-components/FInput.vue'

export default defineComponent({
  name: 'ServeDev',
  components: {
    FInput,
    FFormItem,
    FButton
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
  </div>
</template>
