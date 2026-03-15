---

description: "Task list for Animacion De Desplazamiento De Fichas"
---

# Tasks: Animacion De Desplazamiento De Fichas

**Input**: Design documents from `/specs/001-tile-slide-animation/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/ui-animation-contract.md, quickstart.md

**Tests**: Las pruebas son obligatorias para cambios de gameplay y estado visual, de acuerdo con la constitucion del proyecto.

**Organization**: Las tareas se agrupan por historia de usuario para permitir implementacion y validacion incremental.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Preparar estructura y tooling minimo para extraer logica y probarla.

- [X] T001 Crear estructura base de modulos y pruebas en src/game-state.js, src/animation-state.js, src/board-renderer.js, tests/unit/game-state.test.js, tests/unit/animation-state.test.js y tests/integration/keyboard-move-animation.md
- [X] T002 Crear package.json con scripts de prueba para JavaScript en package.json
- [X] T003 [P] Documentar el flujo de validacion manual de la feature en tests/integration/keyboard-move-animation.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Extraer la base compartida de logica y estado para soportar animaciones sin romper el juego.

**⚠️ CRITICAL**: Ninguna historia de usuario debe empezar antes de completar esta fase.

- [X] T004 Extraer la logica pura de deslizamiento, fusion y score desde index.html hacia src/game-state.js
- [X] T005 [P] Implementar el modelo de estado de animacion y bloqueo de input en src/animation-state.js
- [X] T006 Crear utilidades de renderizado base y posicionamiento de fichas en src/board-renderer.js
- [X] T007 Integrar los modulos externos sin alterar la UI actual en index.html
- [X] T008 Crear pruebas unitarias deterministas para reglas base de movimiento y fusiones en tests/unit/game-state.test.js
- [X] T009 [P] Crear pruebas unitarias para estado de animacion y movimientos sin cambio en tests/unit/animation-state.test.js

**Checkpoint**: La aplicacion puede calcular jugadas y preparar transiciones visuales desde modulos separados.

---

## Phase 3: User Story 1 - Desplazamiento visual al mover (Priority: P1) 🎯 MVP

**Goal**: Mostrar un desplazamiento visible y coherente para cada movimiento valido con teclado.

**Independent Test**: Jugar con teclado y confirmar que cada movimiento valido anima la trayectoria correcta y cada movimiento invalido no anima nada.

### Tests for User Story 1

- [X] T010 [P] [US1] Agregar casos de prueba para metadatos de trayectorias slide en tests/unit/animation-state.test.js
- [X] T011 [P] [US1] Registrar el escenario manual de desplazamiento simple e invalido en tests/integration/keyboard-move-animation.md

### Implementation for User Story 1

- [X] T012 [US1] Implementar calculo de trayectorias visuales por ficha en src/animation-state.js
- [X] T013 [US1] Implementar renderizado en dos fases para desplazamiento simple en src/board-renderer.js
- [X] T014 [US1] Actualizar estilos y coordinacion de render para animar desplazamientos horizontales y verticales en index.html
- [X] T015 [US1] Conectar el flujo de teclado al nuevo pipeline de animacion en index.html

**Checkpoint**: Los movimientos validos muestran desplazamiento visual coherente y los invalidos no generan animacion.

---

## Phase 4: User Story 2 - Claridad en combinaciones (Priority: P2)

**Goal**: Diferenciar visualmente desplazamiento y fusion para que el usuario entienda el resultado de la jugada.

**Independent Test**: Forzar una fusion y comprobar que se percibe primero el movimiento y luego la ficha fusionada.

### Tests for User Story 2

- [X] T016 [P] [US2] Agregar pruebas unitarias para transiciones de tipo merge y coherencia con scoreDelta en tests/unit/animation-state.test.js
- [X] T017 [P] [US2] Documentar el escenario manual de fusion visible en tests/integration/keyboard-move-animation.md

### Implementation for User Story 2

- [X] T018 [US2] Extender los resultados de movimiento con metadatos de fusion en src/game-state.js
- [X] T019 [US2] Renderizar secuencia slide-merge con señal visual diferenciada en src/board-renderer.js
- [X] T020 [US2] Ajustar clases CSS y temporizacion de fusion sin romper animaciones existentes en index.html
- [X] T021 [US2] Validar sincronizacion entre fusion visual, puntuacion y estado final en index.html

**Checkpoint**: Las jugadas con fusion muestran causalidad visual clara y mantienen consistencia con la puntuacion.

---

## Phase 5: User Story 3 - Lectura comoda en sesiones continuas (Priority: P3)

**Goal**: Mantener fluidez, control de input y estabilidad visual durante secuencias largas de juego.

**Independent Test**: Jugar una sesion continua de varios minutos y confirmar que no hay parpadeos, colisiones de input ni jank perceptible.

### Tests for User Story 3

- [X] T022 [P] [US3] Agregar pruebas unitarias para bloqueo de input y liberacion al finalizar la animacion en tests/unit/animation-state.test.js
- [X] T023 [P] [US3] Registrar el escenario manual de movimientos rapidos y sesion continua en tests/integration/keyboard-move-animation.md

### Implementation for User Story 3

- [X] T024 [US3] Implementar guardas de entrada durante animaciones activas en src/animation-state.js
- [X] T025 [US3] Optimizar duraciones y limpieza de transiciones para jugadas consecutivas en src/board-renderer.js
- [X] T026 [US3] Ajustar comportamiento de teclado y compatibilidad visual en viewport pequeno dentro de index.html

**Checkpoint**: El juego mantiene respuesta estable durante secuencias prolongadas y evita estados visuales incoherentes.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Cerrar integracion, documentacion y validacion final.

- [X] T027 [P] Actualizar documentacion de uso y desarrollo de la feature en README.md
- [X] T028 Ejecutar validacion completa del quickstart para esta feature en specs/001-tile-slide-animation/quickstart.md
- [X] T029 Ejecutar limpieza final de codigo y eliminar duplicacion restante entre index.html, src/game-state.js, src/animation-state.js y src/board-renderer.js

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Sin dependencias, puede comenzar de inmediato.
- **Foundational (Phase 2)**: Depende de Setup y bloquea todas las historias de usuario.
- **User Story 1 (Phase 3)**: Depende de Foundational y define el MVP.
- **User Story 2 (Phase 4)**: Depende de User Story 1, porque reutiliza la canalizacion visual de desplazamiento.
- **User Story 3 (Phase 5)**: Depende de User Story 1 y User Story 2 para ajustar estabilidad y ritmo de juego sobre la base visual ya integrada.
- **Polish (Phase 6)**: Depende de las historias que se decida entregar.

### User Story Dependencies

- **US1**: Requiere solo la infraestructura de modulos, pruebas y render base.
- **US2**: Requiere el pipeline de transiciones de US1 y agrega semantica de fusion.
- **US3**: Requiere el pipeline completo de US1 y US2 para medir fluidez y bloqueo de input.

### Within Each User Story

- Las pruebas deben escribirse o ampliarse antes de cerrar la implementacion de cada historia.
- La logica de estado precede al renderizado.
- El renderizado precede a la integracion final en index.html.
- Cada historia debe quedar validable por si sola antes de pasar a la siguiente.

### Parallel Opportunities

- `T003` puede ejecutarse en paralelo con `T001-T002`.
- `T005` y `T006` pueden avanzar en paralelo despues de `T004` si se respeta la interfaz del modelo de movimiento.
- `T008` y `T009` pueden desarrollarse en paralelo una vez definidos los contratos de `src/game-state.js` y `src/animation-state.js`.
- En cada historia, la tarea de prueba manual en `tests/integration/keyboard-move-animation.md` puede hacerse en paralelo con la ampliacion de pruebas unitarias.

---

## Parallel Example: User Story 1

```text
T010 [US1] Agregar casos de prueba para metadatos de trayectorias slide en tests/unit/animation-state.test.js
T011 [US1] Registrar el escenario manual de desplazamiento simple e invalido en tests/integration/keyboard-move-animation.md
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Completar Setup.
2. Completar Foundational.
3. Completar User Story 1.
4. Validar visualmente movimientos validos e invalidos.
5. Si el resultado es estable, pasar a historias de fusion y fluidez.

### Incremental Delivery

1. Base modular y pruebas deterministas.
2. Animacion de desplazamiento simple.
3. Animacion de fusion diferenciada.
4. Estabilidad y ritmo en sesiones continuas.
5. Documentacion y validacion final.

### Parallel Team Strategy

1. Una persona extrae la logica a `src/game-state.js` mientras otra prepara `package.json` y pruebas base.
2. Tras Foundational, una persona puede trabajar en `src/board-renderer.js` y otra en `tests/integration/keyboard-move-animation.md` y pruebas unitarias.
3. La integracion final en `index.html` debe permanecer secuencial para evitar conflictos.

---

## Notes

- Todas las tareas incluyen rutas exactas para ejecucion directa.
- Las tareas marcadas con `[P]` no deben editar el mismo archivo de manera concurrente.
- La separacion entre estado y renderizado es un requisito constitucional, no solo una preferencia tecnica.
- `tasks.md` queda listo para `/speckit.implement`.