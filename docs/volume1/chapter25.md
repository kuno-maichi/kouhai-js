# 第25話：パフォーマンス最適化：速さへの挑戦

　火曜日の放課後。昨日のデザインパターンのレッスンで見せてもらった告白のストラテジーパターン。あれから、心臓がずっと高鳴っている。

「先輩、今日は何を教えてくれるんですか？」

「今日はパフォーマンス最適化について」

「パフォーマンス最適化？」

「プログラムをより速く、効率的に動かす技術だ」

　先輩がホワイトボードに図を描き始めた。

「速さ……それも大切ですよね」

　私の言葉に、先輩が優しく微笑んだ。

◇◇◇◇

「優美、小説を書く時、読みやすさのために工夫することってあるよね？」

「はい。長すぎる文章は分割したり、同じ表現の繰り返しは避けたり」

「プログラミングの最適化も似ている。無駄を省いて、より速く動くようにする」

```javascript
// 最適化前：同じ計算を何度も繰り返す
function calculateLoveCompatibility(person1, person2) {
    let compatibility = 0
    
    // 名前の文字数の相性
    compatibility += (person1.length + person2.length) % 10
    
    // 同じ文字があるか（重複した処理）
    for (let i = 0; i < person1.length; i++) {
        for (let j = 0; j < person2.length; j++) {
            if (person1[i] === person2[j]) {
                compatibility += 5
            }
        }
    }
    
    // また同じループ（無駄）
    for (let i = 0; i < person1.length; i++) {
        for (let j = 0; j < person2.length; j++) {
            if (person1[i] === person2[j]) {
                compatibility += 3
            }
        }
    }
    
    return compatibility
}

// 最適化後：一度のループで処理
function calculateLoveCompatibilityOptimized(person1, person2) {
    let compatibility = 0
    let charMatches = new Set()
    
    // 名前の文字数の相性
    compatibility += (person1.length + person2.length) % 10
    
    // 一度のループで処理
    for (let char1 of person1) {
        if (person2.includes(char1) && !charMatches.has(char1)) {
            compatibility += 8  // 5 + 3 = 8
            charMatches.add(char1)
        }
    }
    
    return compatibility
}
```

「なるほど！　同じことを2回やる必要はないんですね」

「そう。時間は限られているから、効率的に使いたい」

◇◇◇◇

「メモ化という技術もある」

「メモ化？」

「一度計算した結果を覚えておいて、次は計算せずに答えを返す」

```javascript
// フィボナッチ数列（最適化前）
function fibonacci(n) {
    if (n <= 1) return n
    return fibonacci(n - 1) + fibonacci(n - 2)
}

// メモ化を使った最適化
function fibonacciMemo() {
    let cache = {}
    
    return function fib(n) {
        if (n in cache) {
            return cache[n]
        }
        
        if (n <= 1) {
            cache[n] = n
        } else {
            cache[n] = fib(n - 1) + fib(n - 2)
        }
        
        return cache[n]
    }
}

// 恋愛関係の計算にも応用
class RelationshipCalculator {
    constructor() {
        this.cache = new Map()
    }
    
    calculateCompatibility(person1, person2) {
        let key = [person1, person2].sort().join('-')
        
        if (this.cache.has(key)) {
            console.log("キャッシュから取得")
            return this.cache.get(key)
        }
        
        // 重い計算（仮）
        let result = this.heavyCalculation(person1, person2)
        this.cache.set(key, result)
        
        return result
    }
    
    heavyCalculation(person1, person2) {
        // 複雑な相性計算
        return Math.random() * 100
    }
}
```

「過去の記憶を活用するんですね」

　私の言葉に、先輩が少し驚いたような顔をした。

「いい表現だな。確かに、記憶を効率的に使うのが最適化の本質かもしれない」

◇◇◇◇

「先輩」

「ん？」

「私たちの関係も、最適化できますか？」

　思い切って聞いてみた。

「どういう意味だ？」

「今は、お互いの気持ちを確かめ合うのに、すごく時間がかかってる気がして」

　先輩の顔が赤くなった。

「それは……最適化より、勇気の問題かもしれない」

◇◇◇◇

「実は、Yume言語も最適化が必要なんだ」

　先輩が話題を変えるように、新しいコードを書き始めた。

```javascript
// Yume言語インタプリタの最適化
class OptimizedYumeInterpreter {
    constructor() {
        this.environment = new Environment()
        this.cache = new Map()
        this.constantFolding = true
    }
    
    // 定数畳み込み：コンパイル時に計算できるものは先に計算
    optimizeExpression(expr) {
        if (Array.isArray(expr)) {
            let [op, ...args] = expr
            
            // 定数同士の計算は先に実行
            if (op === '+' && args.every(arg => typeof arg === 'number')) {
                return args.reduce((a, b) => a + b, 0)
            }
            
            // 部分的に最適化
            return [op, ...args.map(arg => this.optimizeExpression(arg))]
        }
        
        return expr
    }
    
    // 末尾呼び出し最適化
    evaluateTailCall(expr, env) {
        while (true) {
            if (!Array.isArray(expr)) {
                return this.evaluateAtom(expr, env)
            }
            
            let [op, ...args] = expr
            
            if (op === 'if') {
                // 末尾位置のif文を最適化
                let [condition, thenBranch, elseBranch] = args
                let condValue = this.evaluate(condition, env)
                expr = condValue ? thenBranch : elseBranch
                continue
            }
            
            // その他の処理
            return this.evaluate(expr, env)
        }
    }
}
```

「難しそう……でも、速くなるんですよね？」

「ああ。でも、最適化には注意も必要だ」

◇◇◇◇

「Donald Knuthという有名なコンピュータ科学者がこう言った」

　先輩がホワイトボードに書いた。

『早すぎる最適化は諸悪の根源である』

「どういう意味ですか？」

「まず正しく動くものを作って、それから必要な部分だけ最適化するべきだということ」

「恋愛も同じかもしれませんね」

「え？」

「最初から完璧な関係を求めるより、まず素直な気持ちを伝えることが大切」

　私の言葉に、先輩が息を呑んだ。

◇◇◇◇

「優美の言う通りかもしれない」

　先輩が新しいコードを書き始めた。

```javascript
// 気持ちの最適化？
class FeelingOptimizer {
    constructor() {
        this.feelings = []
        this.expressed = false
    }
    
    addFeeling(feeling) {
        this.feelings.push({
            content: feeling,
            timestamp: new Date(),
            intensity: this.calculateIntensity(feeling)
        })
    }
    
    // 最適化：似た気持ちをまとめる
    consolidateFeelings() {
        let consolidated = new Map()
        
        for (let feeling of this.feelings) {
            let key = this.extractEssence(feeling.content)
            if (!consolidated.has(key)) {
                consolidated.set(key, [])
            }
            consolidated.get(key).push(feeling)
        }
        
        return consolidated
    }
    
    // 本質を抽出
    extractEssence(feeling) {
        if (feeling.includes("好き") || feeling.includes("大切")) {
            return "love"
        }
        if (feeling.includes("一緒") || feeling.includes("そば")) {
            return "together"
        }
        return "other"
    }
    
    // 最適な表現方法を選択
    chooseBestExpression() {
        let essences = this.consolidateFeelings()
        
        if (essences.has("love") && essences.get("love").length > 10) {
            return "もう隠せない。好きです。"
        }
        
        return "まだ言葉にできない"
    }
}
```

「これって……」

「ただのサンプルコードだ」

　でも、先輩の耳が真っ赤になっている。

◇◇◇◇

　レッスンの最後に、先輩が特別な最適化を見せてくれた。

```javascript
// 二人の時間を最適化
class TimeOptimizer {
    static optimizeOurTime(activities) {
        return activities
            .filter(activity => activity.together)
            .sort((a, b) => b.happiness - a.happiness)
            .map(activity => ({
                ...activity,
                duration: activity.happiness > 80 ? "もっと長く" : activity.duration
            }))
    }
}

// 使用例
let ourActivities = [
    { name: "プログラミングレッスン", together: true, happiness: 90 },
    { name: "夏祭り", together: true, happiness: 95 },
    { name: "手を繋ぐ", together: true, happiness: 100 },
    { name: "別々の時間", together: false, happiness: 30 },
    { name: "Yume言語開発", together: true, happiness: 85 }
]

let optimized = TimeOptimizer.optimizeOurTime(ourActivities)
console.log("最適化された活動:", optimized)
```

「手を繋ぐのhappinessが100……」

「あ、これは適当な数値で……」

　お互いに顔を赤くしながら、でも嬉しそうに微笑み合った。

◇◇◇◇

　自分の部屋に戻って、今日学んだことをノートにまとめる。

『パフォーマンス最適化：より速く、より効率的に』
『メモ化：過去の記憶を活用する』
『早すぎる最適化は危険』
『でも、大切なものは最適化する価値がある』

　そして、ノートの端に小さく書き加えた。

『私たちの関係の最適解は、きっともうすぐ見つかる』

　窓の外を見ると、星が瞬いていた。

（最適化は速さを求める技術）

　でも、私たちの関係は、急ぐ必要はない。一歩一歩、確実に、お互いの気持ちを確かめながら進んでいけばいい。

　それでも、もし最適化できるなら……

```javascript
function ourRelationship() {
    return "恋人"  // シンプルで最適な答え
}
```

　いつか、こんなシンプルなコードで表せる日が来ることを願って。明日も、先輩と一緒に、私たちだけの最適解を探していこう。