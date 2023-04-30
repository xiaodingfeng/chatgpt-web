const dataList = [
	{
		id: '1',
		name: '中译外',
		des: '中文翻译为英语',
		value:'translateC_E',
		cate: 'translate',
		cateName: '翻译',
		prompt: '下面我让你来充当翻译家，你的目标是把任何语言翻译成英文，请翻译时不要带翻译腔，而是要翻译得自然、流畅和地道，使用优美和高雅的表达方式。请翻译下面这句话：{content}',
		formConfig: {
			formItem: [
				{
					name: '内容',
					prop: 'content',
					type: "textarea",
					required: true
				}
			]
		}
	},
	{
		id: '2',
		name: '外译中',
		des: '英语翻译为中文',
		value:'translateC_E',
		cate: 'translate',
		cateName: '翻译',
		prompt: '下面我让你来充当翻译家，你的目标是把任何语言翻译成中文，请翻译时不要带翻译腔，而是要翻译得自然、流畅和地道，使用优美和高雅的表达方式。请翻译下面这句话：{content}',
		formConfig: {
			formItem: [
				{
					name: '内容',
					prop: 'content',
					type: "textarea",
					required: true
				}
			]
		}
	},
	{
		id: '3',
		name: '产品经理',
		des: '问需求',
		value:'productPM',
		cate: 'product',
		cateName: '职业',
		prompt: '请确认我的以下请求。请您作为产品经理回复我。我将会提供一个主题，您将帮助我编写一份包括以下章节标题的PRD文档：主题、简介、问题陈述、目标与目的、用户故事、技术要求、收益、KPI指标、开发风险以及结论。在我要求具体主题、功能或开发的PRD之前，请不要先写任何一份PRD文档。我的主题为：{topic}',
		formConfig: {
			formItem: [
				{
					name: '主题',
					prop: 'topic',
					type: "textarea",
					required: true
				}
			]
		}
	},
	{
		id: '4',
		name: '程序员',
		des: '程序员专属',
		value:'productChild',
		cate: 'product',
		cateName: '职业',
		prompt: '我想让你充当软件开发人员。我将提供一些关于 Web 应用程序要求的具体信息，您的工作是提出用于使用 {codeType} 开发应用程序的架构和代码。我的第一个要求是{request}',
		formConfig: {
			formItem: [
				{
					name: '代码语言',
					prop: 'codeType',
					type: "select",
					options: [
						{ label: 'Java', value: 'Java' },
						{ label: 'Python', value: 'Python' },
						{ label: 'JavaScript', value: 'JavaScript' },
						{ label: 'C++', value: 'C++' },
						{ label: 'Ruby', value: 'Ruby' },
						{ label: 'PHP', value: 'PHP' },
						{ label: 'Swift', value: 'Swift' },
						{ label: 'Objective-C', value: 'Objective-C' },
						{ label: 'Kotlin', value: 'Kotlin' },
						{ label: 'C#', value: 'C#' },
						{ label: 'Go', value: 'Go' },
						{ label: 'R', value: 'R' },
						{ label: 'Perl', value: 'Perl' },
						{ label: 'Scala', value: 'Scala' }
					],
					required: true
				},
				{
					name: '要求',
					prop: 'request',
					type: "textarea",
					required: true
				}
			]
		}
	}
]
export const promptsJson = dataList
export const groupPromptsJson = dataList.reduce((acc, cur) => {
	const key = cur.cate
	if (!acc[key]) {
		acc[key] = []
	}
	acc[key].push(cur)
	return acc
}, {})
export function filterIdJson(id : string) {
	return dataList.filter(v => {
		return v.id === id
	})
}
