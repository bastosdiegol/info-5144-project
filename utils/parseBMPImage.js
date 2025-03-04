import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";
import { PIXEL_SIZE } from "./constants";

/**
 * Load BMP file and extract pixel data using expo-file-system.
 * @param {string} filePath - Path to the BMP file.
 * @returns {Promise<Array>} - Array of black pixel coordinates.
 */
const parseBMPImage = async (filePath) => {
  try {
    const data = await FileSystem.readAsStringAsync(filePath, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Convert base64 to ArrayBuffer
    const buffer = decode(data);

    // BMP Header Information
    const view = new DataView(buffer);
    const width = view.getUint32(18, true);
    const height = view.getUint32(22, true);
    const pixelDataOffset = view.getUint32(10, true);

    const pixels = [];
    const bytesPerPixel = 3;
    const rowSize = Math.ceil((width * bytesPerPixel) / 4) * 4;

    // Iterate through each pixel
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const pixelIndex =
          pixelDataOffset + (height - 1 - y) * rowSize + x * bytesPerPixel;
        const b = view.getUint8(pixelIndex);
        const g = view.getUint8(pixelIndex + 1);
        const r = view.getUint8(pixelIndex + 2);

        // Push non-white pixels to the array
        if (r !== 255 || g !== 255 || b !== 255) {
          pixels.push({
            x: x * PIXEL_SIZE,
            y: y * PIXEL_SIZE,
            color: `rgb(${r}, ${g}, ${b})`,
          });
        }
      }
    }

    return pixels;
  } catch (error) {
    console.error("Error loading BMP image:", error);
    return [];
  }
};

export default parseBMPImage;
