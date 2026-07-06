// @ts-ignore
import script from "./scripts/readingProgress.inline"
import { QuartzComponent, QuartzComponentConstructor } from "./types"

const ReadingProgress: QuartzComponent = () => {
  return (
    <div class="mobile-reading-progress" aria-hidden="true">
      <div class="mobile-reading-progress-fill"></div>
    </div>
  )
}

ReadingProgress.afterDOMLoaded = script

export default (() => ReadingProgress) satisfies QuartzComponentConstructor
