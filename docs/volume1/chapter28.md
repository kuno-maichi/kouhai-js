# 第28話：バージョン管理：歴史を刻む

　金曜日の放課後。先週のセキュリティのレッスンから一週間。昨日は少し風邪気味だった優美だったが、今日は元気な顔で部屋にやってきた。

「先輩、今日は何を教えてくれるんですか？」

「体調は大丈夫か？」

「はい！　もうすっかり良くなりました」

　優美の元気な声に、安心した。

「今日は、バージョン管理について」

「バージョン管理？」

「プログラムの変更履歴を記録し、管理する技術だ」

◇◇◇◇

「優美、小説を書く時、何度も書き直すことがあるよね？」

「はい。最初の草稿から、だいぶ変わることもあります」

「その時、前のバージョンを残しておきたくない？」

「あります！　でも、ファイルがいっぱいになって困ることも……」

　僕はホワイトボードに図を描き始めた。

```javascript
// 小説の管理（悪い例）
"恋愛小説_最初の案.txt"
"恋愛小説_修正版.txt"
"恋愛小説_修正版2.txt"
"恋愛小説_最終版.txt"
"恋愛小説_本当の最終版.txt"
"恋愛小説_今度こそ最終版.txt"
```

「これ、まさに私がやってることです！」

　優美が笑いながら言った。

◇◇◇◇

「バージョン管理システムを使えば、もっとスマートに管理できる」

```javascript
// Gitのような仕組みで小説を管理
class NovelVersionControl {
    constructor(title) {
        this.title = title
        this.commits = []
        this.currentVersion = 0
        this.branches = {
            main: []
        }
        this.currentBranch = 'main'
    }
    
    // コミット：変更を記録
    commit(content, message, author) {
        const commit = {
            id: this.generateCommitId(),
            content: content,
            message: message,
            author: author,
            timestamp: new Date(),
            parent: this.currentVersion > 0 ? this.currentVersion : null
        }
        
        this.commits.push(commit)
        this.branches[this.currentBranch].push(commit.id)
        this.currentVersion = commit.id
        
        return commit.id
    }
    
    // ログ：履歴を確認
    showLog() {
        console.log(`${this.title}の変更履歴：`)
        for (let commit of this.commits) {
            console.log(`${commit.id}: ${commit.message} (${commit.author})`)
            console.log(`  日時: ${commit.timestamp.toLocaleString()}`)
        }
    }
    
    // 差分表示
    diff(version1, version2) {
        let content1 = this.getContentByVersion(version1)
        let content2 = this.getContentByVersion(version2)
        
        // 簡易的な差分表示
        if (content1 !== content2) {
            return {
                before: content1,
                after: content2,
                changed: true
            }
        }
        return { changed: false }
    }
    
    generateCommitId() {
        return Math.random().toString(36).substr(2, 8)
    }
    
    getContentByVersion(versionId) {
        let commit = this.commits.find(c => c.id === versionId)
        return commit ? commit.content : null
    }
}
```

「なるほど！　変更の理由も記録できるんですね」

「そう。『なぜ変更したのか』を記録しておくことで、後で振り返りやすくなる」

◇◇◇◇

「実際に使ってみよう」

```javascript
// 優美の小説をバージョン管理
let yumiNovel = new NovelVersionControl("青春プログラミング物語")

// 最初のバージョン
let firstDraft = `
高校生の優美は、プログラミングに出会った。
先輩の雅史が教えてくれるレッスンは、とても楽しかった。
`

yumiNovel.commit(firstDraft, "初稿完成", "柳原優美")

// キャラクターの関係性を追加
let secondDraft = `
高校生の優美は、プログラミングに出会った。
幼馴染の先輩、雅史が教えてくれるレッスンは、とても楽しかった。
二人の距離は、少しずつ縮まっているように思えた。
`

yumiNovel.commit(secondDraft, "キャラクターの関係性を追加", "柳原優美")

// 感情の描写を強化
let thirdDraft = `
高校生の優美は、プログラミングに出会った。
幼馴染の先輩、雅史が教えてくれるレッスンは、とても楽しかった。
二人の距離は、少しずつ縮まっているように思えた。
優美の胸の奥で、新しい感情が芽生え始めていた。
`

yumiNovel.commit(thirdDraft, "感情描写を強化", "柳原優美")

// 履歴を表示
yumiNovel.showLog()
```

「私の小説の進化過程が記録されてる！」

　優美の目がキラキラと輝いている。

◇◇◇◇

「ブランチという機能もある」

「ブランチ？」

「並行して異なるバージョンを開発する機能だ」

```javascript
// ブランチ機能を追加
class AdvancedVersionControl extends NovelVersionControl {
    createBranch(branchName, fromCommit = null) {
        if (this.branches[branchName]) {
            throw new Error("ブランチは既に存在します")
        }
        
        let startPoint = fromCommit || this.currentVersion
        this.branches[branchName] = [startPoint]
        
        console.log(`ブランチ '${branchName}' を作成しました`)
    }
    
    switchBranch(branchName) {
        if (!this.branches[branchName]) {
            throw new Error("存在しないブランチです")
        }
        
        this.currentBranch = branchName
        let lastCommit = this.branches[branchName].slice(-1)[0]
        this.currentVersion = lastCommit
        
        console.log(`ブランチ '${branchName}' に切り替えました`)
    }
    
    merge(sourceBranch, targetBranch = 'main') {
        // 簡易的なマージ処理
        let sourceCommits = this.branches[sourceBranch]
        let targetCommits = this.branches[targetBranch]
        
        // 最新のコミットをマージ
        let sourceContent = this.getContentByVersion(sourceCommits.slice(-1)[0])
        let mergeCommit = this.commit(
            sourceContent, 
            `Merge branch '${sourceBranch}' into ${targetBranch}`,
            "system"
        )
        
        console.log(`ブランチ '${sourceBranch}' を '${targetBranch}' にマージしました`)
        return mergeCommit
    }
}
```

◇◇◇◇

「例えば、違う結末を試してみたい時に使える」

```javascript
let advancedNovel = new AdvancedVersionControl("青春プログラミング物語")

// メインストーリー
advancedNovel.commit("二人でプログラミング言語を作ることになった。", "物語の開始", "柳原優美")

// ハッピーエンド版のブランチ
advancedNovel.createBranch("happy-ending")
advancedNovel.switchBranch("happy-ending")
advancedNovel.commit(
    "プログラミング言語が完成し、二人は気持ちを確かめ合った。", 
    "ハッピーエンド版", 
    "柳原優美"
)

// ビターエンド版のブランチ  
advancedNovel.switchBranch("main")
advancedNovel.createBranch("bittersweet-ending")
advancedNovel.switchBranch("bittersweet-ending")
advancedNovel.commit(
    "プログラミング言語は完成したが、二人はそれぞれの道を歩むことになった。", 
    "ビタースイート版", 
    "柳原優美"
)
```

「同じ物語の、違う可能性を試せるんですね」

「そう。実験的な変更も、安心してできる」

◇◇◇◇

「先輩」

「ん？」

「私たちの関係も、バージョン管理できたらいいのに」

　突然の言葉に、心臓が跳ねた。

「どういう意味だ？」

「幼馴染だった頃から、今まで。どんな風に変わってきたのか、記録できたら」

　優美の頬が薄く赤らんでいる。

「それは……」

　僕も顔が熱くなってくる。

◇◇◇◇

「こんな感じかな」

```javascript
// 二人の関係のバージョン管理
class RelationshipVersionControl {
    constructor(person1, person2) {
        this.members = [person1, person2]
        this.relationshipHistory = []
        this.milestones = []
        this.currentStatus = "初期設定"
    }
    
    recordMilestone(event, description, emotions = {}) {
        const milestone = {
            id: this.generateId(),
            event: event,
            description: description,
            emotions: emotions,
            timestamp: new Date(),
            status: this.currentStatus
        }
        
        this.relationshipHistory.push(milestone)
        this.milestones.push(milestone.id)
        
        return milestone.id
    }
    
    updateStatus(newStatus, reason) {
        let previousStatus = this.currentStatus
        this.currentStatus = newStatus
        
        this.recordMilestone(
            "関係性の変化",
            `${previousStatus} → ${newStatus}`,
            { reason: reason }
        )
    }
    
    showTimeline() {
        console.log("二人の歩み：")
        for (let milestone of this.relationshipHistory) {
            console.log(`${milestone.timestamp.toLocaleDateString()}: ${milestone.event}`)
            console.log(`  ${milestone.description}`)
        }
    }
    
    generateId() {
        return Math.random().toString(36).substr(2, 8)
    }
}

// 使用例
let ourRelationship = new RelationshipVersionControl("雅史", "優美")

ourRelationship.recordMilestone(
    "幼少期の出会い", 
    "ベランダ越しに初めて会話", 
    { 雅史: "興味", 優美: "好奇心" }
)

ourRelationship.updateStatus("幼馴染", "近所同士で自然に仲良くなった")

ourRelationship.recordMilestone(
    "プログラミングレッスン開始",
    "優美がプログラミングを習い始める",
    { 雅史: "嬉しい", 優美: "期待" }
)

ourRelationship.recordMilestone(
    "夏祭りで手を繋ぐ",
    "人混みで迷子にならないように",
    { 雅史: "ドキドキ", 優美: "温かい気持ち" }
)

ourRelationship.updateStatus("???", "お互いの気持ちが複雑になってきた")
```

◇◇◇◇

「最後のステータスが???になってる」

　優美が指摘した。

「今の僕たちの関係は、まだ定義しきれないから」

「そうですね……でも」

「でも？」

「次のバージョンでは、もっとはっきりした関係になるかもしれません」

　優美の言葉に、僕の心臓が大きく鼓動した。

◇◇◇◇

「Yume言語にも、バージョン管理機能を組み込もう」

```javascript
// Yume言語のバージョン管理
class YumeVersionControl {
    constructor() {
        this.versions = []
        this.features = []
        this.bugFixes = []
    }
    
    addFeature(feature, description, contributors) {
        const version = {
            type: "feature",
            name: feature,
            description: description,
            contributors: contributors,
            timestamp: new Date()
        }
        
        this.features.push(version)
        this.versions.push(version)
        
        console.log(`新機能 '${feature}' を追加しました`)
        console.log(`貢献者: ${contributors.join(", ")}`)
    }
    
    fixBug(bugDescription, fix, fixedBy) {
        const version = {
            type: "bugfix",
            description: bugDescription,
            fix: fix,
            fixedBy: fixedBy,
            timestamp: new Date()
        }
        
        this.bugFixes.push(version)
        this.versions.push(version)
        
        console.log(`バグを修正しました: ${bugDescription}`)
    }
    
    release(versionNumber, releaseNotes) {
        const release = {
            type: "release",
            version: versionNumber,
            notes: releaseNotes,
            timestamp: new Date(),
            features: this.features.slice(),
            bugFixes: this.bugFixes.slice()
        }
        
        this.versions.push(release)
        
        // リセット
        this.features = []
        this.bugFixes = []
        
        console.log(`Yume言語 v${versionNumber} をリリースしました！`)
        console.log(releaseNotes)
    }
}

// 使用例
let yumeVCS = new YumeVersionControl()

yumeVCS.addFeature(
    "感情表現構文", 
    "プログラムで感情を表現できる構文",
    ["花咲雅史", "柳原優美"]
)

yumeVCS.addFeature(
    "物語構造サポート",
    "小説の構造をコードで表現する機能", 
    ["柳原優美", "花咲雅史"]
)

yumeVCS.release("0.1.0", "Yume言語の最初のリリース！二人の夢が形になりました。")
```

「私たちが作ったYume言語の歴史も、ちゃんと記録されるんですね」

「将来、誰かがYume言語を使った時、僕たちがどんな思いで作ったかも伝わるかもしれない」

◇◇◇◇

　レッスンの最後に、僕は特別なバージョン管理システムを見せた。

```javascript
// 思い出のバージョン管理
class MemoryVersionControl {
    constructor() {
        this.memories = []
        this.tags = []
    }
    
    saveMemory(title, description, participants, emotion, importance) {
        const memory = {
            id: this.generateId(),
            title: title,
            description: description,
            participants: participants,
            emotion: emotion,
            importance: importance, // 1-10
            timestamp: new Date(),
            tags: []
        }
        
        this.memories.push(memory)
        return memory.id
    }
    
    tagMemory(memoryId, tag) {
        let memory = this.memories.find(m => m.id === memoryId)
        if (memory) {
            memory.tags.push(tag)
            if (!this.tags.includes(tag)) {
                this.tags.push(tag)
            }
        }
    }
    
    findMemoriesByTag(tag) {
        return this.memories.filter(m => m.tags.includes(tag))
    }
    
    getMostImportantMemories(limit = 5) {
        return this.memories
            .sort((a, b) => b.importance - a.importance)
            .slice(0, limit)
    }
    
    generateId() {
        return Math.random().toString(36).substr(2, 8)
    }
}

// 二人の思い出を保存
let ourMemories = new MemoryVersionControl()

let summerFestival = ourMemories.saveMemory(
    "夏祭りの夜",
    "人混みで手を繋いだ特別な夜",
    ["雅史", "優美"],
    "ドキドキと幸せ",
    9
)

ourMemories.tagMemory(summerFestival, "特別な夜")
ourMemories.tagMemory(summerFestival, "手を繋いだ")
ourMemories.tagMemory(summerFestival, "夏")

let firstLesson = ourMemories.saveMemory(
    "初めてのプログラミングレッスン",
    "優美がプログラミングを始めた記念すべき日",
    ["雅史", "優美"],
    "期待と緊張",
    8
)

ourMemories.tagMemory(firstLesson, "プログラミング")
ourMemories.tagMemory(firstLesson, "始まり")
```

「私たちの大切な思い出も、ちゃんと保存されるんですね」

「そう。いつまでも忘れたくない思い出だから」

◇◇◇◇

　優美が帰った後、僕は今日のレッスンを振り返っていた。

　バージョン管理。変更の履歴を記録し、管理する技術。

（優美との関係も、確実に変化している）

　窓の外を見ると、夕焼けが街を優しく染めていた。

　幼馴染から始まった僕たちの関係。それが今、どんなバージョンに向かっているのか。

```javascript
// 次のコミット予定
const nextCommit = {
    message: "重要な気持ちを伝える",
    changes: [
        "relationship_status: '幼馴染' → '???'",
        "courage_level: 50 → 100",
        "honesty: true"
    ],
    author: "花咲雅史",
    reviewedBy: null // まだ優美の返事待ち
}
```

　いつか、このコミットを実行する日が来る。その時まで、僕は優美と一緒に、僕たちの歴史を大切に積み重ねていこう。

　一つ一つの思い出を、丁寧にバージョン管理しながら。