import express from 'express'
import url from 'url'
import nextapp from '../../nextapp'

const router = express.Router()
const handler = nextapp.getRequestHandler()
const { parse } = url
router.all('/api/auth/*', (req, res) => {
  const { pathname, query } = parse(req.url, true)
  if (pathname === 'a' || pathname === 'b')
    nextapp.render(req, res, pathname, query);
  else
    handler(req, res, parse(req.url, true));
})

export default router;