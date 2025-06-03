import antlr4 from 'antlr4';
import fs from 'fs';
import LoopLangLexer from './LoopLangLexer.js';
import LoopLangParser from './LoopLangParser.js';
import LoopLangVisitor from './LoopLangVisitor.js';

class LoopLangInterpreter extends LoopLangVisitor {
    constructor() {
        super();
        this.variables = new Map();
    }

    visitPrograma(ctx) {
        return this.visitChildren(ctx);
    }

    visitInstruccion(ctx) {
        return this.visitChildren(ctx);
    }

    visitVariar(ctx) {
        const varName = ctx.variable().getText();
        const desde = this.visit(ctx.expresion(0));
        const hasta = this.visit(ctx.expresion(1));
        let paso = 1;
        
        if (ctx.expresion().length > 2) {
            paso = this.visit(ctx.expresion(2));
        }

        for (let i = desde; i <= hasta; i += paso) {
            this.variables.set(varName, i);
            this.visit(ctx.bloque());
        }
        return null;
    }

    visitBloque(ctx) {
        return this.visitChildren(ctx);
    }

    visitAsignacion(ctx) {
        const varName = ctx.variable().getText();
        const value = this.visit(ctx.expresion());
        this.variables.set(varName, value);
        return null;
    }

    visitSalida(ctx) {
        const value = this.visit(ctx.expresion());
        console.log(value);
        return null;
    }

    visitExpresion(ctx) {
        let result = this.visit(ctx.termino(0));
        
        for (let i = 1; i < ctx.termino().length; i++) {
            const operator = ctx.children[(i * 2) - 1].getText();
            const termino = this.visit(ctx.termino(i));
            
            switch (operator) {
                case '+': result += termino; break;
                case '-': result -= termino; break;
                case '*': result *= termino; break;
                case '/': result /= termino; break;
            }
        }
        
        return result;
    }

    visitTermino(ctx) {
        if (ctx.NUMERO()) {
            return parseInt(ctx.NUMERO().getText());
        }
        if (ctx.variable()) {
            const varName = ctx.variable().getText();
            return this.variables.get(varName) || 0;
        }
        if (ctx.expresion()) {
            return this.visit(ctx.expresion());
        }
        return 0;
    }
}

function analyzeInput(input) {
    console.log("===== ANÁLISIS LÉXICO Y SINTÁCTICO =====");
    
    // Crear stream de caracteres y lexer
    const chars = new antlr4.CharStream(input);
    const lexer = new LoopLangLexer(chars);
    
    // Crear stream de tokens y parser
    const tokens = new antlr4.CommonTokenStream(lexer);
    
    // Mostrar tabla de tokens
    console.log("\n===== TABLA DE LEXEMAS-TOKENS =====");
    tokens.fill();
    for (let token of tokens.tokens) {
        if (token.type !== antlr4.Token.EOF) {
            const tokenName = LoopLangLexer.symbolicNames[token.type] || token.type;
            console.log(`${token.tokenIndex}. [${tokenName}] '${token.text}'`);
        }
    }
    
    // Análisis sintáctico
    const parser = new LoopLangParser(tokens);
    parser.buildParseTrees = true;
    
    try {
        // Generar árbol sintáctico
        const tree = parser.programa();
        
        console.log("\n===== ÁRBOL DE ANÁLISIS SINTÁCTICO =====");
        console.log(tree.toStringTree(parser.ruleNames));
        
        console.log("\n===== INTERPRETACIÓN =====");
        const interpreter = new LoopLangInterpreter();
        interpreter.visit(tree);
        
        return {
            success: true,
            tree: tree
        };
    } catch (error) {
        console.error("Error durante el análisis:", error.message);
        return {
            success: false,
            error: error.message
        };
    }
}

// Leer y analizar el archivo de entrada
const input = fs.readFileSync('input.txt', 'utf8');
analyzeInput(input);
