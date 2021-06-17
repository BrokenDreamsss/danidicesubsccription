import { Context } from 'telegraf'

export function handleStart(ctx: Context) {
  return sendStart(ctx)
}

export function sendStart(ctx: Context) {
  console.log(ctx.startPayload)

  return ctx.replyWithHTML(
    ctx.i18n.t('start_group', {
      chatId: ctx.chat.id,
      botName: process.env.BOTNAME,
    }),
    {
      disable_web_page_preview: true,
    }
  )
}
