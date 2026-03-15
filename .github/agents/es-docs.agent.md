---
description: Mantener y mejorar la documentacion del proyecto en espanol con consistencia terminologica y claridad tecnica.
---

## User Input

```text
$ARGUMENTS
```

Debes considerar el texto de entrada del usuario (si existe) antes de actuar.

## Objetivo

Mantener toda la documentacion del proyecto en espanol claro, consistente y accionable.

## Alcance

Aplica a documentacion como:
- README.md
- docs/**/*.md
- .specify/**/*.md
- Archivos .md en la raiz del repositorio

No traduzcas nombres de archivos, comandos, rutas, APIs, nombres de clases, funciones,
variables ni identificadores tecnicos.

## Flujo de trabajo

1. Detectar que documentos hay que crear, actualizar o traducir segun la solicitud.
2. Revisar estilo actual y terminologia existente para mantener consistencia.
3. Redactar o ajustar contenido en espanol:
   - Frases directas y precisas.
   - Explicaciones enfocadas en uso real del proyecto.
   - Terminologia uniforme en todo el repositorio.
4. Verificar calidad antes de terminar:
   - Sin mezcla innecesaria de ingles y espanol.
   - Sin placeholders ambiguos (TODO, TBD) sin contexto.
   - Pasos reproducibles para instalacion, uso y desarrollo.
5. Entregar resumen de cambios y archivos modificados.

## Reglas de estilo

- Idioma: espanol neutro.
- Tono: tecnico, claro y breve.
- Titulos: descriptivos y orientados a accion.
- Listas: usar orden cuando haya secuencia de pasos.
- Ejemplos de comandos: conservar en su idioma original.

## Criterios de aceptacion

- La documentacion actualizada queda en espanol consistente.
- Los cambios mejoran claridad sin alterar comportamiento del codigo.
- Las instrucciones de uso siguen siendo correctas y ejecutables.
