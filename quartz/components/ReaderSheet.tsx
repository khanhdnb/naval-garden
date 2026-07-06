// @ts-ignore
import script from "./scripts/readerSheet.inline"
import { QuartzComponent, QuartzComponentConstructor } from "./types"

// Menu bottom sheet: theme toggle, font-size stepper, graph shortcut, about.
const ReaderSheet: QuartzComponent = () => {
  return (
    <div class="mobile-menu">
      <div class="mobile-sheet mobile-menu-sheet" role="dialog" aria-label="Menu" hidden>
        <div class="mobile-sheet-handle"></div>
        <h2 class="mobile-sheet-title">Menu</h2>

        <button class="mobile-menu-row" data-action="theme" type="button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.5 14.2A8.2 8.2 0 1 1 9.8 3.5a6.5 6.5 0 0 0 10.7 10.7z" />
          </svg>
          <span class="mobile-menu-label">Chế độ tối</span>
        </button>

        <div class="mobile-menu-row mobile-fontrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 20 9 6l5 14M6 15h6" />
            <path d="M16 20l2.5-8 2.5 8M17 17h3" />
          </svg>
          <span class="mobile-menu-label">Cỡ chữ</span>
          <div class="mobile-fontstep">
            <button data-action="font-dec" type="button" aria-label="Nhỏ hơn">A−</button>
            <span class="mobile-fontval">100%</span>
            <button data-action="font-inc" type="button" aria-label="Lớn hơn">A+</button>
          </div>
        </div>

        <button class="mobile-menu-row" data-action="graph" type="button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="6" cy="7" r="2.2" />
            <circle cx="18" cy="6" r="2.2" />
            <circle cx="13" cy="18" r="2.2" />
            <path d="M7.9 8.4 11.2 16M8.2 7.2l7.4-.9M16.6 8 13.7 15.7" />
          </svg>
          <span class="mobile-menu-label">Đồ thị tri thức</span>
        </button>

        <a class="mobile-menu-row" data-action="about" href="https://github.com/khanhdnb/naval-garden" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8h.01M11 12h1v4h1" />
          </svg>
          <span class="mobile-menu-label">Giới thiệu vườn</span>
        </a>
      </div>
    </div>
  )
}

ReaderSheet.afterDOMLoaded = script

export default (() => ReaderSheet) satisfies QuartzComponentConstructor
