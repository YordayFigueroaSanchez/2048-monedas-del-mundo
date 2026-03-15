# Implementation Plan: Ruleta De Aparicion De Ficha

**Branch**: `[002-spawn-roulette]` | **Date**: 2026-03-15 | **Spec**: `/specs/002-spawn-roulette/spec.md`
**Input**: Feature specification from `/specs/002-spawn-roulette/spec.md`

## Summary

Agregar una fase visual de aparicion para la nueva ficha que comience sin moneda,
muestre una ruleta breve y termine con la moneda real ya definida por el estado de
juego, sin alterar reglas de 2048. El enfoque tecnico mantiene separacion entre
estado logico y renderizado, reutilizando el pipeline de animacion existente con una
fase adicional de spawn-roulette y control de input durante el ciclo completo.

## Technical Context

**Language/Version**: JavaScript ES2020 en navegador + Python 3.14 para utilidades del repo  
**Primary Dependencies**: Vanilla JS, DOM API, CSS animations, Node test runner (`node --test`)  
**Storage**: localStorage para mejor puntuacion (degrada de forma segura)  
**Testing**: Pruebas unitarias JavaScript (deterministas por inyeccion de random) + validacion manual guiada  
**Target Platform**: Navegadores modernos de escritorio y movil  
**Project Type**: Aplicacion web estatica (sin backend)  
**Performance Goals**: Mantener respuesta fluida por jugada con ciclo visual total perceptible y sin jank visible  
**Constraints**: Sin cambios a reglas de juego; sin dependencias nuevas; compatibilidad tactil/teclado; respetar reduced-motion  
**Scale/Scope**: 1 tablero de 4x4, evento de ruleta solo para fichas nuevas por jugada valida

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Research Gate

- Gameplay Integrity First: PASS. Se declara explicitamente que la ruleta es solo visual y no cambia movimiento, fusion, score ni win/lose.
- Accessibility and Responsive UX: PASS. Se requiere claridad visual en desktop/movil y diferenciacion entre spawn/fusion.
- Test-Backed Determinism: PASS. Se definio validacion automatizada con random inyectable para reproducibilidad.
- Performance and Stability Budgets: PASS. La ruleta tendra ventana breve para evitar degradacion de ritmo.
- Simplicity and Maintainability: PASS. Se mantiene separacion `game-state` / `animation-state` / `board-renderer`.

### Post-Design Re-Check

- Gameplay Integrity First: PASS. El valor de la ficha se decide en estado logico antes de render y la ruleta no re-sortea.
- Accessibility and Responsive UX: PASS. Se incluye ruta para reduced-motion y requisitos de legibilidad en viewport pequeno.
- Test-Backed Determinism: PASS. Se cubren casos de spawn valido/invalido y coherencia visual-estado final con entradas deterministas.
- Performance and Stability Budgets: PASS. Se propone duracion acotada (aprox. 180-220 ms) y animaciones GPU-friendly sin relayout continuo.
- Simplicity and Maintainability: PASS. La fase de ruleta se modela como estado visual adicional sin duplicar reglas del tablero.

## Project Structure

### Documentation (this feature)

```text
specs/002-spawn-roulette/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
└── tasks.md
```

### Source Code (repository root)

```text
index.html
src/
├── game-state.js
├── animation-state.js
└── board-renderer.js

tests/
├── integration/
│   └── keyboard-move-animation.md
└── unit/
    ├── game-state.test.js
    └── animation-state.test.js
```

**Structure Decision**: Se mantiene proyecto web estatico unico. La nueva feature se implementa extendiendo estado de animacion y renderizado en `src/`, manteniendo `index.html` como orquestador de entrada y estilos.

## Complexity Tracking

No constitutional violations identified.
