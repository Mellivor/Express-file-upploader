const fs = require('fs');
const { GoogleAIFileManager } = require ("@google/generative-ai");

const resend = async (req, res) => {
    const { url, API_key, file_name } = req.body

    if (typeof url !="string") {
        res.status(400).json({ error: `Wrong url:${url}` });
    };

    if (typeof API_key !="string") {
        res.status(400).json({ error: `Wrong API_key:${API_key}` });
    };

    if (typeof file_name !="string") {
        res.status(400).json({ error: `Wrong file name:${file_name}` });
    };

    const tempArr = url.split(".");
    let extention = tempArr[tempArr.length - 1];
    const imageAccept = ["png", "jpeg", "webp", "heic", "heif"];
    const audioAccept = ["wav", "mp3", "aiff", "aac", "ogg", "flac"];
    const videoAccept = ["mp4", "mpeg", "mov", "avi", "x-flv", "mpg", "webm", "wmv", "3gpp"];

    let fileType;
    if (extention === "jpg") {
        extention = "jpeg";
    };
    if (imageAccept.includes(extention)) {
        fileType = "image";
    };
    if (extention === "pdf") {
        fileType = "application";
    };
    if (audioAccept.includes(extention)) {
        fileType = "audio";
    };

    if (videoAccept.includes(extention)) {
        fileType = "video";
    };

    if (!fileType) {
        res.status(400).json({ error: `"${extention.toUpperCase()}" extention not suported` });
    };

    try {
        const response = await fetch(`https:${url}`);

        if (!response.ok) {
           const error = response.json();
           throw new Error(error);
        };

        const bufferArr = await response.arrayBuffer();
        const file = Buffer.from(bufferArr);

        fs.appendFileSync(`/tmp/${file_name}.${extention}`, file);
        // const data = fs.readFileSync(`/tmp/${file_name}.${extention}`, { encoding: 'utf8', flag: 'r' });

        const uploadResponse = await fileManager.uploadFile(`/tmp/${file_name}.${extention}`, {
            mimeType: `${fileType}/`,
            displayName: `${file_name}.${extention}`,
        });
        res.status(200).json({ url: url, API_key: API_key, data: uploadResponse })


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
