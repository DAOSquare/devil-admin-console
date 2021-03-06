import { prop } from '@typegoose/typegoose'
import { Schema } from 'mongoose'
import BaseModel from './BaseModel'
import TgooseHelper from 'lib/tgoosehelper'

// the collection name
const COLLECTION_NAME = 'dao'

/** the contract of dao */
//@index({ contract_address: 'text' }) // compound index
export class DAOContract {
  @prop({ required: true })
  public chain_type!: string

  @prop({ required: true })
  public contract_address!: string
}

/** OfficalLinks */
export class OfficalLinks {
  @prop({ required: true })
  public type!: string

  /** Social Type  link address */
  @prop({ default: '' })
  public link_text!: string
}

/** the treasury info of dao */
export class Treasury {
  @prop({ required: true })
  public chain_type!: string

  /** the contract of dao's treasury */
  @prop({ required: true })
  public contract_address!: string

  /** get the json data of treasury url */
  @prop({ default: '' })
  public json_url!: string
}

/** the contract of dao's token */
export class TokenContract {
  @prop({ required: true })
  public chain_type!: string

  /** the contract of dao's token */
  @prop({ required: true })
  public contract_address!: string
}

/** dao' token */
export class DAOToken {
  @prop({ required: true })
  public token_name!: string

  @prop({ required: true })
  public total_supply!: string

  @prop({ required: true })
  public token_contract!: TokenContract[]
}

/** the open api of dao */
export class OpenApi {
  dework?: { orgId: string }
  discord?: {
    channelId: string
    bot_token: string
  }
  twitter?: {
    twitterId: string
    orbit_path?: string
    orbit_token?: string
  }
  sesh?: {
    access_token: string
    guild_id: string
  };
  [x: string]: unknown
}

export class Dao extends BaseModel {
  @prop({ required: true, unique: true })
  public daoId!: string

  @prop({ required: true })
  public name!: string

  @prop({ default: '' })
  public logo!: string | null

  @prop({ default: '' })
  public profile!: string | null

  @prop({ default: '' })
  public category!: string

  @prop({ type: () => [String], default: [] })
  public founder!: string[]

  @prop({ default: null })
  public start_time!: Date | null

  @prop({ type: () => [OfficalLinks], _id: false, default: [] })
  public offical_links!: OfficalLinks[]

  @prop({ type: DAOContract, _id: false, default: null })
  public dao_contract!: DAOContract

  @prop({ type: DAOContract, _id: false, default: null })
  public stake_contract!: DAOContract

  @prop({ type: Treasury, _id: false, default: null })
  public treasury!: Treasury

  @prop({ type: DAOToken, _id: false, default: null })
  public dao_token!: DAOToken

  @prop({ type: Schema.Types.Mixed, _id: false, default: null })
  public open_api!: unknown

  @prop({ required: true, default: false })
  public is_hot!: boolean
}

// use TgooseHelper class , not Typegoose
export const DaoModel = TgooseHelper.getModelForClass(Dao, COLLECTION_NAME)
