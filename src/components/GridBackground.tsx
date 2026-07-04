/**
 * Fixed, subtly animated grid backdrop for the whole site — replaces the flat
 * near-black. Sits behind all content; the full-screen hero video covers it on
 * the home page. Purely decorative, so hidden from assistive tech.
 */
export function GridBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-ink">
      <div className="grid-glow absolute inset-0" />
      <div className="animated-grid absolute inset-0" />
    </div>
  )
}
