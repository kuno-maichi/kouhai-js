# 第42話：型システム：安全性と契約

　金曜日の放課後。Yume言語の基本機能はほぼ完成し、僕たちは最後の重要な機能に取り組んでいた。

「優美、今日は型システムについて学ぼう」

　僕が提案すると、優美の目に興味深げな光が宿った。

「型システム？なんだか堅そうな名前ですね」

「堅いけど、とても大切なものなんだ。プログラムの安全性を保つ仕組みだから」

◇◇◇◇

「まず、型って何かから説明しよう」

　ホワイトボードに図を描きながら、基本的な概念を説明し始めた。

```javascript
// 基本的な型の概念
class Type {
    constructor(name, size, operations) {
        this.name = name
        this.size = size
        this.operations = new Set(operations)
    }
    
    // 型の互換性チェック
    isCompatibleWith(other) {
        if (this.name === other.name) return true
        
        // サブタイプ関係をチェック
        return this.isSubtypeOf(other)
    }
    
    // サブタイプ判定
    isSubtypeOf(supertype) {
        // 簡易的なサブタイプ判定
        if (supertype.name === 'Any') return true
        if (this.name === 'Nothing') return true
        
        // 数値型の階層
        if (this.name === 'Int' && supertype.name === 'Number') return true
        if (this.name === 'Float' && supertype.name === 'Number') return true
        
        return false
    }
    
    // 操作が可能かチェック
    canPerform(operation) {
        return this.operations.has(operation)
    }
}

// 基本型の定義
const IntType = new Type('Int', 4, ['+', '-', '*', '/', '%', '<', '>', '=='])
const FloatType = new Type('Float', 8, ['+', '-', '*', '/', '<', '>', '=='])
const StringType = new Type('String', -1, ['+', '==', 'length', 'substring'])
const BoolType = new Type('Bool', 1, ['&&', '||', '!', '=='])
const AnyType = new Type('Any', -1, [])
```

「型って、データの種類と、そのデータに対してできる操作を定義するものなんですね」

「その通り。小説で言えば、登場人物の『役割』みたいなものかな」

◇◇◇◇

「Yume言語では、感情も型として扱ってみよう」

```javascript
// Yume言語の感情型システム
class EmotionType extends Type {
    constructor(emotion, intensity, mixable) {
        super(`Emotion<${emotion}>`, 4, ['intensify', 'mix', 'express'])
        this.emotion = emotion
        this.intensity = intensity  // 0.0 - 1.0
        this.mixable = mixable      // 混ぜ合わせ可能な感情リスト
    }
    
    // 感情の混合
    mix(other) {
        if (!this.canMixWith(other)) {
            throw new TypeError(`${this.emotion}と${other.emotion}は混ぜ合わせできません`)
        }
        
        const newIntensity = (this.intensity + other.intensity) / 2
        const mixedEmotion = this.determineMixedEmotion(other)
        
        return new EmotionType(
            mixedEmotion, 
            newIntensity, 
            this.mixable.filter(e => other.mixable.includes(e))
        )
    }
    
    canMixWith(other) {
        return this.mixable.includes(other.emotion)
    }
    
    determineMixedEmotion(other) {
        const combinations = {
            '喜び+愛': '幸福',
            '悲しみ+愛': '切ない愛',
            '期待+不安': '緊張',
            '怒り+悲しみ': '絶望'
        }
        
        const key1 = `${this.emotion}+${other.emotion}`
        const key2 = `${other.emotion}+${this.emotion}`
        
        return combinations[key1] || combinations[key2] || `複雑な${this.emotion}`
    }
}

// 基本感情型の定義
const JoyType = new EmotionType('喜び', 0.8, ['愛', '期待', '驚き'])
const LoveType = new EmotionType('愛', 0.9, ['喜び', '悲しみ', '不安'])
const SadnessType = new EmotionType('悲しみ', 0.6, ['愛', '怒り', '孤独'])
const ExpectationType = new EmotionType('期待', 0.7, ['喜び', '不安', '興奮'])

// 使用例
console.log('感情型システムのテスト:')
const mixedEmotion = JoyType.mix(LoveType)
console.log(`${JoyType.emotion} + ${LoveType.emotion} = ${mixedEmotion.emotion}`)
```

「感情にも型があるなんて面白いです！」

「プログラミングは、現実世界のあらゆるものを型として表現できるんだ」

◇◇◇◇

「次は、型チェッカーを作ってみよう」

```javascript
// Yume言語の型チェッカー
class YumeTypeChecker {
    constructor() {
        this.typeEnvironment = new Map()
        this.errors = []
        this.warnings = []
    }
    
    // プログラム全体の型チェック
    checkProgram(ast) {
        this.errors = []
        this.warnings = []
        
        return this.checkNode(ast)
    }
    
    // ノードの型チェック
    checkNode(node) {
        switch (node.type) {
            case 'EMOTION_DECLARATION':
                return this.checkEmotionDeclaration(node)
                
            case 'VARIABLE_DECLARATION':
                return this.checkVariableDeclaration(node)
                
            case 'BINARY_OPERATION':
                return this.checkBinaryOperation(node)
                
            case 'FUNCTION_CALL':
                return this.checkFunctionCall(node)
                
            case 'IF_STATEMENT':
                return this.checkIfStatement(node)
                
            default:
                return AnyType
        }
    }
    
    // 感情宣言の型チェック
    checkEmotionDeclaration(node) {
        const emotionType = this.getEmotionType(node.emotion)
        const valueType = this.checkNode(node.value)
        
        // 感情と値の型の整合性をチェック
        if (!this.isEmotionallyCompatible(emotionType, valueType)) {
            this.addWarning(
                `感情「${node.emotion}」と値の型「${valueType.name}」の組み合わせが不自然です`,
                node.location
            )
        }
        
        this.typeEnvironment.set(node.identifier, {
            type: valueType,
            emotion: emotionType,
            immutable: node.immutable || false
        })
        
        return valueType
    }
    
    // 二項演算の型チェック
    checkBinaryOperation(node) {
        const leftType = this.checkNode(node.left)
        const rightType = this.checkNode(node.right)
        
        // 演算の妥当性をチェック
        if (!this.canOperate(leftType, node.operator, rightType)) {
            this.addError(
                `型「${leftType.name}」と「${rightType.name}」に対して演算子「${node.operator}」は使用できません`,
                node.location
            )
            return AnyType
        }
        
        return this.inferResultType(leftType, node.operator, rightType)
    }
    
    // 感情的互換性のチェック
    isEmotionallyCompatible(emotionType, valueType) {
        const compatibilityRules = {
            '愛': ['String', 'Emotion<愛>', 'Person'],
            '喜び': ['Number', 'Bool', 'Achievement'],
            '悲しみ': ['String', 'Memory', 'Loss'],
            '期待': ['Future', 'Promise', 'Goal']
        }
        
        const compatibleTypes = compatibilityRules[emotionType.emotion] || []
        return compatibleTypes.some(compatible => 
            valueType.name.includes(compatible)
        )
    }
    
    // 操作可能性のチェック
    canOperate(leftType, operator, rightType) {
        // 両方の型が演算子をサポートしているかチェック
        if (!leftType.canPerform(operator) || !rightType.canPerform(operator)) {
            return false
        }
        
        // 型の互換性をチェック
        return leftType.isCompatibleWith(rightType) || 
               rightType.isCompatibleWith(leftType)
    }
    
    // 結果型の推論
    inferResultType(leftType, operator, rightType) {
        // 算術演算
        if (['+', '-', '*', '/', '%'].includes(operator)) {
            if (leftType.name === 'Int' && rightType.name === 'Int') {
                return IntType
            }
            if (leftType.name.includes('Number') || rightType.name.includes('Number')) {
                return FloatType
            }
        }
        
        // 比較演算
        if (['<', '>', '<=', '>=', '==', '!='].includes(operator)) {
            return BoolType
        }
        
        // 文字列結合
        if (operator === '+' && 
            (leftType.name === 'String' || rightType.name === 'String')) {
            return StringType
        }
        
        return AnyType
    }
    
    // エラーの追加
    addError(message, location) {
        this.errors.push({
            type: 'error',
            message: message,
            location: location
        })
    }
    
    // 警告の追加
    addWarning(message, location) {
        this.warnings.push({
            type: 'warning',
            message: message,
            location: location
        })
    }
    
    // 感情型の取得
    getEmotionType(emotion) {
        const emotionTypes = {
            '愛を込めて': LoveType,
            '喜びと共に': JoyType,
            '悲しみながら': SadnessType,
            '期待を持って': ExpectationType
        }
        
        return emotionTypes[emotion] || new EmotionType('不明', 0.5, [])
    }
}
```

◇◇◇◇

「実際に型チェックを動かしてみよう」

```javascript
// Yume言語の型チェック例
const typeChecker = new YumeTypeChecker()

// テストプログラム
const testProgram = {
    type: 'PROGRAM',
    statements: [
        {
            type: 'EMOTION_DECLARATION',
            emotion: '愛を込めて',
            identifier: 'メッセージ',
            value: {
                type: 'STRING_LITERAL',
                value: '優美への愛'
            },
            location: { line: 1, column: 1 }
        },
        {
            type: 'EMOTION_DECLARATION',
            emotion: '喜びと共に',
            identifier: 'カウント',
            value: {
                type: 'NUMBER_LITERAL',
                value: 42
            },
            location: { line: 2, column: 1 }
        },
        {
            type: 'BINARY_OPERATION',
            operator: '+',
            left: {
                type: 'IDENTIFIER',
                name: 'メッセージ'
            },
            right: {
                type: 'IDENTIFIER',
                name: 'カウント'
            },
            location: { line: 3, column: 1 }
        }
    ]
}

console.log('=== Yume言語型チェック ===')
const result = typeChecker.checkProgram(testProgram)

console.log('型チェック結果:', result.name)
console.log('エラー数:', typeChecker.errors.length)
console.log('警告数:', typeChecker.warnings.length)

if (typeChecker.errors.length > 0) {
    console.log('\\nエラー:')
    typeChecker.errors.forEach(error => {
        console.log(`- ${error.message} (行 ${error.location.line})`)
    })
}

if (typeChecker.warnings.length > 0) {
    console.log('\\n警告:')
    typeChecker.warnings.forEach(warning => {
        console.log(`- ${warning.message} (行 ${warning.location.line})`)
    })
}
```

「型チェッカーがエラーを見つけてくれるんですね」

「そう。コンパイル時にバグを見つけることで、実行時のエラーを防げる」

◇◇◇◇

「先輩、型安全性って、私たちの関係にも当てはまりますか？」

　優美の突然の質問に、僕は少し驚いた。

「どういう意味？」

「私たちが恋人同士になったのも、ある意味『型の変換』ですよね。幼馴染型から恋人型に」

　優美の比喩に、僕は思わず笑ってしまった。

「確かに。でも、その変換は型安全だったと思う」

「どうしてですか？」

「だって、基底にある『信頼』や『愛情』の型は変わっていないから」

◇◇◇◇

「もう少し高度な型システムを作ってみよう」

```javascript
// 高度な型システム：ジェネリクス
class GenericType {
    constructor(name, typeParameters) {
        this.name = name
        this.typeParameters = typeParameters
    }
    
    // 型パラメータを具体型で置換
    instantiate(concreteTypes) {
        const substitution = new Map()
        
        this.typeParameters.forEach((param, index) => {
            if (index < concreteTypes.length) {
                substitution.set(param, concreteTypes[index])
            }
        })
        
        return this.substitute(substitution)
    }
    
    substitute(substitution) {
        // 型パラメータを具体型で置換する処理
        // 簡略化
        return new Type(
            this.name + '<' + Array.from(substitution.values()).map(t => t.name).join(', ') + '>',
            -1,
            []
        )
    }
}

// リスト型の定義
class ListType extends GenericType {
    constructor(elementType) {
        super('List', ['T'])
        this.elementType = elementType
    }
    
    // リスト操作の型チェック
    checkOperation(operation, ...args) {
        switch (operation) {
            case 'append':
                if (args[0] && !args[0].isCompatibleWith(this.elementType)) {
                    throw new TypeError(`List<${this.elementType.name}>に${args[0].name}型は追加できません`)
                }
                return this
                
            case 'get':
                if (args[0] && !args[0].isCompatibleWith(IntType)) {
                    throw new TypeError('リストのインデックスは整数である必要があります')
                }
                return this.elementType
                
            case 'length':
                return IntType
                
            default:
                throw new Error(`未知の操作: ${operation}`)
        }
    }
}

// 関数型の定義
class FunctionType {
    constructor(parameterTypes, returnType) {
        this.parameterTypes = parameterTypes
        this.returnType = returnType
        this.name = `Function<${parameterTypes.map(t => t.name).join(', ')} -> ${returnType.name}>`
    }
    
    // 関数呼び出しの型チェック
    checkCall(argumentTypes) {
        if (argumentTypes.length !== this.parameterTypes.length) {
            throw new TypeError(`引数の数が一致しません。期待: ${this.parameterTypes.length}, 実際: ${argumentTypes.length}`)
        }
        
        for (let i = 0; i < argumentTypes.length; i++) {
            if (!argumentTypes[i].isCompatibleWith(this.parameterTypes[i])) {
                throw new TypeError(`引数${i + 1}の型が一致しません。期待: ${this.parameterTypes[i].name}, 実際: ${argumentTypes[i].name}`)
            }
        }
        
        return this.returnType
    }
}

// 使用例
const stringListType = new ListType(StringType)
const addFunction = new FunctionType([IntType, IntType], IntType)

console.log('\\n=== 高度な型システム ===')
console.log('文字列リスト型:', stringListType.name)

try {
    const resultType = stringListType.checkOperation('append', StringType)
    console.log('文字列追加: 成功')
} catch (error) {
    console.log('エラー:', error.message)
}

try {
    const callResult = addFunction.checkCall([IntType, IntType])
    console.log('関数呼び出し結果型:', callResult.name)
} catch (error) {
    console.log('エラー:', error.message)
}
```

◇◇◇◇

「型システムって、契約みたいなものですね」

　優美が感心したように言った。

「その通り。型は、プログラムの各部分が守るべき約束を明確にする」

「私たちの関係にも、そういう『契約』があるんでしょうか？」

　優美の質問に、僕は少し考えてから答えた。

「あるとすれば、『お互いを大切にする』という契約かな」

「それは型安全な契約ですね」

　優美が微笑んだ。

◇◇◇◇

「最後に、Yume言語の型システムを統合してみよう」

```javascript
// Yume言語の完全な型システム
class YumeTypeSystem {
    constructor() {
        this.typeChecker = new YumeTypeChecker()
        this.typeInference = new TypeInferenceEngine()
        this.constraints = new ConstraintSolver()
    }
    
    // プログラムの完全な型チェック
    analyze(program) {
        // 1. 型推論
        const inferredTypes = this.typeInference.infer(program)
        
        // 2. 制約解決
        const resolvedTypes = this.constraints.solve(inferredTypes)
        
        // 3. 型チェック
        const checkResult = this.typeChecker.checkProgramWithTypes(program, resolvedTypes)
        
        return {
            types: resolvedTypes,
            errors: checkResult.errors,
            warnings: checkResult.warnings,
            typeAnnotations: this.generateTypeAnnotations(resolvedTypes)
        }
    }
    
    // 型注釈の生成
    generateTypeAnnotations(types) {
        const annotations = new Map()
        
        types.forEach((type, location) => {
            annotations.set(location, {
                displayType: this.formatTypeForDisplay(type),
                tooltip: this.generateTypeTooltip(type)
            })
        })
        
        return annotations
    }
    
    formatTypeForDisplay(type) {
        if (type instanceof EmotionType) {
            return `感情<${type.emotion}>`
        }
        if (type instanceof ListType) {
            return `リスト<${this.formatTypeForDisplay(type.elementType)}>`
        }
        if (type instanceof FunctionType) {
            const params = type.parameterTypes.map(t => this.formatTypeForDisplay(t)).join(', ')
            const ret = this.formatTypeForDisplay(type.returnType)
            return `関数<${params} -> ${ret}>`
        }
        return type.name
    }
}

// 型推論エンジン
class TypeInferenceEngine {
    infer(program) {
        // 簡略化された型推論
        const inferredTypes = new Map()
        
        this.inferNode(program, inferredTypes)
        
        return inferredTypes
    }
    
    inferNode(node, types) {
        switch (node.type) {
            case 'STRING_LITERAL':
                types.set(node.location, StringType)
                break
                
            case 'NUMBER_LITERAL':
                if (Number.isInteger(node.value)) {
                    types.set(node.location, IntType)
                } else {
                    types.set(node.location, FloatType)
                }
                break
                
            case 'BOOLEAN_LITERAL':
                types.set(node.location, BoolType)
                break
        }
        
        // 子ノードの処理
        if (node.children) {
            node.children.forEach(child => this.inferNode(child, types))
        }
    }
}

// 制約解決器
class ConstraintSolver {
    solve(constraints) {
        // 制約解決のロジック
        // 簡略化
        return constraints
    }
}
```

◇◇◇◇

　レッスンの最後に、僕たちは今日学んだことを振り返っていた。

「型システムって、プログラムに安全性をもたらすんですね」

「そう。でも一番大切なのは、型システムがプログラマーの意図を明確にしてくれることだ」

　窓の外では、秋の夕日が静かに沈んでいく。

「先輩」

「ん？」

「私たちの関係の『型』は、どう定義されるんでしょう？」

　優美の質問に、僕は少し照れながら答えた。

「`Couple<雅史, 優美>`かな。型パラメータは僕たち二人」

「それは型安全な定義ですね」

　優美が嬉しそうに笑った。

```javascript
// 今日の学び
const todaysLesson = {
    technical: {
        concepts: ['型システム', '型チェック', '型推論'],
        implementations: ['感情型', 'ジェネリクス', '制約解決'],
        applications: ['安全性の保証', '意図の明確化', 'エラーの早期発見']
    },
    personal: {
        realization: '型は契約',
        relationship: 'Couple<雅史, 優美>',
        promise: 'お互いを大切にする契約'
    }
}
```

　型システム。それは、プログラムの安全性を保つだけでなく、プログラマーの意図を明確にし、コードに秩序をもたらす重要な仕組み。

　そして、僕たちの関係も、ある意味で型安全だ。長年培ってきた信頼という基盤の上に、新しい愛情という型を安全に構築できたのだから。

　明日も、優美と一緒に、型安全で美しいコードを書いていこう。