# Data Model: Ruleta De Aparicion De Ficha

## FichaNueva
- Purpose: Representa la ficha creada al final de una jugada valida antes de su representacion final.
- Fields:
  - value: valor logico de la ficha (2 o 4) definido por estado de juego.
  - row: fila destino en el tablero.
  - column: columna destino en el tablero.
  - spawnedAtMoveId: identificador de la jugada que genero la ficha.

## EventoRuletaAparicion
- Purpose: Modela el ciclo visual temporal de la nueva ficha sin alterar su valor real.
- Fields:
  - moveId: identificador de jugada activa.
  - row: fila donde se renderiza el evento.
  - column: columna donde se renderiza el evento.
  - phase: hidden | roulette | resolved.
  - durationMs: duracion objetivo del evento.
  - reducedMotion: indica si se aplica resolucion inmediata.

## ResultadoVisualAparicion
- Purpose: Resultado renderizado al finalizar la ruleta.
- Fields:
  - resolvedValue: valor final mostrado (debe coincidir con value real).
  - symbol: simbolo de moneda visible al finalizar.
  - code: codigo visible al finalizar.

## EstadoAnimacionGlobal
- Purpose: Coordina bloqueo de input durante fases visuales.
- Fields:
  - isAnimating: indica si hay una transicion activa.
  - phase: moving | merging | spawning | idle.
  - activeMoveId: jugada actualmente orquestada.

## Relationships
- Una FichaNueva genera cero o un EventoRuletaAparicion (cero en movimientos invalidos).
- EventoRuletaAparicion termina en un ResultadoVisualAparicion.
- EstadoAnimacionGlobal controla el ciclo completo del move y del spawn-roulette.

## Validation Rules
- Si `changed=false` en la jugada, no se crea EventoRuletaAparicion.
- `resolvedValue` siempre debe ser igual a `FichaNueva.value`.
- `phase=roulette` solo puede existir mientras `isAnimating=true`.
- `durationMs` de ruleta debe permanecer en rango objetivo 180-220 ms (o 0 ms con reduced-motion).

## State Transitions
- idle -> moving: al iniciar jugada valida.
- moving -> spawning: cuando existe nueva ficha y termina desplazamiento/fusion.
- spawning -> idle: al resolver ruleta y consolidar estado final.
- moving -> idle: cuando no existe evento de spawn para representar.
