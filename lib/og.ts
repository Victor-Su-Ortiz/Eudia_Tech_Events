export function getOGImageUrl(slug: string): string {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/api/og?slug=${encodeURIComponent(slug)}`
  }
  return `/api/og?slug=${encodeURIComponent(slug)}`
}
