const fs = require('fs');
const { GoogleAIFileManager } = require("@google/generative-ai/server");

const resendFetch = async (req, res) => {
    const { url, API_key, file_name } = req.body

    if (typeof url != "string") {
        res.status(400).json({ error: `Wrong url:${url}` });
    };

    if (typeof API_key != "string") {
        res.status(400).json({ error: `Wrong API_key:${API_key}` });
    };

    if (typeof file_name != "string") {
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
    if (extention === "AVI") {
        extention = "avi"
        fileType = "application";
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

        const fileManager = new GoogleAIFileManager(API_key);

        const uploadResponse = await fileManager.uploadFile(`/tmp/${file_name}.${extention}`, {
            mimeType: `${fileType}/${extention}`,
            displayName: `${file_name}.${extention}`,
        });
        res.status(200).json({ uploaded_file: JSON.stringify(uploadResponse.file) })


    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

const requestTester = async (req, res) => {






    res.status(200).json({
        "key": req.get("x-freepik-api-key"),
        "Content-Type": req.get("Content-Type"),
        "body":req.body
    })


}

module.exports = { resendFetch, requestTester }
