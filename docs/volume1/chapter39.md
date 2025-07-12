# 第39話：言語理論：文法と構文解析

　水曜日の放課後。私たちは、Yume言語の更なる改良に取り組んでいた。

「優美、今日は言語理論の深い部分に踏み込んでみよう」

　先輩がホワイトボードに図を描き始めた。

「文法と構文解析？」

「そう。プログラミング言語がどうやって文字列から意味を理解するのか」

◇◇◇◇

「まず、文法から説明するね」

```javascript
// BNF（バッカス・ナウア記法）で文法を定義
const yumeGrammar = `
<program> ::= <statement>*
<statement> ::= <assignment> | <if-statement> | <while-loop> | <expression>

<assignment> ::= <emotion>? <identifier> "=" <expression>
<emotion> ::= "愛を込めて" | "喜びと共に" | "期待を持って"

<if-statement> ::= "もし" <expression> "なら" <block> ("さもなければ" <block>)?
<while-loop> ::= "繰り返す" "(" <expression> ")" <block>

<expression> ::= <term> (("+"|"-") <term>)*
<term> ::= <factor> (("*"|"/") <factor>)*
<factor> ::= <number> | <identifier> | "(" <expression> ")"

<identifier> ::= <letter> (<letter>|<digit>)*
<number> ::= <digit>+
`

// 文法規則を表すクラス
class Grammar {
    constructor(rules) {
        this.rules = this.parseRules(rules)
        this.startSymbol = '<program>'
    }
    
    parseRules(bnfString) {
        const rules = new Map()
        const lines = bnfString.trim().split('\n')
        
        lines.forEach(line => {
            const [left, right] = line.split('::=').map(s => s.trim())
            const alternatives = right.split('|').map(s => s.trim())
            rules.set(left, alternatives)
        })
        
        return rules
    }
    
    // 文法規則を取得
    getRule(nonTerminal) {
        return this.rules.get(nonTerminal) || []
    }
    
    // 終端記号かどうか判定
    isTerminal(symbol) {
        return !symbol.startsWith('<') || !symbol.endsWith('>')
    }
}
```

「文法って、言語のルールブックみたいなものですね」

「その通り。小説にも文法があるでしょ？」

◇◇◇◇

「次は、構文解析器を作ろう」

```javascript
// トークナイザー（字句解析器）
class Tokenizer {
    constructor(input) {
        this.input = input
        this.position = 0
        this.tokens = []
    }
    
    tokenize() {
        while (this.position < this.input.length) {
            this.skipWhitespace()
            
            if (this.position >= this.input.length) break
            
            const token = this.nextToken()
            if (token) {
                this.tokens.push(token)
            }
        }
        
        return this.tokens
    }
    
    nextToken() {
        // 数値
        if (this.isDigit(this.current())) {
            return this.readNumber()
        }
        
        // 識別子またはキーワード
        if (this.isLetter(this.current())) {
            return this.readIdentifier()
        }
        
        // 演算子
        if ('+-*/=()'.includes(this.current())) {
            return {
                type: 'OPERATOR',
                value: this.advance()
            }
        }
        
        // 文字列
        if (this.current() === '"') {
            return this.readString()
        }
        
        throw new Error(`不明な文字: ${this.current()}`)
    }
    
    readNumber() {
        let number = ''
        while (this.isDigit(this.current())) {
            number += this.advance()
        }
        return {
            type: 'NUMBER',
            value: parseInt(number)
        }
    }
    
    readIdentifier() {
        let identifier = ''
        while (this.isLetter(this.current()) || this.isDigit(this.current())) {
            identifier += this.advance()
        }
        
        // キーワードチェック
        const keywords = ['もし', 'なら', 'さもなければ', '繰り返す', '愛を込めて']
        const type = keywords.includes(identifier) ? 'KEYWORD' : 'IDENTIFIER'
        
        return {
            type: type,
            value: identifier
        }
    }
    
    isDigit(ch) {
        return ch >= '0' && ch <= '9'
    }
    
    isLetter(ch) {
        return /[a-zA-Zあ-んア-ン一-龥]/.test(ch)
    }
    
    current() {
        return this.input[this.position]
    }
    
    advance() {
        return this.input[this.position++]
    }
    
    skipWhitespace() {
        while (this.position < this.input.length && ' \t\n'.includes(this.current())) {
            this.position++
        }
    }
}
```

「文字列をトークンに分解するんですね」

「そう。小説で言えば、文章を単語に分けるようなもの」

◇◇◇◇

「構文解析器の本体を作ろう」

```javascript
// 再帰下降パーサー
class RecursiveDescentParser {
    constructor(tokens) {
        this.tokens = tokens
        this.position = 0
        this.ast = null
    }
    
    parse() {
        this.ast = this.parseProgram()
        return this.ast
    }
    
    // <program> ::= <statement>*
    parseProgram() {
        const statements = []
        
        while (this.position < this.tokens.length) {
            statements.push(this.parseStatement())
        }
        
        return {
            type: 'PROGRAM',
            statements: statements
        }
    }
    
    // <statement> ::= <assignment> | <if-statement> | <expression>
    parseStatement() {
        const current = this.currentToken()
        
        // 感情キーワードまたは識別子の後に"="があれば代入
        if (this.isEmotionKeyword(current) || 
            (current.type === 'IDENTIFIER' && this.peek() && this.peek().value === '=')) {
            return this.parseAssignment()
        }
        
        // if文
        if (current.value === 'もし') {
            return this.parseIfStatement()
        }
        
        // while文
        if (current.value === '繰り返す') {
            return this.parseWhileLoop()
        }
        
        // それ以外は式
        return this.parseExpression()
    }
    
    // <assignment> ::= <emotion>? <identifier> "=" <expression>
    parseAssignment() {
        let emotion = null
        
        // 感情キーワードがあれば取得
        if (this.isEmotionKeyword(this.currentToken())) {
            emotion = this.advance().value
        }
        
        const identifier = this.expect('IDENTIFIER')
        this.expect('OPERATOR', '=')
        const expression = this.parseExpression()
        
        return {
            type: 'ASSIGNMENT',
            emotion: emotion,
            identifier: identifier.value,
            expression: expression
        }
    }
    
    // <expression> ::= <term> (("+"|"-") <term>)*
    parseExpression() {
        let left = this.parseTerm()
        
        while (this.currentToken() && '+-'.includes(this.currentToken().value)) {
            const operator = this.advance().value
            const right = this.parseTerm()
            left = {
                type: 'BINARY_OP',
                operator: operator,
                left: left,
                right: right
            }
        }
        
        return left
    }
    
    // <term> ::= <factor> (("*"|"/") <factor>)*
    parseTerm() {
        let left = this.parseFactor()
        
        while (this.currentToken() && '*/'.includes(this.currentToken().value)) {
            const operator = this.advance().value
            const right = this.parseFactor()
            left = {
                type: 'BINARY_OP',
                operator: operator,
                left: left,
                right: right
            }
        }
        
        return left
    }
    
    // <factor> ::= <number> | <identifier> | "(" <expression> ")"
    parseFactor() {
        const current = this.currentToken()
        
        if (current.type === 'NUMBER') {
            return {
                type: 'NUMBER',
                value: this.advance().value
            }
        }
        
        if (current.type === 'IDENTIFIER') {
            return {
                type: 'IDENTIFIER',
                value: this.advance().value
            }
        }
        
        if (current.value === '(') {
            this.advance() // '('
            const expr = this.parseExpression()
            this.expect('OPERATOR', ')')
            return expr
        }
        
        throw new Error(`予期しないトークン: ${current.value}`)
    }
    
    isEmotionKeyword(token) {
        return token && ['愛を込めて', '喜びと共に', '期待を持って'].includes(token.value)
    }
    
    currentToken() {
        return this.tokens[this.position]
    }
    
    peek() {
        return this.tokens[this.position + 1]
    }
    
    advance() {
        return this.tokens[this.position++]
    }
    
    expect(type, value = null) {
        const token = this.advance()
        if (token.type !== type || (value && token.value !== value)) {
            throw new Error(`期待: ${type} ${value}, 実際: ${token.type} ${token.value}`)
        }
        return token
    }
}
```

◇◇◇◇

「実際に動かしてみよう」

```javascript
// Yume言語パーサーの統合
class YumeParser {
    constructor() {
        this.grammar = new Grammar(yumeGrammar)
    }
    
    parse(sourceCode) {
        // 字句解析
        const tokenizer = new Tokenizer(sourceCode)
        const tokens = tokenizer.tokenize()
        
        console.log('トークン:', tokens)
        
        // 構文解析
        const parser = new RecursiveDescentParser(tokens)
        const ast = parser.parse()
        
        console.log('抽象構文木:', JSON.stringify(ast, null, 2))
        
        return ast
    }
    
    // ASTを視覚化
    visualizeAST(ast, indent = 0) {
        const spaces = ' '.repeat(indent)
        console.log(spaces + ast.type)
        
        if (ast.statements) {
            ast.statements.forEach(stmt => this.visualizeAST(stmt, indent + 2))
        }
        
        if (ast.left && ast.right) {
            console.log(spaces + '├─ ' + ast.operator)
            this.visualizeAST(ast.left, indent + 2)
            this.visualizeAST(ast.right, indent + 2)
        }
        
        if (ast.value !== undefined) {
            console.log(spaces + '└─ ' + ast.value)
        }
    }
}

// テスト
const yumeParser = new YumeParser()

const testCode1 = '愛を込めて x = 10 + 20'
console.log('=== テスト1 ===')
const ast1 = yumeParser.parse(testCode1)
yumeParser.visualizeAST(ast1)

const testCode2 = 'もし x > 5 なら { 表示(x) }'
console.log('\n=== テスト2 ===')
const ast2 = yumeParser.parse(testCode2)
yumeParser.visualizeAST(ast2)
```

「構文木が見えると、理解しやすいですね」

「プログラムの構造が可視化される」

◇◇◇◇

「先輩、私の小説も構文解析できるんでしょうか？」

「面白い発想だ。やってみよう」

```javascript
// 小説構文解析器
class NovelParser {
    constructor() {
        this.sentencePatterns = {
            dialogue: /^「(.+?)」/,
            narration: /^([^「」]+)/,
            sceneBreak: /^◇+$/,
            emotion: /(.+?)は(.+?)と(思った|感じた|考えた)/
        }
    }
    
    parse(novelText) {
        const lines = novelText.split('\n')
        const structure = []
        
        lines.forEach(line => {
            if (line.trim() === '') {
                structure.push({ type: 'BLANK' })
                return
            }
            
            // 場面転換
            if (this.sentencePatterns.sceneBreak.test(line)) {
                structure.push({ type: 'SCENE_BREAK' })
                return
            }
            
            // 会話文
            const dialogueMatch = line.match(this.sentencePatterns.dialogue)
            if (dialogueMatch) {
                structure.push({
                    type: 'DIALOGUE',
                    content: dialogueMatch[1],
                    speaker: this.guessSpeaker(structure)
                })
                return
            }
            
            // 地の文
            structure.push({
                type: 'NARRATION',
                content: line,
                emotion: this.extractEmotion(line)
            })
        })
        
        return structure
    }
    
    extractEmotion(text) {
        const match = text.match(this.sentencePatterns.emotion)
        if (match) {
            return {
                subject: match[1],
                feeling: match[2],
                verb: match[3]
            }
        }
        return null
    }
    
    guessSpeaker(previousStructure) {
        // 直前の地の文から話者を推測
        for (let i = previousStructure.length - 1; i >= 0; i--) {
            const element = previousStructure[i]
            if (element.type === 'NARRATION' && element.content.includes('が言った')) {
                const match = element.content.match(/(.+?)が言った/)
                if (match) return match[1]
            }
        }
        return '不明'
    }
    
    analyze(structure) {
        const stats = {
            totalLines: structure.length,
            dialogues: structure.filter(s => s.type === 'DIALOGUE').length,
            narrations: structure.filter(s => s.type === 'NARRATION').length,
            sceneBreaks: structure.filter(s => s.type === 'SCENE_BREAK').length,
            emotions: structure.filter(s => s.emotion).length
        }
        
        console.log('小説の構造分析:')
        console.log(`- 総行数: ${stats.totalLines}`)
        console.log(`- 会話文: ${stats.dialogues} (${(stats.dialogues / stats.totalLines * 100).toFixed(1)}%)`)
        console.log(`- 地の文: ${stats.narrations} (${(stats.narrations / stats.totalLines * 100).toFixed(1)}%)`)
        console.log(`- 場面転換: ${stats.sceneBreaks}`)
        console.log(`- 感情表現: ${stats.emotions}`)
        
        return stats
    }
}

// 優美の小説の一部を解析
const sampleNovel = `
優美は緊張した面持ちで先輩の顔を見上げた。

「先輩、私の小説、読んでくれましたか？」

雅史は優しく微笑んだ。

「もちろん。とても面白かったよ」

優美は嬉しいと思った。

◇◇◇◇

二人は夕暮れの教室で、静かに向き合っていた。
`

const novelParser = new NovelParser()
const novelStructure = novelParser.parse(sampleNovel)
console.log('小説の構造:', novelStructure)
novelParser.analyze(novelStructure)
```

◇◇◇◇

「すごい！　私の文章が構造化されました」

「プログラミングも小説も、構造を持っているんだ」

　私は、先輩の説明に感動していた。文法と構文解析。それは、言葉に意味を与え、構造を理解する技術。

◇◇◇◇

「Yume言語の構文解析を、もっと高度にしてみよう」

```javascript
// 高度な構文解析器
class AdvancedYumeParser {
    constructor() {
        this.errorRecovery = true
        this.semanticChecks = true
    }
    
    // エラー回復機能付きパース
    parseWithErrorRecovery(sourceCode) {
        const errors = []
        const warnings = []
        
        try {
            const ast = this.parse(sourceCode)
            
            // 意味解析
            if (this.semanticChecks) {
                this.performSemanticAnalysis(ast, warnings)
            }
            
            return {
                success: true,
                ast: ast,
                errors: errors,
                warnings: warnings
            }
        } catch (error) {
            errors.push(error)
            
            if (this.errorRecovery) {
                // エラー回復を試みる
                const recoveredAst = this.recoverFromError(sourceCode, error)
                return {
                    success: false,
                    ast: recoveredAst,
                    errors: errors,
                    warnings: warnings
                }
            }
            
            throw error
        }
    }
    
    // 意味解析
    performSemanticAnalysis(ast, warnings) {
        const symbolTable = new Map()
        
        this.analyzeNode(ast, symbolTable, warnings)
    }
    
    analyzeNode(node, symbolTable, warnings) {
        switch (node.type) {
            case 'ASSIGNMENT':
                // 未定義変数への代入は警告
                if (!symbolTable.has(node.identifier)) {
                    warnings.push(`新しい変数 '${node.identifier}' が作成されました`)
                }
                symbolTable.set(node.identifier, {
                    type: 'variable',
                    emotion: node.emotion
                })
                break
                
            case 'IDENTIFIER':
                // 未定義変数の参照はエラー
                if (!symbolTable.has(node.value)) {
                    warnings.push(`未定義の変数 '${node.value}' が参照されました`)
                }
                break
        }
        
        // 子ノードを再帰的に解析
        Object.values(node).forEach(child => {
            if (child && typeof child === 'object') {
                if (Array.isArray(child)) {
                    child.forEach(c => this.analyzeNode(c, symbolTable, warnings))
                } else {
                    this.analyzeNode(child, symbolTable, warnings)
                }
            }
        })
    }
}

// 言語サーバープロトコル（LSP）風の機能
class YumeLanguageServer {
    constructor() {
        this.parser = new AdvancedYumeParser()
        this.diagnostics = []
    }
    
    // コード補完
    getCompletions(code, position) {
        const completions = []
        
        // キーワード補完
        const keywords = ['もし', 'なら', 'さもなければ', '繰り返す', '愛を込めて', '喜びと共に']
        keywords.forEach(keyword => {
            completions.push({
                label: keyword,
                kind: 'Keyword',
                detail: 'Yume言語キーワード'
            })
        })
        
        // 変数補完（簡易版）
        const variables = this.extractVariables(code)
        variables.forEach(variable => {
            completions.push({
                label: variable,
                kind: 'Variable',
                detail: '変数'
            })
        })
        
        return completions
    }
    
    // シンタックスハイライト用のトークン情報
    getSemanticTokens(code) {
        const tokenizer = new Tokenizer(code)
        const tokens = tokenizer.tokenize()
        
        return tokens.map(token => ({
            ...token,
            semanticType: this.getSemanticType(token)
        }))
    }
    
    getSemanticType(token) {
        if (token.type === 'KEYWORD') {
            if (['愛を込めて', '喜びと共に'].includes(token.value)) {
                return 'emotion'
            }
            return 'keyword'
        }
        
        if (token.type === 'NUMBER') return 'number'
        if (token.type === 'IDENTIFIER') return 'variable'
        if (token.type === 'OPERATOR') return 'operator'
        
        return 'default'
    }
}
```

◇◇◇◇

「これで、Yume言語も本格的な開発環境を作れますね」

「そう。構文解析は言語の基盤だから」

　私は、プログラミング言語の奥深さに改めて感動していた。文字列から意味を読み取り、構造を理解する。それは、まるで人の心を理解するような、繊細で複雑な作業だった。

```javascript
// 今日の学び
const todaysLesson = {
    technical: {
        concepts: ['文法', '構文解析', 'BNF記法'],
        implementations: ['トークナイザー', '再帰下降パーサー', 'AST'],
        applications: ['小説解析', 'エラー回復', '言語サーバー']
    },
    personal: {
        realization: '言語は構造を持つ',
        novelInsight: '小説も解析できる',
        connection: '理解することの本質'
    }
}
```

　窓の外では、秋の夕日が静かに沈んでいく。

　文法と構文解析。それは、言葉に命を吹き込む技術。私の小説も、先輩のプログラムも、すべては言葉から始まる。

　そして、その言葉を理解し、構造化し、意味を見出すこと。それが、私たちがYume言語で目指していることなのだと、私は理解した。

　明日も、先輩と一緒に、言葉の世界を探求していこう。