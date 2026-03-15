# Feature Specification: Ruleta De Aparicion De Ficha

**Feature Branch**: `[002-spawn-roulette]`  
**Created**: 2026-03-15  
**Status**: Completed  
**Input**: User description: "quiero que la nueva ficha aparezca sin representacion de ninguna moneda y simule como una ruleta para definir con que moneda se quedara"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Aparicion con ruleta visual (Priority: P1)

Como jugador, quiero que la nueva ficha aparezca inicialmente sin icono de moneda y muestre una ruleta visual breve para entender que el valor final se esta definiendo en ese momento.

**Why this priority**: Es el cambio central solicitado y aporta claridad inmediata sobre el nacimiento de nuevas fichas sin alterar las reglas del juego.

**Independent Test**: Puede validarse iniciando una partida y ejecutando un movimiento valido; debe observarse una ficha nueva sin moneda que transiciona por una ruleta visual y luego fija su moneda final.

**Acceptance Scenarios**:

1. **Given** una jugada valida que genera nueva ficha, **When** la ficha aparece en el tablero, **Then** se muestra inicialmente sin simbolo de moneda y con estado visual de ruleta.
2. **Given** que la ruleta visual termina, **When** finaliza la aparicion, **Then** la ficha queda con una moneda final consistente con el valor asignado.

---

### User Story 2 - Coherencia del resultado final (Priority: P2)

Como jugador, quiero que el resultado final de la ruleta coincida siempre con el valor real de la nueva ficha para confiar en la retroalimentacion visual.

**Why this priority**: Sin coherencia entre visual y estado real, la interfaz se percibe engañosa y afecta la comprension del tablero.

**Independent Test**: Puede validarse forzando nacimientos de ficha en diferentes posiciones y comprobando que la moneda mostrada al finalizar coincide con el valor real de la celda.

**Acceptance Scenarios**:

1. **Given** una nueva ficha creada tras una jugada valida, **When** termina la ruleta visual, **Then** la representacion final coincide exactamente con el valor real de esa ficha en el tablero.

---

### User Story 3 - Fluidez durante sesiones continuas (Priority: P3)

Como jugador, quiero que la ruleta de aparicion sea notoria pero breve para mantener el ritmo de juego incluso en secuencias largas.

**Why this priority**: Protege la experiencia continua y evita que el nuevo efecto visual vuelva lenta la interaccion.

**Independent Test**: Puede validarse jugando una sesion continua de varios minutos y verificando que no hay bloqueos visuales, parpadeos ni acumulacion de efectos.

**Acceptance Scenarios**:

1. **Given** multiples jugadas consecutivas con nuevas apariciones, **When** se encadenan eventos de ruleta, **Then** cada evento termina antes del siguiente input aceptado y sin artefactos visuales residuales.

---

### Edge Cases

- Que ocurre si una jugada no genera nueva ficha porque no hubo cambio en el tablero: no debe mostrarse ruleta ni estado de aparicion.
- Como se comporta la ruleta si el usuario intenta mover durante la aparicion: el sistema debe mantener consistencia visual y de estado sin crear eventos duplicados.
- Que ocurre cuando la nueva ficha aparece en una celda donde acaba de terminar una fusion: la ruleta debe verse de forma distinguible de la animacion de fusion.
- Como se maneja el fin de partida durante una aparicion: la ruleta debe completar su ciclo visual y luego mostrarse el estado final del juego de manera estable.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sistema MUST iniciar un evento visual de aparicion para cada nueva ficha creada tras una jugada valida.
- **FR-002**: El sistema MUST renderizar la nueva ficha en un estado inicial sin simbolo ni codigo de moneda antes de mostrar su representacion final.
- **FR-003**: El sistema MUST mostrar una ruleta visual perceptible durante la aparicion de la nueva ficha.
- **FR-004**: El sistema MUST finalizar la ruleta visual con una representacion de moneda que coincida con el valor real asignado a la nueva ficha.
- **FR-005**: El sistema MUST evitar que la ruleta visual altere reglas de movimiento, fusion, puntuacion o condiciones de victoria/derrota.
- **FR-006**: El sistema MUST no disparar eventos de aparicion cuando una entrada del jugador no produce cambios en el tablero.
- **FR-007**: El sistema MUST garantizar que no queden estados visuales temporales activos una vez finalizada la aparicion.
- **FR-008**: El sistema MUST mantener legibilidad visual del estado de ruleta en escritorio y viewport movil pequeno.

### Constitutional Alignment *(mandatory)*

- **CA-001 Gameplay Integrity**: La feature solo modifica la presentacion visual de la nueva ficha; no altera logica de desplazamiento, fusion, score ni reglas de fin de juego.
- **CA-002 Accessibility/Responsive UX**: La ruleta debe ser distinguible de otras animaciones, legible en tamanos pequenos y consistente en teclado y tactil.
- **CA-003 Deterministic Verification**: Deben existir pruebas automatizadas para validar que el evento de aparicion se crea solo en jugadas validas y que el resultado final coincide con el valor real, controlando aleatoriedad mediante entradas deterministas en pruebas.
- **CA-004 Performance/Stability**: El evento de ruleta debe completar rapido, sin jank visible y sin degradar sesiones de jugadas consecutivas.
- **CA-005 Simplicity/Maintainability**: La logica de estado de juego, estado de aparicion y renderizado visual deben mantenerse separadas para evitar duplicacion y acoplamiento.

### Key Entities *(include if feature involves data)*

- **EventoDeAparicion**: Representa el ciclo visual de una nueva ficha; incluye posicion, estado inicial sin moneda, ventana temporal de ruleta y estado final resuelto.
- **ResultadoDeAparicion**: Representa el valor final de la nueva ficha y su correspondencia con la representacion visual final mostrada.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: En el 95% de jugadas validas observadas, la nueva ficha se percibe claramente en dos fases: aparicion sin moneda y resolucion final de moneda.
- **SC-002**: En el 100% de los casos verificados en pruebas, la moneda mostrada al final de la ruleta coincide con el valor real de la ficha en el tablero.
- **SC-003**: En una sesion continua de 3 minutos, no se observan artefactos visuales persistentes ni eventos de ruleta duplicados.
- **SC-004**: En validacion con usuarios de prueba, al menos 90% identifica correctamente que la nueva ficha se define al final de una ruleta y no la confunde con una fusion.
