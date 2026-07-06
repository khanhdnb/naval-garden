// @ts-ignore
import script from "./scripts/mobileNav.inline"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative } from "../util/path"

const MobileNav: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const slug = fileData.slug!
  const homeHref = resolveRelative(slug, "/" as any)
  return (
    <nav class="mobile-nav" aria-label="Điều hướng">
      <a class="mobile-nav-item" data-tab="home" href={homeHref}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9.5V21h14V9.5" />
        </svg>
        <span>Trang chủ</span>
      </a>
      <button class="mobile-nav-item" data-tab="search" type="button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <span>Tìm</span>
      </button>
      <button class="mobile-nav-item" data-tab="graph" type="button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="6" cy="7" r="2.4" />
          <circle cx="18" cy="6" r="2.4" />
          <circle cx="13" cy="18" r="2.4" />
          <path d="M7.9 8.4 11.2 16M8.2 7.2l7.4-.9M16.6 8 13.7 15.7" />
        </svg>
        <span>Đồ thị</span>
      </button>
      <button class="mobile-nav-item" data-tab="menu" type="button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <rect x="4" y="4" width="7" height="7" rx="2" />
          <rect x="13" y="4" width="7" height="7" rx="2" />
          <rect x="4" y="13" width="7" height="7" rx="2" />
          <rect x="13" y="13" width="7" height="7" rx="2" />
        </svg>
        <span>Menu</span>
      </button>
    </nav>
  )
}

MobileNav.afterDOMLoaded = script

export default (() => MobileNav) satisfies QuartzComponentConstructor
