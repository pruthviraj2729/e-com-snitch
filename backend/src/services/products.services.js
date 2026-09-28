import ImageKit, { toFile } from '@imagekit/nodejs'
import config from '../config/config.js'

const client = new ImageKit({
    privateKey: config.PRIVATE_KEY
})

export const sendFiles = async ({buffer, fileName}) => {
    const response= await client.files.upload({
        file: await toFile(buffer),
        fileName: fileName,
        folder: "snitch"
    })

    return response
}