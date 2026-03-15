# 2048 Monedas del Mundo

Proyecto de juego 2048 en navegador con tematica de monedas internacionales.

## Desarrollo rapido

- Abrir `index.html` en un navegador para jugar la version web.
- Ejecutar `python main.py` para validar el entorno Python base del repositorio.
- Ejecutar `npm test` para validar la logica modular del juego y el estado de animacion.

## Feature actual

La rama de trabajo actual incorpora dos mejoras visuales sin alterar reglas del 2048:

- Animacion de desplazamiento de fichas con fase de movimiento visible.
- Aparicion de nueva ficha con ruleta visual (sin moneda inicial) y resolucion final coherente con el valor real.

Estructura tecnica de la feature:

- `src/game-state.js`: reglas de movimiento, fusion, score y metadatos de spawn.
- `src/animation-state.js`: bloqueo de input, fases `moving/spawning` y eventos de ruleta.
- `src/board-renderer.js`: render estatico, render animado y overlay de ruleta determinista por `moveId`.
- `tests/unit/`: pruebas deterministas para logica, fases de animacion y ruleta.
- `tests/integration/keyboard-move-animation.md`: validacion manual de desplazamiento, fusion y ruleta.

## Guia de gobernanza

Las decisiones de implementacion y revision deben cumplir con la constitucion del
proyecto en `.specify/memory/constitution.md`.

Puntos clave de cumplimiento:

- Integridad de reglas 2048 en cualquier cambio de gameplay.
- UX responsiva y accesible para escritorio y movil.
- Cobertura de pruebas para logica central con comportamiento determinista.
- Presupuesto de rendimiento y estabilidad en interacciones.
- Simplicidad estructural y bajo acoplamiento entre logica y renderizado.

## Tests

- Ejecutar `npm test` para validar reglas de juego, estado de animacion y ruleta de spawn.
- Ejecutar la validacion manual guiada en `tests/integration/keyboard-move-animation.md`.
