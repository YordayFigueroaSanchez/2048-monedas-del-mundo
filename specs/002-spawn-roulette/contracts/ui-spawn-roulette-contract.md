# UI Contract: Spawn Roulette Reveal

## Scope
Contrato de comportamiento visual para aparicion de nueva ficha con ruleta en el tablero principal.

## Input Contract
- Trigger principal: finalizacion de una jugada valida que genera nueva ficha.
- Precondition: el estado logico ya conoce posicion y valor final de la nueva ficha.
- Negative trigger: jugada invalida (`changed=false`) no inicia ruleta.

## Output Contract
- Fase inicial: la nueva ficha se representa sin simbolo/codigo de moneda.
- Fase ruleta: se muestra transicion visual breve y distinguible de merge.
- Fase final: la ficha muestra moneda final consistente con el valor real.

## Timing Contract
- Ventana objetivo de ruleta: 180-220 ms.
- Mientras la fase de ruleta este activa, el input permanece bloqueado.
- Al finalizar, el tablero queda sincronizado y el input se libera.

## Accessibility Contract
- Debe existir comportamiento alternativo para prefers-reduced-motion.
- En reduced-motion se permite resolucion inmediata de la fase visual.
- La diferenciacion visual entre nueva ficha y fusion debe mantenerse legible.

## Consistency Rules
- La ruleta no modifica valor, score ni reglas de juego.
- El valor final visual debe coincidir siempre con el estado logico.
- No deben quedar clases o capas temporales activas tras la resolucion.

## Acceptance Examples
- Tras una jugada valida, aparece una ficha sin moneda, se ve la ruleta y termina en una moneda final.
- Tras una jugada invalida, no aparece ruleta.
- Bajo reduced-motion, la nueva ficha se resuelve sin animacion extensa pero mantiene resultado correcto.
