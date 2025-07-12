# 第19話：API連携：外の世界とつながる

　水曜日の放課後。優美とのプログラミングレッスンは19日目。昨日の非同期処理のレッスンで、僕がうっかり見せてしまったコメントアウトされたコード。あれ以来、教室の空気が少し変わった気がする。

　甘いような、くすぐったいような、でも心地いい緊張感。

「今日はAPI連携について学ぼう」

「API連携？」

　優美の瞳が好奇心でキラキラしている。

「プログラムが外の世界とつながる方法だ。他のサービスやデータと連携できる」

「外の世界……なんだかロマンチックですね」

　優美の感性は相変わらず独特だ。でも、その見方が好きだ。

◇◇◇◇

「例えば、天気予報のデータを取得してみよう」

```javascript
// 天気予報APIを呼び出す（実際のAPIキーは必要）
async function getWeather(city) {
    try {
        let response = await fetch(`https://api.weather.com/v1/weather?city=${city}`)
        let data = await response.json()
        
        console.log(`${city}の天気：${data.weather}`)
        console.log(`気温：${data.temperature}℃`)
        
        return data
    } catch (error) {
        console.log("天気情報の取得に失敗：", error)
    }
}

// 使用例
getWeather("Tokyo")
```

「わあ！　プログラムが天気を教えてくれるんですか？」

「そう。APIを使えば、世界中の情報にアクセスできる」

◇◇◇◇

「優美の好きな小説投稿サイトも、きっとAPIを持ってるよ」

　その言葉に、優美の目がさらに輝いた。

「本当ですか？」

「ああ。例えばこんな感じで」

```javascript
// 小説投稿サイトのAPI（仮想）
class NovelAPI {
    static async searchNovels(keyword) {
        // 実際はfetchでAPIを呼ぶ
        console.log(`「${keyword}」で検索中...`)
        
        return [
            { title: "プログラミングと恋の方程式", author: "柳原優美" },
            { title: "コードに込めた想い", author: "柳原優美" },
            { title: "非同期な恋心", author: "柳原優美" }
        ]
    }
    
    static async postNovel(novel) {
        console.log("小説を投稿中...")
        
        // バリデーション
        if (!novel.title || !novel.content) {
            throw new Error("タイトルと本文は必須です")
        }
        
        // 仮の投稿処理
        return {
            id: Math.random().toString(36),
            url: `https://novel-site.com/novels/${novel.title}`,
            publishedAt: new Date()
        }
    }
}
```

「私の作品名が例に使われてる！」

　優美が嬉しそうに頬を赤らめた。

◇◇◇◇

「APIは人と人をつなぐ架け橋みたいなものだ」

「架け橋？」

「プログラマーが作ったサービスを、別のプログラマーが使えるようにする。そうやって、みんなで協力して大きなものを作っていく」

　優美が何か考え込んでいる。

「先輩」

「ん？」

「私たちのYume言語も、いつかAPIを提供できるようになりますか？」

　その質問に、胸が熱くなった。

「きっとできるよ。優美が書いた小説を、Yume言語で解析したり、自動で感想を生成したり」

「すごい！　夢が広がります！」

◇◇◇◇

「実際にAPIを作ってみよう」

```javascript
// Yume言語のためのAPI設計
class YumeLanguageAPI {
    constructor() {
        this.stories = new Map()
    }
    
    // ストーリーを登録
    async registerStory(story) {
        let id = Date.now().toString()
        
        this.stories.set(id, {
            ...story,
            createdAt: new Date(),
            emotions: this.analyzeEmotions(story.content)
        })
        
        return { id, message: "ストーリーが登録されました" }
    }
    
    // 感情分析（簡易版）
    analyzeEmotions(content) {
        let emotions = {
            love: 0,
            joy: 0,
            sadness: 0,
            excitement: 0
        }
        
        // キーワードで感情を判定
        if (content.includes("好き") || content.includes("愛")) emotions.love++
        if (content.includes("嬉しい") || content.includes("楽しい")) emotions.joy++
        if (content.includes("悲しい") || content.includes("寂しい")) emotions.sadness++
        if (content.includes("ドキドキ") || content.includes("ワクワク")) emotions.excitement++
        
        return emotions
    }
    
    // ストーリー間の関連性を見つける
    async findRelatedStories(storyId) {
        let targetStory = this.stories.get(storyId)
        if (!targetStory) throw new Error("ストーリーが見つかりません")
        
        let related = []
        
        for (let [id, story] of this.stories) {
            if (id === storyId) continue
            
            // 感情の類似度を計算
            let similarity = this.calculateSimilarity(
                targetStory.emotions,
                story.emotions
            )
            
            if (similarity > 0.7) {
                related.push({ id, title: story.title, similarity })
            }
        }
        
        return related
    }
    
    calculateSimilarity(emotions1, emotions2) {
        // 簡単な類似度計算
        let total = 0
        let count = 0
        
        for (let key in emotions1) {
            total += 1 - Math.abs(emotions1[key] - emotions2[key]) / 10
            count++
        }
        
        return total / count
    }
}
```

「感情分析！　これ、本当に小説に使えそう！」

　優美が興奮している。

◇◇◇◇

「APIを使うときは、相手への思いやりが大切なんだ」

「思いやり？」

「使用制限を守ったり、エラーを適切に処理したり。相手のサーバーに負担をかけないように」

　僕は優美の顔を見つめた。

「人間関係と同じだよ」

　その言葉に、優美の頬がほんのり赤くなった。

「確かに……相手のことを考えて、優しく接するんですね」

◇◇◇◇

「あの、先輩」

「ん？」

「私たちの関係も、APIみたいですね」

　突然の言葉に、心臓がドキッとした。

「どういう意味だ？」

「お互いに必要な時に呼び出し合って、情報を交換して、新しいものを作っていく」

　優美が恥ずかしそうに続けた。

「でも、APIと違うのは……」

「違うのは？」

「感情も一緒に送受信してるところです」

　その言葉に、教室の空気が一瞬止まった。

◇◇◇◇

「優美……」

「あ、いえ！　プログラミングの話です！　感情を扱うAPIの話！」

　慌てる優美が愛おしい。でも、僕も勇気を出してみる。

「僕も、優美とのAPIで、たくさんの感情を受け取ってるよ」

「先輩？」

「嬉しさとか、楽しさとか、それから……」

　言葉が続かない。でも、優美は優しく微笑んで待っていてくれた。

◇◇◇◇

　レッスンの最後に、優美が提案した。

「先輩、二人の思い出をAPIにしてみませんか？」

```javascript
// 二人の思い出API
class MemoryAPI {
    static memories = [
        {
            date: "7月1日",
            event: "プログラミングレッスン開始",
            masashiFeeling: "緊張していたけど嬉しかった",
            yumiFeeling: "ドキドキしたけど楽しかった"
        },
        {
            date: "7月10日",
            event: "Yume言語の約束",
            masashiFeeling: "優美の夢を一緒に叶えたいと思った",
            yumiFeeling: "先輩と一緒なら何でもできる気がした"
        },
        {
            date: "今日",
            event: "API連携を学ぶ",
            masashiFeeling: "優美との繋がりを感じた",
            yumiFeeling: "???"  // まだ書けない
        }
    ]
    
    static async getMemory(date) {
        return this.memories.find(m => m.date === date)
    }
    
    static async addFeeling(date, person, feeling) {
        let memory = await this.getMemory(date)
        if (memory) {
            memory[`${person}Feeling`] = feeling
        }
    }
}
```

「優美の今日の気持ち、???になってるけど」

「それは……まだ言葉にできないです」

　優美の顔が真っ赤になった。

「でも、いつか必ず、このAPIを完成させます」

◇◇◇◇

　優美が帰った後、僕は一人で今日のコードを見返していた。

　二人の思い出API。まだ未完成の、優美の気持ち。

（いつか、お互いの気持ちが完全に同期する日が来るのかな）

　窓の外を見ると、夕焼けが街を赤く染めていた。

　APIは外の世界とつながる技術。でも、今の僕にとって一番大切なのは、目の前にいる優美との繋がりだ。

　明日はどんな繋がりを作れるだろう。そんな期待を胸に、僕は教材の準備を始めた。いつか、二人の気持ちが完全にconnectする日を夢見ながら。