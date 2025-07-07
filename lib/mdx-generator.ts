import type { ComponentDoc } from "./component-docs"

export function generateMDXContent(doc: ComponentDoc): string {
  return `---
title: ${doc.name}
description: ${doc.description}
category: ${doc.category}
---

import { ${doc.name} } from '@/components/ui/${doc.name.toLowerCase()}'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'

# ${doc.name}

${doc.description}

## Installation

\`\`\`bash
npm install ${doc.dependencies.join(" ")}
\`\`\`

## Usage

<ComponentPreview>
  <${doc.name}>Click me</${doc.name}>
</ComponentPreview>

<CodeBlock>
\`\`\`tsx
import { ${doc.name} } from '@/components/ui/${doc.name.toLowerCase()}'

export default function Example() {
  return <${doc.name}>Click me</${doc.name}>
}
\`\`\`
</CodeBlock>

## Props

<PropsTable props={${JSON.stringify(doc.props, null, 2)}} />

## Examples

${doc.examples
  .map(
    (example) => `
### ${example.name}

${example.description}

<ComponentPreview>
  ${example.preview}
</ComponentPreview>

<CodeBlock>
\`\`\`tsx
${example.code}
\`\`\`
</CodeBlock>
`,
  )
  .join("\n")}

## Design Tokens

This component uses the following design tokens:

${doc.designTokens.map((token) => `- \`${token}\``).join("\n")}
`
}
