import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Vườn học · Thịnh Vượng & Hạnh Phúc",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "vi-VN",
    baseUrl: "naval-garden.pages.dev",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Lora",
        body: "Be Vietnam Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#F5F1E8", // --bg
          lightgray: "#EBE5D7", // --line
          gray: "#6B6456", // --ink-soft
          darkgray: "#232019", // --ink (body text)
          dark: "#232019", // --ink
          secondary: "#3F8F5B", // --accent
          tertiary: "#347A4C", // accent darkened (hover)
          highlight: "rgba(63,143,91,0.10)", // --accent-tint
          textHighlight: "#f5e56b88",
        },
        darkMode: {
          light: "#141310", // --bg
          lightgray: "#2B2921", // --line
          gray: "#A49D8C", // --ink-soft
          darkgray: "#ECE6D6", // --ink
          dark: "#ECE6D6", // --ink
          secondary: "#5FB07A", // --accent (brighter on dark)
          tertiary: "#3F8F5B",
          highlight: "rgba(63,143,91,0.16)", // --accent-tint dark
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
