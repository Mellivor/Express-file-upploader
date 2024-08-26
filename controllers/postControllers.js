import fs from 'fs'


const resend = async (req, res) => {
    const { URL, API_key, timeout} = req.body
    try {
        fs.appendFileSync("/tmp/example_file.txt", " - Geeks For Geeks");
        const data = fs.readFileSync("/tmp/example_file.txt", { encoding: 'utf8', flag: 'r' });
        setTimeout(() => {
            res.status(200).json({ URL: URL, API_key: API_key, data: data })
        }, timeout);

    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

const response = async (req, res) => {
    try {
        fs.appendFileSync("/tmp/example_file.txt", " - Geeks For Geeks");
        const data = fs.readFileSync("/tmp/example_file.txt", { encoding: 'utf8', flag: 'r' });
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

module.exports = {
    resend,
    response
}
