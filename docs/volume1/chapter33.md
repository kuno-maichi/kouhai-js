# 第33話：コードリーディング：読みやすいコード

　火曜日の放課後。優美が部屋に入ってきた時、彼女は少し困ったような顔をしていた。

「先輩、相談があるんです」

「どうしたんだ？」

「最近、自分で書いたコードを後で見返すと、何をやっているか分からなくなることがあって……」

　優美の悩みは、すべてのプログラマーが通る道だ。

「それは、コードの可読性の問題だな。今日は、読みやすいコードの書き方を学ぼう」

◇◇◇◇

「優美、小説を書く時、読者のことを考えるよね？」

「はい。読みやすさとか、理解しやすさとか」

「プログラミングも同じだ。コードの読者は、未来の自分かもしれないし、他の開発者かもしれない」

　僕はホワイトボードに例を書き始めた。

```javascript
// 読みにくいコード
function calc(a,b,c){
    let d=b*b-4*a*c;
    if(d<0)return null;
    let e=Math.sqrt(d);
    return[(-b+e)/(2*a),(-b-e)/(2*a)];
}

// 読みやすいコード
function solveQuadraticEquation(a, b, c) {
    // 判別式を計算: b² - 4ac
    const discriminant = b * b - 4 * a * c
    
    // 判別式が負の場合、実数解なし
    if (discriminant < 0) {
        return null
    }
    
    // 二次方程式の解の公式を使用
    const sqrtDiscriminant = Math.sqrt(discriminant)
    const solution1 = (-b + sqrtDiscriminant) / (2 * a)
    const solution2 = (-b - sqrtDiscriminant) / (2 * a)
    
    return [solution1, solution2]
}
```

「わあ、全然違いますね！」

「機能は同じだけど、理解のしやすさが全く違う」

◇◇◇◇

「読みやすいコードの原則を教えよう」

```javascript
// 1. 意味のある名前を使う
// 悪い例
const d = new Date()
const yrs = calcAge(d)

// 良い例
const birthDate = new Date()
const ageInYears = calculateAge(birthDate)

// 2. 関数は一つのことをうまくやる
// 悪い例
function processUserData(user) {
    // 検証
    if (!user.name || !user.email) {
        throw new Error('Invalid user')
    }
    
    // データベースに保存
    db.save(user)
    
    // メール送信
    sendEmail(user.email, 'Welcome!')
    
    // ログ記録
    console.log('User processed:', user.name)
}

// 良い例
function validateUser(user) {
    if (!user.name || !user.email) {
        throw new Error('Invalid user')
    }
}

function saveUser(user) {
    return db.save(user)
}

function sendWelcomeEmail(email) {
    return sendEmail(email, 'Welcome!')
}

function logUserAction(action, userName) {
    console.log(`${action}:`, userName)
}

// 使用時
function processUser(user) {
    validateUser(user)
    saveUser(user)
    sendWelcomeEmail(user.email)
    logUserAction('User processed', user.name)
}
```

「関数を小さく分けると、それぞれが理解しやすくなるんですね」

「そう。そして、テストもしやすくなる」

◇◇◇◇

「コメントの書き方も重要だ」

```javascript
// 悪いコメントの例
// iをインクリメント
i++

// カウンターが10になったら
if (counter === 10) {
    // 処理を実行
    process()
}

// 良いコメントの例
// ユーザーの連続ログイン失敗回数が上限に達した場合、
// セキュリティのためアカウントを一時的にロック
if (failedLoginAttempts >= MAX_LOGIN_ATTEMPTS) {
    lockAccount(userId, LOCK_DURATION_MINUTES)
}

// なぜこの処理が必要かを説明
// レガシーAPIとの互換性のため、日付形式を変換する必要がある
const formattedDate = convertToLegacyFormat(date)
```

「コメントは『なぜ』を説明するんですね」

「コードは『何を』しているかを示し、コメントは『なぜ』それが必要かを説明する」

◇◇◇◇

「Yume言語のコードも、読みやすく書き直してみよう」

```javascript
// リファクタリング前
class YumeLang {
    constructor() {
        this.v = {}  // 変数
        this.f = {}  // 関数
        this.s = []  // スタック
    }
    
    e(c) {  // 実行
        if (c.t === 'n') return c.v
        if (c.t === 'v') return this.v[c.n]
        if (c.t === 'f') {
            let a = c.a.map(x => this.e(x))
            return this.f[c.n](...a)
        }
    }
}

// リファクタリング後
class YumeInterpreter {
    constructor() {
        this.variables = new Map()
        this.functions = new Map()
        this.executionStack = []
        this.emotionContext = new EmotionContext()
    }
    
    /**
     * 式を評価する
     * @param {Expression} expression - 評価する式
     * @returns {any} 評価結果
     */
    evaluate(expression) {
        switch (expression.type) {
            case 'NUMBER':
                return expression.value
                
            case 'VARIABLE':
                return this.getVariable(expression.name)
                
            case 'FUNCTION_CALL':
                return this.callFunction(
                    expression.functionName,
                    expression.arguments
                )
                
            default:
                throw new Error(`Unknown expression type: ${expression.type}`)
        }
    }
    
    getVariable(name) {
        if (!this.variables.has(name)) {
            throw new Error(`Undefined variable: ${name}`)
        }
        return this.variables.get(name)
    }
    
    callFunction(functionName, args) {
        if (!this.functions.has(functionName)) {
            throw new Error(`Undefined function: ${functionName}`)
        }
        
        const evaluatedArgs = args.map(arg => this.evaluate(arg))
        const func = this.functions.get(functionName)
        
        return func.apply(this, evaluatedArgs)
    }
}
```

「こんなに読みやすくなるんですね！」

「変数名を省略しないだけでも、大きな違いがある」

◇◇◇◇

「先輩」

「ん？」

「私たちの関係も、読みやすくなりましたね」

　突然の言葉に、ドキッとした。

「どういう意味？」

「前は、お互いの気持ちが『暗号化』されていたけど、今は『可読性』が高くなった」

　優美の表現に、思わず笑ってしまった。

「確かに。告白する前は、お互いの気持ちを『デバッグ』するのが大変だった」

「でも今は、コメントなしでも理解できます」

◇◇◇◇

「コードのフォーマットも大切だ」

```javascript
// 一貫性のあるフォーマット
class StoryWriter {
    constructor(author, title) {
        this.author = author
        this.title = title
        this.chapters = []
        this.currentChapter = null
    }
    
    startChapter(chapterTitle) {
        this.currentChapter = {
            title: chapterTitle,
            content: [],
            wordCount: 0
        }
    }
    
    writeParagraph(text) {
        if (!this.currentChapter) {
            throw new Error('章を開始してください')
        }
        
        this.currentChapter.content.push({
            type: 'paragraph',
            text: text,
            timestamp: new Date()
        })
        
        this.currentChapter.wordCount += text.length
    }
    
    finishChapter() {
        if (!this.currentChapter) {
            throw new Error('開始された章がありません')
        }
        
        this.chapters.push(this.currentChapter)
        this.currentChapter = null
    }
    
    getTotalWordCount() {
        return this.chapters.reduce(
            (total, chapter) => total + chapter.wordCount,
            0
        )
    }
}

// 使用例
const myStory = new StoryWriter('優美', '幼馴染とプログラミング')

myStory.startChapter('出会い')
myStory.writeParagraph('ベランダ越しに聞こえた声。それが全ての始まりだった。')
myStory.writeParagraph('「先輩、私だけのプログラミング言語作ってください！」')
myStory.finishChapter()

console.log(`現在の文字数: ${myStory.getTotalWordCount()}`)
```

「インデントとか、空白の使い方が統一されてますね」

「一貫性があると、コードの構造が見やすくなる」

◇◇◇◇

「最後に、読みやすさのチェックリストを作ろう」

```javascript
// コードレビューチェックリスト
class CodeReadabilityChecker {
    constructor() {
        this.checks = [
            {
                name: '命名規則',
                check: (code) => {
                    // 変数名が意味を持っているか
                    // camelCaseが使われているか
                    // 省略語を避けているか
                }
            },
            {
                name: '関数の長さ',
                check: (code) => {
                    // 関数が20行以内か
                    // 一つの責任だけを持っているか
                }
            },
            {
                name: 'コメント',
                check: (code) => {
                    // 複雑な処理にコメントがあるか
                    // コメントが最新の状態か
                    // 不要なコメントがないか
                }
            },
            {
                name: 'エラー処理',
                check: (code) => {
                    // エラーが適切に処理されているか
                    // エラーメッセージが分かりやすいか
                }
            }
        ]
    }
    
    review(code) {
        const results = []
        
        for (const check of this.checks) {
            results.push({
                checkName: check.name,
                passed: check.check(code),
                suggestions: this.getSuggestions(check.name)
            })
        }
        
        return results
    }
    
    getSuggestions(checkName) {
        const suggestions = {
            '命名規則': [
                '変数名は名詞、関数名は動詞で始める',
                '省略語より完全な単語を使う',
                'getUserById > getUsrById'
            ],
            '関数の長さ': [
                '複雑な関数は小さな関数に分割',
                '各関数は一つの責任だけを持つ',
                'テストしやすい単位に分ける'
            ]
        }
        
        return suggestions[checkName] || []
    }
}
```

◇◇◇◇

　レッスンの最後に、僕は優美に特別なコードを見せた。

```javascript
// 私たちの物語を読みやすく
class OurStory {
    constructor() {
        this.title = '幼馴染とプログラミング言語'
        this.protagonists = ['雅史', '優美']
        this.currentChapter = 33
        this.relationship = 'lovers'
    }
    
    // 物語の始まり
    beginning() {
        return {
            scene: 'ベランダ越しの会話',
            dialogue: '先輩、私だけのプログラミング言語作ってください！',
            emotion: 'excitement',
            foreshadowing: 'この言葉が、二人の運命を変えることになる'
        }
    }
    
    // 現在の章
    currentMoment() {
        return {
            learning: 'コードの可読性',
            relationship: '恋人同士',
            sharedDream: 'Yume言語の完成',
            happiness: Number.MAX_SAFE_INTEGER
        }
    }
    
    // これからの物語
    future() {
        return {
            challenges: ['大学受験', 'Yume言語の実装'],
            promises: ['一緒に乗り越える', 'ずっと一緒にいる'],
            ending: undefined  // まだ書かれていない未来
        }
    }
}

const ourJourney = new OurStory()

console.log('私たちの物語は、とても読みやすく、そして美しい')
```

「これって……」

「僕たちの物語も、読みやすく、理解しやすいものにしていこう」

　優美の頬が赤く染まった。

◇◇◇◇

　優美が帰った後、僕は今日のレッスンを振り返っていた。

　読みやすいコード。それは、他者への思いやりの表れだ。

（優美との関係も、お互いに「読みやすく」なった）

　窓の外を見ると、秋の夜空に月が輝いていた。

　コードも、人間関係も、透明性と思いやりが大切。相手のことを考えて、分かりやすく表現すること。それが、良いコードと良い関係の共通点だ。

```javascript
// 今日の学び
const lesson = {
    technical: {
        concept: 'コードの可読性',
        practices: ['意味のある命名', '適切なコメント', '一貫性'],
        benefit: '未来の自分と他者への贈り物'
    },
    personal: {
        realization: '透明性の大切さ',
        growth: '相手を思いやる表現',
        love: 'readable && understandable'
    }
}
```

　明日も、優美と一緒に、読みやすく美しいコードを書いていこう。そして、僕たちの物語も、誰が読んでも温かい気持ちになれるような、そんな物語にしていこう。