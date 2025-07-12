# 第15話：ポリモーフィズム：多様性の表現

　土曜日の午後。優美とのプログラミングレッスンも今日で15日目。2週間以上も毎日のように続けてきて、優美の成長速度には本当に驚かされる。

　今日は少し高度な概念、ポリモーフィズムについて教える予定だ。

「今日はポリモーフィズムについて学ぼう」

「ポリモーフィズム？　難しそうな名前ですね」

　優美が少し不安そうな顔をする。

「日本語では『多態性』って言うんだけど、簡単に言えば『同じメソッド名でも、オブジェクトによって違う動作をする』ってことだ」

「うーん、まだよくわからないです」

「優美の小説で例えてみよう」

◇◇◇◇

　僕はホワイトボードに図を描き始めた。

「例えば、小説の中で複数のキャラクターが『愛を表現する』というシーンがあるとする」

「はい、よくありますね」

「でも、キャラクターによって愛の表現方法は違うだろ？」

「確かに！　クールなキャラは素直に言えなかったり、情熱的なキャラはストレートに伝えたり」

「それがまさにポリモーフィズムだ」

　僕はコードを書いてみせた。

```javascript
// 基本となるキャラクタークラス
class Character {
    constructor(name) {
        this.name = name
    }
    
    expressLove() {
        console.log(this.name + "は愛を表現した")
    }
}

// それぞれ異なる表現をするキャラクター
class ShyCharacter extends Character {
    expressLove() {
        console.log(this.name + "は顔を赤くして俯いた")
        console.log("「べ、別にあなたのことなんて……」")
    }
}

class PassionateCharacter extends Character {
    expressLove() {
        console.log(this.name + "は相手の手を取った")
        console.log("「愛してる！　世界で一番君が好きだ！」")
    }
}

class CoolCharacter extends Character {
    expressLove() {
        console.log(this.name + "は背を向けたまま言った")
        console.log("「……嫌いじゃない」")
    }
}
```

◇◇◇◇

「わあ！　本当に小説のワンシーンみたい！」

　優美が興奮している。

「実際に使ってみよう」

```javascript
// 色々なキャラクターを作成
let characters = [
    new ShyCharacter("美咲"),
    new PassionateCharacter("健太"),
    new CoolCharacter("涼")
]

// 全員に愛を表現してもらう
console.log("【告白シーン】")
for (let character of characters) {
    character.expressLove()
    console.log("---")
}
```

　実行すると……

```
【告白シーン】
美咲は顔を赤くして俯いた
「べ、別にあなたのことなんて……」
---
健太は相手の手を取った
「愛してる！　世界で一番君が好きだ！」
---
涼は背を向けたまま言った
「……嫌いじゃない」
---
```

「すごい！　同じexpressLoveメソッドなのに、キャラクターごとに違う表現になってる！」

◇◇◇◇

「これがポリモーフィズムの良いところなんだ。同じメソッド名で統一的に扱えるけど、実際の動作はそれぞれのオブジェクトに任せることができる」

「なるほど！　プログラミングでも個性が表現できるんですね」

「そう。優美の言う通り、まさに『個性の表現』だ」

　優美の理解の仕方はいつも的確だ。

「じゃあ、今度は優美がポリモーフィズムを使ってみて」

「はい！」

◇◇◇◇

　優美は考えながらコードを書き始めた。

```javascript
// 基本となる表現クラス
class Expression {
    constructor(author) {
        this.author = author
    }
    
    create() {
        console.log(this.author + "は何かを表現した")
    }
}

// プログラマーの表現
class ProgrammerExpression extends Expression {
    create() {
        console.log(this.author + "はコードを書いた")
        console.log("function love() { return '大好き' }")
    }
}

// 作家の表現
class WriterExpression extends Expression {
    create() {
        console.log(this.author + "は物語を紡いだ")
        console.log("「彼女の瞳に映る世界が、私の全てだった」")
    }
}

// 画家の表現
class ArtistExpression extends Expression {
    create() {
        console.log(this.author + "は絵を描いた")
        console.log("キャンバスに二人の笑顔が広がった")
    }
}
```

「創作者の表現方法の違いをポリモーフィズムで表現してみました！」

◇◇◇◇

「素晴らしいアイデアだね」

　僕は感心した。

「実行してみよう」

```javascript
let creators = [
    new ProgrammerExpression("雅史先輩"),
    new WriterExpression("優美"),
    new ArtistExpression("友人")
]

console.log("【それぞれの愛の表現】")
for (let creator of creators) {
    creator.create()
    console.log()
}
```

　実行すると……

```
【それぞれの愛の表現】
雅史先輩はコードを書いた
function love() { return '大好き' }

優美は物語を紡いだ
「彼女の瞳に映る世界が、私の全てだった」

友人は絵を描いた
キャンバスに二人の笑顔が広がった
```

「わあ！　みんな違う方法で想いを表現してる！」

　優美が嬉しそうに手を叩く。

◇◇◇◇

「ところで、優美」

「はい？」

「さっきのコード、『雅史先輩』と『優美』って書いてたけど」

「あ……」

　優美が顔を赤くする。

「これも小説の設定ですから！」

「そうか」

　でも、嬉しかった。優美の中で、僕たちの関係がどんどん特別なものになっていくのを感じる。

◇◇◇◇

「ポリモーフィズムには、もう一つ重要な側面があるんだ」

「どんなことですか？」

「インターフェースという考え方だ」

```javascript
// インターフェースのような役割を果たす基本クラス
class Drawable {
    draw() {
        throw new Error("drawメソッドは実装する必要があります")
    }
}

class Circle extends Drawable {
    draw() {
        console.log("○を描きました")
    }
}

class Square extends Drawable {
    draw() {
        console.log("□を描きました")
    }
}

class Triangle extends Drawable {
    draw() {
        console.log("△を描きました")
    }
}

// どんな図形でも同じように扱える
function drawAll(shapes) {
    for (let shape of shapes) {
        shape.draw()
    }
}
```

「これで、どんな図形でも同じdrawメソッドで描けるようになるんだ」

◇◇◇◇

「先輩」

「ん？」

「ポリモーフィズムって、人間関係にも当てはまりませんか？」

「どういうことだ？」

「同じ『好き』という気持ちでも、人によって表現方法が違うって」

　優美の洞察力にはいつも驚かされる。

「確かにそうだな。俺は優美にプログラミングを教えることで……」

　言いかけて、慌てて言葉を止めた。

「先輩？」

「いや、なんでもない」

　でも、優美は嬉しそうに微笑んでいた。

◇◇◇◇

　レッスンが終わりに近づいてきた。

「今日も楽しかったです」

「優美の理解力は本当にすごいよ」

「それは先輩が私の世界に寄り添って教えてくれるからです」

　優美の言葉に、胸が温かくなる。

「明日は日曜日だから、レッスンはお休みだな」

「あ、そうですね……」

　優美が少し寂しそうな顔をする。

「でも、月曜日にはまた会えるから」

「はい！　楽しみにしてます」

◇◇◇◇

　優美が帰った後、僕は今日のレッスンを振り返った。

　ポリモーフィズム。同じメソッドでも、オブジェクトによって違う動作をする。

（俺と優美の『好き』も、きっと違う形で表現されているんだろうな）

　僕はプログラミングを教えることで。優美は一生懸命学ぶことで。

　お互いの想いが、それぞれの方法で表現されている。いつかその想いが、同じ形になる日が来るだろうか。

　窓の外を見ると、夏の夕暮れが街を優しく包んでいた。

　ポリモーフィズムを学んだ今日、僕は改めて思った。

　プログラミングは、多様性を認め、個性を活かす美しい世界だ。そして、優美との関係も、お互いの個性を認め合いながら、少しずつ深まっていく。

　明後日のレッスンが、今から楽しみだった。