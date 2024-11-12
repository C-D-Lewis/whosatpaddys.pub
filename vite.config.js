import { viteStaticCopy } from 'vite-plugin-static-copy';

export default {
  base: 'dist',
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
