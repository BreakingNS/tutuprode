# Prode Mundial (estático)

Proyecto estático en HTML/CSS/JS para gestionar un prode del Mundial. Toda la "base de datos" está en `js/data.js` y se guarda en `localStorage`.

Cómo usar:

- Abrir `index.html` en el navegador. Cambiar nombres de participantes y ver partidos por día.
- Ir a `admin.html` y usar la clave `admin123` para cargar resultados. Luego click en "Guardar cambios".

Notas:

- El archivo `js/data.js` contiene un ejemplo reducido de grupos y partidos. Puedes añadir todos los partidos siguiendo la estructura `{id,date,teamA,teamB,scoreA,scoreB,preds:{}}`.
- El sistema otorga 3 puntos por resultado exacto y 1 punto si se acierta ganador/empate.
- Implementé persistencia local con `localStorage`.

- Para ingresar predicciones: en `index.html` busca el partido y completa las casillas para cada participante; se guardan automáticamente en `localStorage`.

