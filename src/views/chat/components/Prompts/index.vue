<script lang="ts" setup>
import { defineAsyncComponent, ref } from 'vue'
import { defineComponent } from 'vue'
import { useDialog } from 'naive-ui'
import { HoverButton, SvgIcon, UserAvatar } from '@/components/common'
import { NButton, NLayoutSider, NCollapse,NCollapseItem,NGradientText,NCarousel } from 'naive-ui'
const Setting = defineAsyncComponent(() => import('@/components/common/Setting/index.vue'))
import PromptDialog from '@/views/chat/components/Prompts/PromptDialog.vue'
const dataList = [
	{
		name: '产品经理',
		value:'productPM',
		cate: 'product',
		cateName: '职业'
	},
	{
		name: '程序员',
		value:'productChild',
		cate: 'product',
		cateName: '职业'
	},
	{
		name: '外译中',
		value:'translateC_E',
		cate: 'translate',
		cateName: '翻译'
	},
	{
		name: '中译外',
		value:'translateC_E',
		cate: 'translate',
		cateName: '翻译'
	}
]
const groupsList = dataList.reduce((acc, cur) => {
	const key = cur.cate
	if (!acc[key]) {
		acc[key] = []
	}
	acc[key].push(cur)
	return acc
}, {})
const show = ref(false)
function handleClickCollapsed() {
	show.value = true
}
</script>

<template>
	<div class="flex-1 min-h-0 pb-4 overflow-hidden">
		<NCollapse style="margin-left: 10px" arrow-placement="right">
			<NCollapseItem title="全部" name="1">
				<NButton style="margin: 5px" v-for="item in dataList" type="primary" @click="handleClickCollapsed" dashed>
					{{ item.name }}
				</NButton>
			</NCollapseItem>
			<NCollapseItem v-for="(values,key) in groupsList" :title="values[0].name" :name="key">
				<NButton style="margin: 5px" v-for="item in values" type="primary" @click="handleClickCollapsed" dashed>
					{{ item.name }}
				</NButton>
			</NCollapseItem>
		</NCollapse>
	</div>
	<PromptDialog v-model:visible="show" />
</template>
