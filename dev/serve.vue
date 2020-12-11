<template>
  <div id="app">
    <FButton>Test</FButton>
    <FButton styling="primary">Test 2</FButton>
    <FButton size="small" styling="primary">Test 2</FButton>
    <FButton href="/" styling="primary">Link</FButton>
    <FButton href="/" styling="secondary">Link</FButton>
    <FButton size="medium" styling="secondary">Link</FButton>
    <FButton size="large" styling="primary">Link</FButton>
    <FButton styling="transparent">Link</FButton>

    <FFormItem label="Test form item" prop="test">
      <FInput />
    </FFormItem>

    <FFormItem label="Test select" prop="select">
      <FSelect v-model="selectValue" :options="[]" />
    </FFormItem>
  </div>
</template>

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
