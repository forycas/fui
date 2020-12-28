<template>
  <div id="app">
    <div class="p-8">
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
        <FInput type="number" />
        <FInput readonly />
      </div>
      <FSelect v-model="selectValue" searchable :options="selectOptions"/>
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

    <div class="my-5">
      <h2 class="text-lg mb-3">Select</h2>

      <FFormItem label="Test select empty" prop="select">
        <FSelect v-model="selectValueNum" :options="selectOptionsNum" />
      </FFormItem>

      <FFormItem label="Test select empty searchable" prop="select">
        <FSelect v-model="selectValueNum" searchable :options="selectOptionsNum" />
      </FFormItem>

      <FFormItem label="Test select" prop="select">
        <FSelect v-model="selectValue" :options="selectOptions" />
      </FFormItem>

      <FFormItem label="Test select object" prop="select">
        <FSelect v-model="selectValueObj" :options="selectOptionsObj" />
      </FFormItem>

      <FFormItem label="Test searchable select" prop="select">
        <FSelect v-model="selectValue" searchable :options="selectOptions" />
      </FFormItem>

      <FFormItem label="Test dark select" prop="select">
        <FSelect v-model="selectValue" styling="dark" :options="selectOptions" />
      </FFormItem>
    </div>

    <div class="my-5">
      <h2 class="text-lg mb-3">Datepicker</h2>

      <FDatePicker v-model="selectedDate" />

      <p class="my-2">date selected: {{ selectedDate }}</p>
    </div>
      <FFormItem label="Test form item" prop="test">
        <FInput />
      </FFormItem>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { formatDate } from '@/utils/date'

export default defineComponent({
  name: 'ServeDev',
  data () {
    return {
      // Test case 1

      selectValueObj: 'test-val',
      selectOptionsObj: [{
        value: 'test-val',
        label: 'test'
      }, {
        value: 'test-val-2',
        label: 'test 2'
      }, {
        value: 'test-val-3',
        label: 'test 3'
      }, {
        value: 'test-val-4',
        label: 'test 4'
      }],

      // Test case 2

      selectValue: 'test-val',
      selectOptions: ['test-val', 'test-val 2', 'test-val 3', 'test-val 4'],

      // Test case 3
      selectValueNum: undefined,
      selectOptionsNum: [2, 3, 4, 523, 52434, 122],
      selectedDate: formatDate()
    }
  }
})
</script>
