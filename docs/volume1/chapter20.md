# 第20話：データベース：記憶を永続化する

　木曜日の放課後。先輩の部屋に向かう私の足取りは、日に日に軽くなっている。でも今日は、胸の奥に小さな不安も抱えていた。

（昨日のAPI、私の気持ちを???にしちゃったけど……）

「お疲れ様です、先輩！」

「おう、優美。今日はデータベースについて学ぼう」

「データベース？」

「プログラムの記憶を永続的に保存する仕組みだ」

　先輩の言葉に、私の心がざわついた。

（記憶を……永続的に……）

◇◇◇◇

「優美は日記とか書くか？」

「はい！　創作のアイデアとか、その日の出来事とか」

「データベースは、プログラムにとっての日記帳みたいなものだ」

　先輩がホワイトボードに図を描き始めた。

```javascript
// メモリ上のデータ（プログラムを終了すると消える）
let temporaryMemories = [
    "今日は楽しかった",
    "新しいことを学んだ"
]

// データベースに保存（永続的に残る）
class DiaryDatabase {
    constructor() {
        // 実際はファイルやDBMSを使う
        this.entries = []
    }
    
    save(entry) {
        let record = {
            id: Date.now(),
            content: entry.content,
            emotion: entry.emotion,
            createdAt: new Date()
        }
        
        this.entries.push(record)
        console.log("日記を保存しました：", record.id)
        
        return record
    }
    
    findByEmotion(emotion) {
        return this.entries.filter(e => e.emotion === emotion)
    }
    
    findByDateRange(startDate, endDate) {
        return this.entries.filter(e => 
            e.createdAt >= startDate && e.createdAt <= endDate
        )
    }
}
```

「記憶を整理して、後から取り出せるようにするんですね」

「そう。大切な思い出ほど、ちゃんと保存しておきたいだろ？」

　先輩の言葉が、私の胸に響いた。

◇◇◇◇

「実際に、優美との思い出データベースを作ってみよう」

```javascript
// 思い出データベース
class MemoryDatabase {
    constructor() {
        this.memories = []
        this.tags = new Map()
    }
    
    addMemory(memory) {
        let id = this.memories.length + 1
        
        let record = {
            id: id,
            date: memory.date,
            event: memory.event,
            participants: memory.participants,
            emotions: memory.emotions,
            importance: memory.importance || 5,
            tags: memory.tags || [],
            createdAt: new Date()
        }
        
        this.memories.push(record)
        
        // タグの管理
        record.tags.forEach(tag => {
            if (!this.tags.has(tag)) {
                this.tags.set(tag, [])
            }
            this.tags.get(tag).push(id)
        })
        
        return record
    }
    
    searchByTag(tag) {
        let ids = this.tags.get(tag) || []
        return ids.map(id => this.memories.find(m => m.id === id))
    }
    
    getMostImportantMemories(limit = 5) {
        return [...this.memories]
            .sort((a, b) => b.importance - a.importance)
            .slice(0, limit)
    }
}

// 使用例
let db = new MemoryDatabase()

db.addMemory({
    date: "7月1日",
    event: "初めてのプログラミングレッスン",
    participants: ["優美", "雅史先輩"],
    emotions: { 優美: "緊張と期待", 雅史: "嬉しさと責任感" },
    importance: 10,
    tags: ["始まり", "プログラミング", "出会い"]
})
```

「わあ！　思い出に重要度まで付けられるんですね」

「データベースなら、色んな角度から思い出を見つけられる」

◇◇◇◇

「あの、先輩」

「ん？」

「忘れたい記憶も、データベースには残るんですか？」

　私の質問に、先輩が少し考え込んだ。

「技術的には削除もできる。でも……」

「でも？」

「失敗も、辛い記憶も、全部含めてその人の歴史だと思うんだ」

　先輩が優しく続けた。

「昨日のエラー処理の話と同じだよ。失敗から学ぶことがある」

◇◇◇◇

「じゃあ、関係性を表現するデータベースも作ってみよう」

```javascript
// 関係性データベース
class RelationshipDatabase {
    constructor() {
        this.people = new Map()
        this.relationships = []
    }
    
    addPerson(id, info) {
        this.people.set(id, {
            name: info.name,
            traits: info.traits || [],
            createdAt: new Date()
        })
    }
    
    addRelationship(person1Id, person2Id, type, strength = 5) {
        let relationship = {
            id: this.relationships.length + 1,
            person1: person1Id,
            person2: person2Id,
            type: type,  // "友達", "家族", "恋人", "片思い" など
            strength: strength,  // 1-10
            history: [],
            createdAt: new Date()
        }
        
        this.relationships.push(relationship)
        return relationship
    }
    
    updateRelationship(relationshipId, event) {
        let rel = this.relationships.find(r => r.id === relationshipId)
        if (rel) {
            rel.history.push({
                date: new Date(),
                event: event,
                previousStrength: rel.strength
            })
            
            // イベントによって関係性の強さが変化
            if (event.includes("一緒に")) rel.strength += 0.5
            if (event.includes("喧嘩")) rel.strength -= 1
            if (event.includes("告白")) rel.strength += 2
            
            // 1-10の範囲に収める
            rel.strength = Math.max(1, Math.min(10, rel.strength))
        }
    }
}

// 使用例
let relDB = new RelationshipDatabase()

relDB.addPerson("yumi", { name: "優美", traits: ["創作好き", "素直", "頑張り屋"] })
relDB.addPerson("masashi", { name: "雅史", traits: ["プログラマー", "優しい", "教え上手"] })

let ourRelation = relDB.addRelationship("yumi", "masashi", "？？？", 8)
```

「関係性のタイプが???になってる！」

　私が指摘すると、先輩が照れ笑いを浮かべた。

「まだ定義されてない関係性もあるってことで」

◇◇◇◇

「先輩、私たちの関係性、データベースではどう定義すればいいんでしょう」

　思い切って聞いてみた。

「それは……」

　先輩が言葉に詰まる。

「友達？　先生と生徒？　それとも……」

　私は勇気を振り絞って続けた。

「それとも、もっと特別な何か？」

　教室に流れる沈黙。でも、それは重たいものじゃなくて、何かが生まれそうな、期待に満ちた静寂だった。

◇◇◇◇

「優美」

「はい」

「データベースには、トランザクションっていう機能がある」

　先輩が突然、技術的な話を始めた。

「トランザクション？」

「複数の操作を、一つのまとまりとして扱う機能だ。全部成功するか、全部失敗するか」

```javascript
// トランザクションの例
class TransactionalMemoryDB extends MemoryDatabase {
    async addMemoryWithConfession(memory, confession) {
        try {
            // トランザクション開始
            console.log("重要な記録を開始...")
            
            // 1. 思い出を保存
            let savedMemory = this.addMemory(memory)
            
            // 2. 告白を記録
            let confessionRecord = {
                memoryId: savedMemory.id,
                from: confession.from,
                to: confession.to,
                message: confession.message,
                response: null,  // 返事待ち
                createdAt: new Date()
            }
            
            // 3. もし告白が受け入れられたら
            if (confession.accepted === true) {
                confessionRecord.response = "受け入れられた"
                savedMemory.tags.push("特別な日")
                savedMemory.importance = 10
            }
            
            // トランザクション成功
            console.log("すべての記録が正常に保存されました")
            return { memory: savedMemory, confession: confessionRecord }
            
        } catch (error) {
            // トランザクション失敗 - すべてロールバック
            console.log("記録に失敗しました。なかったことに...")
            throw error
        }
    }
}
```

「これって……」

　私は先輩の意図に気づいた。

「告白も、トランザクションみたいなものだって言いたいんですか？」

◇◇◇◇

「そうかもしれない」

　先輩が真剣な表情で私を見つめた。

「成功するか、失敗するか。でも、どちらにしても記録には残る」

「先輩……」

「優美、昨日のAPIの???、いつか埋めてくれるか？」

　私の胸が高鳴る。これは、先輩なりの……。

「私も、先輩との思い出データベースに、特別なタグを付けたいです」

「特別なタグ？」

「『大切な人』っていうタグです」

◇◇◇◇

　自分の部屋に戻って、今日学んだことをノートにまとめる。

『データベース：大切な記憶を永遠に保存する場所』
『トランザクション：全てか無か、でも勇気を出す価値がある』
『関係性の定義：まだ???でも、いつか必ず』

　そして、ノートの端に小さく書き加えた。

『先輩との全ての思い出を、私の心のデータベースに永久保存したい』

　窓の外を見ると、星が瞬いていた。

（データベースは記憶を永続化する）

　なら、この気持ちも、この時間も、全部永遠に残していける。先輩と過ごす一瞬一瞬を、大切にデータベースに刻みながら。

　いつか、私たちの関係性のタイプが???じゃなくなる日まで。その日を夢見て、私は明日も先輩の部屋に向かう。大切な人との、かけがえのない時間を記録するために。