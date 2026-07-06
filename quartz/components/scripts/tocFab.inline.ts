// FAB + ToC bottom sheet. Owns the shared backdrop used by every mobile sheet.
document.addEventListener("nav", () => {
  const toc = document.querySelector<HTMLElement>(".mobile-toc")
  if (!toc) return

  const fab = toc.querySelector<HTMLElement>(".mobile-fab")
  const sheet = toc.querySelector<HTMLElement>(".mobile-toc-sheet")
  const list = toc.querySelector<HTMLElement>(".mobile-toc-list")
  if (!fab || !sheet || !list) return

  // Shared backdrop (create once, reused by menu sheet too).
  let backdrop = document.querySelector<HTMLElement>(".mobile-backdrop")
  if (!backdrop) {
    backdrop = document.createElement("div")
    backdrop.className = "mobile-backdrop"
    backdrop.hidden = true
    document.body.appendChild(backdrop)
  }

  // Build ToC from the rendered article headings.
  const article = document.querySelector("article")
  const headings = article
    ? Array.from(article.querySelectorAll<HTMLElement>("h1[id], h2[id], h3[id]"))
    : []

  list.innerHTML = ""
  if (headings.length === 0) {
    // No headings -> hide the FAB entirely on this page.
    fab.style.display = "none"
  } else {
    fab.style.display = ""
    for (const h of headings) {
      const row = document.createElement("button")
      row.type = "button"
      row.className = "mobile-toc-row" + (h.tagName === "H3" ? " depth" : "")
      row.innerHTML = `<span class="mobile-toc-dot"></span><span>${h.textContent ?? ""}</span>`
      row.addEventListener("click", () => {
        const top = h.getBoundingClientRect().top + window.scrollY - 64
        window.scrollTo({ top, behavior: "smooth" })
        closeSheet()
      })
      list.appendChild(row)
    }
  }

  const setSheetState = (open: boolean) => {
    document.dispatchEvent(
      new CustomEvent("mobile-sheet-state", { detail: { sheet: "toc", open } }),
    )
  }

  const openSheet = () => {
    // Close any other sheet first.
    document.dispatchEvent(new CustomEvent("mobile-sheet-close", { detail: { except: "toc" } }))
    sheet.hidden = false
    backdrop!.hidden = false
    // force reflow so the slide-up animation runs
    void sheet.offsetHeight
    sheet.classList.add("open")
    backdrop!.classList.add("open")
    setSheetState(true)
  }
  const closeSheet = () => {
    sheet.classList.remove("open")
    backdrop!.classList.remove("open")
    sheet.hidden = true
    backdrop!.hidden = true
    setSheetState(false)
  }

  fab.addEventListener("click", openSheet)
  backdrop.addEventListener("click", closeSheet)

  const onCloseRequest = (e: Event) => {
    const except = (e as CustomEvent).detail?.except
    if (except !== "toc") closeSheet()
  }
  document.addEventListener("mobile-sheet-close", onCloseRequest)

  window.addCleanup(() => {
    fab.removeEventListener("click", openSheet)
    backdrop?.removeEventListener("click", closeSheet)
    document.removeEventListener("mobile-sheet-close", onCloseRequest)
    closeSheet()
  })
})
