import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

const outputFolder = 'public/images'   // aquí quedan las versiones optimizadas
await mkdir(outputFolder, { recursive: true })

// Logo: ancho de 400 px, suficiente para mostrarlo a unos 40 px de alto
await sharp('originales/logo.jpg')
  .rotate() // respeta la orientación original
  .resize({ width: 400, withoutEnlargement: true })
  .webp({ quality: 80 })
  .toFile(`${outputFolder}/logo.webp`)
console.log('Listo: logo.webp')

// Foto del Hero: ancho máximo de 1600 px
await sharp('originales/hero-roofing.jpeg')
  .rotate()
  .resize({ width: 1600, withoutEnlargement: true })
  .webp({ quality: 75 })
  .toFile(`${outputFolder}/hero-roofing.webp`)
console.log('Listo: hero-roofing.webp')