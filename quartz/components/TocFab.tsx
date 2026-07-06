// @ts-ignore
import script from "./scripts/tocFab.inline"
import { QuartzComponent, QuartzComponentConstructor } from "./types"

// FAB + Table-of-Contents bottom sheet (mobile only). Headings are read from
// the rendered article at runtime, so it works on any note page.
const TocFab: QuartzComponent = () => {
  return (
    <div class="mobile-toc">
      <button class="mobile-fab" type="button" aria-label="Mục lục">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
          <path d="M8 6h12M8 12h12M8 18h12" />
          <circle cx="4" cy="6" r="1" fill="currentColor" stroke="none" />
          <circle cx="4" cy="12" r="1" fill="currentColor" stroke="none" />
          <circle cx="4" cy="18" r="1" fill="currentColor" stroke="none" />
        </svg>
      </button>
      <div class="mobile-sheet mobile-toc-sheet" role="dialog" aria-label="Nội dung" hidden>
        <div class="mobile-sheet-handle"></div>
        <h2 class="mobile-sheet-title">Nội dung</h2>
        <div class="mobile-toc-list"></div>
      </div>
    </div>
  )
}

TocFab.afterDOMLoaded = script

export default (() => TocFab) satisfies QuartzComponentConstructor
