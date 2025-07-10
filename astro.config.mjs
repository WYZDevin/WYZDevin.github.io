// @ts-check
// @ts-ignore
import mdx from '@astrojs/mdx'
// @ts-ignore
import node from '@astrojs/node'
// @ts-ignore
import partytown from '@astrojs/partytown'
// @ts-ignore
import react from '@astrojs/react'
// @ts-ignore
import sitemap from '@astrojs/sitemap'
// @ts-ignore
import tailwind from '@astrojs/tailwind'
// @ts-ignore
import vercel from '@astrojs/vercel'
// @ts-ignore
import { defineConfig, envField } from 'astro/config'
// @ts-ignore
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
// @ts-ignore
import rehypeSlug from 'rehype-slug'

let adapter = vercel()

// @ts-ignore
if (process.argv[3] === '--node' || process.argv[4] === '--node') {
  adapter = node({ mode: 'standalone' })
}

// https://astro.build/config
export default defineConfig({
  adapter,
  output: 'static',
  site: 'https://wyzdevin.github.io',

  markdown: {
    shikiConfig: {
      theme: 'poimandres'
    }
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'load'
  },

  env: {
    schema: {
      // MAPTILER_API_KEY: envField.string({
      //   context: 'server',
      //   access: 'secret'
      // }),
      ACCESS_TOKEN: envField.string({
        context: 'server',
        access: 'secret'
      }),
      // SPOTIFY_CLIENT_ID: envField.string({
      //   context: 'server',
      //   access: 'secret'
      // }),
      // SPOTIFY_CLIENT_SECRET: envField.string({
      //   context: 'server',
      //   access: 'secret'
      // }),
      // SPOTIFY_REFRESH_TOKEN: envField.string({
      //   context: 'server',
      //   access: 'secret'
      // }),
      // MONKEYTYPE_API_KEY: envField.string({
      //   context: 'server',
      //   access: 'secret'
      // }),

      ENV: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
        default: 'development'
      }),
      PROD_URL: envField.string({
        context: 'client',
        access: 'public',
        optional: true
      }),
      DEV_URL: envField.string({
        context: 'client',
        access: 'public',
        optional: true
      })
    }
  },

  vite: {
    ssr: {
      noExternal: ['path-to-regexp', 'react-tweet']
    }
  },

  integrations: [
    mdx({
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'wrap',
            headingProperties: {
              class: 'article-heading'
            }
          }
        ]
      ]
    }),
    // @ts-ignore
    (await import('@playform/compress')).default({
      HTML: {
        'html-minifier-terser': {
          collapseWhitespace: false
        }
      }
    }),
    sitemap(),
    react(),
    tailwind({
      applyBaseStyles: false
    }),
    partytown()
  ]
})
