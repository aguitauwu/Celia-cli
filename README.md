🌐✨ Hentaila Reverse API Documentation ✨🌐

   


---

¡Holi~! 🌸

Esta es una documentación técnica, experimental y educativa sobre el proceso de reconocimiento, análisis y reverse‑engineering de Hentaila.tv 🕷️

> ✨ Proyecto hecho en una tarde, desde un móvil, usando Termux y pura curiosidad.




---

📑 Tabla de Contenidos

🌙 Introducción

🎯 Objetivo del Proyecto

🗺️ Arquitectura General del Sitio

🤖 Robots.txt & Sitemaps

🌐 WordPress REST API (wp-json)

⚙️ admin-ajax.php

🎮 Player Logic (player.php)

🔐 Tokens & Parámetros

🕷️ Estrategia de Scraping

🚨 Limitaciones y Riesgos

🤖 Casos de Uso

📓 Notas Importantes



---

**🌙 Introducción**

Hentaila.tv es un sitio basado en WordPress con plugins personalizados para:

Gestión de contenido (manga / episodios)

Reproducción de video (HLS)

Protección ligera mediante tokens


No expone una API pública documentada, pero sí múltiples endpoints internos explotables de forma pasiva.


---

**🎯 Objetivo del Proyecto**

📌 Crear una API privada / personal

📌 Experimentar con scraping real

📌 Aprender cómo funcionan players protegidos

📌 NO redistribuir contenido


> ⚠️ Este proyecto NO es para uso comercial ni público.




---

**🗺️ Arquitectura General**

```Cliente
  ↓
WordPress

├─ wp-json (REST)

├─ admin-ajax.php

├─ player-logic

│└─ player.php?data=TOKEN
└─ HLS (.m3u8)```


---

**🤖 Robots.txt & Sitemaps**

📍 robots.txt

```User-agent: *
Allow: /

Sitemap: https://hentaila.tv/sitemap_index.xml```

**🗺️ Sitemap Index**

```/page-sitemap.xml

/wp-manga-sitemap.xml

/wp-manga-genre-sitemap.xml

/wp-manga-tag-sitemap.xml

/wp-manga-release-sitemap.xml

/wp-manga-author-sitemap.xml

/wp-manga-chapters-sitemap*.xml```


💡 Los sitemaps son la fuente principal de scraping limpio.


---

**🌐 WordPress REST API**

Endpoint Base

```https://hentaila.tv/wp-json/

Endpoints útiles

/wp-json/wp/v2/posts

/wp-json/wp/v2/wp-manga

/wp-json/wp/v2/wp-manga-genre

/wp-json/wp/v2/wp-manga-tag```


📌 Devuelven JSON estándar de WordPress


---

**⚙️ admin-ajax.php**

```POST https://hentaila.tv/wp-admin/admin-ajax.php```

Requiere action

Sin sesión → devuelve 0

Muchas acciones solo funcionan desde frontend


📌 No es una API real, es un dispatcher interno.


---

**🎮 Player Logic**

Endpoint clave

```https://hentaila.tv/wp-content/plugins/player-logic/player.php?data=TOKEN```

Devuelve HTML + JS

Usa HLS (.m3u8)

El token contiene info cifrada (Base64)



---

**🔐 Tokens & Parámetros**

Codificados en Base64

Contextuales (episodio + sesión)

No reutilizables indefinidamente


Ejemplo:

```echo TOKEN | base64 -d```


---

**🕷️ Estrategia de Scraping**

✔ Usar sitemaps ✔ Extraer slugs ✔ Resolver player.php ✔ Interceptar .m3u8

❌ NO brute-forcear tokens ❌ NO flood de peticiones


---

**🚨 Limitaciones**

Tokens expiran

Cloudflare activo

Cambios frecuentes en plugins



---

**🤖 Casos de Uso**

Bot privado de Discord

Indexador local

Dataset experimental

Aprendizaje de RE web



---

**📓 Notas Importantes**

> 🌸 No existe una API pública oficial.

🌸 Todo aquí documentado es resultado de observación pasiva.

🌸 Respeta siempre los TOS del sitio.




---

✨ Proyecto educativo, técnico y experimental

Hecho con curiosidad, Termux y mucha paciencia 💫