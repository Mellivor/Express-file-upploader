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
    const fileAccept = ["pdf", "png", "jpeg", "jpg", "webp", "heic", "heif", "wav", "mp3", "aiff", "aac", "ogg", "flac", "mp4", "mpeg", "mov", "avi", "AVI", "x-flv", "mpg", "webm", "wmv", "3gpp"];

    if (!fileAccept.includes(extention)) {
        res.status(400).json({ error: `"${extention.toUpperCase()}" extention not suported` });
    };

    try {
        const response = await fetch(`https:${url}`);

        if (!response.ok) {
            const error = response.json();
            throw new Error(error);
        };

        const blob = await response.blob();
        const file = new File([blob], `${file_name}.${extention}`, { type: blob.type });

        const formData = new FormData();
        formData.append("file", file);

        const googleResponse = await fetch(`https://generativelanguage.googleapis.com/upload/v1beta/files?key=${API_key}`, {
            body: formData,
            method: "post"
        });

        if (!googleResponse.ok) {
            const error = googleResponse.json();
            throw new Error(error);
        };

        const final = await googleResponse.json()

        res.status(200).json({ uploaded_file: JSON.stringify(final.file) })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

module.exports = resendFetch
