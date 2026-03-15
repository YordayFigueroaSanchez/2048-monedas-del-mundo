# UI Contract: Keyboard Move Animation

## Scope
Contrato de comportamiento visible para movimientos con teclado en el tablero principal.

## Input Contract
- Trigger: keydown con ArrowUp, ArrowDown, ArrowLeft o ArrowRight.
- Precondition: no debe existir otra animacion de movimiento activa.

## Output Contract
- Si la jugada cambia el tablero:
  - Se debe producir una transicion visual de desplazamiento para cada ficha afectada.
  - La direccion visible debe coincidir con la tecla pulsada.
  - Si existe fusion, la ficha resultante debe mostrar una señal visual distinta al desplazamiento simple.
- Si la jugada no cambia el tablero:
  - No debe mostrarse desplazamiento visual.

## Timing Contract
- Duracion objetivo del desplazamiento: 200-300 ms.
- El input de nuevas flechas puede bloquearse durante la transicion activa.
- El tablero final debe quedar sincronizado al terminar la transicion.

## Consistency Rules
- El estado final visible debe coincidir con el estado logico del tablero.
- La puntuacion y los modales de victoria o derrota deben seguir el mismo momento logico que antes de la mejora.
- La animacion no debe inventar trayectorias imposibles ni mover fichas en direcciones contrarias.

## Acceptance Examples
- Una ficha que se mueve dos celdas a la izquierda debe verse recorrer esa distancia antes de asentarse.
- Dos fichas iguales que convergen deben mostrar desplazamiento y luego una fusion diferenciable.
- Una flecha sin efecto no debe disparar transicion visual.