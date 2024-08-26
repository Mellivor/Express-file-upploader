
const resend = async (req, res) => {
    const { URL, API_key} = req.body
    try {

        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

const response = async (req, res) => {
    // const { body, author, userid } = req.body
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
