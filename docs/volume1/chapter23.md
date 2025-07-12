# 第23話：リファクタリング：より美しく

　金曜日の放課後。夏祭りから五日が経った。あの夜の手の温もりが、まだ心の片隅に残っている。

「先輩、今日は何を教えてくれるんですか？」

　優美の声が、いつもより少し弾んでいる。夏祭りの後から、お互いの距離がまた一歩近づいた気がする。

「今日はリファクタリングについて」

「リファクタリング？」

「コードをより美しく、読みやすく整える技術だ」

　僕は優美の顔を見つめた。

「動作は変えずに、内部構造を改善する。まるで……」

「まるで？」

「文章の推敲みたいなものかな」

◇◇◇◇

「優美は小説を書く時、一度で完璧に仕上げられるか？」

「無理です！　何度も読み返して、言葉を選び直して、構成を見直して……」

「プログラミングも同じなんだ。最初から完璧なコードは書けない」

　僕はホワイトボードに例を書き始めた。

```javascript
// リファクタリング前
function calc(a, b, c) {
    let result
    if (c == 1) {
        result = a + b
    } else if (c == 2) {
        result = a - b
    } else if (c == 3) {
        result = a * b
    } else if (c == 4) {
        result = a / b
    }
    return result
}

// リファクタリング後
function calculate(firstNumber, secondNumber, operation) {
    const operations = {
        add: (a, b) => a + b,
        subtract: (a, b) => a - b,
        multiply: (a, b) => a * b,
        divide: (a, b) => a / b
    }
    
    return operations[operation](firstNumber, secondNumber)
}
```

「わあ！　こっちの方がすっきりしてる！」

「変数名も分かりやすくなっているだろ？」

◇◇◇◇

「リファクタリングには、いくつかの大切な原則がある」

　僕は優美のノートを指差した。

「まず、『DRY原則』。Don't Repeat Yourselfの略だ」

```javascript
// 悪い例：同じ処理の繰り返し
function greetMorning(name) {
    console.log("おはよう、" + name + "さん")
    console.log("今日も一日頑張りましょう")
}

function greetAfternoon(name) {
    console.log("こんにちは、" + name + "さん")
    console.log("今日も一日頑張りましょう")
}

function greetEvening(name) {
    console.log("こんばんは、" + name + "さん")
    console.log("今日も一日頑張りましょう")
}

// 良い例：共通部分を抽出
function greet(timeOfDay, name) {
    const greetings = {
        morning: "おはよう",
        afternoon: "こんにちは",
        evening: "こんばんは"
    }
    
    console.log(`${greetings[timeOfDay]}、${name}さん`)
    console.log("今日も一日頑張りましょう")
}
```

「なるほど！　同じことを何度も書かないんですね」

「そう。繰り返しを減らすことで、修正も楽になる」

◇◇◇◇

「次は、『単一責任の原則』」

「単一責任？」

「一つの関数は、一つのことだけをするべきだという考え方」

```javascript
// リファクタリング前：色々なことをやりすぎ
function processNovel(novelText) {
    // 文字数カウント
    let charCount = novelText.length
    
    // 改行で分割
    let lines = novelText.split('\n')
    
    // 空行を削除
    lines = lines.filter(line => line.trim() !== '')
    
    // 各行の文字数チェック
    let tooLongLines = []
    for (let line of lines) {
        if (line.length > 40) {
            tooLongLines.push(line)
        }
    }
    
    // 結果を表示
    console.log("文字数：" + charCount)
    console.log("行数：" + lines.length)
    console.log("長すぎる行：" + tooLongLines.length)
    
    return {
        charCount: charCount,
        lineCount: lines.length,
        tooLongLines: tooLongLines
    }
}

// リファクタリング後：機能ごとに分割
function countCharacters(text) {
    return text.length
}

function splitIntoLines(text) {
    return text.split('\n').filter(line => line.trim() !== '')
}

function findLongLines(lines, maxLength = 40) {
    return lines.filter(line => line.length > maxLength)
}

function analyzeNovel(novelText) {
    const charCount = countCharacters(novelText)
    const lines = splitIntoLines(novelText)
    const longLines = findLongLines(lines)
    
    return {
        charCount,
        lineCount: lines.length,
        longLines
    }
}
```

◇◇◇◇

「先輩」

「ん？」

「私たちの関係も、リファクタリングできますか？」

　突然の質問に、心臓が跳ねた。

「どういう意味だ？」

「今の関係を、もっと……美しく、分かりやすくできるかなって」

　優美の頬が薄く赤らんでいる。

「例えば？」

「今は『幼馴染で、プログラミングの先生と生徒で、でも手を繋いだこともあって……』って、ちょっと複雑じゃないですか？」

　確かに、僕たちの関係は曖昧で複雑だ。

◇◇◇◇

「じゃあ、僕たちの関係をコードで表してみようか」

```javascript
// 現在の複雑な関係
class OurRelationship {
    constructor() {
        this.isChildhoodFriend = true
        this.isTeacher = true
        this.isStudent = true
        this.hasHeldHands = true
        this.sharesProgrammingDream = true
        this.status = "????"
    }
    
    getStatus() {
        if (this.isChildhoodFriend && this.isTeacher && this.isStudent) {
            if (this.hasHeldHands && this.sharesProgrammingDream) {
                return "とても特別な何か"
            }
        }
        return "複雑"
    }
}

// リファクタリング案
class SimplifiedRelationship {
    constructor(person1, person2) {
        this.members = [person1, person2]
        this.feelings = {
            [person1]: "大切",
            [person2]: "大切"
        }
        this.sharedDreams = ["Yume言語を作る"]
        this.memories = ["夏祭り", "プログラミングレッスン"]
    }
    
    getStatus() {
        // シンプルに本質だけ
        return "お互いを大切に思う二人"
    }
}
```

「これって……」

　優美の目が潤んでいる。

◇◇◇◇

「コードの美しさって何だと思う？」

「え？」

「技術的には、読みやすさとか、保守しやすさとか、効率とか。でも……」

　僕は優美の目を見つめた。

「本当に美しいコードは、書いた人の想いが伝わるコードだと思うんだ」

　優美が小さく息を呑む音が聞こえた。

「優美と一緒に作るYume言語も、きっと美しくなる」

「どうしてですか？」

「二人の想いが込められているから」

◇◇◇◇

　レッスンの最後に、僕は特別なリファクタリングを見せた。

```javascript
// Yume言語の核心部分をリファクタリング
class YumeInterpreter {
    constructor() {
        this.environment = new Environment()
        this.emotions = new EmotionEngine()
    }
    
    // Before: 複雑な評価関数
    evaluate_old(expression) {
        if (Array.isArray(expression)) {
            if (expression[0] === 'define') {
                // 定義処理
            } else if (expression[0] === 'lambda') {
                // 関数作成
            } else if (expression[0] === 'if') {
                // 条件分岐
            } else {
                // 関数適用
            }
        } else {
            // アトム評価
        }
    }
    
    // After: 美しく整理された評価関数
    evaluate(expression) {
        if (!Array.isArray(expression)) {
            return this.evaluateAtom(expression)
        }
        
        const [operator, ...args] = expression
        const evaluator = this.getEvaluator(operator)
        return evaluator(args)
    }
    
    getEvaluator(operator) {
        const evaluators = {
            'define': this.evaluateDefine.bind(this),
            'lambda': this.evaluateLambda.bind(this),
            'if': this.evaluateIf.bind(this),
            'emotion': this.evaluateEmotion.bind(this)
        }
        
        return evaluators[operator] || this.evaluateApplication.bind(this)
    }
    
    // 新機能：感情を評価
    evaluateEmotion(args) {
        const [emotion, intensity] = args
        return this.emotions.express(emotion, intensity)
    }
}
```

「感情を評価する機能！」

「Yume言語らしいだろ？」

◇◇◇◇

「優美」

「はい」

「リファクタリングは、ただコードを綺麗にするだけじゃない」

　僕は深呼吸をした。

「本質を見つめ直して、より良い形を探す作業なんだ」

「先輩……」

「だから、僕たちの関係も、いつかリファクタリングできるといいな」

　優美の顔が真っ赤になった。でも、その瞳は真っ直ぐ僕を見つめている。

「私も、そう思います」

◇◇◇◇

　優美が帰った後、僕は今日のコードを見返していた。

　リファクタリング。より美しく、より分かりやすく。

（僕たちの関係も、もっとシンプルにできるはずだ）

　窓の外を見ると、夕焼けが街を優しく包んでいた。

　いつか、僕たちの関係を表すコードが、たった一行で済む日が来るかもしれない。

```javascript
const us = new Lovers("雅史", "優美")
```

　そんな日を夢見ながら、僕は明日の教材の準備を始めた。美しいコードと、美しい関係を目指して。