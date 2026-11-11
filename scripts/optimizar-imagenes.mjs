import sharp from 'sharp'
import { readdir, mkdir } from 'node:fs/promises'
import path from 'node:path'

const originalsFolder = 'originales/gallery'   // fotos pesadas
const outputFolder = 'public/images/gallery'   // fotos optimizadas
const maximumSideInPixels = 1600               // lado más largo permitido

await mkdir(outputFolder, { recursive: true })
const fileNames = await readdir(originalsFolder)

for (const fileName of fileNames) {
  const fileNameWithoutExtension = path.parse(fileName).name

  await sharp(path.join(originalsFolder, fileName))
    .rotate() // respeta la orientación con la que se tomó la foto
    .resize({ width: maximumSideInPixels, height: maximumSideInPixels, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(path.join(outputFolder, `${fileNameWithoutExtension}.webp`))

  console.log(`Listo: ${fileNameWithoutExtension}.webp`)
}