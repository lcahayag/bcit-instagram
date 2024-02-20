const path = require("path");
/*
 * Project: Milestone 1
 * File Name: main.js
 * Description:
 *
 * Created Date:
 * Author:
 *
 */

const IOhandler = require("./IOhandler");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");

async function main() {
    await IOhandler.unzip(zipFilePath, pathUnzipped);
    const imgs = await IOhandler.readDir(pathUnzipped);
    for (const img of imgs) {
        const pathOut = path.join(pathProcessed, path.basename(img));
        await IOhandler.grayScale(img, pathOut);
    }
    console.log("All images processed.");
}

main().catch(console.error);
