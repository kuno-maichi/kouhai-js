# 第22話：テスト駆動開発：信頼を積み重ねる

　月曜日の放課後。私、柳原優美は少し緊張しながら先輩の部屋に向かった。土曜日の夏祭りのことが、まだ心の中でキラキラと輝いている。

（手を繋いだ感触、まだ覚えてる……）

「お疲れ様です、先輩！」

　いつもの挨拶。でも、目が合った瞬間、お互いに少し照れてしまった。

「おう、優美。その……土曜日は楽しかったな」

「はい！　とても楽しかったです」

　お互いに顔を赤くしながら、でも嬉しそうに微笑み合う。

「じゃあ、今日のレッスンを始めよう。今日はテスト駆動開発について」

「テスト駆動開発？」

「プログラムが正しく動くことを保証する方法だ」

◇◇◇◇

「優美、小説を書く時、推敲はするよね？」

「もちろんです。誤字脱字をチェックしたり、話の流れがおかしくないか確認したり」

「それと同じことをプログラミングでもやるんだ。それがテスト」

　先輩がコードを書き始めた。

```javascript
// 小説の文字数をカウントする関数
function countCharacters(text) {
    return text.length
}

// テストを書く
function testCountCharacters() {
    // テストケース1：普通の文章
    let result1 = countCharacters("こんにちは")
    console.assert(result1 === 5, "5文字のはずが" + result1 + "文字")
    
    // テストケース2：空文字
    let result2 = countCharacters("")
    console.assert(result2 === 0, "0文字のはずが" + result2 + "文字")
    
    // テストケース3：スペースも含む
    let result3 = countCharacters("私は 優美")
    console.assert(result3 === 5, "5文字のはずが" + result3 + "文字")
    
    console.log("全てのテストが成功しました！")
}

// テストを実行
testCountCharacters()
```

「わあ！　自動でチェックしてくれるんですね！」

◇◇◇◇

「でも、TDD（テスト駆動開発）の本当の面白さは、テストを先に書くことなんだ」

「テストを先に？」

「そう。まず『こう動いて欲しい』というテストを書いて、それを満たすコードを後から書く」

　先輩が新しい例を見せてくれた。

```javascript
// ステップ1：まずテストを書く
function testLoveCalculator() {
    let calculator = new LoveCalculator()
    
    // 名前の相性を計算する
    let result1 = calculator.calculate("優美", "雅史")
    console.assert(result1 >= 80, "相性は80%以上のはず")
    
    let result2 = calculator.calculate("太郎", "花子")
    console.assert(result2 >= 0 && result2 <= 100, "0-100の範囲のはず")
}

// ステップ2：テストが通るようにクラスを実装
class LoveCalculator {
    calculate(name1, name2) {
        // 簡単な実装（本当は複雑なアルゴリズム）
        let hash = 0
        for (let char of name1 + name2) {
            hash += char.charCodeAt(0)
        }
        
        // 特別な組み合わせ
        if ((name1 === "優美" && name2 === "雅史") ||
            (name1 === "雅史" && name2 === "優美")) {
            return 95
        }
        
        return hash % 101
    }
}
```

「え？　私たちの名前が……」

　顔が熱くなった。

「あ、いや、これはただのサンプルで……」

　先輩も慌てている。

◇◇◇◇

「で、でも、なんでテストを先に書くんですか？」

　話題を変えるように質問した。

「ゴールを明確にするためだよ。小説で言えば、プロットを先に作るようなもの」

「なるほど！　先に結末を決めておいて、そこに向かって書いていく感じですね」

「その通り。それに、テストがあることで安心してコードを変更できる」

```javascript
// リファクタリング前
function formatChapter(number, title, content) {
    return "第" + number + "章：" + title + "\n\n" + content
}

// テストがあれば、安心してリファクタリングできる
function formatChapter(number, title, content) {
    return `第${number}章：${title}

${content}`
}

// テストで動作が変わってないことを確認
function testFormatChapter() {
    let result = formatChapter(1, "出会い", "二人は運命的に...")
    let expected = "第1章：出会い\n\n二人は運命的に..."
    console.assert(result === expected, "フォーマットが違います")
}
```

◇◇◇◇

「先輩、私も書いてみたいです」

「いいよ。何かアイデアはある？」

　私は少し考えてから、キーボードを打ち始めた。

```javascript
// 感情分析のテストを先に書く
function testEmotionAnalyzer() {
    let analyzer = new EmotionAnalyzer()
    
    // ポジティブな文章
    let result1 = analyzer.analyze("今日は先輩と手を繋いで、とても幸せでした")
    console.assert(result1.happiness > 80, "幸福度が低すぎます")
    console.assert(result1.love > 70, "愛情度が検出されていません")
    
    // ネガティブな文章
    let result2 = analyzer.analyze("プログラムがエラーで動かなくて悲しい")
    console.assert(result2.sadness > 60, "悲しみが検出されていません")
    
    // 中立的な文章
    let result3 = analyzer.analyze("今日は月曜日です")
    console.assert(result3.neutral > 80, "中立的ではありません")
}

// テストを満たす実装
class EmotionAnalyzer {
    constructor() {
        this.keywords = {
            happiness: ["幸せ", "嬉しい", "楽しい", "素敵"],
            love: ["好き", "愛", "繋い", "ドキドキ"],
            sadness: ["悲しい", "辛い", "エラー", "失敗"],
            neutral: []
        }
    }
    
    analyze(text) {
        let emotions = {
            happiness: 0,
            love: 0,
            sadness: 0,
            neutral: 50
        }
        
        // キーワードマッチング
        for (let [emotion, keywords] of Object.entries(this.keywords)) {
            for (let keyword of keywords) {
                if (text.includes(keyword)) {
                    emotions[emotion] += 30
                    emotions.neutral -= 10
                }
            }
        }
        
        // 正規化
        let total = Object.values(emotions).reduce((a, b) => a + b, 0)
        for (let emotion in emotions) {
            emotions[emotion] = Math.round(emotions[emotion] / total * 100)
        }
        
        return emotions
    }
}
```

「素晴らしい！　テストから実装まで完璧だ」

　先輩に褒められて、心が温かくなった。

◇◇◇◇

「テスト駆動開発には、もう一つ大切なことがある」

「なんですか？」

「『信頼』を積み重ねることだ」

　先輩が真剣な表情で続けた。

「一つ一つテストが通ることで、自分のコードへの信頼が生まれる。そして、その信頼があるから、大胆な挑戦もできるようになる」

「人間関係みたいですね」

　つい口に出してしまった。

「確かにそうだな。小さな約束を守り続けることで、大きな信頼が生まれる」

◇◇◇◇

「先輩」

「ん？」

「私たちのYume言語にも、テストを書きましょう」

「いいアイデアだ」

```javascript
// Yume言語のテスト
function testYumeLanguage() {
    let yume = new YumeLanguage()
    
    // 基本的な計算
    console.assert(yume.eval("1 + 1") === 2, "足し算が動作しません")
    
    // 変数
    yume.eval("let love = 100")
    console.assert(yume.eval("love") === 100, "変数が動作しません")
    
    // 関数
    yume.eval("function heart() { return 'ドキドキ' }")
    console.assert(yume.eval("heart()") === "ドキドキ", "関数が動作しません")
    
    console.log("Yume言語の全テストが成功しました！")
}
```

「これで、Yume言語を安心して改良できますね」

「そうだな。一歩一歩、確実に前に進んでいける」

◇◇◇◇

　レッスンの終わりに、先輩が特別なコードを見せてくれた。

```javascript
// 二人の関係性のテスト
function testOurRelationship() {
    let us = new Relationship("雅史", "優美")
    
    // 初期状態
    console.assert(us.status === "幼馴染", "最初は幼馴染")
    
    // イベントを追加
    us.addEvent("プログラミングを教える")
    us.addEvent("一緒にYume言語を作る")
    us.addEvent("夏祭りで手を繋ぐ")
    
    // 関係性が進展
    console.assert(us.closeness > 80, "親密度が上がっているはず")
    console.assert(us.status === "？？？", "関係性はまだ定義中")
    
    // いつかのテスト（まだ失敗する）
    // us.addEvent("告白する")
    // console.assert(us.status === "恋人", "関係性が更新されるはず")
}
```

「最後のテスト、コメントアウトされてますね」

「まだ……テストが通らないから」

　先輩の顔が赤くなった。

「でも、いつかは」

「いつかは？」

「そのテストも、通る日が来るといいな」

◇◇◇◇

　自分の部屋に戻って、今日学んだことをノートにまとめる。

『テスト駆動開発：信頼を一つずつ積み重ねる』
『先にゴールを決めて、そこに向かって進む』
『テストは安心と挑戦の土台』

　そして、ノートの端に小さく書き加えた。

『先輩との関係も、一つずつテストをクリアしていきたい』

　窓の外を見ると、夕焼けが街を優しく包んでいた。

（いつか、最後のコメントアウトが外れる日が来ますように）

　そんな願いを込めて、私は自分の小説の続きを書き始めた。主人公たちが、少しずつ信頼を積み重ねて、最後には結ばれる物語を。