import { Router } from 'express'
import formidable from 'formidable'
import fs from 'fs'
import parse from 'rss-to-json'
//@ts-ignore
import opml from 'opml'
const router = Router()

router.post('/fetch-opml', (req, res, next) => {
    const form = formidable({})
    form.parse(req, (err, _, files: any) => {
        if (err) {
            next(err)
            return
        }
        fs.readFile(files?.myOPML[0].filepath, (err, opmlText) => {
            if (!err) {
                opml.parse(opmlText, (err: any, theOutline: any) => {
                    if (!err) {
                        res.send(theOutline.opml.body)
                        return
                    }
                    res.send({})
                })
                return
            }
            res.send({})
        })
    })
})

router.post('/rss-parse', async (req, res) => {
    try {
        const parsedData = await parse(req.body.xmlUrl)
        res.send(parsedData)
    } catch (error) {
        console.log(error)
        res.send({
            items: []
        })
    }
})

router.post('/fetch-xml', async (req, res) => {
    try {
        const feedXMLData = await fetch(req.body.xmlUrl)
        const feedJSONData = await feedXMLData.text()
        res.send(feedJSONData)
    } catch (error) {
        console.log(error)
        res.send([])
    }
})

export default router