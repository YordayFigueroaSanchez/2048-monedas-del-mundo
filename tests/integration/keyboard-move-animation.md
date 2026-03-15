# Validacion Manual: Keyboard Move Animation

## Objetivo
Verificar que el juego transmite visualmente el desplazamiento y la fusion de fichas sin romper reglas ni respuesta de controles.

## Preparacion
1. Abrir `index.html` en un navegador moderno.
2. Iniciar una partida nueva.
3. Confirmar que el tablero responde a flechas del teclado.

## Escenario A: Desplazamiento simple
1. Ejecutar un movimiento valido hacia izquierda, derecha, arriba y abajo en distintos momentos de la partida.
2. Confirmar que las fichas recorren visualmente la trayectoria antes del estado final.
3. Confirmar que no hay saltos instantaneos a destino cuando el movimiento es valido.

## Escenario B: Movimiento invalido
1. Llevar una fila o columna a un estado en el que una flecha no produzca cambios.
2. Pulsar esa flecha.
3. Confirmar que no aparece una animacion falsa.

## Escenario C: Fusion visible
1. Preparar una fusion simple, por ejemplo `2 + 2`.
2. Ejecutar la jugada.
3. Confirmar que primero se percibe el desplazamiento y despues la ficha fusionada resalta visualmente.
4. Confirmar que la puntuacion sube al valor correcto.

## Escenario D: Fluidez sostenida
1. Jugar una sesion continua de 3 minutos.
2. Confirmar que el input no produce estados visuales superpuestos.
3. Confirmar que no hay parpadeos ni bloqueos visibles del tablero.

## Escenario E: Nueva ficha con ruleta
1. Ejecutar una jugada valida que genere nueva ficha.
2. Confirmar que la nueva ficha aparece primero sin simbolo/codigo de moneda.
3. Confirmar que se ve una ruleta breve antes de la moneda final.
4. Confirmar que la moneda final coincide con el valor real de la nueva ficha.

## Escenario F: Ruleta no aparece en jugada invalida
1. Preparar una direccion sin cambios posibles.
2. Pulsar la flecha correspondiente.
3. Confirmar que no se muestra ruleta de aparicion.

## Escenario G: Reduced Motion
1. Activar preferencia del sistema para reducir movimiento.
2. Ejecutar jugadas validas con aparicion de nueva ficha.
3. Confirmar que la fase de ruleta se resuelve de forma inmediata o minimizada.