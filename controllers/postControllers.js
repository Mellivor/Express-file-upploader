
const resend = async (req, res) => {
    const { URL, API_key} = req.body
    try {
        setTimeout(() => {
            res.status(200).json({ URL: URL, API_key: API_key })
        }, 30000);

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
