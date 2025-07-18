# 第17話：エラー処理と例外：失敗から学ぶこと

　月曜日の放課後。週末を挟んで、雅史先輩とのプログラミングレッスンは今日で17日目。先輩の部屋に向かう足取りが、最近は自然と軽くなっている。

　でも、今日は少し違った。

「お疲れ様です、先輩」

　いつもより控えめな挨拶。それには理由があった。

「おう、優美。どうした？　元気ないな」

　先輩はすぐに気づいてくれた。

「実は……週末に一人でプログラムを書いてみたんですけど、エラーばっかりで全然動かなくて」

　私は正直に告白した。

「そうか。じゃあ、今日はちょうどいいタイミングだな」

「え？」

「今日はエラー処理と例外について学ぶ予定だったんだ」

◇◇◇◇

　先輩がホワイトボードに大きく書いた。

『エラーは敵じゃない。最高の先生だ』

「優美、エラーが出た時、どう感じた？」

「正直、すごくイライラしました。何が悪いのかわからなくて」

　私の言葉に、先輩は優しく微笑んだ。

「その気持ち、よくわかる。でも、エラーは実は僕たちの味方なんだ」

「味方……ですか？」

「うん。エラーメッセージは『ここが間違ってるよ』って教えてくれる親切な案内人みたいなものだ」

　先輩がコードを書き始めた。

```javascript
// エラーが発生するコード
let result = 10 / 0
console.log(result)  // Infinity

// 配列の範囲外アクセス
let arr = [1, 2, 3]
console.log(arr[10])  // undefined

// 存在しない関数を呼ぶ
// myFunction()  // エラー：myFunction is not defined
```

「JavaScriptは寛容な言語だから、エラーにならないケースも多いけど、実際のプログラミングではもっと厳密にエラーを扱う必要がある」

◇◇◇◇

「それで、エラー処理の基本がtry-catch構文だ」

```javascript
try {
    // エラーが起きそうな処理
    let data = JSON.parse("これはJSONじゃない")
} catch (error) {
    // エラーが起きた時の処理
    console.log("エラーが発生しました：" + error.message)
}

console.log("プログラムは続行します")
```

「わあ！　エラーが起きても、プログラムが止まらない！」

「そう。これが例外処理の基本。小説で例えるなら……」

　先輩が少し考えてから続けた。

「主人公が困難に直面した時、物語が終わるんじゃなくて、その困難をどう乗り越えるかを描くのと同じだ」

「なるほど！　エラーも物語の一部なんですね」

◇◇◇◇

「じゃあ、優美が週末に書いたコード、見せてもらえる？」

　私は恥ずかしながら、USBメモリからコードを取り出した。

```javascript
// 優美の週末コード
function createStory(title, characters) {
    let story = {
        title: title,
        mainCharacter: characters[0].name,
        sideCharacters: characters.slice(1).map(c => c.name)
    }
    
    return story
}

// これでエラーが出た
let myStory = createStory("恋のプログラム", [])
console.log(myStory.mainCharacter)
```

「あ、なるほど。配列が空の時のことを考えてなかったんだね」

　先輩は優しく指摘してくれた。

「はい……。charactersが必ずあると思い込んでました」

◇◇◇◇

「でも、これはよくあることだよ。一緒に改善してみよう」

　先輩と私は並んで座り、コードを書き直し始めた。

```javascript
function createStory(title, characters) {
    // 入力チェック
    if (!title) {
        throw new Error("タイトルは必須です")
    }
    
    if (!characters || characters.length === 0) {
        throw new Error("登場人物が一人もいません")
    }
    
    try {
        let story = {
            title: title,
            mainCharacter: characters[0].name,
            sideCharacters: characters.slice(1).map(c => {
                if (!c.name) {
                    throw new Error("名前のないキャラクターがいます")
                }
                return c.name
            })
        }
        
        return story
    } catch (error) {
        console.error("ストーリー作成中にエラー：" + error.message)
        // デフォルト値を返す
        return {
            title: title,
            mainCharacter: "名無しの主人公",
            sideCharacters: []
        }
    }
}
```

「すごい！　どんな入力が来ても、ちゃんと動くようになった！」

◇◇◇◇

「でも、先輩」

「ん？」

「エラーって、プログラミングだけじゃなくて、人生にもありますよね」

　私の言葉に、先輩が少し驚いたような顔をした。

「確かにそうだな」

「私、小説を書いてても、うまくいかない時がたくさんあって。でも、それも全部、次の作品のための勉強なんだって、今わかりました」

　先輩の目が優しく細められた。

「優美は本当に、物事の本質を掴むのが上手いな」

◇◇◇◇

「実は、僕も最初はエラーが大嫌いだった」

　先輩が懐かしそうに話し始めた。

「プログラミングを始めたばかりの頃、エラーが出るたびに自分がダメだと思ってた」

「先輩でも？」

「うん。でも、ある時気づいたんだ。エラーは『成長のチャンス』だって」

　先輩の横顔を見つめながら、私は思った。

（先輩も、たくさん失敗して、今の先輩になったんだ）

◇◇◇◇

「あの、先輩」

「ん？」

「私、Yume言語を作る時も、きっとたくさんエラーに出会うと思います」

「そうだね」

「でも、今日学んだことで、それが怖くなくなりました」

　私の言葉に、先輩の表情が和らいだ。

「それどころか、楽しみになってきました。エラーに出会うたびに、Yume言語がもっと良くなっていくんですから」

「その考え方、素晴らしいよ」

◇◇◇◇

　レッスンの最後に、先輩が特別な関数を見せてくれた。

```javascript
// カスタムエラークラス
class StoryError extends Error {
    constructor(message, chapter, line) {
        super(message)
        this.name = "StoryError"
        this.chapter = chapter
        this.line = line
    }
}

// 使用例
function validatePlot(plot) {
    if (!plot.beginning) {
        throw new StoryError("物語の始まりがありません", 1, 1)
    }
    
    if (!plot.climax) {
        throw new StoryError("クライマックスがありません", 
                           plot.chapters.length / 2, 
                           null)
    }
    
    if (!plot.ending) {
        throw new StoryError("結末がありません", 
                           plot.chapters.length, 
                           null)
    }
}
```

「わあ！　小説専用のエラーだ！」

「優美の世界に合わせて作ってみた」

　先輩のその優しさに、胸が熱くなる。

◇◇◇◇

「今日学んだことをまとめると」

　先輩がホワイトボードに書いた。

1. エラーは学習のチャンス
2. try-catchで優雅に対処
3. 適切なエラーメッセージで次の人を助ける
4. 失敗を恐れない

「特に最後が大事だ」

「失敗を恐れない、ですね」

「うん。プログラミングも、小説も、恋愛も……」

　先輩が最後に小さな声で付け加えた言葉に、私の心臓がドキッとした。

「先輩？」

「い、いや、なんでもない」

　顔を赤くする先輩を見て、私も照れてしまった。

◇◇◇◇

　自分の部屋に戻って、今日学んだことをノートにまとめる。

『エラー処理：失敗を成功への階段に変える技術』
『例外は物語の転換点』
『try-catchは、人生にも必要』

　そして、ノートの端に小さく書き加えた。

『先輩への気持ちも、エラーを恐れずに伝えたい』

　窓の外を見ると、夕焼けが街を優しく照らしていた。

（いつか、私の気持ちを伝える時も、きっとエラーが出るかもしれない）

　でも、今日学んだことで、それも怖くない。もしうまくいかなくても、それは次への一歩。もし受け入れてもらえたら……。

　甘い想像に頬を赤らめながら、私は新しい小説のプロットを書き始めた。主人公が、失敗を恐れずに、大切な人に想いを伝える物語を。

　エラーは成長の証。その言葉を胸に、私はまた一歩、先輩との夢に近づいた気がした。