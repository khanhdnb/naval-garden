// 2px reading-progress bar under the mobile header. Read view (article pages) only.
document.addEventListener("nav", () => {
  const fill = document.querySelector<HTMLElement>(".mobile-reading-progress-fill")
  if (!fill) return

  const update = () => {
    const doc = document.documentElement
    const scrollTop = window.scrollY || doc.scrollTop
    const max = doc.scrollHeight - doc.clientHeight
    const pct = max > 0 ? Math.min(1, Math.max(0, scrollTop / max)) : 0
    fill.style.width = `${pct * 100}%`
  }

  update()
  window.addEventListener("scroll", update, { passive: true })
  window.addEventListener("resize", update, { passive: true })
  window.addCleanup(() => {
    window.removeEventListener("scroll", update)
    window.removeEventListener("resize", update)
  })
})
