# Seguridad rápida para ALL TOQUE

Resumen de acciones recomendadas para desplegar el sitio con seguridad mínima aceptable.

1) Dominio y TLS
- En Netlify: agrega tu dominio personalizado en el panel y activa "Verify DNS". Netlify emite y renueva TLS automáticamente.
- Forzar HTTPS: configurar `netlify.toml` con redirección a HTTPS o usar `_redirects`.

2) Cabeceras de seguridad
- Archivo `_headers` ya añadido con HSTS, CSP, X-Frame-Options, X-Content-Type-Options.
- Revisa la política CSP si agregas recursos externos.

3) Formularios
- Formspree: activa protección anti-spam, confirma tu email y habilita reCAPTCHA si lo deseas.
- Añadimos un honeypot `_gotcha` para reducir spam básico.

4) Repositorio
- Habilita 2FA y branch protection en GitHub.
- No subir secretos: usa variables de entorno en Netlify/Render.

5) Monitoreo y backups
- Añadir health checks y backups del contenido si se usan bases de datos o APIs.

6) Opciones de hosting
- Netlify: recomendado para sitios estáticos sencillos (CDN, HTTPS, _headers, previews).
- Render: recomendado si necesitas procesos server-side, cron jobs o contenedores.

7) Pasos rápidos para publicar
- Push a GitHub
- En Netlify: New site -> Import from Git -> Conectar repo -> Deploy
- En Netlify: Settings -> Domain management -> Add custom domain -> Verify DNS
- En Netlify: Site settings -> Security -> Enforce HTTPS

Si quieres, aplico `netlify.toml` y `_redirects` para forzar HTTPS y añadir una regla de caché CDN.
