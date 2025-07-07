#!/usr/bin/env node

import fs from "fs/promises"
import path from "path"
import { TokenTransformer } from "../lib/figma-integration"
import { alignUTokens } from "../lib/alignu-integration-analysis"

interface TokenExtractionConfig {
  figmaFileId?: string
  figmaAccessToken?: string
  outputDir: string
  formats: ("css" | "tailwind" | "json")[]
}

class AlignUTokenExtractor {
  private config: TokenExtractionConfig

  constructor(config: TokenExtractionConfig) {
    this.config = config
  }

  async extractTokens(): Promise<void> {
    console.log("🚀 Starting AlignU! token extraction...")

    try {
      // Create output directory
      await fs.mkdir(this.config.outputDir, { recursive: true })

      // Extract tokens (using mock data for now)
      const tokens = alignUTokens

      // Transform tokens for AlignSynch compatibility
      const transformedTokens = tokens.map((token) => TokenTransformer.alignUToAlignSynch(token))

      // Generate output files in requested formats
      for (const format of this.config.formats) {
        await this.generateOutput(transformedTokens, format)
      }

      console.log("✅ Token extraction completed successfully!")
      console.log(`📁 Output files generated in: ${this.config.outputDir}`)
    } catch (error) {
      console.error("❌ Token extraction failed:", error)
      process.exit(1)
    }
  }

  private async generateOutput(tokens: any[], format: string): Promise<void> {
    const outputPath = path.join(this.config.outputDir, `alignu-tokens.${format}`)

    switch (format) {
      case "css":
        const cssContent = TokenTransformer.generateCSSCustomProperties(tokens)
        await fs.writeFile(outputPath, cssContent)
        break

      case "tailwind":
        const tailwindConfig = TokenTransformer.generateTailwindConfig(tokens)
        const tailwindContent = `module.exports = ${JSON.stringify(tailwindConfig, null, 2)}`
        await fs.writeFile(outputPath.replace(".tailwind", ".js"), tailwindContent)
        break

      case "json":
        await fs.writeFile(outputPath, JSON.stringify(tokens, null, 2))
        break
    }

    console.log(`📄 Generated ${format.toUpperCase()} tokens: ${outputPath}`)
  }
}

// CLI execution
async function main() {
  const config: TokenExtractionConfig = {
    figmaFileId: process.env.FIGMA_FILE_ID,
    figmaAccessToken: process.env.FIGMA_ACCESS_TOKEN,
    outputDir: "./generated/tokens",
    formats: ["css", "tailwind", "json"],
  }

  const extractor = new AlignUTokenExtractor(config)
  await extractor.extractTokens()
}

if (require.main === module) {
  main().catch(console.error)
}

export { AlignUTokenExtractor }
