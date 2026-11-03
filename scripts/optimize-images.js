import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const imageDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '../src/assets/images');

await Promise.all([
  sharp(resolve(imageDirectory, 'profile.jpeg'))
    .rotate()
    .resize({ width: 500, withoutEnlargement: true })
    .webp({ quality: 90, effort: 6 })
    .toFile(resolve(imageDirectory, 'profile.webp')),
  sharp(resolve(imageDirectory, 'logo.png'))
    .resize({ width: 580, withoutEnlargement: true })
    .webp({ quality: 92, effort: 6 })
    .toFile(resolve(imageDirectory, 'logo.webp')),
  sharp(resolve(imageDirectory, 'logo-dark-source.png'))
    .resize({ width: 965, withoutEnlargement: true })
    .png({ compressionLevel: 9, effort: 10 })
    .toFile(resolve(imageDirectory, 'logo-dark.png')),
  sharp(resolve(imageDirectory, 'logo-dark-source.png'))
    .resize({ width: 580, withoutEnlargement: true })
    .webp({ quality: 92, effort: 6 })
    .toFile(resolve(imageDirectory, 'logo-dark.webp'))
]);
