# Research: Ruleta De Aparicion De Ficha

## Decision 1: La ruleta visual NO decide el valor de la ficha
- Decision: El valor de la nueva ficha se determina en logica de juego antes del render; la ruleta solo representa visualmente una resolucion.
- Rationale: Preserva confianza del jugador y cumple integridad de reglas al evitar doble aleatoriedad o resultados inconsistentes.
- Alternatives considered:
  - Decidir valor durante la animacion: rompe determinismo y dificulta pruebas.
  - Evitar ruleta y mostrar valor final inmediato: no satisface el objetivo de feedback visual.

## Decision 2: Fase de spawn-roulette separada del movimiento principal
- Decision: Introducir una fase de animacion de aparicion despues del desplazamiento/fusion y antes de liberar input.
- Rationale: Permite distinguir claramente los eventos visuales (move, merge, spawn-roulette) sin colisionar semantica.
- Alternatives considered:
  - Ejecutar ruleta en paralelo con movimiento: reduce legibilidad y aumenta conflicto visual.
  - Aplicar ruleta como variacion del merge: confunde origen del evento.

## Decision 3: Duracion breve y perceptible para ruleta
- Decision: Definir ventana objetivo aproximada de 180 a 220 ms para la ruleta de aparicion.
- Rationale: Es suficientemente visible para el usuario y mantiene ritmo de juego sin sensacion de demora.
- Alternatives considered:
  - Menos de 150 ms: puede pasar desapercibida.
  - Mas de 250 ms: enlentece la secuencia de jugadas.

## Decision 4: Renderizado overlay con propiedades GPU-friendly
- Decision: Renderizar la ruleta en una capa visual de ficha con `transform`/`opacity` evitando cambios de layout durante el ciclo.
- Rationale: Minimiza jank y mantiene estabilidad en sesiones continuas.
- Alternatives considered:
  - Recalcular layout en cada frame: mayor riesgo de parpadeo y caida de fluidez.
  - Re-render completo del tablero por frame: costo innecesario para un evento localizado.

## Decision 5: Soporte de reduced-motion con resolucion inmediata
- Decision: Cuando el usuario prefiera reducir movimiento, omitir el ciclo de ruleta y mostrar estado final de aparicion sin animacion extensa.
- Rationale: Mantiene accesibilidad sin perder claridad del evento de nueva ficha.
- Alternatives considered:
  - Ignorar reduced-motion: incumple expectativa de accesibilidad.
  - Desactivar toda animacion del juego: impacto mayor al alcance solicitado.

## Decision 6: Verificacion determinista de coherencia visual-estado
- Decision: Probar que la ruleta solo aparece en jugadas validas y que la moneda final coincide al 100% con el valor real usando random inyectable.
- Rationale: Cumple principio constitucional de determinismo y previene regresiones visuales silenciosas.
- Alternatives considered:
  - Solo validacion manual: insuficiente para cambios sensibles de UX y estado.
  - E2E completo como unica estrategia: demasiado costoso para alcance acotado.
