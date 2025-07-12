# 第27話：セキュリティ：大切なものを守る

　木曜日の放課後。体育祭の翌日。昨日の優美の応援が、まだ耳に残っている。赤組なのに、僕のために声を張り上げてくれた優美。その姿が、愛おしくてたまらない。

「先輩、昨日はお疲れ様でした」

　優美がいつものように部屋に入ってきた。少し照れたような笑顔を浮かべている。

「優美こそ、応援ありがとう」

「組の色を超えて応援しちゃいました」

　お互いに昨日のことを思い出して、少し赤くなってしまう。

「今日は、セキュリティについて学ぼう」

「セキュリティ？」

「大切なものを守る技術だ」

◇◇◇◇

「優美、大切なものってどうやって守る？」

「え？　鍵をかけたり、金庫に入れたり……」

「プログラミングでも同じなんだ。大切なデータを守るために、様々な技術を使う」

　僕はホワイトボードに図を描き始めた。

```javascript
// パスワードの保護（悪い例）
let userDatabase = [
    { username: "yumi", password: "12345" },  // 平文で保存は危険！
    { username: "masashi", password: "password" }
]

// パスワードの保護（良い例）
const crypto = require('crypto')

function hashPassword(password) {
    // ソルトを使ってハッシュ化
    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
    
    return { salt, hash }
}

function verifyPassword(password, salt, hash) {
    const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
    return hash === verifyHash
}
```

「パスワードをそのまま保存するのは危険なんですね」

「そう。もし誰かがデータベースを見てしまったら、全員のパスワードがバレてしまう」

◇◇◇◇

「他にも、色んな攻撃から守る必要がある」

```javascript
// SQLインジェクション対策
// 危険な例
function getUser(username) {
    let query = `SELECT * FROM users WHERE username = '${username}'`
    // もし username が "admin'; DROP TABLE users; --" だったら大変！
}

// 安全な例
function getUserSafe(username) {
    let query = 'SELECT * FROM users WHERE username = ?'
    // プレースホルダーを使って安全に
    return db.query(query, [username])
}

// XSS（クロスサイトスクリプティング）対策
// 危険な例
function displayMessage(message) {
    document.getElementById('output').innerHTML = message
    // もし message に <script>alert('攻撃！')</script> が含まれていたら？
}

// 安全な例
function displayMessageSafe(message) {
    // HTMLエスケープ
    let escaped = message
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
    
    document.getElementById('output').innerHTML = escaped
}
```

「怖い……でも、大切ですね」

「優美の小説も、勝手に改ざんされたら嫌だろ？」

「絶対に嫌です！」

◇◇◇◇

「先輩」

「ん？」

「私たちの気持ちも、セキュリティで守れますか？」

　突然の質問に、心臓が跳ねた。

「気持ちを守る？」

「誰にも邪魔されないように、大切に守りたいんです」

　優美の真剣な表情に、僕も真剣に答える。

「技術では守れないかもしれない。でも……」

「でも？」

「お互いを信じることが、最高のセキュリティかもしれない」

◇◇◇◇

「Yume言語にもセキュリティを実装しよう」

```javascript
// Yume言語のセキュリティ機能
class SecureYumeInterpreter {
    constructor() {
        this.environment = new Environment()
        this.permissions = new Map()
        this.secrets = new WeakMap()
    }
    
    // 機密情報の保護
    createSecret(value) {
        let secret = { value, createdAt: new Date() }
        let token = Symbol('secret')
        this.secrets.set(token, secret)
        return token
    }
    
    // アクセス制御
    grantPermission(user, resource, action) {
        let key = `${user}:${resource}:${action}`
        this.permissions.set(key, true)
    }
    
    checkPermission(user, resource, action) {
        let key = `${user}:${resource}:${action}`
        return this.permissions.has(key)
    }
    
    // 感情の暗号化（特別な機能）
    encryptEmotion(emotion, key) {
        // 簡易的な暗号化（実際はもっと複雑）
        return emotion.split('').map((char, i) => 
            String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(i % key.length))
        ).join('')
    }
    
    decryptEmotion(encrypted, key) {
        // 復号化（XORは可逆的）
        return this.encryptEmotion(encrypted, key)
    }
}

// 二人だけの秘密
let yume = new SecureYumeInterpreter()
let secretFeeling = yume.createSecret("大好き")
let encryptedMessage = yume.encryptEmotion("ずっと一緒にいたい", "YumiMasashi")
```

「感情の暗号化！」

「二人だけの秘密を守るために」

◇◇◇◇

「セキュリティで一番大切なのは、『信頼の輪』を作ること」

　僕は新しい図を描いた。

```javascript
// 信頼の輪（Web of Trust）
class TrustNetwork {
    constructor() {
        this.trustRelations = new Map()
    }
    
    // 信頼関係を築く
    establishTrust(person1, person2, level = 1) {
        let key1 = `${person1}->${person2}`
        let key2 = `${person2}->${person1}`
        
        this.trustRelations.set(key1, {
            from: person1,
            to: person2,
            level: level,
            established: new Date()
        })
        
        // 相互の信頼
        this.trustRelations.set(key2, {
            from: person2,
            to: person1,
            level: level,
            established: new Date()
        })
    }
    
    // 信頼度を上げる
    increaseTrust(person1, person2) {
        let key = `${person1}->${person2}`
        let relation = this.trustRelations.get(key)
        
        if (relation) {
            relation.level++
            relation.lastUpdated = new Date()
        }
    }
    
    // 最高レベルの信頼
    getTrustLevel(person1, person2) {
        let key = `${person1}->${person2}`
        let relation = this.trustRelations.get(key)
        return relation ? relation.level : 0
    }
}

// 使用例
let trust = new TrustNetwork()
trust.establishTrust("優美", "雅史", 10)  // 最初から高い信頼

// 時間と共に成長
for (let day = 0; day < 365; day++) {
    trust.increaseTrust("優美", "雅史")
}
```

◇◇◇◇

「先輩、私たちの信頼レベルは？」

「測定不能なくらい高い」

　僕の答えに、優美の顔が真っ赤になった。

「でも、本当に大切なものを守るには、技術だけじゃ足りない」

「何が必要ですか？」

「勇気と、正直さと……」

　僕は優美の目を見つめた。

「愛情かな」

◇◇◇◇

　レッスンの最後に、僕は特別なセキュリティシステムを見せた。

```javascript
// 究極のセキュリティ：愛のファイアウォール
class LoveFirewall {
    constructor(person1, person2) {
        this.protectedHearts = [person1, person2]
        this.sharedMemories = []
        this.secretPromises = []
    }
    
    // 外部からの攻撃をブロック
    block(threat) {
        if (threat.type === "嫉妬" || threat.type === "誤解") {
            console.log(`${threat.type}をブロックしました`)
            return false
        }
        return true
    }
    
    // 大切な思い出を守る
    protectMemory(memory) {
        this.sharedMemories.push({
            content: memory,
            protected: true,
            timestamp: new Date()
        })
    }
    
    // 約束を暗号化して保存
    makeSecretPromise(promise) {
        this.secretPromises.push({
            content: this.encrypt(promise),
            sealed: true
        })
    }
    
    encrypt(text) {
        // ハート型の暗号化（概念的）
        return `💗${text}💗`
    }
}

// 二人のファイアウォール
let ourFirewall = new LoveFirewall("雅史", "優美")
ourFirewall.protectMemory("初めてのプログラミングレッスン")
ourFirewall.protectMemory("夏祭りで手を繋いだこと")
ourFirewall.protectMemory("体育祭の応援")
ourFirewall.makeSecretPromise("ずっと一緒にYume言語を作り続ける")
```

「これって……」

「僕たちの関係を守るセキュリティシステム」

◇◇◇◇

　優美が帰った後、僕は窓の外を見ながら考えていた。

　セキュリティは、大切なものを守る技術。でも、本当に大切なのは、守りたいと思う気持ちそのものだ。

（優美との時間を、ずっと守りたい）

　パソコンの画面には、今日書いたコードが表示されている。その中でも、特に目を引くのは……

```javascript
// 未実装：最重要機能
function protectOurLove() {
    // TODO: 勇気を出して実装する
    return "永遠に"
}
```

　いつか、このTODOを解決する日が来る。その日まで、僕は優美と一緒に、大切なものを守る方法を学び続ける。

　技術で守れるものと、心で守るもの。その両方を大切にしながら。