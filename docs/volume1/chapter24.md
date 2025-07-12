# 第24話：デザインパターン：先人の知恵

　月曜日の放課後。私、柳原優美は少し緊張しながら先輩の部屋に向かった。先週金曜日のリファクタリングのレッスン。あの時先輩が見せてくれた最後のコード―――

```javascript
const us = new Lovers("雅史", "優美")
```

　それが頭から離れない。

「お疲れ様です、先輩！」

「おう、優美。今日はデザインパターンについて学ぼう」

「デザインパターン？」

「プログラミングの先人たちが残してくれた、問題解決の定石だ」

◇◇◇◇

「優美、小説を書く時、よくある展開のパターンってあるよね？」

「はい！　ボーイミーツガールとか、すれ違いとか、再会とか」

「それと同じように、プログラミングにも『よくある問題の解決パターン』があるんだ」

　先輩がホワイトボードに図を描き始めた。

```javascript
// Singletonパターン：世界に一つだけのインスタンス
class LoveManager {
    constructor() {
        if (LoveManager.instance) {
            return LoveManager.instance
        }
        
        this.connections = new Map()
        LoveManager.instance = this
    }
    
    connect(person1, person2) {
        let key = [person1, person2].sort().join('-')
        
        if (this.connections.has(key)) {
            console.log("既に繋がっています")
            return this.connections.get(key)
        }
        
        let connection = {
            members: [person1, person2],
            createdAt: new Date(),
            strength: 0
        }
        
        this.connections.set(key, connection)
        return connection
    }
}

// どこから呼んでも同じインスタンス
let manager1 = new LoveManager()
let manager2 = new LoveManager()
console.log(manager1 === manager2)  // true
```

「一つしか存在しないもの……運命の相手みたい」

　つい口に出してしまった言葉に、先輩の顔が赤くなった。

◇◇◇◇

「次は、Observerパターンだ」

```javascript
// 観察者パターン：変化を見守る
class Heart {
    constructor(owner) {
        this.owner = owner
        this.observers = []
        this.beatRate = 60  // 通常の心拍数
    }
    
    // 観察者を追加
    addObserver(observer) {
        this.observers.push(observer)
    }
    
    // 心拍数が変化
    setBeatRate(rate) {
        this.beatRate = rate
        this.notify()
    }
    
    // 全ての観察者に通知
    notify() {
        this.observers.forEach(observer => {
            observer.update(this.owner, this.beatRate)
        })
    }
}

// 観察者
class HeartMonitor {
    update(owner, beatRate) {
        if (beatRate > 100) {
            console.log(`${owner}の心臓がドキドキしています！`)
        } else if (beatRate > 80) {
            console.log(`${owner}は少し緊張しているようです`)
        } else {
            console.log(`${owner}は落ち着いています`)
        }
    }
}

// 使用例
let yumiHeart = new Heart("優美")
let monitor = new HeartMonitor()

yumiHeart.addObserver(monitor)
yumiHeart.setBeatRate(120)  // "優美の心臓がドキドキしています！"
```

「これ、今の私の状態かも」

　小さな声でつぶやいた。

「え？」

「い、いえ！　なんでもないです！」

◇◇◇◇

「Factoryパターンも面白いよ」

```javascript
// ファクトリーパターン：状況に応じて適切なものを作る
class EmotionFactory {
    static createEmotion(situation, person) {
        switch(situation) {
            case "初めての告白":
                return new Nervousness(person, 100)
            
            case "手を繋ぐ":
                return new Happiness(person, 80)
            
            case "プログラミングを教わる":
                return new Joy(person, 70)
            
            case "先輩の優しさに触れる":
                return new Warmth(person, 90)
            
            default:
                return new Neutral(person)
        }
    }
}

class Emotion {
    constructor(person, intensity) {
        this.person = person
        this.intensity = intensity
    }
}

class Happiness extends Emotion {
    express() {
        return `${this.person}は幸せで一杯です（強度: ${this.intensity}）`
    }
}

class Warmth extends Emotion {
    express() {
        return `${this.person}の心が温かくなりました（強度: ${this.intensity}）`
    }
}
```

「先輩」

「ん？」

「私の今の感情も、ファクトリーで作れますか？」

　勇気を出して聞いてみた。

「どんな状況での感情だ？」

「『大切な人と一緒にプログラミングを学んでいる時』の感情です」

◇◇◇◇

　先輩が手を止めた。そして、少し考えてから、新しいコードを書き始めた。

```javascript
// 特別な感情のファクトリー
class SpecialEmotionFactory {
    static createComplexEmotion(situation, person1, person2) {
        if (situation === "一緒に夢を追いかける") {
            return {
                [person1]: new Array(
                    new Happiness(person1, 90),
                    new Hope(person1, 100),
                    new Love(person1, "???")  // まだ言葉にできない
                ),
                [person2]: new Array(
                    new Happiness(person2, 90),
                    new Hope(person2, 100),
                    new Love(person2, "???")  // まだ言葉にできない
                )
            }
        }
    }
}
```

「Loveのintensityが???になってる」

　私が指摘すると、先輩が照れ笑いを浮かべた。

「まだ……測定不能ってことで」

◇◇◇◇

「最後に、Strategyパターンを見てみよう」

```javascript
// 戦略パターン：状況に応じて方法を変える
class ConfessionStrategy {
    execute() {
        throw new Error("サブクラスで実装してください")
    }
}

class DirectConfession extends ConfessionStrategy {
    execute(from, to) {
        return `${from}「${to}、好きです。付き合ってください」`
    }
}

class CodeConfession extends ConfessionStrategy {
    execute(from, to) {
        return `
const myFeelings = {
    from: "${from}",
    to: "${to}",
    message: "大好きです",
    promise: "ずっと一緒にいたい"
}
        `
    }
}

class PoetryConfession extends ConfessionStrategy {
    execute(from, to) {
        return `
君と過ごす時間は
まるでコンパイルの成功のよう
エラーのない世界で
二人だけの関数を作りたい
        `
    }
}

// 告白マネージャー
class ConfessionManager {
    constructor(strategy) {
        this.strategy = strategy
    }
    
    confess(from, to) {
        return this.strategy.execute(from, to)
    }
}
```

「これって……」

「まあ、参考程度に」

　先輩の顔が真っ赤だ。

◇◇◇◇

「デザインパターンは、ただの技術じゃない」

　先輩が真剣な表情で続けた。

「先人たちが試行錯誤して見つけた、最良の方法なんだ。恋愛にも、きっと最良のパターンがある」

「どんなパターンですか？」

「それは……」

　先輩が私の目を見つめた。

「お互いを大切に思って、一緒に成長していくパターンかな」

◇◇◇◇

　レッスンの最後に、私は提案した。

「先輩、Yume言語にもデザインパターンを取り入れましょう」

「いいアイデアだ」

```javascript
// Yume言語のためのパターン
class YumePatterns {
    // ビルダーパターン：段階的に物語を構築
    static storyBuilder() {
        return {
            characters: [],
            setting: null,
            plot: [],
            emotions: [],
            
            addCharacter(character) {
                this.characters.push(character)
                return this
            },
            
            setSetting(setting) {
                this.setting = setting
                return this
            },
            
            addEvent(event, emotion) {
                this.plot.push(event)
                this.emotions.push(emotion)
                return this
            },
            
            build() {
                return new Story(this)
            }
        }
    }
}

// 使用例
let ourStory = YumePatterns.storyBuilder()
    .addCharacter("優美")
    .addCharacter("雅史")
    .setSetting("プログラミング教室")
    .addEvent("出会い", "運命")
    .addEvent("共に学ぶ", "幸せ")
    .addEvent("Yume言語を作る", "希望")
    .addEvent("？？？", "？？？")  // これから書かれる物語
    .build()
```

「最後のイベントが???」

「これから二人で書いていく物語だから」

◇◇◇◇

　自分の部屋に戻って、今日学んだことをノートにまとめる。

『デザインパターン：問題解決の定石』
『Singleton：世界に一つだけ』
『Observer：変化を見守る』
『Factory：適切なものを作る』
『Strategy：最良の方法を選ぶ』

　そして、ノートの端に小さく書き加えた。

『恋愛にも最良のパターンがあるなら、私たちはもうそれを歩んでいる』

　窓の外を見ると、月が優しく街を照らしていた。

（先人の知恵を借りながら、私たちだけの物語を作っていこう）

　Yume言語と、二人の関係。どちらも、最良のパターンを見つけながら、少しずつ前に進んでいく。

　明日も、先輩と一緒に新しいパターンを見つけに行こう。私たちだけの、特別なデザインパターンを。