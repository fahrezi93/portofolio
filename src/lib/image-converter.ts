/**
 * Image conversion utility for client-side WebP compression
 */

export interface ConversionOptions {
    quality?: number; // 0-1, default 0.8
    maxWidth?: number; // Maximum width in pixels
    maxHeight?: number; // Maximum height in pixels
}

/**
 * Convert an image file to WebP format using Canvas API
 * @param file - The original image file
 * @param options - Conversion options
 * @returns Promise<File> - The converted WebP file
 */
export async function convertToWebP(
    file: File,
    options: ConversionOptions = {}
): Promise<File> {
    const { quality = 0.8, maxWidth = 2048, maxHeight = 2048 } = options;

    // Return as-is if already WebP
    if (file.type === 'image/webp') {
        return file;
    }

    return new Promise((resolve, reject) => {
        const img = new Image();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            reject(new Error('Failed to get canvas context'));
            return;
        }

        img.onload = () => {
            try {
                // Calculate new dimensions while maintaining aspect ratio
                let { width, height } = img;

                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }

                if (height > maxHeight) {
                    width = (width * maxHeight) / height;
                    height = maxHeight;
                }

                // Set canvas dimensions
                canvas.width = Math.round(width);
                canvas.height = Math.round(height);

                // Draw image on canvas
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                // Convert to WebP blob
                canvas.toBlob(
                    (blob) => {
                        if (!blob) {
                            reject(new Error('Failed to convert image'));
                            return;
                        }

                        // Create new File with WebP extension
                        const baseName = file.name.replace(/\.[^.]+$/, '');
                        const webpFile = new File([blob], `${baseName}.webp`, {
                            type: 'image/webp',
                            lastModified: Date.now(),
                        });

                        // Log compression stats
                        const originalSize = (file.size / 1024 / 1024).toFixed(2);
                        const newSize = (blob.size / 1024 / 1024).toFixed(2);
                        const savings = (((file.size - blob.size) / file.size) * 100).toFixed(1);
                        console.log(
                            `📷 Image converted: ${file.name} (${originalSize}MB) → ${webpFile.name} (${newSize}MB) [${savings}% smaller]`
                        );

                        resolve(webpFile);
                    },
                    'image/webp',
                    quality
                );
            } catch (error) {
                reject(error);
            }
        };

        img.onerror = () => {
            reject(new Error('Failed to load image'));
        };

        // Load image from file
        img.src = URL.createObjectURL(file);
    });
}

/**
 * Check if browser supports WebP encoding
 */
export function supportsWebP(): boolean {
    if (typeof document === 'undefined') return false;

    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;

    return canvas.toDataURL('image/webp').startsWith('data:image/webp');
}
