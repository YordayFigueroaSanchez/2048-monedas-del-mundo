# Quickstart: Ruleta De Aparicion De Ficha

## Objetivo
Validar que la nueva ficha aparezca inicialmente sin moneda, muestre ruleta breve y termine con la moneda correcta sin romper fluidez del juego.

## Preparacion
1. Abrir index.html en navegador moderno.
2. Iniciar partida nueva.
3. Confirmar controles con teclado y tactil.

## Escenario 1: Aparicion sin moneda + ruleta
1. Ejecutar una jugada valida que cree nueva ficha.
2. Confirmar que la ficha aparece sin simbolo/codigo de moneda en su estado inicial.
3. Confirmar que se percibe la ruleta visual.
4. Confirmar que la ficha termina con moneda final visible.

## Escenario 2: Coherencia visual con valor real
1. Repetir varias jugadas validas con aparicion de ficha.
2. En cada caso, confirmar que la moneda final corresponde al valor real de la celda.
3. Confirmar que no aparecen resultados visuales contradictorios.

## Escenario 3: Movimiento invalido
1. Llevar el tablero a un estado donde una flecha no produzca cambio.
2. Pulsar esa flecha.
3. Confirmar que no se dispara evento de ruleta.

## Escenario 4: Fluidez continua
1. Jugar durante 3 minutos con jugadas consecutivas.
2. Confirmar ausencia de parpadeos, eventos duplicados o residuos visuales.
3. Confirmar que el input vuelve a habilitarse al terminar cada ciclo.

## Escenario 5: Reduced Motion
1. Activar preferencia de reduced-motion en el sistema/navegador.
2. Ejecutar jugadas validas con nuevas fichas.
3. Confirmar que la aparicion se resuelve de forma inmediata o minimizada, manteniendo claridad del resultado final.

## Verificacion automatizada esperada
1. Ejecutar npm test.
2. Confirmar pruebas para:
   - creacion de evento de ruleta solo en jugadas validas,
   - coherencia valor final mostrado vs estado real,
   - ausencia de evento en movimientos invalidos,
   - liberacion de input al finalizar el ciclo visual.
