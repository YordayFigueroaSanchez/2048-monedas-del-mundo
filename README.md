# 2048 Monedas del Mundo

Proyecto de juego 2048 en navegador con tematica de monedas internacionales.

## Desarrollo rapido

- Abrir `index.html` en un navegador para jugar la version web.
- Ejecutar `python main.py` para validar el entorno Python base del repositorio.
- Ejecutar `npm test` para validar la logica modular del juego y el estado de animacion.

## Feature actual

La rama de trabajo actual incorpora una canalizacion modular para animar el desplazamiento
de fichas y diferenciar visualmente las fusiones sin alterar las reglas del 2048.

Estructura tecnica de la feature:

- `src/game-state.js`: reglas de movimiento, fusion, score y deteccion de estados.
- `src/animation-state.js`: bloqueo de input y metadatos de transicion visual.
- `src/board-renderer.js`: render estatico y render animado en dos fases.
- `tests/unit/`: pruebas deterministas para logica y animacion.
- `tests/integration/keyboard-move-animation.md`: validacion manual de la experiencia.

## Guia de gobernanza

Las decisiones de implementacion y revision deben cumplir con la constitucion del
proyecto en `.specify/memory/constitution.md`.

Puntos clave de cumplimiento:

- Integridad de reglas 2048 en cualquier cambio de gameplay.
- UX responsiva y accesible para escritorio y movil.
- Cobertura de pruebas para logica central con comportamiento determinista.
- Presupuesto de rendimiento y estabilidad en interacciones.
- Simplicidad estructural y bajo acoplamiento entre logica y renderizado.
