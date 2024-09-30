const express = require('express')
const cors = require('cors')

const PORT = process.env.PORT || 4000

const DEFAULT_DURATION = 80 * 1000; // 1:20 minutes in milliseconds.

const app = express()
app.use(cors())

app.get('/', (req, res) => {
    const { duration: durationParam } = req.query
    const rawDuration = durationParam || DEFAULT_DURATION
    const intDuration = parseInt(rawDuration, 10)
    const duration = isNaN(intDuration) ? DEFAULT_DURATION : intDuration

    const timestamp = Date.now() % duration
    return res.status(200).send(timestamp.toString())
})

/**
 * Keeping this for backwards compatibility.
 * @deprecated
 */
app.get('/timestamp/:videoId', (req, res) => {
    const { videoId } = req.params;
    if (videoId !== '1') {
        return res.status(404).send('Invalid Video ID.')
    }

    const duration = DEFAULT_DURATION
    const timestamp = Date.now() % duration
    return res.status(200).send(timestamp.toString())
})

app.listen(PORT, () => {
    console.log('Server started on port', PORT)
})

module.exports = app
