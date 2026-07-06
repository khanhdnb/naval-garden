// Bottom nav routing: Home = link, Search = trigger Quartz search overlay,
// Graph = trigger Quartz global-graph overlay, Menu = toggle the Menu sheet.
document.addEventListener("nav", () => {
  const nav = document.querySelector<HTMLElement>(".mobile-nav")
  if (!nav) return

  const searchBtn = nav.querySelector<HTMLElement>('[data-tab="search"]')
  const graphBtn = nav.querySelector<HTMLElement>('[data-tab="graph"]')
  const menuBtn = nav.querySelector<HTMLElement>('[data-tab="menu"]')
  const homeBtn = nav.querySelector<HTMLElement>('[data-tab="home"]')

  // Read view (any note page) highlights Home. The home page (has no article
  // <article>) still highlights Home too — that's the design intent.
  homeBtn?.classList.add("active")

  const openSearch = () => {
    const btn = document.querySelector<HTMLElement>(".search .search-button")
    btn?.click()
  }
  const openGraph = () => {
    const icon = document.querySelector<HTMLElement>(".global-graph-icon")
    icon?.click()
  }
  const toggleMenu = () => {
    document.dispatchEvent(new CustomEvent("mobile-sheet-toggle", { detail: { sheet: "menu" } }))
  }

  searchBtn?.addEventListener("click", openSearch)
  graphBtn?.addEventListener("click", openGraph)
  menuBtn?.addEventListener("click", toggleMenu)

  // Reflect menu-sheet open state on the Menu tab.
  const onSheet = (e: Event) => {
    const detail = (e as CustomEvent).detail
    menuBtn?.classList.toggle("active", detail?.sheet === "menu" && detail?.open)
  }
  document.addEventListener("mobile-sheet-state", onSheet)

  window.addCleanup(() => {
    searchBtn?.removeEventListener("click", openSearch)
    graphBtn?.removeEventListener("click", openGraph)
    menuBtn?.removeEventListener("click", toggleMenu)
    document.removeEventListener("mobile-sheet-state", onSheet)
  })
})
