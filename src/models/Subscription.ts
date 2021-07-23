import {
  prop,
  getModelForClass,
  Severity,
  setGlobalOptions,
} from '@typegoose/typegoose'
import { web3 } from '@/helpers/web3'

interface Accounts {
  eth: {
    address: string
    privateKey: string
  }
}

interface Prices {
  monthly: { eth: number }
}

setGlobalOptions({
  schemaOptions: { timestamps: true },
  options: { allowMixed: Severity.ALLOW },
})

export class Subscription {
  @prop({ required: true })
  userId: number
  @prop({ required: true })
  chatId: number
  @prop({ required: true, unique: true })
  accounts: Accounts
  @prop()
  prices?: Prices
}

export const SubscriptionModel = getModelForClass(Subscription)

export async function getOrCreateSubscription(userId: number, chatId: number) {
  let subscription = await SubscriptionModel.findOne({
    chatId,
  })

  if (subscription) {
    return subscription
  }

  const ethAccount = web3.eth.accounts.create()

  subscription = await SubscriptionModel.create({
    userId,
    chatId,
    accounts: { eth: ethAccount },
  })

  return subscription
}
