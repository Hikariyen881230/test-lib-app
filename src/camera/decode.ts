import QRCode from "jsqr";

export const decodeQRcodeFromIamgeData = (file) => {
    const { weight, height, data } = file
    const code = QRCode(data, weight, height)
    return code ? code : null
}

export const extractQRCodeFromPNG = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (event) => {
            const img = new Image()
            img.src = event.target.result as string
            img.onload = () => {
                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d')
                canvas.width = img.width
                canvas.height = img.height
                ctx.drawImage(img, 0, 0, img.width, img.height)
                const imageData = ctx.getImageData(0, 0, img.width, img.height)
                const qrCode = QRCode(imageData.data, img.width, img.height)
                console.log({ qrCode });
                let data = qrCode ? qrCode.data : null
                resolve(data)

            }
        }
    })
}

export const readerQRCode = (file, type) => {
    return new Promise((resolve, reject) => {
        if (type === 'image/png' || type === 'image/jpg' || type === 'image/jpeg') {
            extractQRCodeFromPNG(file).then(res => {
                resolve(res)
                console.log(res);

            })
        }


    })
}