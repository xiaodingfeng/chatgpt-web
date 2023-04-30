<script lang="ts" setup>
import { computed, defineAsyncComponent, ref,defineExpose} from 'vue'
import { defineComponent } from 'vue'
import { NModal, NFormItem, NForm } from 'naive-ui'
import { HoverButton, SvgIcon, UserAvatar } from '@/components/common'
import { NAutoComplete, NInput,NButton, NInputGroup,useMessage,NCol,NRow,FormItemRule,FormRules,FormInst,FormItemInst,NSelect } from 'naive-ui'
import {promptsJson, groupPromptsJson, filterIdJson} from './prompts-json'
import IndexVue from '@/views/chat/index.vue'
import bus from '@/utils/emit/event-bus';

const ms = useMessage()
const showModal = ref(false)
const promptsJsonOne = ref({
})
const promptsFormConfig = ref({})
const model = ref({})
const message = useMessage()
const show = ref(false)
const initData = (showFlag: boolean, id : string) => {
	promptsJsonOne.value = getFormConfig(id)
	if (!promptsJsonOne.value || !promptsJsonOne.value.prompt) {
		ms.error('prompts 获取失败！')
		show.value = false
	} else {
		promptsFormConfig.value = promptsJsonOne.value.formConfig
		model.value = {}
		show.value = showFlag
	}
}
function getFormConfig(id : string) {
	if (id) {
		const idJson = filterIdJson(id);
		if (!idJson) {
			return null
		}
		return idJson[0]
	}
	return null
}

function handleValidateButtonClick (e: MouseEvent) {
	const value = model.value;
	let flag = true
	promptsFormConfig.value.formItem.forEach(v => {
		if (v.required) {
			if (!value[v.prop]) {
				ms.error('请输入' + v.name)
				flag = false
				return
			}
		}
	})
	if (!flag) {
		return
	}
	show.value = false
	bus.emit('promptsDialogEvent', promptsJsonOne.value.prompt.replace(/\{(\w+)\}/g, (match, key) => value[key]));
}
defineExpose({ initData });
</script>

<template>
	<NModal v-model:show="show" :title="promptsJsonOne.name" style="width: 90%; max-width: 900px;" preset="card">
		<div style="margin-bottom: 50px">
			<NForm ref="formRef" :model="model">
				<NFormItem v-for="item in promptsFormConfig.formItem" :path="item.prop" :label="item.name" :required="item.required">
					<NInput v-if="item.type === 'input'" v-model:value="model[item.prop]" />
					<NInput v-if="item.type === 'textarea'" type="textarea" maxlength="2500" :autosize="{
        minRows: 3,
        maxRows: 9999
      }" show-count v-model:value="model[item.prop]" />
					<NSelect  v-if="item.type === 'multipleSelect'" v-model:value="model[item.prop]" multiple :options="item.options" />
					<NSelect  v-if="item.type === 'select'" v-model:value="model[item.prop]" :options="item.options" />
				</NFormItem>
				<NRow :gutter="[0, 24]">
					<NCol :span="24">
						<div style="display: flex; justify-content: flex-end">
							<NButton
								round
								type="primary"
								@click="handleValidateButtonClick"
							>
								提交
							</NButton>
						</div>
					</NCol>
				</NRow>
			</NForm>
		</div>
	</NModal>
</template>
