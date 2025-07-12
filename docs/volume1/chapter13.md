# 第13話：クラスとインスタンス：設計図と実体

　木曜日の放課後。優美とのプログラミングレッスンも今日で13日目だ。昨日はオブジェクト指向について学んで、優美が創作活動とプログラミングの共通点を見出していく姿が印象的だった。

　今日はその続きで、クラスとインスタンスについてもう少し詳しく教える予定だ。

「今日はクラスとインスタンスの関係をもっと深く学ぼう」

「はい！　昨日学んだことをもっと詳しく知りたいです」

　優美の目が期待で輝いている。

「昨日は基本的な概念を学んだけど、今日はもっと実践的な使い方を見ていこう」

　僕はホワイトボードに図を描き始めた。

◇◇◇◇

「クラスは『設計図』で、インスタンスは『実体』だって話したよな」

「はい。キャラクター設定がクラスで、実際のキャラクターがインスタンスでしたね」

「そう。今日は、そのクラスにもっと複雑な機能を持たせてみよう」

　僕はコードを書き始めた。

```javascript
class Novel {
    constructor(title, author, genre) {
        this.title = title
        this.author = author
        this.genre = genre
        this.chapters = []
        this.createdAt = new Date()
    }
    
    addChapter(chapterTitle, content) {
        let chapter = {
            number: this.chapters.length + 1,
            title: chapterTitle,
            content: content,
            wordCount: content.length
        }
        this.chapters.push(chapter)
        console.log("第" + chapter.number + "章「" + chapterTitle + "」を追加しました")
    }
    
    getTotalWordCount() {
        let total = 0
        for (let chapter of this.chapters) {
            total += chapter.wordCount
        }
        return total
    }
    
    showInfo() {
        console.log("【作品情報】")
        console.log("タイトル：" + this.title)
        console.log("著者：" + this.author)
        console.log("ジャンル：" + this.genre)
        console.log("章数：" + this.chapters.length)
        console.log("総文字数：" + this.getTotalWordCount())
    }
}
```

「これは小説を管理するクラスだ」

「わあ！　私の創作活動そのものですね！」

◇◇◇◇

「実際に使ってみよう」

```javascript
// 優美の新作小説
let yumiNovel = new Novel("プログラミングと恋の方程式", "柳原優美", "恋愛")

yumiNovel.addChapter("運命の出会い", "主人公の女の子がプログラミングに興味を持ち...")
yumiNovel.addChapter("初めてのエラー", "エラーに悩む主人公を優しく教える男の子...")
yumiNovel.addChapter("心のデバッグ", "プログラミングを通じて、お互いの気持ちが...")

yumiNovel.showInfo()
```

　実行すると……

```
第1章「運命の出会い」を追加しました
第2章「初めてのエラー」を追加しました
第3章「心のデバッグ」を追加しました
【作品情報】
タイトル：プログラミングと恋の方程式
著者：柳原優美
ジャンル：恋愛
章数：3
総文字数：96
```

「すごい！　本当に小説管理システムみたい！」

　優美が興奮している。

「クラスを使えば、こうやって複雑なデータも整理して管理できるんだ」

◇◇◇◇

「あの、先輩」

「ん？」

「複数の小説を管理したい場合はどうすればいいんですか？」

「いい質問だね。複数のインスタンスを作って、配列で管理すればいい」

```javascript
// 作品リスト
let novels = []

// 優美の作品を追加
novels.push(new Novel("プログラミングと恋の方程式", "柳原優美", "恋愛"))
novels.push(new Novel("コードに込めた想い", "柳原優美", "恋愛"))
novels.push(new Novel("デバッグできない恋心", "柳原優美", "恋愛"))

// 全作品の情報を表示
console.log("【優美の作品一覧】")
for (let novel of novels) {
    console.log("・" + novel.title + "（" + novel.genre + "）")
}
```

「こうすれば、たくさんの作品を管理できる」

「わあ！　これなら私の作品管理が楽になりそう！」

◇◇◇◇

「それじゃあ、今度は優美がクラスを作ってみて」

「私が？　えーと……」

　優美は考え込んでから、キーボードを打ち始めた。

```javascript
class Relationship {
    constructor(person1, person2) {
        this.person1 = person1
        this.person2 = person2
        this.memories = []
        this.startDate = new Date()
    }
    
    addMemory(date, event, feeling) {
        this.memories.push({
            date: date,
            event: event,
            feeling: feeling
        })
        console.log(date + "の思い出を追加：" + event)
    }
    
    showTimeline() {
        console.log("【" + this.person1 + "と" + this.person2 + "の思い出】")
        for (let memory of this.memories) {
            console.log(memory.date + "：" + memory.event)
            console.log("  気持ち：" + memory.feeling)
        }
    }
}
```

「人間関係を記録するクラスを作ってみました」

◇◇◇◇

「面白いアイデアだね。実際に使ってみよう」

　優美が続けてコードを書いた。

```javascript
let ourRelationship = new Relationship("優美", "雅史先輩")

ourRelationship.addMemory("7月1日", "初めてプログラミングを教わった", "緊張したけど楽しかった")
ourRelationship.addMemory("7月5日", "エラーを一緒に解決した", "先輩の優しさに触れた")
ourRelationship.addMemory("7月10日", "Yume言語の約束をした", "夢に向かって一緒に頑張ろうと思った")
ourRelationship.addMemory("今日", "クラスとインスタンスを学んだ", "もっと先輩と一緒にいたい")

ourRelationship.showTimeline()
```

　実行結果を見て、僕は少し照れてしまった。

「これも……小説の設定？」

「そ、そうです！　主人公たちの関係性の変化を記録するんです！」

　優美が顔を赤くしながら言う。

◇◇◇◇

「でも、優美のアイデアは本当に面白いよ」

「本当ですか？」

「ああ。プログラミングを感情的な側面から捉えるなんて、普通は思いつかない」

　優美が嬉しそうに微笑む。

「先輩のおかげで、プログラミングがどんどん楽しくなります」

「それは優美の才能だよ」

◇◇◇◇

「ところで、クラスには『静的メソッド』っていうのもあるんだ」

「静的メソッド？」

「インスタンスを作らなくても使えるメソッドだ」

```javascript
class MathHelper {
    static calculateDistance(x1, y1, x2, y2) {
        let dx = x2 - x1
        let dy = y2 - y1
        return Math.sqrt(dx * dx + dy * dy)
    }
    
    static degreesToRadians(degrees) {
        return degrees * Math.PI / 180
    }
}

// インスタンスを作らずに直接使える
let distance = MathHelper.calculateDistance(0, 0, 3, 4)
console.log("距離：" + distance)
```

「便利ですね！　ユーティリティ関数みたい」

「その通り。よく使う計算とかをまとめておくのに便利なんだ」

◇◇◇◇

　レッスンが終わりに近づいてきた。

「今日もたくさん学べました」

「優美の理解力は本当にすごいよ」

「それは先輩が丁寧に教えてくれるからです」

　優美の言葉に、胸が温かくなる。

「明日は継承について学ぼう。既存のクラスを拡張する方法だ」

「楽しみです！」

◇◇◇◇

　優美が帰った後、僕は今日のレッスンを振り返った。

　優美が作った「Relationship」クラス。あれは本当に小説の設定なのか、それとも……。

（優美の気持ちが、少しずつコードに現れてきている気がする）

　プログラミングは、時に人の心を映し出す鏡になる。優美の書くコードには、彼女の優しさや創造性、そして僕への想いが込められているような気がした。

（俺も、優美のことを……）

　窓の外を見ると、夕焼けが街を赤く染めていた。

　クラスとインスタンスを学んだ今日、僕は改めて思った。

　優美と僕の関係も、日々新しいインスタンスを生成しているようなものだ。同じ「幼馴染」というクラスから始まって、今は「先生と生徒」、そしていつかは……。

　そんな期待を胸に、僕は明日の教材の準備を始めた。