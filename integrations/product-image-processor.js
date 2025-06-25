// Path: /integrations/product-image-processor.js

import { processProductImages } from '../src/scripts/product-image-processor.mjs';

export default function productImageProcessor() {
  return {
    name: 'astro-product-image-processor',
    hooks: {
      'astro:config:setup': async ({ logger }) => {
        const imageLogger = logger.fork('[Product Image Processor]');
        
        try {
          // This hook runs once for both `astro dev` and `astro build`.
          // It's ideal for one-time setup tasks like processing images.
          await processProductImages(imageLogger);
        } catch (error) {
          // The error is already logged in detail by the script.
          // We throw a new, simpler error here to ensure the Astro process
          // (especially `astro build`) fails as expected without a messy stack trace.
          throw new Error("Product image processing failed. See logs above for details.");
        }
      },
    },
  };
}