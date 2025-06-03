# Analizador LoopLang con ANTLR4

Este proyecto implementa un analizador léxico y sintáctico para un lenguaje simple de bucles (LoopLang) utilizando ANTLR4 y JavaScript.

## Requisitos

- Node.js (recomendado v22.x o superior)
- Java Runtime Environment (JRE) para generar el parser con ANTLR4

## Estructura del Proyecto

```
looplang-antlr/
├── grammar/
│   └── LoopLang.g4       # Gramática ANTLR4
├── ejemplos/
│   ├── correcto1.txt     # Ejemplo de código correcto
│   ├── correcto2.txt     # Ejemplo de código correcto
│   ├── incorrecto1.txt   # Ejemplo con error sintáctico
│   └── incorrecto2.txt   # Ejemplo con error léxico
├── index.js              # Intérprete principal
└── package.json          # Dependencias del proyecto
```

## Instalación

1. Clona este repositorio:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd looplang-antlr
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Genera el parser (requiere Java):
   ```bash
   java -jar antlr-4.13.2-complete.jar -Dlanguage=JavaScript -visitor grammar/LoopLang.g4
   ```

## Uso

Para ejecutar el analizador con un archivo de entrada:

```bash
node index.js
```

Por defecto, el programa lee el archivo `input.txt`. Para probar los ejemplos, copia el contenido de cualquiera de los archivos de ejemplo a `input.txt`.

### Ejemplos Incluidos

1. **correcto1.txt**: Bucle simple que imprime números del 1 al 5
2. **correcto2.txt**: Bucles anidados con operaciones aritméticas
3. **incorrecto1.txt**: Ejemplo con error sintáctico (falta fin_variar)
4. **incorrecto2.txt**: Ejemplo con error léxico (operador no válido)

## Salida del Programa

El programa mostrará:
1. Análisis léxico y sintáctico
2. Tabla de lexemas-tokens
3. Árbol de análisis sintáctico
4. Resultados de la interpretación (si el código es correcto)

## Gramática

La gramática soporta:
- Bucles `variar` con rango y paso opcional
- Operaciones aritméticas básicas (+, -, *, /)
- Variables
- Salida de valores con `escribir`

Ejemplo de código válido:
```
variar i desde 1 hasta 5 hacer {
    escribir i
} fin_variar
``` 