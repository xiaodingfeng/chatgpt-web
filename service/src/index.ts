import express from 'express'
import type { RequestProps } from './types'
import type { ChatMessage } from './chatgpt'
import {chatConfig, chatReplyProcess, createTranscription, currentModel} from './chatgpt'
import { auth } from './middleware/auth'
import { limiter } from './middleware/limiter'
import { isNotEmptyString } from './utils/is'
const FormData = require('form-data')
const app = express()
const router = express.Router()
const multer  = require('multer');
const fs = require('fs')
const upload = multer({
	dest: 'uploads/' // 指定上传文件的存储路径,
});
app.use(express.static('public'))
app.use(express.json())

app.all('*', (_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'authorization, Content-Type')
  res.header('Access-Control-Allow-Methods', '*')
  next()
})

router.post('/transcription', upload.single('file'), async (req, res) => {
	try {
		const formData = new FormData()
		const fileContent = fs.readFileSync(req.file.path)
		// const file = new File([fileContent], req.file.originalname, {
		// 	type: 'audio/wav',
		// 		lastModified: Date.now()
		// })
		formData.append('file', fileContent, {
			filename: req.file.originalname,
			contentType: 'audio/wav'
		})
		// formData.append('file', file)
		formData.append('model', req.body.model)
		formData.append('temperature', req.body.temperature)
		formData.append('response_format', req.body.response_format)

		const response = await createTranscription(formData)
		console.log(response)
		res.send(response)
	} catch (error) {
		console.log(error)
		res.send({ status: 'Fail', message: error.message, data: null })
	}
})

router.post('/chat-process', [auth, limiter], async (req, res) => {
  res.setHeader('Content-type', 'application/octet-stream')

  try {
    const { prompt, options = {}, systemMessage } = req.body as RequestProps
    let firstChunk = true
    await chatReplyProcess({
      message: prompt,
      lastContext: options,
      process: (chat: ChatMessage) => {
        res.write(firstChunk ? JSON.stringify(chat) : `\n${JSON.stringify(chat)}`)
        firstChunk = false
      },
      systemMessage,
    })
  }
  catch (error) {
    res.write(JSON.stringify(error))
  }
  finally {
    res.end()
  }
})

router.post('/config', auth, async (req, res) => {
  try {
    const response = await chatConfig()
    res.send(response)
  }
  catch (error) {
    res.send(error)
  }
})

router.post('/session', async (req, res) => {
  try {
    const AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY
    const hasAuth = isNotEmptyString(AUTH_SECRET_KEY)
    res.send({ status: 'Success', message: '', data: { auth: hasAuth, model: currentModel() } })
  }
  catch (error) {
    res.send({ status: 'Fail', message: error.message, data: null })
  }
})

router.post('/verify', async (req, res) => {
  try {
    const { token } = req.body as { token: string }
    if (!token)
      throw new Error('Secret key is empty')

    if (process.env.AUTH_SECRET_KEY !== token)
      throw new Error('密钥无效 | Secret key is invalid')

    res.send({ status: 'Success', message: 'Verify successfully', data: null })
  }
  catch (error) {
    res.send({ status: 'Fail', message: error.message, data: null })
  }
})

app.use('', router)
app.use('/api', router)
app.set('trust proxy', 1)

app.listen(3002, () => globalThis.console.log('Server is running on port 3002'))
