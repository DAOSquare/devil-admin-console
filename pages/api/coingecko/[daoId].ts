// get daosquare's price,market totalsupply

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
// import tunnel from 'tunnel'
import NextCors from 'nextjs-cors'

type Data = {
  daoId: string
  symbol: string
  tokenprice: number
  totalsupply: number
  market: number
}
const url_coingecko = 'https://api.coingecko.com/api/v3/coins/daosquare'

// daosquare
const fetchCoinGeckoData = async () => {
  return axios.get(url_coingecko).then((response) => response.data)
}

/**
 * @swagger
 * /api/coingecko/{daoId}:
 *   get:
 *     tags:
 *       - data-api
 *     summary: get coingecko coin data,only daosquare data
 *     parameters:
 *            - name: daoId
 *              required: true
 *              in: path
 *              type: string
 *
 *     responses:
 *       200:
 *         description: coingecko coin data
 *         content:
 *           application/json:
 *             schema:
 *               type: Data
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })

  const { daoId } = req.query
  if (typeof daoId === 'string') {
    const fetchData = await fetchCoinGeckoData()
    if (!!fetchData) {
      const retData: Data = {
        daoId: fetchData.id,
        symbol: fetchData.symbol,
        tokenprice: fetchData.market_data.current_price.usd,
        totalsupply: fetchData.market_data.total_supply,
        market:
          fetchData.market_data.current_price.usd *
          fetchData.market_data.total_supply,
      }
      res.status(200).json(retData)
    }
  }
  res.status(500)
}
