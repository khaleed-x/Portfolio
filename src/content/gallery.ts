export type GalleryGroup = 'work' | 'life'

export interface GalleryItem {
  /** File inside /public/gallery, e.g. "/gallery/nacos-award.jpg" */
  src: string
  alt: string
  caption: string
  group: GalleryGroup
}

/**
 * Add your photos here. The gallery section stays hidden while this list is empty.
 * Prepare images first (strip hidden location data, resize): see docs/gallery.md
 *
 * Example:
 * { src: '/gallery/nacos-award.jpg', alt: 'Receiving the NACOS certificate', caption: 'NACOS TPi Chapter, 2025', group: 'work' },
 */
export const gallery: GalleryItem[] = []
