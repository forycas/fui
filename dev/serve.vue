<template>
  <div id="app">
    <div class="my-5">
      <h2 class="text-lg mb-3">Buttons</h2>

      <FButton>Test</FButton>
      <FButton styling="primary">Test 2</FButton>
      <FButton size="small" styling="primary">Test 2</FButton>
      <FButton href="/" styling="primary">Link</FButton>
      <FButton href="/" styling="secondary">Link</FButton>
      <FButton size="medium" styling="secondary">Link</FButton>
      <FButton size="large" styling="primary">Link</FButton>
      <FButton styling="transparent">Link</FButton>
    </div>

    <div class="my-5">
      <h2 class="text-lg mb-3">Input</h2>

      <FInput />
      <FInput disabled />
    </div>

    <div class="my-5">
      <h2 class="text-lg mb-3">Table</h2>

      <FTable>
        <template v-slot:heading>
          <FTableHeading>Test</FTableHeading>
          <FTableHeading>Test heading 2</FTableHeading>
          <FTableHeading>Test heading 3</FTableHeading>
        </template>
        <FTableRow>
          <FTableCol>
            <FCheckbox />
          </FTableCol>
          <FTableCol>Test col 2</FTableCol>
          <FTableCol>Test col 3</FTableCol>
        </FTableRow>
        <FTableRow odd>
          <FTableCol>Test</FTableCol>
          <FTableCol>Test col 2</FTableCol>
          <FTableCol>Test col 3</FTableCol>
        </FTableRow>
        <FTableRow>
          <FTableCol>Test</FTableCol>
          <FTableCol>Test col 2</FTableCol>
          <FTableCol>Test col 3</FTableCol>
        </FTableRow>
        <FTableRow :hoverable="false">
          <FTableCol>Test</FTableCol>
          <FTableCol>Test col 2</FTableCol>
          <FTableCol>Test col 3</FTableCol>
        </FTableRow>
      </FTable>
    </div>

    <div class="my-5">
      <h2 class="text-lg mb-3">Checkbox</h2>

      <FCheckbox label="test checkbox" />
    </div>

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
import FTable from '@/lib-components/FTable.vue'
import FTableRow from '@/lib-components/FTableRow.vue'
import FTableCol from '@/lib-components/FTableCol.vue'
import FTableHeading from '@/lib-components/FTableHeading.vue'
import FCheckbox from '@/lib-components/FCheckbox.vue'

export default defineComponent({
  name: 'ServeDev',
  components: {
    FCheckbox,
    FTableHeading,
    FTableCol,
    FTableRow,
    FTable,
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
