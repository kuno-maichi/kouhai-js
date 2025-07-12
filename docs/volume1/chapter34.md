# 第34話：並行処理：複数のタスクを同時に

　木曜日の放課後。恋人同士になってから、プログラミングのレッスンも新しい段階に入った。今日は、優美から興味深い質問があった。

「先輩、私たちって同時に色々なことをやってますよね」

「どういう意味？」

「例えば、私は小説を書きながら、プログラミングも勉強して、学校の勉強もして……」

「ああ、並行処理のことか」

　僕は優美の着眼点に感心した。確かに、人間の活動も、プログラミングの並行処理に似ている。

◇◇◇◇

「プログラミングでも、複数のタスクを同時に実行できるんだ」

　僕はホワイトボードに図を描き始めた。

```javascript
// 逐次処理（一つずつ実行）
function sequentialTasks() {
    console.log('朝食を作る - 開始')
    // 10秒かかるとする
    cookBreakfast()
    console.log('朝食を作る - 完了')
    
    console.log('コーヒーを淹れる - 開始')
    // 5秒かかるとする
    makeCoffee()
    console.log('コーヒーを淹れる - 完了')
    
    console.log('新聞を読む - 開始')
    // 3秒かかるとする
    readNewspaper()
    console.log('新聞を読む - 完了')
    
    // 合計：18秒
}

// 並行処理（同時に実行）
async function parallelTasks() {
    console.log('全てのタスクを開始')
    
    // Promise.allで同時実行
    await Promise.all([
        cookBreakfast(),
        makeCoffee(),
        readNewspaper()
    ])
    
    console.log('全てのタスク完了')
    // 合計：10秒（最長のタスクの時間）
}
```

「わあ、時間が短縮されてる！」

「そう。同時にできることは同時にやる。それが並行処理の基本だ」

◇◇◇◇

「でも、先輩」

「ん？」

「同時にやると、混乱しませんか？」

　優美の疑問はもっともだ。

「いい質問だ。実際、並行処理には注意点がある」

```javascript
// 並行処理の問題例
let sharedCounter = 0

async function incrementCounter(name) {
    for (let i = 0; i < 1000; i++) {
        // 現在の値を読む
        let current = sharedCounter
        
        // 少し待つ（他の処理が割り込む可能性）
        await new Promise(resolve => setTimeout(resolve, 0))
        
        // 値を更新
        sharedCounter = current + 1
        
        console.log(`${name}: ${sharedCounter}`)
    }
}

// 二つの処理が同時に実行
Promise.all([
    incrementCounter('処理A'),
    incrementCounter('処理B')
]).then(() => {
    console.log(`最終値: ${sharedCounter}`)
    // 期待値: 2000
    // 実際: 2000未満になることがある（競合状態）
})
```

「あれ？　数が合わない？」

「これが『競合状態』というものだ。複数の処理が同じデータにアクセスすると、予期しない結果になることがある」

◇◇◇◇

「じゃあ、どうすればいいんですか？」

「適切な制御が必要だ」

```javascript
// 並行処理の適切な制御
class TaskManager {
    constructor() {
        this.tasks = []
        this.runningTasks = 0
        this.maxConcurrent = 3 // 同時実行数の上限
    }
    
    async addTask(taskFunction, taskName) {
        this.tasks.push({
            function: taskFunction,
            name: taskName,
            status: 'pending'
        })
    }
    
    async executeTasks() {
        const results = []
        
        while (this.tasks.length > 0 || this.runningTasks > 0) {
            // 実行可能なタスクがあれば開始
            while (this.runningTasks < this.maxConcurrent && this.tasks.length > 0) {
                const task = this.tasks.shift()
                this.runTask(task, results)
            }
            
            // 少し待つ
            await new Promise(resolve => setTimeout(resolve, 100))
        }
        
        return results
    }
    
    async runTask(task, results) {
        this.runningTasks++
        task.status = 'running'
        console.log(`開始: ${task.name}`)
        
        try {
            const result = await task.function()
            task.status = 'completed'
            results.push({
                name: task.name,
                result: result,
                status: 'success'
            })
            console.log(`完了: ${task.name}`)
        } catch (error) {
            task.status = 'failed'
            results.push({
                name: task.name,
                error: error,
                status: 'failed'
            })
            console.log(`失敗: ${task.name}`)
        } finally {
            this.runningTasks--
        }
    }
}

// 使用例
const manager = new TaskManager()

// タスクを追加
manager.addTask(async () => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    return '朝食完成'
}, '朝食を作る')

manager.addTask(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return 'コーヒー完成'
}, 'コーヒーを淹れる')

manager.addTask(async () => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return '新聞読了'
}, '新聞を読む')

// 実行
manager.executeTasks().then(results => {
    console.log('全タスク完了:', results)
})
```

「同時実行数を制限することで、混乱を防ぐんですね」

「そう。人間も同じだ。あまりに多くのことを同時にやろうとすると、かえって効率が悪くなる」

◇◇◇◇

「先輩」

「ん？」

「私たちの関係も、並行処理みたいですね」

　優美が少し照れながら言った。

「どういうこと？」

「勉強も、プログラミングも、恋愛も、全部同時進行で」

　その言葉に、僕も笑ってしまった。

「確かに。でも、ちゃんと管理できてるよ」

◇◇◇◇

「Yume言語にも、並行処理機能を追加しよう」

```javascript
// Yume言語の並行処理
class YumeConcurrency {
    constructor() {
        this.workers = []
        this.messageQueue = []
        this.sharedMemory = new Map()
        this.locks = new Map()
    }
    
    // ワーカーを作成
    createWorker(name, taskFunction) {
        const worker = {
            name: name,
            task: taskFunction,
            status: 'idle',
            messages: []
        }
        
        this.workers.push(worker)
        return worker
    }
    
    // メッセージパッシング
    sendMessage(fromWorker, toWorker, message) {
        this.messageQueue.push({
            from: fromWorker,
            to: toWorker,
            message: message,
            timestamp: new Date()
        })
    }
    
    // 共有メモリへの安全なアクセス
    async accessSharedMemory(key, operation) {
        // ロックを取得
        while (this.locks.get(key)) {
            await new Promise(resolve => setTimeout(resolve, 10))
        }
        
        this.locks.set(key, true)
        
        try {
            // 操作を実行
            const result = await operation(this.sharedMemory)
            return result
        } finally {
            // ロックを解放
            this.locks.set(key, false)
        }
    }
    
    // 並行実行
    async execute() {
        const promises = this.workers.map(worker => {
            return this.runWorker(worker)
        })
        
        return Promise.all(promises)
    }
    
    async runWorker(worker) {
        worker.status = 'running'
        console.log(`ワーカー ${worker.name} 開始`)
        
        const context = {
            name: worker.name,
            sendMessage: (to, msg) => this.sendMessage(worker.name, to, msg),
            receiveMessage: () => {
                const messages = this.messageQueue.filter(m => m.to === worker.name)
                this.messageQueue = this.messageQueue.filter(m => m.to !== worker.name)
                return messages
            },
            sharedMemory: {
                get: async (key) => {
                    return this.accessSharedMemory(key, (memory) => memory.get(key))
                },
                set: async (key, value) => {
                    return this.accessSharedMemory(key, (memory) => memory.set(key, value))
                }
            }
        }
        
        try {
            const result = await worker.task(context)
            worker.status = 'completed'
            console.log(`ワーカー ${worker.name} 完了`)
            return result
        } catch (error) {
            worker.status = 'failed'
            console.error(`ワーカー ${worker.name} エラー:`, error)
            throw error
        }
    }
}

// 使用例：小説と感情の並行処理
const yumeConcurrency = new YumeConcurrency()

// 小説執筆ワーカー
yumeConcurrency.createWorker('小説家', async (ctx) => {
    const chapters = []
    
    for (let i = 1; i <= 3; i++) {
        console.log(`${ctx.name}: 第${i}章を執筆中...`)
        
        // 感情データを取得
        const emotion = await ctx.sharedMemory.get('current_emotion')
        
        chapters.push({
            number: i,
            content: `第${i}章：${emotion || '穏やか'}な気持ちで書かれた物語`,
            timestamp: new Date()
        })
        
        // 執筆の進捗を共有
        await ctx.sharedMemory.set('writing_progress', i)
        
        // 感情分析ワーカーにメッセージ
        ctx.sendMessage('感情分析', `第${i}章完成`)
        
        await new Promise(resolve => setTimeout(resolve, 1000))
    }
    
    return chapters
})

// 感情分析ワーカー
yumeConcurrency.createWorker('感情分析', async (ctx) => {
    const emotions = ['喜び', '期待', '愛情', '感動']
    let emotionIndex = 0
    
    while (true) {
        // メッセージをチェック
        const messages = ctx.receiveMessage()
        
        if (messages.length > 0) {
            console.log(`${ctx.name}: メッセージ受信`, messages)
            
            // 次の感情に更新
            emotionIndex = (emotionIndex + 1) % emotions.length
            await ctx.sharedMemory.set('current_emotion', emotions[emotionIndex])
            
            console.log(`${ctx.name}: 感情を「${emotions[emotionIndex]}」に更新`)
        }
        
        // 執筆の進捗を確認
        const progress = await ctx.sharedMemory.get('writing_progress')
        if (progress >= 3) {
            break // 執筆完了
        }
        
        await new Promise(resolve => setTimeout(resolve, 500))
    }
    
    return '感情分析完了'
})

// 実行
yumeConcurrency.execute().then(results => {
    console.log('並行処理完了:', results)
})
```

◇◇◇◇

「すごい！　小説を書きながら、感情も分析してる」

「これが並行処理の力だ。複数の処理が協調して動く」

「私の頭の中みたい」

　優美の言葉に、僕は興味を持った。

「優美の頭の中？」

「小説を書いてる時、色んなことを同時に考えてるんです。ストーリーの展開、キャラクターの感情、読者の反応……」

「なるほど。それも並行処理だな」

◇◇◇◇

「実際の並行処理の例を見てみよう」

```javascript
// 実践的な並行処理：Webスクレイピング
class WebScraper {
    constructor(maxConcurrent = 5) {
        this.maxConcurrent = maxConcurrent
        this.queue = []
        this.running = 0
        this.results = []
    }
    
    async scrapeUrls(urls) {
        // URLをキューに追加
        this.queue = urls.map(url => ({ url, status: 'pending' }))
        
        // 並行処理を開始
        const workers = []
        for (let i = 0; i < this.maxConcurrent; i++) {
            workers.push(this.worker(i))
        }
        
        // 全ワーカーの完了を待つ
        await Promise.all(workers)
        
        return this.results
    }
    
    async worker(workerId) {
        console.log(`ワーカー${workerId} 開始`)
        
        while (this.queue.length > 0) {
            const task = this.queue.shift()
            if (!task) break
            
            this.running++
            task.status = 'processing'
            
            try {
                console.log(`ワーカー${workerId}: ${task.url} を処理中`)
                
                // 実際のスクレイピング処理（シミュレーション）
                const result = await this.fetchPage(task.url)
                
                task.status = 'completed'
                this.results.push({
                    url: task.url,
                    data: result,
                    workerId: workerId
                })
                
            } catch (error) {
                task.status = 'failed'
                this.results.push({
                    url: task.url,
                    error: error.message,
                    workerId: workerId
                })
            } finally {
                this.running--
            }
        }
        
        console.log(`ワーカー${workerId} 完了`)
    }
    
    async fetchPage(url) {
        // ネットワーク遅延のシミュレーション
        const delay = Math.random() * 2000 + 500
        await new Promise(resolve => setTimeout(resolve, delay))
        
        return {
            title: `ページタイトル: ${url}`,
            content: `コンテンツ（${delay.toFixed(0)}ms で取得）`,
            fetchedAt: new Date()
        }
    }
}

// 使用例
const scraper = new WebScraper(3)
const urls = [
    'https://example1.com',
    'https://example2.com',
    'https://example3.com',
    'https://example4.com',
    'https://example5.com'
]

scraper.scrapeUrls(urls).then(results => {
    console.log('スクレイピング完了:')
    results.forEach(result => {
        console.log(`- ${result.url}: ${result.data ? '成功' : '失敗'}`)
    })
})
```

「複数のWebページを同時に取得してるんですね」

「そう。一つずつ取得するより、ずっと効率的だ」

◇◇◇◇

　レッスンの最後に、僕は優美に特別なプログラムを見せた。

```javascript
// 私たちの並行処理
class OurParallelLife {
    constructor() {
        this.masashi = {
            tasks: ['プログラミング', '勉強', '優美との時間'],
            love: 100
        }
        
        this.yumi = {
            tasks: ['小説執筆', '勉強', '雅史との時間'],
            love: 100
        }
        
        this.sharedMoments = []
    }
    
    async liveTogether() {
        const masashiLife = this.masashiRoutine()
        const yumiLife = this.yumiRoutine()
        
        // 二人の生活を並行実行
        await Promise.all([masashiLife, yumiLife])
        
        return {
            sharedMoments: this.sharedMoments,
            totalLove: this.masashi.love + this.yumi.love,
            message: '並行処理でも、心は一つ'
        }
    }
    
    async masashiRoutine() {
        for (const task of this.masashi.tasks) {
            if (task === '優美との時間') {
                await this.shareMoment('プログラミングを教える')
            }
            console.log(`雅史: ${task}中`)
            await new Promise(resolve => setTimeout(resolve, 1000))
        }
    }
    
    async yumiRoutine() {
        for (const task of this.yumi.tasks) {
            if (task === '雅史との時間') {
                await this.shareMoment('一緒に学ぶ')
            }
            console.log(`優美: ${task}中`)
            await new Promise(resolve => setTimeout(resolve, 1000))
        }
    }
    
    async shareMoment(activity) {
        this.sharedMoments.push({
            activity: activity,
            timestamp: new Date(),
            happiness: '∞'
        })
        
        // 愛が深まる
        this.masashi.love += 10
        this.yumi.love += 10
        
        console.log(`💕 共有時間: ${activity}`)
    }
}

// 実行
const ourLife = new OurParallelLife()
ourLife.liveTogether().then(result => {
    console.log('私たちの並行処理:', result)
})
```

「これって……」

「僕たちの日常も、並行処理なんだ」

　優美の頬が赤く染まった。

「でも、大切な瞬間は必ず共有してる」

「そう。それが同期ポイントだ」

◇◇◇◇

　優美が帰った後、僕は今日のレッスンを振り返っていた。

　並行処理。複数のタスクを同時に実行する技術。

（優美との関係も、色んなことが同時進行している）

　窓の外を見ると、秋の夜空に星が瞬いていた。

　プログラミングも、勉強も、恋愛も。全てが並行して進んでいく。でも、本当に大切な瞬間は、必ず二人で共有している。

```javascript
// 今日の学び
const todaysLesson = {
    technical: {
        concept: '並行処理',
        keyPoints: ['同時実行', '競合状態', '同期'],
        benefits: '効率的なリソース活用'
    },
    personal: {
        realization: '人生も並行処理',
        balance: '複数のタスクと大切な瞬間',
        love: 'いつも同期している'
    }
}
```

　明日も、優美と一緒に、たくさんのことを並行して進めていこう。そして、大切な瞬間は必ず一緒に過ごそう。