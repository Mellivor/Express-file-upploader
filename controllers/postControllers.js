
const resend = async (req, res) => {
    const { URL, API_key, timeout} = req.body
    try {
        setTimeout(() => {
            res.status(200).json({ URL: URL, API_key: API_key })
        }, timeout);

    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

const response = async (req, res) => {
    try {
        res.status(200).json("get url")
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

module.exports = {
    resend,
    response
}
