# Landing Page - Galería Visual con WhatsApp

Plataforma landing minimalista orientada a impacto visual e interacción directa por WhatsApp, elimina el flujo de carrito tradicional.

---

## 🎨 Características Principales

* **Efecto Scroll Apilado (Sticky Stacking):** Las imágenes de la galería se van superponiendo progresivamente al hacer scroll vertical.
* **Sin Carrito de Compras:** Galería puramente interactiva y libre de distracciones comerciales tradicionales.
* **Botón Interactivo "Huevo":** Botón flotante omnipresente con forma de huevo que redirige directamente a WhatsApp.

---

## 🛠️ Especificaciones de UX/UI

### 1. Galería de Imágenes (Scroll Behavior)
* Disposición en pantalla completa o contenedor centralizado.
* `position: sticky` con desplazamiento progresivo donde cada imagen cubre la anterior.
* Transiciones suaves mediante CSS/JS (`framer-motion` o CSS Scroll-Driven Animations).

### 2. Botón Flotante WhatsApp ("Huevo Interactivo")
* **Diseño:** SVG/Imagen personalizada con silueta de huevo y microanimaciones (hover, pulso suave).
* **Posición:** Fijado flotante (bottom-right o centro-inferior según breakpoint).
* **Acción:** `window.open('https://wa.me/<NUMERO>?text=Hola,%20quisiera%20más%20información')`

---

## 🚀 Puntos de Contacto

Cualquier interacción en la mitad de las imágenes o en el botón del huevo redirige directamente al canal de WhatsApp.

![alt text](image.png)
![alt text](image-2.png)