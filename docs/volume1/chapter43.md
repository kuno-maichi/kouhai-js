# 第43話：ネットワークプログラミング：世界をつなぐ

　月曜日の放課後。今日は私たちが取り組むのは、ネットワークプログラミング。Yume言語を世界中の人に使ってもらうために必要な技術だ。

「先輩、今日のテーマはネットワークプログラミングですね」

　私が確認すると、先輩は優しく頷いてくれた。

「そう。Yume言語を一人で使うだけじゃなく、世界中の人とつながれるようにしたい」

「世界中の人と……素敵ですね」

◇◇◇◇

「まず、ネットワークの基本から学ぼう」

　先輩がホワイトボードに図を描き始めた。

```javascript
// ネットワークの基本概念
class NetworkNode {
    constructor(id, address) {
        this.id = id
        this.address = address
        this.connections = new Map()
        this.messageQueue = []
    }
    
    // 他のノードに接続
    connect(otherNode) {
        this.connections.set(otherNode.id, otherNode)
        otherNode.connections.set(this.id, this)
        
        console.log(`${this.id}が${otherNode.id}に接続しました`)
    }
    
    // メッセージを送信
    sendMessage(targetId, message) {
        const target = this.connections.get(targetId)
        if (target) {
            target.receiveMessage(this.id, message)
            console.log(`${this.id} -> ${targetId}: ${message}`)
        } else {
            // ルーティング：間接的に送信
            this.routeMessage(targetId, message)
        }
    }
    
    // メッセージを受信
    receiveMessage(senderId, message) {
        this.messageQueue.push({
            from: senderId,
            content: message,
            timestamp: new Date()
        })
        
        this.processMessage(senderId, message)
    }
    
    // メッセージの処理
    processMessage(senderId, message) {
        console.log(`${this.id}が${senderId}からメッセージを受信: ${message}`)
    }
    
    // ルーティング（簡易版）
    routeMessage(targetId, message) {
        for (const [nodeId, node] of this.connections) {
            if (node.connections.has(targetId)) {
                node.sendMessage(targetId, message)
                break
            }
        }
    }
}

// ネットワークの作成
const tokyoNode = new NetworkNode('Tokyo', '192.168.1.1')
const osakaNode = new NetworkNode('Osaka', '192.168.1.2')
const kyotoNode = new NetworkNode('Kyoto', '192.168.1.3')

// 接続
tokyoNode.connect(osakaNode)
osakaNode.connect(kyotoNode)

// メッセージ送信
tokyoNode.sendMessage('Osaka', 'こんにちは、大阪！')
osakaNode.sendMessage('Kyoto', 'Yume言語の情報を共有します')
```

「ネットワークって、ノード同士がメッセージをやり取りするんですね」

「そう。私たちの小説投稿サイトと同じように、作者と読者が情報を交換している」

◇◇◇◇

「次は、HTTPプロトコルを実装してみよう」

```javascript
// シンプルなHTTPサーバー
class SimpleHTTPServer {
    constructor(port) {
        this.port = port
        this.routes = new Map()
        this.middleware = []
        this.isRunning = false
    }
    
    // ルートを定義
    get(path, handler) {
        this.addRoute('GET', path, handler)
    }
    
    post(path, handler) {
        this.addRoute('POST', path, handler)
    }
    
    addRoute(method, path, handler) {
        const key = `${method}:${path}`
        this.routes.set(key, handler)
    }
    
    // ミドルウェアを追加
    use(middleware) {
        this.middleware.push(middleware)
    }
    
    // サーバー開始
    start() {
        this.isRunning = true
        console.log(`サーバーがポート${this.port}で開始されました`)
        
        // リクエストの待機をシミュレート
        this.simulateRequests()
    }
    
    // リクエスト処理
    handleRequest(request) {
        console.log(`\\n=== 新しいリクエスト ===`)
        console.log(`${request.method} ${request.path}`)
        console.log(`From: ${request.remoteAddress}`)
        
        // ミドルウェアの実行
        let response = { statusCode: 200, headers: {}, body: '' }
        
        for (const middleware of this.middleware) {
            response = middleware(request, response)
            if (response.finished) break
        }
        
        if (!response.finished) {
            // ルートハンドラーの実行
            const key = `${request.method}:${request.path}`
            const handler = this.routes.get(key)
            
            if (handler) {
                response = handler(request, response)
            } else {
                response.statusCode = 404
                response.body = 'Not Found'
            }
        }
        
        this.sendResponse(response)
        return response
    }
    
    // レスポンス送信
    sendResponse(response) {
        console.log(`レスポンス: ${response.statusCode}`)
        console.log(`ボディ: ${response.body}`)
    }
    
    // リクエストのシミュレート
    simulateRequests() {
        const requests = [
            {
                method: 'GET',
                path: '/yume',
                remoteAddress: '192.168.1.10',
                headers: { 'User-Agent': 'YumeBrowser/1.0' },
                body: ''
            },
            {
                method: 'POST',
                path: '/yume/compile',
                remoteAddress: '192.168.1.11',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    code: '愛を込めて メッセージ = "Hello, World!"',
                    emotion: '喜び'
                })
            }
        ]
        
        // 1秒後にリクエストを処理
        setTimeout(() => {
            requests.forEach(req => this.handleRequest(req))
        }, 1000)
    }
}

// Yume言語サーバーの作成
const yumeServer = new SimpleHTTPServer(3000)

// CORS ミドルウェア
yumeServer.use((request, response) => {
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE'
    return response
})

// ログミドルウェア
yumeServer.use((request, response) => {
    console.log(`[${new Date().toISOString()}] ${request.method} ${request.path}`)
    return response
})

// Yume言語の情報を返すAPI
yumeServer.get('/yume', (request, response) => {
    response.headers['Content-Type'] = 'application/json'
    response.body = JSON.stringify({
        name: 'Yume Programming Language',
        version: '1.0.0',
        description: '感情を込めてプログラミングできる言語',
        authors: ['花咲雅史', '柳原優美'],
        features: ['感情型', '日本語構文', 'リアルタイム実行']
    })
    return response
})

// Yume言語のコンパイルAPI
yumeServer.post('/yume/compile', (request, response) => {
    try {
        const data = JSON.parse(request.body)
        
        // 簡易的なコンパイル処理
        const compiledCode = this.compileYumeCode(data.code, data.emotion)
        
        response.headers['Content-Type'] = 'application/json'
        response.body = JSON.stringify({
            success: true,
            compiledCode: compiledCode,
            emotion: data.emotion,
            message: 'コンパイル成功！'
        })
    } catch (error) {
        response.statusCode = 400
        response.body = JSON.stringify({
            success: false,
            error: error.message
        })
    }
    
    return response
})

console.log('=== Yume言語HTTPサーバー ===')
yumeServer.start()
```

「HTTPサーバーで、Yume言語のAPIを公開できるんですね」

「そう。これで世界中の人がYume言語を使えるようになる」

◇◇◇◇

「でも、先輩」

「ん？」

「一人でプログラミングするのと、ネットワーク越しに誰かとつながるのって、なんだか違いますね」

　私は素直な気持ちを伝えた。

「どんな風に違う？」

「一人だと、自分のペースで書けるけど、ネットワークだと、相手のことを考えないといけないでしょう？」

　先輩が興味深そうに頷いた。

「確かに。優美の小説も、読者のことを考えて書いてるよね」

「はい。読者が理解しやすいように、展開のテンポとか、表現とか」

◇◇◇◇

「じゃあ、リアルタイム通信を実装してみよう」

```javascript
// WebSocketサーバー（簡易版）
class YumeWebSocketServer {
    constructor() {
        this.clients = new Map()
        this.rooms = new Map()
        this.messageHistory = []
    }
    
    // クライアント接続
    onConnection(clientId, clientInfo) {
        console.log(`新しいクライアントが接続: ${clientId}`)
        
        const client = {
            id: clientId,
            info: clientInfo,
            rooms: new Set(),
            isOnline: true,
            lastSeen: new Date()
        }
        
        this.clients.set(clientId, client)
        
        // 接続通知
        this.broadcastToAll('user_connected', {
            userId: clientId,
            userInfo: clientInfo
        })
        
        // 歓迎メッセージ
        this.sendToClient(clientId, 'welcome', {
            message: 'Yume言語コミュニティへようこそ！',
            onlineUsers: this.getOnlineUsers(),
            availableRooms: Array.from(this.rooms.keys())
        })
    }
    
    // クライアント切断
    onDisconnection(clientId) {
        const client = this.clients.get(clientId)
        if (client) {
            client.isOnline = false
            client.lastSeen = new Date()
            
            // 参加中のルームから退出
            client.rooms.forEach(roomId => {
                this.leaveRoom(clientId, roomId)
            })
            
            console.log(`クライアントが切断: ${clientId}`)
            
            this.broadcastToAll('user_disconnected', {
                userId: clientId
            })
        }
    }
    
    // メッセージ受信
    onMessage(clientId, messageType, data) {
        const client = this.clients.get(clientId)
        if (!client || !client.isOnline) return
        
        client.lastSeen = new Date()
        
        switch (messageType) {
            case 'join_room':
                this.joinRoom(clientId, data.roomId)
                break
                
            case 'leave_room':
                this.leaveRoom(clientId, data.roomId)
                break
                
            case 'chat_message':
                this.handleChatMessage(clientId, data)
                break
                
            case 'code_share':
                this.handleCodeShare(clientId, data)
                break
                
            case 'emotion_update':
                this.handleEmotionUpdate(clientId, data)
                break
        }
    }
    
    // ルーム参加
    joinRoom(clientId, roomId) {
        if (!this.rooms.has(roomId)) {
            this.rooms.set(roomId, {
                id: roomId,
                members: new Set(),
                createdAt: new Date(),
                messageHistory: []
            })
        }
        
        const room = this.rooms.get(roomId)
        const client = this.clients.get(clientId)
        
        room.members.add(clientId)
        client.rooms.add(roomId)
        
        // ルームの他のメンバーに通知
        this.broadcastToRoom(roomId, 'user_joined_room', {
            userId: clientId,
            userInfo: client.info,
            roomId: roomId
        }, clientId)
        
        // 参加者にルーム情報を送信
        this.sendToClient(clientId, 'room_joined', {
            roomId: roomId,
            members: Array.from(room.members),
            messageHistory: room.messageHistory.slice(-50) // 最新50件
        })
        
        console.log(`${clientId}がルーム${roomId}に参加`)
    }
    
    // チャットメッセージの処理
    handleChatMessage(clientId, data) {
        const client = this.clients.get(clientId)
        const message = {
            id: Date.now().toString(),
            from: clientId,
            fromInfo: client.info,
            content: data.content,
            timestamp: new Date(),
            emotion: data.emotion || '平常'
        }
        
        if (data.roomId) {
            // ルームメッセージ
            const room = this.rooms.get(data.roomId)
            if (room && room.members.has(clientId)) {
                room.messageHistory.push(message)
                this.broadcastToRoom(data.roomId, 'chat_message', message)
            }
        } else {
            // 全体メッセージ
            this.messageHistory.push(message)
            this.broadcastToAll('chat_message', message)
        }
    }
    
    // コード共有の処理
    handleCodeShare(clientId, data) {
        const client = this.clients.get(clientId)
        const codeShare = {
            id: Date.now().toString(),
            from: clientId,
            fromInfo: client.info,
            code: data.code,
            language: 'yume',
            description: data.description,
            emotion: data.emotion,
            timestamp: new Date()
        }
        
        if (data.roomId) {
            this.broadcastToRoom(data.roomId, 'code_shared', codeShare)
        } else {
            this.broadcastToAll('code_shared', codeShare)
        }
        
        console.log(`${clientId}がコードを共有: ${data.description}`)
    }
    
    // 感情状態の更新
    handleEmotionUpdate(clientId, data) {
        const client = this.clients.get(clientId)
        client.info.currentEmotion = data.emotion
        client.info.emotionIntensity = data.intensity
        
        // オンラインユーザーに感情状態を通知
        this.broadcastToAll('emotion_updated', {
            userId: clientId,
            emotion: data.emotion,
            intensity: data.intensity
        })
    }
    
    // 特定クライアントにメッセージ送信
    sendToClient(clientId, messageType, data) {
        console.log(`→ ${clientId}: ${messageType}`)
        // 実際の実装では WebSocket.send() を使用
    }
    
    // ルームの全員にブロードキャスト
    broadcastToRoom(roomId, messageType, data, excludeClientId = null) {
        const room = this.rooms.get(roomId)
        if (!room) return
        
        room.members.forEach(clientId => {
            if (clientId !== excludeClientId) {
                this.sendToClient(clientId, messageType, data)
            }
        })
    }
    
    // 全員にブロードキャスト
    broadcastToAll(messageType, data, excludeClientId = null) {
        this.clients.forEach((client, clientId) => {
            if (client.isOnline && clientId !== excludeClientId) {
                this.sendToClient(clientId, messageType, data)
            }
        })
    }
    
    // オンラインユーザー一覧
    getOnlineUsers() {
        const onlineUsers = []
        this.clients.forEach((client, clientId) => {
            if (client.isOnline) {
                onlineUsers.push({
                    id: clientId,
                    info: client.info,
                    rooms: Array.from(client.rooms)
                })
            }
        })
        return onlineUsers
    }
}

// Yume言語コミュニティサーバー
const yumeWSServer = new YumeWebSocketServer()

// 接続シミュレート
console.log('\\n=== Yume言語リアルタイム通信 ===')

// ユーザー1: 優美
yumeWSServer.onConnection('yumi', {
    name: '柳原優美',
    avatar: '📚',
    currentEmotion: '期待',
    favoriteGenre: '恋愛小説'
})

// ユーザー2: 雅史
yumeWSServer.onConnection('masashi', {
    name: '花咲雅史',
    avatar: '💻',
    currentEmotion: '集中',
    favoriteLanguage: 'JavaScript'
})

// ユーザー3: 一般ユーザー
yumeWSServer.onConnection('user123', {
    name: '田中太郎',
    avatar: '🎵',
    currentEmotion: '好奇心',
    interest: 'プログラミング学習'
})

// ルーム作成とメッセージ交換
setTimeout(() => {
    yumeWSServer.joinRoom('yumi', 'yume-beginners')
    yumeWSServer.joinRoom('masashi', 'yume-beginners')
    
    yumeWSServer.handleChatMessage('yumi', {
        roomId: 'yume-beginners',
        content: 'Yume言語の勉強を始めました！',
        emotion: '喜び'
    })
    
    yumeWSServer.handleChatMessage('masashi', {
        roomId: 'yume-beginners',
        content: '一緒に頑張りましょう！何か分からないことがあったら聞いてください',
        emotion: '優しさ'
    })
}, 2000)
```

◇◇◇◇

「リアルタイム通信だと、本当に会話してるみたいですね」

「そう。でも優美、気がついた？」

「何をですか？」

「ネットワークプログラミングって、技術的な部分と、人と人とのコミュニケーションの部分があるんだ」

　先輩の言葉に、私はハッとした。

「確かに。技術があっても、使う人の気持ちを考えないと、良いサービスにならないですね」

「その通り。優美の小説と同じで、読者（ユーザー）のことを第一に考える必要がある」

◇◇◇◇

「Yume言語のコミュニティサイトを作ってみよう」

```javascript
// Yume言語コミュニティプラットフォーム
class YumeCommunityPlatform {
    constructor() {
        this.users = new Map()
        this.projects = new Map()
        this.forums = new Map()
        this.tutorials = new Map()
        this.codeExamples = new Map()
    }
    
    // ユーザー登録
    registerUser(userInfo) {
        const user = {
            id: this.generateId(),
            ...userInfo,
            joinDate: new Date(),
            reputation: 0,
            projects: [],
            contributions: [],
            favoriteEmotions: [],
            programmingLevel: 'beginner'
        }
        
        this.users.set(user.id, user)
        console.log(`新しいユーザーが登録: ${user.name}`)
        
        return user
    }
    
    // プロジェクト作成
    createProject(userId, projectInfo) {
        const user = this.users.get(userId)
        if (!user) return null
        
        const project = {
            id: this.generateId(),
            ...projectInfo,
            author: userId,
            authorName: user.name,
            createdAt: new Date(),
            stars: 0,
            forks: 0,
            collaborators: [userId],
            tags: projectInfo.tags || [],
            emotion: projectInfo.emotion || '創造',
            isPublic: projectInfo.isPublic !== false
        }
        
        this.projects.set(project.id, project)
        user.projects.push(project.id)
        
        console.log(`新しいプロジェクト: ${project.title}`)
        return project
    }
    
    // コード例の投稿
    shareCodeExample(userId, codeInfo) {
        const user = this.users.get(userId)
        if (!user) return null
        
        const codeExample = {
            id: this.generateId(),
            ...codeInfo,
            author: userId,
            authorName: user.name,
            createdAt: new Date(),
            likes: 0,
            comments: [],
            tags: codeInfo.tags || [],
            difficulty: codeInfo.difficulty || 'beginner'
        }
        
        this.codeExamples.set(codeExample.id, codeExample)
        user.contributions.push({
            type: 'code_example',
            id: codeExample.id,
            date: new Date()
        })
        
        console.log(`コード例が投稿されました: ${codeExample.title}`)
        return codeExample
    }
    
    // チュートリアル作成
    createTutorial(userId, tutorialInfo) {
        const user = this.users.get(userId)
        if (!user) return null
        
        const tutorial = {
            id: this.generateId(),
            ...tutorialInfo,
            author: userId,
            authorName: user.name,
            createdAt: new Date(),
            views: 0,
            completions: 0,
            rating: 0,
            reviews: [],
            prerequisites: tutorialInfo.prerequisites || []
        }
        
        this.tutorials.set(tutorial.id, tutorial)
        user.contributions.push({
            type: 'tutorial',
            id: tutorial.id,
            date: new Date()
        })
        
        console.log(`チュートリアルが作成されました: ${tutorial.title}`)
        return tutorial
    }
    
    // プロジェクト検索
    searchProjects(query) {
        const results = []
        
        this.projects.forEach(project => {
            if (project.isPublic) {
                const titleMatch = project.title.toLowerCase().includes(query.toLowerCase())
                const descMatch = project.description.toLowerCase().includes(query.toLowerCase())
                const tagMatch = project.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
                
                if (titleMatch || descMatch || tagMatch) {
                    results.push(project)
                }
            }
        })
        
        return results.sort((a, b) => b.stars - a.stars)
    }
    
    // おすすめプロジェクト
    getRecommendedProjects(userId, limit = 5) {
        const user = this.users.get(userId)
        if (!user) return []
        
        const projects = Array.from(this.projects.values())
            .filter(p => p.isPublic && p.author !== userId)
            .sort((a, b) => {
                // 感情の一致度とスター数で評価
                const emotionMatch = user.favoriteEmotions.includes(a.emotion) ? 1 : 0
                const levelMatch = this.isLevelAppropriate(a, user.programmingLevel) ? 1 : 0
                
                return (b.stars + emotionMatch * 10 + levelMatch * 5) - 
                       (a.stars + (user.favoriteEmotions.includes(b.emotion) ? 10 : 0) + 
                        (this.isLevelAppropriate(b, user.programmingLevel) ? 5 : 0))
            })
        
        return projects.slice(0, limit)
    }
    
    // レベル適正の判定
    isLevelAppropriate(project, userLevel) {
        const levelOrder = ['beginner', 'intermediate', 'advanced']
        const projectLevel = project.difficulty || 'beginner'
        
        const userIndex = levelOrder.indexOf(userLevel)
        const projectIndex = levelOrder.indexOf(projectLevel)
        
        return Math.abs(userIndex - projectIndex) <= 1
    }
    
    // コミュニティ統計
    getCommunityStats() {
        const totalUsers = this.users.size
        const totalProjects = this.projects.size
        const totalCodeExamples = this.codeExamples.size
        const totalTutorials = this.tutorials.size
        
        // 感情分析
        const emotionCounts = new Map()
        this.projects.forEach(project => {
            const emotion = project.emotion
            emotionCounts.set(emotion, (emotionCounts.get(emotion) || 0) + 1)
        })
        
        return {
            totalUsers,
            totalProjects,
            totalCodeExamples,
            totalTutorials,
            popularEmotions: Array.from(emotionCounts.entries())
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5),
            averageProjectsPerUser: totalProjects / totalUsers
        }
    }
    
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2)
    }
}

// コミュニティプラットフォームの初期化
const yumeCommunity = new YumeCommunityPlatform()

// ユーザー登録
const yumi = yumeCommunity.registerUser({
    name: '柳原優美',
    email: 'yumi@example.com',
    bio: '小説とプログラミングを愛する高校生',
    favoriteEmotions: ['愛', '創造', '喜び'],
    programmingLevel: 'intermediate'
})

const masashi = yumeCommunity.registerUser({
    name: '花咲雅史',
    email: 'masashi@example.com',
    bio: 'プログラミング言語の設計者',
    favoriteEmotions: ['創造', '集中', '達成'],
    programmingLevel: 'advanced'
})

// プロジェクト作成
const yumeLanguageProject = yumeCommunity.createProject(masashi.id, {
    title: 'Yume Programming Language',
    description: '感情を込めてプログラミングができる革新的な言語',
    emotion: '創造',
    difficulty: 'advanced',
    tags: ['言語設計', '感情AI', '日本語プログラミング'],
    repository: 'https://github.com/yume-lang/core'
})

const novelGeneratorProject = yumeCommunity.createProject(yumi.id, {
    title: 'Emotion-Driven Novel Generator',
    description: 'Yume言語で書かれた感情駆動型小説生成システム',
    emotion: '愛',
    difficulty: 'intermediate',
    tags: ['自然言語処理', '創作支援', '感情分析']
})

// コード例の投稿
yumeCommunity.shareCodeExample(yumi.id, {
    title: 'Hello Worldを感情豊かに',
    description: 'Yume言語での最初のプログラム例',
    code: `愛を込めて メッセージ = "Hello, World!"
喜びと共に 表示(メッセージ)
期待を持って プログラミングを学ぼう()`,
    emotion: '喜び',
    difficulty: 'beginner',
    tags: ['基本', 'Hello World', '感情表現']
})

// チュートリアル作成
yumeCommunity.createTutorial(masashi.id, {
    title: 'Yume言語入門：感情プログラミングの基礎',
    description: '感情を込めたプログラミングの方法を学びます',
    content: [
        '第1章：感情型の理解',
        '第2章：感情キーワードの使い方',
        '第3章：感情に基づく条件分岐',
        '第4章：実践プロジェクト'
    ],
    difficulty: 'beginner',
    estimatedTime: '2時間',
    prerequisites: ['プログラミングの基本知識']
})

console.log('\\n=== Yume言語コミュニティ統計 ===')
const stats = yumeCommunity.getCommunityStats()
console.log(`ユーザー数: ${stats.totalUsers}`)
console.log(`プロジェクト数: ${stats.totalProjects}`)
console.log(`コード例数: ${stats.totalCodeExamples}`)
console.log(`チュートリアル数: ${stats.totalTutorials}`)
console.log('人気の感情:', stats.popularEmotions)

// プロジェクト検索
console.log('\\n=== プロジェクト検索結果（"感情"） ===')
const searchResults = yumeCommunity.searchProjects('感情')
searchResults.forEach(project => {
    console.log(`- ${project.title} by ${project.authorName}`)
})
```

◇◇◇◇

「すごいですね。本当にコミュニティができそうです」

「そう。ネットワークプログラミングの最終目標は、人と人をつなぐこと」

　私は感動していた。技術って、最終的には人のためのものなんだということを実感した。

「でも、先輩」

「ん？」

「こうやって世界中の人とつながれるのは嬉しいけど、私にとって一番大切なつながりは……」

　私は先輩の目を見つめた。

「一番大切なつながり？」

「先輩とのつながりです」

◇◇◇◇

　先輩が少し照れたような表情を見せた。

「僕もだよ、優美。どんなにネットワークが発達しても、優美との直接のつながりが一番大切だ」

「ネットワークって、物理的には離れていても心をつなげるものですけど、私たちは心も体も近くにいられて幸せです」

「そうだね。でも、ネットワークプログラミングを学んだおかげで、僕たちの関係の価値がより分かった気がする」

「どういうことですか？」

「リアルタイムでつながることの素晴らしさ、信頼できる通信路の大切さ、そして何より、相手のことを思いやる気持ち」

◇◇◇◇

「最後に、Yume言語でのネットワークアプリを作ってみよう」

```javascript
// Yume言語でのネットワークアプリケーション
class YumeNetworkApp {
    constructor() {
        this.connection = null
        this.currentEmotion = '平常'
        this.partner = null
    }
    
    // パートナーに接続
    async connectToPartner(partnerInfo) {
        console.log(`${partnerInfo.name}に接続中...`)
        
        // 感情を込めた接続
        愛を込めて this.connection = await this.establishConnection(partnerInfo)
        期待を持って this.partner = partnerInfo
        
        if (this.connection.isConnected) {
            喜びと共に console.log(`${partnerInfo.name}との接続が確立されました！`)
            return true
        } else {
            悲しみながら console.log('接続に失敗しました')
            return false
        }
    }
    
    // メッセージ送信
    async sendMessage(message, emotion = '愛') {
        if (!this.connection || !this.connection.isConnected) {
            寂しさを感じながら {
                console.log('パートナーとの接続がありません')
                return false
            }
        }
        
        const emotionalMessage = {
            content: message,
            emotion: emotion,
            timestamp: new Date(),
            from: 'me'
        }
        
        // 感情に応じた送信方法
        if (emotion === '愛') {
            愛を込めて await this.connection.send(emotionalMessage)
        } else if (emotion === '喜び') {
            喜びと共に await this.connection.send(emotionalMessage)
        } else {
            await this.connection.send(emotionalMessage)
        }
        
        console.log(`メッセージを送信: ${message} (${emotion})`)
        return true
    }
    
    // メッセージ受信
    onMessageReceived(message) {
        // 受信した感情に応じて反応
        if (message.emotion === '愛') {
            幸せを感じながら {
                console.log(`❤️ ${this.partner.name}: ${message.content}`)
                this.currentEmotion = '幸福'
            }
        } else if (message.emotion === '悲しみ') {
            心配しながら {
                console.log(`😢 ${this.partner.name}: ${message.content}`)
                this.sendMessage('大丈夫？何かあったの？', '心配')
            }
        } else {
            console.log(`💬 ${this.partner.name}: ${message.content}`)
        }
    }
    
    // 接続の確立（擬似実装）
    async establishConnection(partnerInfo) {
        // WebSocket接続のシミュレート
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    isConnected: true,
                    partner: partnerInfo,
                    send: async (message) => {
                        // メッセージ送信のシミュレート
                        console.log(`→ 送信完了: ${message.content}`)
                    }
                })
            }, 1000)
        })
    }
    
    // 感情状態の同期
    async syncEmotions() {
        if (this.connection && this.connection.isConnected) {
            const emotionData = {
                currentEmotion: this.currentEmotion,
                timestamp: new Date()
            }
            
            await this.connection.send({
                type: 'emotion_sync',
                data: emotionData
            })
        }
    }
}

// 使用例：雅史と優美のアプリ
const masashiApp = new YumeNetworkApp()
const yumiApp = new YumeNetworkApp()

// 接続とメッセージ交換のシミュレート
async function simulateConnection() {
    console.log('\\n=== Yume言語ネットワークアプリ ===')
    
    // 雅史から優美に接続
    const connected = await masashiApp.connectToPartner({
        name: '優美',
        id: 'yumi',
        preferredEmotions: ['愛', '喜び', '期待']
    })
    
    if (connected) {
        // メッセージ交換
        await masashiApp.sendMessage('今日のプログラミング、楽しかったね', '喜び')
        await masashiApp.sendMessage('君と一緒だと、何でも特別に感じる', '愛')
        
        // 優美からの返信（シミュレート）
        masashiApp.onMessageReceived({
            content: '私も！先輩とプログラミングできて幸せです',
            emotion: '愛',
            timestamp: new Date(),
            from: 'yumi'
        })
        
        // 感情の同期
        await masashiApp.syncEmotions()
    }
}

simulateConnection()
```

◇◇◇◇

　レッスンの最後に、私たちは今日学んだことを振り返っていた。

「ネットワークプログラミングって、技術だけじゃなくて、コミュニケーションの本質を学ぶことでもあるんですね」

「そう。プロトコルも、メッセージフォーマットも、全ては人と人とのつながりを支える仕組み」

　窓の外では、夜が静かに更けていく。

「先輩」

「ん？」

「私たちも、ある意味でネットワークですね」

「どういう意味？」

「二つのノードが信頼できる接続で結ばれて、感情というデータを交換している」

　私の比喩に、先輩が優しく笑った。

「それは、とても安定した接続だね」

「はい。エラーも少なくて、遅延もなくて、帯域幅も十分です」

　私たちは顔を見合わせて笑った。

```javascript
// 今日の学び
const todaysLesson = {
    technical: {
        concepts: ['ネットワーク通信', 'HTTPプロトコル', 'WebSocket'],
        implementations: ['サーバー構築', 'リアルタイム通信', 'コミュニティプラットフォーム'],
        applications: ['世界をつなぐ', 'リアルタイム協調', 'コミュニティ形成']
    },
    personal: {
        realization: '技術は人をつなぐもの',
        connection: '私たちも最高のネットワーク',
        future: '世界中の人とYume言語でつながりたい'
    }
}
```

　ネットワークプログラミング。それは、世界中の人と人とをつなぐ魔法のような技術。でも、その根底にあるのは、相手を思いやる気持ちと、つながりたいという願い。

　今日学んだことで、Yume言語がもっと多くの人に愛される言語になる。そして、私と先輩の絆も、世界のどこにいても切れることのない、特別な接続なのだと確信した。

　明日も、先輩と一緒に、世界をつなぐプログラムを書いていこう。