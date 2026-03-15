# Quickstart: Animacion De Desplazamiento De Fichas

## Objetivo
Validar que las fichas muestran desplazamiento visual coherente con cada jugada de teclado sin romper las reglas del juego.

## Preparacion
1. Abrir index.html en un navegador moderno.
2. Iniciar una partida nueva.
3. Asegurarse de que el tablero responde a las teclas de flecha.

## Escenario 1: Desplazamiento simple
1. Realizar una jugada valida con una sola direccion.
2. Confirmar que las fichas recorren visualmente la trayectoria antes de asentarse.
3. Confirmar que el resultado final coincide con la posicion esperada del tablero.

## Escenario 2: Movimiento invalido
1. Llevar el tablero a una configuracion donde una direccion no produzca cambios.
2. Pulsar esa flecha.
3. Confirmar que no aparece una animacion de desplazamiento falsa.

## Escenario 3: Fusion visible
1. Preparar una fila o columna con dos fichas iguales adyacentes tras el movimiento.
2. Ejecutar la jugada.
3. Confirmar que primero se percibe el desplazamiento y despues el efecto de fusion de la ficha resultante.
4. Confirmar que la puntuacion aumenta correctamente.

## Escenario 4: Fluidez en secuencia
1. Jugar durante 3 minutos con movimientos consecutivos.
2. Confirmar que no aparecen parpadeos, bloqueos visuales ni respuestas inconsistentes.

## Verificacion automatizada esperada
1. Ejecutar las pruebas unitarias del motor de juego y transiciones visuales.
2. Confirmar cobertura de:
   - movimiento con cambio,
   - movimiento sin cambio,
   - fusion,
   - bloqueo de input durante animacion.
