import {
  Get,
  Query,
  createHandler,
  DefaultValuePipe,
  InternalServerErrorException,
} from '@storyofams/next-api-decorators'
import { DaoStats } from 'models/DaoStats'
import DaoStatsService from 'service/daostats'
import { MsgCode } from 'types/const-enum'
import { DaoStatsRecord } from 'types/daoStats'
import { ResultMsg } from 'types/resultmsg'
import { DaoStatsHistory, HistoryData } from 'types/models/daostats'

class DaoStatsController {
  private _service = new DaoStatsService()

  /**
   * get daoStats list
   * @param page
   * @param pageSize
   * @param queryParams
   * @param sortParams
   * @returns
   */

  /**
   * @swagger
   * /api/v2/daostats/list:
   *   get:
   *     tags:
   *       - daostats
   *     summary: get daoStats list
   *     parameters:
   *            - name: page
   *              required: false
   *              in: query
   *              type: number
   *            - name: pageSize
   *              required: false
   *              in: query
   *              type: number
   *            - name: queryParams
   *              required: false
   *              in: query
   *              type: object
   *            - name: sortParams
   *              required: false
   *              in: query
   *              type: object
   *
   *     responses:
   *       200:
   *         description: daoStats list
   *         content:
   *           application/json:
   *             schema:
   *               type: ResultMsg<PageData<DaoStats>>
   */
  @Get('/list')
  public async getDaoStatsList(
    @Query('page', DefaultValuePipe(0)) page: number,
    @Query('pageSize', DefaultValuePipe(0)) pageSize: number,
    @Query('filters') filters?: string,
    @Query('sortBy') sortBy?: string
  ) {
    try {
      return await this._service.getList(
        page,
        pageSize,
        filters ? JSON.parse(filters) : {},
        sortBy ? JSON.parse(sortBy) : {}
      )
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message)
      }
    }
  }

  @Get('/record')
  public async getDaoStatsReCord() {
    const ret = await this._service.getList(0, 100, {}, {})
    const daosRecords: DaoStatsRecord[] = []
    const membersRecords: DaoStatsRecord[] = []
    const treasuryRecords: DaoStatsRecord[] = []
    ret.data?.items?.forEach(({ daos, create_at, members, treasury }) => {
      daosRecords.push({ date: create_at, value: daos })
      membersRecords.push({ date: create_at, value: members })
      treasuryRecords.push({ date: create_at, value: treasury })
    })
    return {
      data: {
        daosRecords,
        membersRecords,
        treasuryRecords,
      },
    }
  }

  /**
   * get the last dao stats
   * @returns
   */

  /**
   * @swagger
   * /api/v2/daostats:
   *   get:
   *     tags:
   *       - daostats
   *     summary: get the last dao stats
   *
   *     responses:
   *       200:
   *         description: the last dao stats object
   *         content:
   *           application/json:
   *             schema:
   *               type: ResultMsg<DaoStats | null>
   */
  @Get()
  public async getLastDaoStats(): Promise<ResultMsg<DaoStats | null>> {
    const stats: ResultMsg<DaoStats | null> = {
      message: '',
      data: null,
    }
    try {
      const daostats = await this._service.getLastDaoStatsEntity()
      if (daostats && daostats.length > 0) stats.data = daostats[0]
    } catch (err) {
      const error = err instanceof Error ? err.message : MsgCode.FAILURE
      stats.message = error
      throw new InternalServerErrorException(error)
    }
    return stats
  }

  /**
   * @swagger
   * /api/v2/daostats/history:
   *   get:
   *     tags:
   *       - daostats
   *     summary: get daoStats daos,members,treasury history data
   *     parameters:
   *            - name: count
   *              required: false
   *              in: query
   *              type: number
   *
   *     responses:
   *       200:
   *         description: daoStats daos,members,treasury history data
   *         content:
   *           application/json:
   *             schema:
   *               type: ResultMsg<DaoStatsHistory | null>
   */
  @Get('/history')
  public async getDaoStatsHistory(
    @Query('count', DefaultValuePipe(30)) count: number
  ): Promise<ResultMsg<DaoStatsHistory | null>> {
    const dsh: ResultMsg<DaoStatsHistory | null> = {
      message: '',
      data: { data: [] },
    }

    const ret = await this._service.getList(1, count, {}, { create_at: -1 })

    if (ret.message) {
      dsh.message = ret.message
      dsh.data = null
      //throw new InternalServerErrorException(ret.message)
    } else {
      ret.data?.items.forEach((i) => {
        const hd: HistoryData = {
          daos: i.daos,
          members: i.members,
          treasury: i.treasury,
          create_at: i.create_at,
        }
        dsh.data?.data.push(hd)
      })
    }
    return dsh
  }
}

export default createHandler(DaoStatsController)
