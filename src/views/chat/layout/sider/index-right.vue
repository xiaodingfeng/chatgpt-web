<script setup lang='ts'>
import type { CSSProperties } from 'vue'
import { computed, ref, watch } from 'vue'
import { NButton, NLayoutSider, NCollapse,NCollapseItem,NGradientText,NCarousel } from 'naive-ui'
import List from './List.vue'
import Footer from './Footer.vue'
import { useAppStore, useChatStore } from '@/store'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { PromptStore } from '@/components/common'
import PromptsTool from '@/views/chat/components/Prompts/index.vue'

const appStore = useAppStore()
const chatStore = useChatStore()

const { isMobile } = useBasicLayout()
const show = ref(false)

const siderRightCollapsed = computed(() => appStore.siderRightCollapsed)

function handleRightAdd() {
  chatStore.addHistory({ title: 'New Chat', uuid: Date.now(), isEdit: false })
  if (isMobile.value)
    appStore.setSiderRightCollapsed(true)
}

function handleUpdateRightCollapsed() {
  appStore.setSiderRightCollapsed(!siderRightCollapsed.value)
}

const getMobileClass = computed<CSSProperties>(() => {
  if (isMobile.value) {
    return {
      position: 'fixed',
      zIndex: 50,
    }
  }
  return {}
})

const mobileSafeArea = computed(() => {
  if (isMobile.value) {
    return {
      paddingBottom: 'env(safe-area-inset-bottom)',
    }
  }
  return {}
})

watch(
  isMobile,
  (val) => {
    appStore.setSiderCollapsed(val)
  },
  {
    immediate: true,
    flush: 'post',
  },
)
</script>

<template>
		<NLayoutSider
			class="right-sider"
			:collapsed="siderRightCollapsed"
			:collapsed-width="0"
			:width="300"
			:show-trigger="isMobile ? false : 'arrow-circle'"
			collapse-mode="with"
			:style="getMobileClass"
			@update-collapsed="handleUpdateRightCollapsed"
		>
			<div class="flex flex-col h-full" :style="mobileSafeArea">
				<main class="flex flex-col flex-1 min-h-0">
					<div class="p-4">
						<NButton type="info" dashed block>
							 功能区
						</NButton>
					</div>
					<PromptsTool></PromptsTool>
					<div class="p-4">
						<NGradientText style="font-size: 35px" type="info"  gradient="linear-gradient(90deg, red 0%, green 50%, blue 100%)">
							Live Forever
						</NGradientText>
					</div>
				</main>
				<footer class="flex items-center justify-between min-w-0 p-4 overflow-hidden border-t dark:border-neutral-800">
					<NCarousel show-arrow autoplay>
						<img
							class="carousel-img"
							src="https://fengzhengx.cn/upload/2023/02/onwork.png"
						>
						<img
							class="carousel-img"
							src="https://fengzhengx.cn/upload/2021/01/mmexport1611049567901-17437ca7f53f46528152a56d2b9de417.jpg"
						>
						<img
							class="carousel-img"
							src="https://fengzhengx.cn/upload/2022/10/3rm84g7tvkgtqqlo61sogk1btf-f1e87241c150491f9c50f731c6005d71.jpg"
						>
						<img
							class="carousel-img"
							src="https://fengzhengx.cn/upload/2021/01/mmexport1611056651067-06025745152d4d4ab5168f1a9973c7b7.png"
						>
					</NCarousel>
				</footer>
			</div>
		</NLayoutSider>
</template>
<style>
.right-sider {
	border-left: 1px solid var(--n-border-color);;
}
</style>
