/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...index]]\page.tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { simplerColorInput } from 'sanity-plugin-simpler-color-input'
// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works

import { schemaMarkup } from '@operationnation/sanity-plugin-schema-markup';
import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schema'

import { presentationTool } from 'sanity/presentation'
import { VisualEditing } from 'next-sanity'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool(),
    simplerColorInput({
      // Note: These are all optional
      defaultColorFormat: 'rgba',
      defaultColorList: [
        { label: 'Light', value: '#ffffff' },
        { label: 'Dark', value: '#2E3B4D' },
        { label: 'Brand', value: '#EFF178' },
        { label: 'Accent', value: '#62CCB4' },
        { label: 'Custom...', value: 'custom' },
      ],
      enableSearch: true,
    }),
    schemaMarkup(),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),

    VisualEditing,
    presentationTool({
      previewUrl: {
        draftMode: {
          enable: '/api/draft',
        },
      },
    }),
  ],
})
