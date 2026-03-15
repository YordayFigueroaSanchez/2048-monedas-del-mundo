# Data Model: Animacion De Desplazamiento De Fichas

## Ficha
- Purpose: Representa una moneda visible en el tablero y su estado logico.
- Fields:
  - id: identificador estable durante una jugada para rastrear origen y destino visual.
  - value: valor numerico de la ficha.
  - row: fila actual en el tablero.
  - column: columna actual en el tablero.
  - isNew: indica si aparecio al final de la jugada.
  - isMerged: indica si es resultado de una fusion.

## Movimiento
- Purpose: Representa la accion iniciada por el usuario.
- Fields:
  - direction: up | down | left | right.
  - changed: indica si la jugada modifico el tablero.
  - scoreDelta: puntuacion generada por la jugada.
  - transitions: lista de transiciones visuales asociadas.

## TransicionVisual
- Purpose: Describe como una o varias fichas deben animarse durante una jugada.
- Fields:
  - tileId: identificador de la ficha animada.
  - fromRow: fila origen.
  - fromColumn: columna origen.
  - toRow: fila destino.
  - toColumn: columna destino.
  - type: slide | merge | spawn.
  - durationMs: duracion objetivo de la transicion.

## EstadoDeAnimacion
- Purpose: Coordina si el juego puede aceptar una nueva entrada.
- Fields:
  - isAnimating: booleano global de bloqueo de input.
  - activeMoveId: identificador de la jugada en curso.
  - startedAt: marca temporal de inicio.

## Relationships
- Un Movimiento genera cero o mas TransicionVisual.
- Una Ficha puede participar en una TransicionVisual de tipo slide y terminar como isMerged o isNew.
- EstadoDeAnimacion referencia a un unico Movimiento activo mientras dura la transicion.

## Validation Rules
- Una TransicionVisual de tipo slide debe tener origen y destino distintos.
- Un Movimiento con changed=false no puede generar transiciones slide ni merge.
- Una ficha marcada como isMerged debe existir solo en la posicion final de la fusion.
- durationMs debe permanecer dentro del rango 200-300 ms para mantener responsividad.

## State Transitions
- Idle -> CalculatingMove: al recibir una flecha valida.
- CalculatingMove -> Animating: cuando existen transiciones para representar.
- CalculatingMove -> Idle: si changed=false.
- Animating -> FinalRender: al completar la duracion de transicion.
- FinalRender -> Idle: cuando el tablero final queda sincronizado y se libera el input.
