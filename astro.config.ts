import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import AstroPureIntegration from 'astro-pure'
import { defineConfig, fontProviders } from 'astro/config'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import { fileURLToPath } from 'url'

// Local integrations
import rehypeAutolinkHeadings from './src/plugins/rehype-auto-link-headings.ts'
// Shiki
import {
  addCollapse,
  addCopyButton,
  addLanguage,
  addTitle,
  updateStyle
} from './src/plugins/shiki-custom-transformers.ts'
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerRemoveNotationEscape
} from './src/plugins/shiki-official/transformers.ts'
import config from './src/site.config.ts'

// https://astro.build/config
export default defineConfig({
  // [Basic]
  site: 'https://explorxin.github.io',
  base: '/',
  // Deploy to a sub path
  // https://astro-pure.js.org/docs/setup/deployment#platform-with-base-path
  trailingSlash: 'never',
  // root: './my-project-directory',
  server: { host: true },
  devToolbar: { enabled: false },
  // https://docs.astro.build/en/guides/prefetch/
  prefetch: {
    // prefetchAll: true,
    defaultStrategy: 'viewport'
  },

  // [Adapter]
  // Static output for GitHub Pages
  output: 'static',

  // [Assets]
  image: {
    responsiveStyles: true,
    service: { entrypoint: 'astro/assets/services/sharp' },
    // domains: ['ghchart.rshah.org'],
    remotePatterns: [{ protocol: 'https' }]
  },
  // Enable font preloading and optimization
  // https://docs.astro.build/en/guides/fonts/
  fonts: [
    {
      provider: fontProviders.fontshare(),
      name: 'Satoshi',
      cssVariable: '--font-satoshi',
      // Default included:
      // weights: [400],
      // styles: ["normal", "italics"],
      // subsets: ["cyrillic-ext", "cyrillic", "greek-ext", "greek", "vietnamese", "latin-ext", "latin"],
      // fallbacks: ["sans-serif"],
      styles: ['normal', 'italic'],
      weights: [400, 500],
      subsets: ['latin']
    }
  ],

  // [Markdown]
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      [rehypeKatex, {}],
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: { className: ['anchor'] },
          content: { type: 'text', value: '#' }
        }
      ]
    ],
    // https://docs.astro.build/en/guides/syntax-highlighting/
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark'
      },
      transformers: [
        // Two copies of @shikijs/types (one under node_modules
        // and another nested under @astrojs/markdown-remark → shiki).
        // Official transformers
        // @ts-ignore this happens due to multiple versions of shiki types
        transformerNotationDiff(),
        // @ts-ignore this happens due to multiple versions of shiki types
        transformerNotationHighlight(),
        // @ts-ignore this happens due to multiple versions of shiki types
        transformerRemoveNotationEscape(),
        // Custom transformers
        // @ts-ignore this happens due to multiple versions of shiki types
        updateStyle(),
        // @ts-ignore this happens due to multiple versions of shiki types
        addTitle(),
        // @ts-ignore this happens due to multiple versions of shiki types
        addLanguage(),
        // @ts-ignore this happens due to multiple versions of shiki types
        addCopyButton(2000), // timeout in ms
        // @ts-ignore this happens due to multiple versions of shiki types
        addCollapse(15) // max lines that needs to collapse
      ]
    }
  },

  // [Integrations]
  integrations: [
    // astro-pure will automatically add sitemap, mdx & unocss
    // sitemap(),
    // mdx(),
    AstroPureIntegration(config)
  ],

  // [Vite]
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@/assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        '@/components': fileURLToPath(new URL('./src/components', import.meta.url)),
        '@/layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
        '@/utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
        '@/plugins': fileURLToPath(new URL('./src/plugins', import.meta.url)),
        '@/pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
        '@/types': fileURLToPath(new URL('./src/types', import.meta.url)),
        '@/site-config': fileURLToPath(new URL('./src/site.config.ts', import.meta.url))
      }
    }
  },

  // [Experimental]
})
