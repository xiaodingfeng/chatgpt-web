<script lang="ts" setup>
import { defineAsyncComponent, ref  } from 'vue'
import { defineComponent } from 'vue'
import { useDialog } from 'naive-ui'
import { HoverButton, SvgIcon, UserAvatar } from '@/components/common'
import { NButton, NLayoutSider, NCollapse,NCollapseItem,NGradientText,NCarousel,NScrollbar } from 'naive-ui'
const Setting = defineAsyncComponent(() => import('@/components/common/Setting/index.vue'))
import PromptDialog from '@/views/chat/components/Prompts/PromptDialog.vue'
import { promptsJson, groupPromptsJson } from './prompts-json'
const prompt_dialog = ref<InstanceType<typeof PromptDialog>>()
const show = ref(false)
const promptId = ref('')
function handleClickCollapsed(id) {
	show.value = true
	prompt_dialog.value?.initData(show, id);
}
</script>

<template>
	<NScrollbar class="px-4">
		<div class="flex flex-col gap-2 text-sm">
		<NCollapse style="margin-left: 10px" arrow-placement="right" :default-expanded-names="['1']">
			<NCollapseItem title="全部" name="1">
				<NButton style="margin: 5px" v-for="item in promptsJson" type="primary" @click="handleClickCollapsed(item.id)" dashed>
					{{ item.name }}
				</NButton>
			</NCollapseItem>
			<NCollapseItem v-for="(values,key) in groupPromptsJson" :title="values[0].cateName" :name="key">
				<NButton style="margin: 5px" v-for="item in values" type="primary" @click="handleClickCollapsed(item.id)" dashed>
					{{ item.name }}
				</NButton>
			</NCollapseItem>
		</NCollapse>
	</div>
	</NScrollbar>
	<PromptDialog ref="prompt_dialog"/>
</template>
