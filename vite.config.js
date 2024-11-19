import { viteStaticCopy } from 'vite-plugin-static-copy';

export default {
  base: 'dist',  // For terraform-modules/s3-cloudfront-website serving of dist/index.html
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'assets',
          dest: '.',
        },
      ],
    }),
  ],
};
