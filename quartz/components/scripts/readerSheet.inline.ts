// Restore persisted font scale as early as possible (runs once at load too).
const FS_KEY = "mobile-fontScale"
const applyFontScale = (v: number) => {
  document.documentElement.style.setProperty("--fs", String(v))
}
{
  const saved = parseFloat(localStorage.getItem(FS_KEY) ?? "1")
  if (!Number.isNaN(saved)) applyFontScale(saved)
}

document.addEventListener("nav", () => {
  const menu = document.querySelector<HTMLElement>(".mobile-menu")
  if (!menu) return
  const sheet = menu.querySelector<HTMLElement>(".mobile-menu-sheet")
  if (!sheet) return

  let backdrop = document.querySelector<HTMLElement>(".mobile-backdrop")

  const themeLabel = sheet.querySelector<HTMLElement>('[data-action="theme"] .mobile-menu-label')
  const fontVal = sheet.querySelector<HTMLElement>(".mobile-fontval")

  const syncThemeLabel = () => {
    const dark = document.documentElement.getAttribute("saved-theme") === "dark"
    if (themeLabel) themeLabel.textContent = dark ? "Chế độ sáng" : "Chế độ tối"
  }
  const syncFontVal = () => {
    const v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--fs")) || 1
    if (fontVal) fontVal.textContent = `${Math.round(v * 100)}%`
  }
  syncThemeLabel()
  syncFontVal()

  const setSheetState = (open: boolean) =>
    document.dispatchEvent(
      new CustomEvent("mobile-sheet-state", { detail: { sheet: "menu", open } }),
    )

  const open = () => {
    if (!backdrop) backdrop = document.querySelector<HTMLElement>(".mobile-backdrop")
    document.dispatchEvent(new CustomEvent("mobile-sheet-close", { detail: { except: "menu" } }))
    sheet.hidden = false
    if (backdrop) backdrop.hidden = false
    void sheet.offsetHeight
    sheet.classList.add("open")
    backdrop?.classList.add("open")
    setSheetState(true)
  }
  const close = () => {
    sheet.classList.remove("open")
    backdrop?.classList.remove("open")
    sheet.hidden = true
    if (backdrop) backdrop.hidden = true
    setSheetState(false)
  }
  const toggle = () => (sheet.hidden ? open() : close())

  // Open/close from the bottom nav Menu tab.
  const onToggle = (e: Event) => {
    if ((e as CustomEvent).detail?.sheet === "menu") toggle()
  }
  const onCloseRequest = (e: Event) => {
    if ((e as CustomEvent).detail?.except !== "menu") close()
  }
  document.addEventListener("mobile-sheet-toggle", onToggle)
  document.addEventListener("mobile-sheet-close", onCloseRequest)

  // Backdrop tap closes (backdrop belongs to whichever sheet opened it).
  const onBackdrop = () => close()
  backdrop?.addEventListener("click", onBackdrop)

  // Row actions
  const onClick = (e: Event) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>("[data-action]")
    if (!el) return
    const action = el.dataset.action
    if (action === "theme") {
      document.querySelector<HTMLElement>(".darkmode")?.click()
      setTimeout(syncThemeLabel, 0)
    } else if (action === "font-inc" || action === "font-dec") {
      let v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--fs")) || 1
      v += action === "font-inc" ? 0.05 : -0.05
      v = Math.min(1.25, Math.max(0.9, Math.round(v * 100) / 100))
      applyFontScale(v)
      localStorage.setItem(FS_KEY, String(v))
      syncFontVal()
    } else if (action === "graph") {
      close()
      document.querySelector<HTMLElement>(".global-graph-icon")?.click()
    }
    // "about" is a normal link.
  }
  sheet.addEventListener("click", onClick)
  document.addEventListener("themechange", syncThemeLabel)

  window.addCleanup(() => {
    document.removeEventListener("mobile-sheet-toggle", onToggle)
    document.removeEventListener("mobile-sheet-close", onCloseRequest)
    document.removeEventListener("themechange", syncThemeLabel)
    backdrop?.removeEventListener("click", onBackdrop)
    sheet.removeEventListener("click", onClick)
    close()
  })
})
