import { prop } from '@typegoose/typegoose'
import BaseModel from './BaseModel'
import TgooseHelper from 'lib/tgoosehelper'

// the collection name
const COLLECTION_NAME = 'member'

/** SocialLinks */
export class SocialLinks {
  @prop({ required: true })
  public type!: string

  /** Social Type  link address */
  @prop({ required: true })
  public link_text!: string
}

/** Member */
export class Member extends BaseModel {
  @prop({ default: '' })
  public name!: string | null

  @prop({ default: '' })
  public gender!: string | null

  /** Member Profile */
  @prop({ default: '' })
  public profile!: string | null

  @prop({ required: true, default: false })
  public is_famous!: boolean

  @prop({ required: true, default: false })
  public is_hot!: boolean

  @prop({ required: true, unique: true })
  public wallet_address!: string

  /** belong to daos */
  @prop({ default: [] })
  public daos!: string[]

  @prop({ type: () => [SocialLinks], _id: false, default: [] })
  public social_links!: SocialLinks[]
}

// use TgooseHelper class , not Typegoose
export const MemberModel = TgooseHelper.getModelForClass(
  Member,
  COLLECTION_NAME
)
