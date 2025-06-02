grammar LoopLang;

programa       : instruccion+ ;
instruccion    : variar | asignacion | salida ;

variar         : VARIAR variable DESDE expresion HASTA expresion (CON PASO expresion)? HACER bloque FIN_VARIAR ;

bloque         : LLAVE_IZQ instruccion+ LLAVE_DER ;

asignacion     : variable ASIGN expresion ;
salida         : ESCRIBIR expresion ;

expresion      : termino ( (MAS | MENOS | POR | DIV) termino )* ;
termino        : NUMERO | variable | PAR_IZQ expresion PAR_DER ;

variable       : IDENTIFICADOR ;

// ---------- LÉXICO ----------

VARIAR         : 'variar' ;
DESDE          : 'desde' ;
HASTA          : 'hasta' ;
CON            : 'con' ;
PASO           : 'paso' ;
HACER          : 'hacer' ;
FIN_VARIAR     : 'fin_variar' ;

ESCRIBIR       : 'escribir' ;
ASIGN          : '<-' ;

MAS            : '+' ;
MENOS          : '-' ;
POR            : '*' ;
DIV            : '/' ;

PAR_IZQ        : '(' ;
PAR_DER        : ')' ;
LLAVE_IZQ      : '{' ;
LLAVE_DER      : '}' ;

NUMERO         : [0-9]+ ;
IDENTIFICADOR  : [a-zA-Z][a-zA-Z0-9_]* ;

WS             : [ \t\r\n]+ -> skip ;
