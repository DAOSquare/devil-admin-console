import { prop } from '@typegoose/typegoose'
import BaseModel from './BaseModel'
import TgooseHelper from 'lib/tgoosehelper'

// the collection name
const COLLECTION_NAME = 'daostats'

/** Chain Category */
export class ChainCategory {
  /** the block chain type */
  @prop({ required: true })
  public chain_type!: string

  /** total counts */
  @prop({ required: true })
  public count!: number
}

/** governanace */
export class Governanace {
  /** number of in grace */
  @prop({ required: true })
  public grace!: number

  /** number of in passed */
  @prop({ required: true })
  public passed!: number

  /** number of in process */
  @prop({ required: true })
  public process!: number

  /** number of unsponsored */
  @prop({ required: true })
  public unsponsored!: number

  /** number of in voting */
  @prop({ required: true })
  public voting!: number

  /** number of excution */
  @prop({ required: true })
  public excution!: number
}

/** Statistics of the number of states of all DAOs in Dework */
export class Dework {
  /** number of in process */
  @prop({ required: true })
  public progress!: number

  /** number of in todo */
  @prop({ required: true })
  public todo!: number

  /** number of in review */
  @prop({ required: true })
  public inreview!: number
}

/** stats of daos */
export class DaoStats extends BaseModel {
  /** dao number */
  @prop({ required: true })
  public daos!: number

  /** member number of all dao */
  @prop({ required: true })
  public members!: number

  /** treasury of all dao */
  @prop({ required: true })
  public treasury!: number

  /** dao on chains count */
  @prop({ required: true, type: () => [ChainCategory] })
  public chain_category!: ChainCategory[]

  @prop({ required: true, type: () => Governanace })
  public governanace!: Governanace

  @prop({ required: true, type: () => Dework })
  public dework!: Dework

  @prop({ required: true, unique: true })
  public create_at!: Date
}

// use TgooseHelper class , not Typegoose
export const DaoStatsModel = TgooseHelper.getModelForClass(
  DaoStats,
  COLLECTION_NAME
)