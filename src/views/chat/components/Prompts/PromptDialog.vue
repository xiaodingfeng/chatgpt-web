<script lang="ts" setup>
import { computed, defineAsyncComponent, ref} from 'vue'
import { defineComponent } from 'vue'
import { NModal, NTabPane, NTabs } from 'naive-ui'
import { HoverButton, SvgIcon, UserAvatar } from '@/components/common'
import { NAutoComplete, NInput,NButton, NInputGroup,useMessage } from 'naive-ui'
const Setting = defineAsyncComponent(() => import('@/components/common/Setting/index.vue'))
interface DataProps {
	renderKey: string
	renderValue: string
	key: string
	value: string
}

interface Props {
	visible: boolean
}

interface Emit {
	(e: 'update:visible', visible: boolean): void
}
const ms = useMessage()
const props = defineProps<Props>()

const emit = defineEmits<Emit>()

const show = computed({
	get: () => props.visible,
	set: (visible: boolean) => emit('update:visible', visible),
})
const prompt = ref<string>('2023-04-29 loading')
const showModal = ref(false)
function handleClickConfirm() {
	ms.success('暂未实现')
}
</script>

<template>
	<NModal title="卡牌大师" v-model:show="show" style="width: 90%; max-width: 900px;height: 200px; max-height: 500px" preset="card">
		<div style="margin-bottom: 50px">
			描述....
		</div>
		<footer :class="footerClass">
			<div class="w-full max-w-screen-xl m-auto">
				<div class="flex items-center justify-between space-x-2">
					<NInputGroup>
						<NButton type="primary">
							问题：
						</NButton>
						<NInput
							ref="inputRef1"
							v-model:value="prompt"
							type="textarea"
							:placeholder="'placeholder'"
							:autosize="{ minRows: 1, maxRows: 8 }"
						/>
						<NButton type="primary" @click="handleClickConfirm">
							<template #icon>
              <span class="dark:text-black">
                <SvgIcon icon="ri:send-plane-fill" />
              </span>
							</template>
						</NButton>
					</NInputGroup>
				</div>
			</div>
		</footer>
	</NModal>
</template>
