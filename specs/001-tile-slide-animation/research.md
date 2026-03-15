# Research: Animacion De Desplazamiento De Fichas

## Decision 1: Usar renderizado en dos fases para animar movimientos
- Decision: Calcular primero el nuevo estado del tablero, renderizar una capa temporal con posiciones origen y destino para animar el desplazamiento, y solo despues consolidar el DOM final del tablero.
- Rationale: Evita parpadeos y discrepancias entre el estado logico y la representacion visual cuando hoy el tablero se vuelve a renderizar completo en cada jugada.
- Alternatives considered:
  - Re-render inmediato del tablero con clases CSS simples: demasiado propenso a que las fichas aparezcan ya en su destino sin transmitir el recorrido.
  - Animar cambios de CSS Grid directamente: menos confiable para trayectorias controladas y mas dificil de sincronizar con fusiones.

## Decision 2: Separar animacion de desplazamiento y animacion de fusion
- Decision: Representar primero el desplazamiento de las fichas y, al final de la trayectoria, aplicar la animacion de fusion a la ficha resultante.
- Rationale: Refuerza la causalidad visual de la jugada y hace legible por que aumento la puntuacion.
- Alternatives considered:
  - Ejecutar desplazamiento y fusion al mismo tiempo: genera ambiguedad visual.
  - Mantener solo la animacion de fusion actual: no satisface la necesidad principal de mostrar el desplazamiento.

## Decision 3: Bloquear nuevas entradas durante una transicion corta
- Decision: Ignorar nuevas entradas de teclado mientras una animacion de movimiento este en curso, con una duracion objetivo de 200 a 300 ms.
- Rationale: Evita estados intermedios incoherentes y mantiene la sensacion de respuesta si la animacion es breve.
- Alternatives considered:
  - Encolar entradas durante la animacion: agrega complejidad y puede producir resultados inesperados para el usuario.
  - Permitir entradas concurrentes: arriesga corrupcion visual del tablero.

## Decision 4: Extraer la logica de estado y la capa visual a modulos JavaScript separados
- Decision: Mover la logica de calculo del tablero y la coordinacion de animaciones a archivos JavaScript separados, manteniendo index.html como punto de entrada.
- Rationale: La constitucion exige bajo acoplamiento entre logica y renderizado; esta separacion tambien facilita pruebas automatizadas.
- Alternatives considered:
  - Mantener toda la logica inline en index.html: mas rapido para un cambio minimo, pero dificulta pruebas y mantenimiento.

## Decision 5: Probar la logica y las transiciones con pruebas automatizadas ligeras
- Decision: Introducir pruebas unitarias JavaScript para reglas de movimiento, deteccion de movimientos invalidos y metadatos de transicion visual, complementadas por una validacion manual del flujo en navegador.
- Rationale: La constitucion exige verificacion automatizada de operaciones centrales del tablero. La separacion en modulos permite cubrirlas sin depender del DOM completo.
- Alternatives considered:
  - Solo pruebas manuales: insuficiente para el criterio constitucional.
  - E2E completo como unica estrategia: demasiado costoso para una mejora acotada de una app estatica.

## Decision 6: Mantener la app como experiencia web estatica sin backend
- Decision: Conservar el juego como una aplicacion estatica ejecutada en navegador, sin agregar servicios remotos ni almacenamiento adicional.
- Rationale: La feature es puramente visual y no necesita alterar la arquitectura de despliegue.
- Alternatives considered:
  - Introducir backend o motor externo de animacion: sin justificacion para el alcance actual.
