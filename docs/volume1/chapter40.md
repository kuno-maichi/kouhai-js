# 第40話：コンパイラ設計

　木曜日の放課後。Yume言語の開発も最終段階に入り、今日は最も難しい部分に挑戦することにした。

「優美、今日はコンパイラを作ってみよう」

「コンパイラ？」

　優美が興味深そうに首を傾げた。

「プログラムを機械が理解できる形に変換する仕組みだ」

◇◇◇◇

「コンパイラの基本的な流れから説明するね」

　僕はホワイトボードに図を描き始めた。

```javascript
// コンパイラのパイプライン
class CompilerPipeline {
    constructor() {
        this.stages = [
            '字句解析（Lexing）',
            '構文解析（Parsing）',
            '意味解析（Semantic Analysis）',
            '中間表現生成（IR Generation）',
            '最適化（Optimization）',
            'コード生成（Code Generation）'
        ]
    }
    
    compile(sourceCode) {
        console.log('=== Yume言語コンパイラ ===')
        
        // 1. 字句解析
        const tokens = this.lex(sourceCode)
        console.log('1. トークン化完了:', tokens.length, '個のトークン')
        
        // 2. 構文解析
        const ast = this.parse(tokens)
        console.log('2. 構文解析完了: AST生成')
        
        // 3. 意味解析
        const semanticInfo = this.analyze(ast)
        console.log('3. 意味解析完了: 型チェック済み')
        
        // 4. 中間表現生成
        const ir = this.generateIR(ast, semanticInfo)
        console.log('4. 中間表現生成完了')
        
        // 5. 最適化
        const optimizedIR = this.optimize(ir)
        console.log('5. 最適化完了')
        
        // 6. コード生成
        const code = this.generateCode(optimizedIR)
        console.log('6. コード生成完了')
        
        return code
    }
}
```

「段階的に変換していくんですね」

「そう。各段階で、プログラムの表現が変わっていく」

◇◇◇◇

「まず、中間表現（IR）を設計しよう」

```javascript
// 三番地コード形式の中間表現
class IntermediateRepresentation {
    constructor() {
        this.instructions = []
        this.tempCounter = 0
        this.labelCounter = 0
    }
    
    // 一時変数を生成
    newTemp() {
        return `t${this.tempCounter++}`
    }
    
    // ラベルを生成
    newLabel() {
        return `L${this.labelCounter++}`
    }
    
    // 命令を追加
    emit(op, arg1 = null, arg2 = null, result = null) {
        this.instructions.push({
            op: op,
            arg1: arg1,
            arg2: arg2,
            result: result
        })
    }
    
    // 二項演算
    emitBinary(op, left, right, result) {
        this.emit(op, left, right, result)
    }
    
    // 代入
    emitAssign(source, target) {
        this.emit('ASSIGN', source, null, target)
    }
    
    // 条件分岐
    emitIf(condition, trueLabel, falseLabel) {
        this.emit('IF', condition, trueLabel, falseLabel)
    }
    
    // ジャンプ
    emitGoto(label) {
        this.emit('GOTO', label)
    }
    
    // ラベル
    emitLabel(label) {
        this.emit('LABEL', label)
    }
    
    // 関数呼び出し
    emitCall(func, args, result) {
        this.emit('CALL', func, args, result)
    }
    
    // 表示
    display() {
        console.log('=== 中間表現 ===')
        this.instructions.forEach((inst, i) => {
            let str = `${i}: `
            
            switch (inst.op) {
                case 'ASSIGN':
                    str += `${inst.result} = ${inst.arg1}`
                    break
                case 'ADD':
                case 'SUB':
                case 'MUL':
                case 'DIV':
                    str += `${inst.result} = ${inst.arg1} ${inst.op} ${inst.arg2}`
                    break
                case 'IF':
                    str += `if ${inst.arg1} goto ${inst.arg2} else goto ${inst.arg3}`
                    break
                case 'GOTO':
                    str += `goto ${inst.arg1}`
                    break
                case 'LABEL':
                    str = `${inst.arg1}:`
                    break
                case 'CALL':
                    str += `${inst.result} = call ${inst.arg1}(${inst.arg2})`
                    break
            }
            
            console.log(str)
        })
    }
}

// 使用例
const ir = new IntermediateRepresentation()
const t1 = ir.newTemp()
const t2 = ir.newTemp()

ir.emitAssign('10', t1)
ir.emitAssign('20', t2)
ir.emitBinary('ADD', t1, t2, 'result')
ir.display()
```

「これが機械語に近い形なんですね」

「そう。人間が読めるけど、機械に近い表現」

◇◇◇◇

「次は、ASTから中間表現を生成する」

```javascript
// AST to IR トランスレータ
class ASTToIRTranslator {
    constructor() {
        this.ir = new IntermediateRepresentation()
        this.symbolTable = new Map()
    }
    
    translate(ast) {
        this.visit(ast)
        return this.ir
    }
    
    visit(node) {
        switch (node.type) {
            case 'PROGRAM':
                node.statements.forEach(stmt => this.visit(stmt))
                break
                
            case 'ASSIGNMENT':
                const value = this.visitExpression(node.expression)
                this.symbolTable.set(node.identifier, value)
                this.ir.emitAssign(value, node.identifier)
                
                // 感情情報も記録
                if (node.emotion) {
                    this.ir.emit('EMOTION', node.emotion, node.identifier)
                }
                break
                
            case 'IF_STATEMENT':
                const condition = this.visitExpression(node.condition)
                const trueLabel = this.ir.newLabel()
                const falseLabel = this.ir.newLabel()
                const endLabel = this.ir.newLabel()
                
                this.ir.emitIf(condition, trueLabel, falseLabel)
                
                this.ir.emitLabel(trueLabel)
                this.visit(node.thenBranch)
                this.ir.emitGoto(endLabel)
                
                this.ir.emitLabel(falseLabel)
                if (node.elseBranch) {
                    this.visit(node.elseBranch)
                }
                
                this.ir.emitLabel(endLabel)
                break
                
            case 'WHILE_LOOP':
                const startLabel = this.ir.newLabel()
                const bodyLabel = this.ir.newLabel()
                const exitLabel = this.ir.newLabel()
                
                this.ir.emitLabel(startLabel)
                const loopCondition = this.visitExpression(node.condition)
                this.ir.emitIf(loopCondition, bodyLabel, exitLabel)
                
                this.ir.emitLabel(bodyLabel)
                this.visit(node.body)
                this.ir.emitGoto(startLabel)
                
                this.ir.emitLabel(exitLabel)
                break
                
            case 'FUNCTION':
                this.ir.emit('FUNCTION', node.name)
                node.params.forEach(param => {
                    this.ir.emit('PARAM', param)
                })
                this.visit(node.body)
                this.ir.emit('END_FUNCTION')
                break
        }
    }
    
    visitExpression(expr) {
        switch (expr.type) {
            case 'NUMBER':
                return expr.value.toString()
                
            case 'IDENTIFIER':
                return this.symbolTable.get(expr.value) || expr.value
                
            case 'BINARY_OP':
                const left = this.visitExpression(expr.left)
                const right = this.visitExpression(expr.right)
                const result = this.ir.newTemp()
                
                const opMap = {
                    '+': 'ADD',
                    '-': 'SUB',
                    '*': 'MUL',
                    '/': 'DIV',
                    '>': 'GT',
                    '<': 'LT',
                    '==': 'EQ'
                }
                
                this.ir.emitBinary(opMap[expr.operator], left, right, result)
                return result
                
            case 'FUNCTION_CALL':
                const args = expr.args.map(arg => this.visitExpression(arg))
                const result = this.ir.newTemp()
                this.ir.emitCall(expr.name, args, result)
                return result
        }
    }
}
```

◇◇◇◇

「最適化も実装してみよう」

```javascript
// 最適化パス
class Optimizer {
    constructor() {
        this.passes = [
            this.constantFolding,
            this.deadCodeElimination,
            this.commonSubexpressionElimination
        ]
    }
    
    optimize(ir) {
        let optimized = ir
        
        this.passes.forEach(pass => {
            optimized = pass.call(this, optimized)
        })
        
        return optimized
    }
    
    // 定数畳み込み
    constantFolding(ir) {
        const optimized = new IntermediateRepresentation()
        
        ir.instructions.forEach(inst => {
            if (['ADD', 'SUB', 'MUL', 'DIV'].includes(inst.op)) {
                const arg1 = this.getValue(inst.arg1)
                const arg2 = this.getValue(inst.arg2)
                
                if (typeof arg1 === 'number' && typeof arg2 === 'number') {
                    let result
                    switch (inst.op) {
                        case 'ADD': result = arg1 + arg2; break
                        case 'SUB': result = arg1 - arg2; break
                        case 'MUL': result = arg1 * arg2; break
                        case 'DIV': result = arg1 / arg2; break
                    }
                    optimized.emitAssign(result.toString(), inst.result)
                    console.log(`最適化: ${inst.result} = ${arg1} ${inst.op} ${arg2} → ${result}`)
                } else {
                    optimized.instructions.push(inst)
                }
            } else {
                optimized.instructions.push(inst)
            }
        })
        
        return optimized
    }
    
    // デッドコード除去
    deadCodeElimination(ir) {
        const used = new Set()
        const optimized = new IntermediateRepresentation()
        
        // 使用される変数を収集
        ir.instructions.forEach(inst => {
            if (inst.arg1 && inst.arg1.startsWith('t')) used.add(inst.arg1)
            if (inst.arg2 && inst.arg2.startsWith('t')) used.add(inst.arg2)
        })
        
        // 使用されない代入を除去
        ir.instructions.forEach(inst => {
            if (inst.op === 'ASSIGN' && inst.result.startsWith('t') && !used.has(inst.result)) {
                console.log(`デッドコード除去: ${inst.result} = ${inst.arg1}`)
            } else {
                optimized.instructions.push(inst)
            }
        })
        
        return optimized
    }
    
    // 共通部分式除去
    commonSubexpressionElimination(ir) {
        const expressions = new Map()
        const optimized = new IntermediateRepresentation()
        
        ir.instructions.forEach(inst => {
            if (['ADD', 'SUB', 'MUL', 'DIV'].includes(inst.op)) {
                const key = `${inst.arg1} ${inst.op} ${inst.arg2}`
                
                if (expressions.has(key)) {
                    // 既に計算済み
                    const existing = expressions.get(key)
                    optimized.emitAssign(existing, inst.result)
                    console.log(`共通部分式: ${inst.result} = ${key} → ${existing}を再利用`)
                } else {
                    expressions.set(key, inst.result)
                    optimized.instructions.push(inst)
                }
            } else {
                optimized.instructions.push(inst)
            }
        })
        
        return optimized
    }
    
    getValue(operand) {
        const num = parseFloat(operand)
        return isNaN(num) ? operand : num
    }
}
```

◇◇◇◇

「最後に、実際のJavaScriptコードを生成しよう」

```javascript
// コードジェネレータ
class CodeGenerator {
    constructor() {
        this.code = []
        this.indentLevel = 0
    }
    
    generate(ir) {
        this.emit('// Yume言語からコンパイルされたコード')
        this.emit('(function() {')
        this.indent()
        
        // 変数宣言
        const variables = this.collectVariables(ir)
        if (variables.size > 0) {
            this.emit(`let ${Array.from(variables).join(', ')};`)
            this.emit('')
        }
        
        // 命令を変換
        ir.instructions.forEach(inst => {
            this.generateInstruction(inst)
        })
        
        this.dedent()
        this.emit('})();')
        
        return this.code.join('\n')
    }
    
    generateInstruction(inst) {
        switch (inst.op) {
            case 'ASSIGN':
                this.emit(`${inst.result} = ${inst.arg1};`)
                break
                
            case 'ADD':
                this.emit(`${inst.result} = ${inst.arg1} + ${inst.arg2};`)
                break
                
            case 'SUB':
                this.emit(`${inst.result} = ${inst.arg1} - ${inst.arg2};`)
                break
                
            case 'MUL':
                this.emit(`${inst.result} = ${inst.arg1} * ${inst.arg2};`)
                break
                
            case 'DIV':
                this.emit(`${inst.result} = ${inst.arg1} / ${inst.arg2};`)
                break
                
            case 'IF':
                this.emit(`if (${inst.arg1}) {`)
                this.indent()
                break
                
            case 'GOTO':
                // JavaScriptでは構造化制御フローを使用
                break
                
            case 'LABEL':
                this.dedent()
                this.emit(`} // ${inst.arg1}`)
                break
                
            case 'CALL':
                this.emit(`${inst.result} = ${inst.arg1}(${inst.arg2.join(', ')});`)
                break
                
            case 'EMOTION':
                this.emit(`// 感情: ${inst.arg1} → ${inst.arg2}`)
                break
                
            case 'FUNCTION':
                this.emit(`function ${inst.arg1}() {`)
                this.indent()
                break
                
            case 'END_FUNCTION':
                this.dedent()
                this.emit('}')
                break
        }
    }
    
    collectVariables(ir) {
        const vars = new Set()
        
        ir.instructions.forEach(inst => {
            if (inst.result && !inst.result.startsWith('t')) {
                vars.add(inst.result)
            }
        })
        
        return vars
    }
    
    emit(line) {
        this.code.push(' '.repeat(this.indentLevel * 2) + line)
    }
    
    indent() {
        this.indentLevel++
    }
    
    dedent() {
        this.indentLevel--
    }
}
```

◇◇◇◇

「全部を統合してみよう」

```javascript
// Yume言語コンパイラ
class YumeCompiler {
    constructor() {
        this.lexer = new YumeLexer()
        this.parser = new YumeParser()
        this.translator = new ASTToIRTranslator()
        this.optimizer = new Optimizer()
        this.generator = new CodeGenerator()
    }
    
    compile(sourceCode) {
        try {
            console.log('=== コンパイル開始 ===')
            console.log('ソースコード:')
            console.log(sourceCode)
            console.log('')
            
            // 1. 字句解析
            const tokens = this.lexer.tokenize(sourceCode)
            
            // 2. 構文解析
            const ast = this.parser.parse(tokens)
            
            // 3. 中間表現生成
            const ir = this.translator.translate(ast)
            console.log('\n=== 最適化前 ===')
            ir.display()
            
            // 4. 最適化
            const optimizedIR = this.optimizer.optimize(ir)
            console.log('\n=== 最適化後 ===')
            optimizedIR.display()
            
            // 5. コード生成
            const jsCode = this.generator.generate(optimizedIR)
            console.log('\n=== 生成されたコード ===')
            console.log(jsCode)
            
            return {
                success: true,
                code: jsCode,
                ir: optimizedIR
            }
        } catch (error) {
            return {
                success: false,
                error: error.message
            }
        }
    }
}

// テスト
const compiler = new YumeCompiler()

const yumeCode = `
愛を込めて x = 10
喜びと共に y = 20
result = x + y

もし result > 25 なら {
    表示("大きい")
} さもなければ {
    表示("小さい")
}
`

const result = compiler.compile(yumeCode)
```

◇◇◇◇

「すごい！　Yume言語が本物のプログラムになりました」

　優美の興奮した声に、僕も嬉しくなった。

「これで、Yume言語は完全な言語になった」

「先輩」

「ん？」

「私たちの物語も、コンパイルされて現実になりましたね」

　優美の言葉に、僕は少し照れてしまった。

「確かに。構文解析して、最適化して、実行可能な形になった」

◇◇◇◇

　夕暮れの教室で、僕たちは完成したコンパイラを眺めていた。

　コンパイラ設計。それは、言語に命を吹き込む最後のピース。ソースコードから実行可能なプログラムへの変換。それは、まるで想いを現実にする魔法のようだ。

（優美と一緒に作ったYume言語）

　字句解析、構文解析、意味解析、最適化、コード生成。すべての段階を、優美と一緒に作り上げた。

```javascript
// 今日の学び
const todaysLesson = {
    technical: {
        concept: 'コンパイラ設計',
        stages: ['字句解析', '構文解析', '中間表現', '最適化', 'コード生成'],
        implementation: '完全なコンパイラパイプライン'
    },
    personal: {
        achievement: 'Yume言語の完成',
        teamwork: '二人で作り上げた言語',
        future: '新しい可能性'
    }
}
```

　明日から、Yume言語を使って、もっと多くのプログラムを書けるようになる。優美の小説も、僕のアイデアも、すべてYume言語で表現できる。

　それは、僕たちだけの特別な言語。愛と感情を理解し、実行できる、世界で唯一の言語だ。