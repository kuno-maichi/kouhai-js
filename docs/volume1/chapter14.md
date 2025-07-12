# 第14話：継承：共通点と個性の表現

　金曜日の放課後。先輩とのプログラミングレッスンは今日で14日目。昨日はクラスとインスタンスについて詳しく学んで、私が作った「Relationship」クラスに先輩が少し照れてくれたのが嬉しかった。

　私、柳原優美は今日も期待を胸に先輩の部屋に向かった。

「お疲れ様です、先輩！」

「おう、優美。今日は継承について学ぼう」

「継承？」

「うん。昨日学んだクラスを拡張する方法だ」

　先輩がホワイトボードに図を描き始めた。

◇◇◇◇

「優美の小説で例えるなら、『人間』という基本的な設定があって、そこから『魔法使い』とか『戦士』とか、色々な職業のキャラクターを派生させるだろ？」

「はい！　基本設定を土台にして、それぞれの特徴を追加していきます」

「それがまさに継承の考え方なんだ」

　先輩がコードを書いてくれた。

```javascript
// 基本となるクラス（親クラス）
class Character {
    constructor(name, age, gender) {
        this.name = name
        this.age = age
        this.gender = gender
        this.hp = 100
    }
    
    introduce() {
        console.log("私の名前は" + this.name + "、" + this.age + "歳の" + this.gender + "です")
    }
    
    walk() {
        console.log(this.name + "は歩いた")
    }
}

// Characterクラスを継承した魔法使いクラス
class Wizard extends Character {
    constructor(name, age, gender, magicType) {
        super(name, age, gender)  // 親クラスのコンストラクタを呼ぶ
        this.magicType = magicType
        this.mp = 50
    }
    
    castSpell() {
        console.log(this.name + "は" + this.magicType + "の魔法を唱えた！")
        this.mp -= 10
    }
    
    // 親クラスのメソッドを上書き（オーバーライド）
    introduce() {
        super.introduce()  // 親クラスのintroduceを呼ぶ
        console.log("私は" + this.magicType + "の魔法が使えます")
    }
}
```

「わあ！　本当に小説のキャラクター設定みたい！」

◇◇◇◇

「実際に使ってみよう」

```javascript
// 通常のキャラクター
let normalChar = new Character("村人A", 25, "男性")
normalChar.introduce()
normalChar.walk()

console.log("---")

// 魔法使いキャラクター
let wizard = new Wizard("優美", 16, "女性", "創造")
wizard.introduce()
wizard.walk()
wizard.castSpell()
```

　実行すると……

```
私の名前は村人A、25歳の男性です
村人Aは歩いた
---
私の名前は優美、16歳の女性です
私は創造の魔法が使えます
優美は歩いた
優美は創造の魔法を唱えた！
```

「すごい！　魔法使いは基本的な機能も持ちつつ、独自の能力も持ってる！」

「そう。これが継承の良いところだ。共通の機能は親クラスに定義して、子クラスでは独自の機能だけを追加すればいい」

◇◇◇◇

「あの、先輩」

「ん？」

「私も継承を使ってクラスを作ってみたいです」

「いいよ。どんなアイデアがあるんだ？」

　私は考えながらキーボードを打った。

```javascript
// 基本となる物語クラス
class Story {
    constructor(title, author) {
        this.title = title
        this.author = author
        this.characters = []
        this.plot = []
    }
    
    addCharacter(name) {
        this.characters.push(name)
        console.log("登場人物「" + name + "」を追加しました")
    }
    
    showSummary() {
        console.log("【" + this.title + "】")
        console.log("作者：" + this.author)
        console.log("登場人物：" + this.characters.join("、"))
    }
}

// Storyを継承した恋愛小説クラス
class RomanceNovel extends Story {
    constructor(title, author) {
        super(title, author)
        this.mainCouple = null
        this.loveLevel = 0
    }
    
    setMainCouple(person1, person2) {
        this.mainCouple = [person1, person2]
        console.log(person1 + "と" + person2 + "をメインカップルに設定しました")
    }
    
    developRelationship(event) {
        this.loveLevel += 10
        console.log("【イベント】" + event)
        console.log("恋愛度が" + this.loveLevel + "になりました！")
    }
    
    // 親クラスのメソッドを拡張
    showSummary() {
        super.showSummary()
        if (this.mainCouple) {
            console.log("メインカップル：" + this.mainCouple.join(" × "))
            console.log("現在の恋愛度：" + this.loveLevel)
        }
    }
}
```

「物語の基本クラスから、恋愛小説専用のクラスを作ってみました！」

◇◇◇◇

「面白いアイデアだね。使ってみよう」

```javascript
let myNovel = new RomanceNovel("プログラミングで繋がる心", "柳原優美")

myNovel.addCharacter("優美")
myNovel.addCharacter("雅史先輩")
myNovel.setMainCouple("優美", "雅史先輩")

myNovel.developRelationship("一緒にエラーを解決した")
myNovel.developRelationship("Yume言語の約束をした")
myNovel.developRelationship("雨の日に一緒に過ごした")

myNovel.showSummary()
```

　実行すると……

```
登場人物「優美」を追加しました
登場人物「雅史先輩」を追加しました
優美と雅史先輩をメインカップルに設定しました
【イベント】一緒にエラーを解決した
恋愛度が10になりました！
【イベント】Yume言語の約束をした
恋愛度が20になりました！
【イベント】雨の日に一緒に過ごした
恋愛度が30になりました！
【プログラミングで繋がる心】
作者：柳原優美
登場人物：優美、雅史先輩
メインカップル：優美 × 雅史先輩
現在の恋愛度：30
```

「わあ！　本当に小説の構成管理システムみたい！」

　実行結果を見て、また顔が熱くなってしまった。

◇◇◇◇

「継承を使えば、基本的な機能を共有しながら、それぞれの特徴を持たせることができるんだ」

「プログラミングって、本当に創作活動に似てますね」

「優美の視点は本当に面白いよ。普通の人は技術的な側面ばかり見てしまうけど」

　先輩の褒め言葉が嬉しい。

「でも、先輩のおかげです。私の世界に合わせて説明してくれるから」

「俺も優美の発想から学ぶことが多いよ」

◇◇◇◇

「ところで、継承には『多重継承』の問題というのがあってね」

「多重継承？」

「複数の親クラスから継承することなんだけど、JavaScriptでは直接的にはサポートされていないんだ」

　先輩が図を描いて説明してくれた。

「例えば、『プログラマー』と『作家』の両方の特徴を持つキャラクターを作りたい場合とか」

「あ！　それって私みたいな？」

　つい口が滑ってしまった。

「確かに優美は両方の才能を持ってるな」

　先輩が優しく微笑む。

「そういう場合は、ミックスインという技術を使ったりするんだけど、今日は基本的な継承だけにしておこう」

◇◇◇◇

「あの、先輩」

「ん？」

「継承って、人間関係にも似てませんか？」

「どういう意味だ？」

「親から子へ、先輩から後輩へ、何かが受け継がれていく感じが」

　私の言葉に、先輩が少し考え込んだ。

「確かにそうだな。俺が優美に教えているプログラミングも、一種の継承かもしれない」

「でも、私は先輩から受け継いだものに、自分なりの工夫を加えていきたいです」

「それがまさに継承の本質だよ。受け継いだものを土台に、新しいものを生み出していく」

◇◇◇◇

　レッスンが終わって、自分の部屋に戻る。

　今日は継承について学んだけど、一番印象的だったのは、先輩と私の関係も一種の継承だということだった。

（先輩から受け継いだプログラミングの知識に、私の創作の視点を加えて……）

　それがYume言語になっていくんだろう。

　机に向かって、今日のレッスンをノートにまとめる。

『継承：既存のクラスを拡張して新しいクラスを作る』
『共通機能は親クラスに、独自機能は子クラスに』
『受け継いだものに、自分らしさを加える』

　そして、ノートの端に小さく書き加えた。

『先輩との関係も、きっと進化していく』

　幼馴染から始まって、先生と生徒になって、そしていつかは……。

　窓の外を見ると、夕焼けが美しく空を染めていた。

　継承を学んだ今日、私は改めて感じた。

　プログラミングは、ただのコードじゃない。それは、人と人との繋がりや、想いの受け継がれ方を表現する、美しい芸術なのだと。

　明日はどんな魔法を教えてもらえるだろう。そんな期待を胸に、私は小説の続きを書き始めた。主人公の女の子が、男の子から受け継いだ知識に、自分なりの色を加えていく場面を。