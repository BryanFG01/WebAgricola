export interface GalleryItem {
  id: string
  src: string
  alt: string
}

export const galleryItems: GalleryItem[] = [
  {
    id: 'huevos',
    src: '/image.png_20260915165544.jpeg',
    alt: 'Huevos campesinos de alta calidad, del campo a tu mesa',
  },
  {
    id: 'pollo',
    src: '/image.png_20260915155517.jpeg',
    alt: 'Pollo de campo de alta calidad, del campo a tu mesa',
  },
]

export const mobileGalleryItems: GalleryItem[] = [
  // {
  //   id: 'movil-01',
  //   src: '/Movil/01.jpeg',
  //   alt: 'Huevos campesinos de alta calidad, del campo a tu mesa',
  // },
  {
    id: 'movil-02',
    src: '/Movil/02.jpeg',
    alt: 'Huevos campesinos de alta calidad, del campo a tu mesa',
  },
  {
    id: 'movil-03',
    src: '/Movil/03.jpeg',
    alt: 'Pollo de campo de alta calidad, del campo a tu mesa',
  },
]
