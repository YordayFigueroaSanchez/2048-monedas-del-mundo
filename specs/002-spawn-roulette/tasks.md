---

description: "Task list for Ruleta De Aparicion De Ficha"
---

# Tasks: Ruleta De Aparicion De Ficha

**Input**: Design documents from `/specs/002-spawn-roulette/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/ui-spawn-roulette-contract.md, quickstart.md

**Tests**: Las pruebas son obligatorias para cambios de gameplay y estado visual, de acuerdo con la constitucion del proyecto.

**Organization**: Las tareas se agrupan por historia de usuario para permitir implementacion y validacion incremental.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Preparar estructura base para introducir la ruleta de aparicion sin romper el pipeline actual.

- [X] T001 Definir configuracion inicial de duraciones y fases visuales de spawn en src/animation-state.js
- [X] T002 Actualizar configuracion de pruebas para incluir escenarios de ruleta en package.json
- [X] T003 [P] Registrar base de validacion manual para ruleta en tests/integration/keyboard-move-animation.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Crear la infraestructura comun de estado y render para soportar spawn-roulette.

**⚠️ CRITICAL**: Ninguna historia de usuario debe empezar antes de completar esta fase.

- [X] T004 Extender metadatos de spawn en resultados de movimiento en src/game-state.js
- [X] T005 Implementar modelo de fase visual spawning dentro de estado de animacion en src/animation-state.js
- [X] T006 [P] Preparar utilidades de render overlay para spawn-roulette en src/board-renderer.js
- [X] T007 Integrar la fase spawning en la orquestacion principal de juego en index.html
- [X] T008 Crear pruebas deterministas base para spawn metadata en tests/unit/game-state.test.js
- [X] T009 [P] Crear archivo de pruebas unitarias para ruleta en tests/unit/spawn-roulette.test.js

**Checkpoint**: El sistema puede representar una fase de aparicion separada sin alterar reglas de juego.

---

## Phase 3: User Story 1 - Aparicion con ruleta visual (Priority: P1) 🎯 MVP

**Goal**: Mostrar una nueva ficha sin moneda, seguida de una ruleta visual breve y resolucion final.

**Independent Test**: Tras una jugada valida, la nueva ficha aparece vacia, ejecuta ruleta visible y termina mostrando una moneda.

### Tests for User Story 1

- [X] T010 [P] [US1] Agregar pruebas unitarias de creacion de evento de ruleta solo en jugadas validas en tests/unit/spawn-roulette.test.js
- [X] T011 [P] [US1] Documentar escenario manual de aparicion vacia y ruleta en tests/integration/keyboard-move-animation.md

### Implementation for User Story 1

- [X] T012 [US1] Implementar ciclo hidden -> roulette -> resolved para nueva ficha en src/animation-state.js
- [X] T013 [US1] Renderizar estado inicial sin moneda para ficha nueva en src/board-renderer.js
- [X] T014 [US1] Implementar animacion visual de ruleta para spawn en src/board-renderer.js
- [X] T015 [US1] Agregar estilos y keyframes para ruleta de aparicion en index.html
- [X] T016 [US1] Conectar disparo y cierre de ruleta tras jugada valida en index.html

**Checkpoint**: Cada nueva ficha de jugada valida muestra ruleta perceptible y resolucion final visible.

---

## Phase 4: User Story 2 - Coherencia del resultado final (Priority: P2)

**Goal**: Asegurar que el resultado visual final de ruleta coincide siempre con el valor real de la ficha.

**Independent Test**: Forzar nacimientos de ficha deterministas y verificar coincidencia 1:1 entre valor logico y moneda mostrada.

### Tests for User Story 2

- [X] T017 [P] [US2] Agregar pruebas unitarias de coherencia resolvedValue vs valor real en tests/unit/spawn-roulette.test.js
- [X] T018 [P] [US2] Registrar escenario manual de coherencia visual-estado en specs/002-spawn-roulette/quickstart.md

### Implementation for User Story 2

- [X] T019 [US2] Implementar resolucion determinista de ruleta segun spawn value y move id en src/board-renderer.js
- [X] T020 [US2] Propagar spawn value y move id a fase visual de ruleta en src/game-state.js y src/animation-state.js
- [X] T021 [US2] Sincronizar consolidacion de tablero final con resultado de ruleta en index.html
- [X] T022 [US2] Limpiar estado temporal de ruleta al finalizar para evitar residuos visuales en src/board-renderer.js

**Checkpoint**: El resultado visual de la ruleta es siempre consistente con el valor real de la ficha.

---

## Phase 5: User Story 3 - Fluidez durante sesiones continuas (Priority: P3)

**Goal**: Mantener ritmo de juego estable, soporte reduced-motion y bloqueo de input coherente durante la ruleta.

**Independent Test**: Jugar una sesion continua y validar que no hay jank, eventos duplicados ni bloqueos inconsistentes.

### Tests for User Story 3

- [X] T023 [P] [US3] Agregar pruebas unitarias de bloqueo/liberacion de input durante fase spawning en tests/unit/animation-state.test.js
- [X] T024 [P] [US3] Agregar pruebas unitarias de no-ruleta en movimientos invalidos en tests/unit/spawn-roulette.test.js
- [X] T025 [P] [US3] Registrar escenario reduced-motion en specs/002-spawn-roulette/quickstart.md

### Implementation for User Story 3

- [X] T026 [US3] Implementar fallback reduced-motion para ruleta en index.html y src/board-renderer.js
- [X] T027 [US3] Ajustar ventana temporal de ruleta y liberacion de input en src/animation-state.js y index.html
- [X] T028 [US3] Optimizar render overlay para evitar layout thrash en src/board-renderer.js
- [X] T029 [US3] Ajustar legibilidad de estado de ruleta en viewport movil en index.html

**Checkpoint**: La ruleta mantiene claridad y estabilidad durante sesiones largas en desktop y movil.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Cerrar documentacion, validacion integral y limpieza final.

- [X] T030 [P] Actualizar documentacion de feature en README.md
- [X] T031 Ejecutar validacion completa de quickstart para ruleta en specs/002-spawn-roulette/quickstart.md
- [X] T032 Ejecutar limpieza final de separacion logica/render entre index.html, src/animation-state.js y src/board-renderer.js
- [X] T033 [P] Consolidar ejecucion de suite unitaria de ruleta en package.json y tests/unit/spawn-roulette.test.js

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Sin dependencias, inicia inmediatamente.
- **Foundational (Phase 2)**: Depende de Setup y bloquea todas las historias.
- **User Story 1 (Phase 3)**: Depende de Foundational y define MVP.
- **User Story 2 (Phase 4)**: Depende de User Story 1 para reutilizar pipeline de ruleta ya visible.
- **User Story 3 (Phase 5)**: Depende de User Story 1 y User Story 2 para ajustar estabilidad y accesibilidad sobre flujo completo.
- **Polish (Phase 6)**: Depende del cierre de historias objetivo.

### User Story Dependencies

- **US1**: Requiere solo infraestructura base completada.
- **US2**: Requiere que US1 ya renderice ruleta y fases de resolucion.
- **US3**: Requiere flujo completo de US1 + US2 para ajustar rendimiento y reduced-motion.

### Within Each User Story

- Escribir o ampliar pruebas antes de cerrar implementacion.
- Estado logico y de animacion antes de ajustes finales de render.
- Render y estilos antes de integrar flujo final en index.html.
- Validar cada historia de forma independiente antes de continuar.

### Parallel Opportunities

- `T003` puede ejecutarse en paralelo con `T001-T002`.
- `T006` y `T009` pueden ejecutarse en paralelo despues de `T004-T005`.
- En cada historia, tareas de pruebas marcadas `[P]` pueden ejecutarse en paralelo con documentacion manual.
- En fase final, `T030` y `T033` pueden ejecutarse en paralelo.

---

## Parallel Example: User Story 1

```text
T010 [US1] Agregar pruebas unitarias de creacion de evento de ruleta solo en jugadas validas en tests/unit/spawn-roulette.test.js
T011 [US1] Documentar escenario manual de aparicion vacia y ruleta en tests/integration/keyboard-move-animation.md
```

## Parallel Example: User Story 2

```text
T017 [US2] Agregar pruebas unitarias de coherencia resolvedValue vs valor real en tests/unit/spawn-roulette.test.js
T018 [US2] Registrar escenario manual de coherencia visual-estado en specs/002-spawn-roulette/quickstart.md
```

## Parallel Example: User Story 3

```text
T023 [US3] Agregar pruebas unitarias de bloqueo/liberacion de input durante fase spawning en tests/unit/animation-state.test.js
T025 [US3] Registrar escenario reduced-motion en specs/002-spawn-roulette/quickstart.md
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Completar Setup.
2. Completar Foundational.
3. Completar User Story 1.
4. Validar visualmente aparicion vacia + ruleta + resolucion.
5. Si es estable, continuar con coherencia determinista y fluidez.

### Incremental Delivery

1. Base de estado y render para fase spawning.
2. Aparicion visual con ruleta (US1).
3. Coherencia exacta entre estado y resultado visual (US2).
4. Fluidez continua, reduced-motion y estabilidad (US3).
5. Documentacion y limpieza final (Polish).

### Parallel Team Strategy

1. Una persona prepara estado de animacion y metadatos de spawn; otra prepara pruebas de ruleta.
2. Tras Foundational, una persona trabaja render/CSS y otra pruebas/manual quickstart por historia.
3. La integracion final en index.html debe ser secuencial para evitar conflictos.

---

## Notes

- Todas las tareas incluyen rutas exactas para ejecucion directa.
- Las tareas marcadas con `[P]` no deben editar el mismo archivo de manera concurrente.
- El valor de la nueva ficha se mantiene determinado por logica de juego; la ruleta es solo representacion visual.
- `tasks.md` queda listo para `/speckit.implement`.
