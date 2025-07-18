# 第6話：変数とデータ型：日常に潜むプログラミング

　木曜日の放課後。雅史先輩とのプログラミングレッスンも今日で四日目だ。

　昨日は初めて自分でプログラムを書いて、それが動いた時の感動は忘れられない。先輩とハイタッチした時の温かさも。

　私、柳原優美は今日も先輩の部屋に向かった。

「お疲れ様です、先輩！」

「おう、お疲れ。今日も頑張ろうな」

　先輩の笑顔を見ると、今日も楽しい時間になりそうだ。

「今日は何を教えてくれるんですか？」

「今日は変数とデータ型について詳しく学ぼう。優美の日常生活にも変数はたくさん隠れてるんだ」

　日常生活に変数？

「どういうことですか？」

「たとえば、優美が小説を書く時に使う設定とか。登場人物の名前、年齢、性格……これ全部変数なんだよ」

　先輩が説明してくれる。

「あ！　確かに！　私のキャラ設定シートそのものですね！」

　私は膝を打った。

「そう。プログラミングでも同じように、データを入れる『箱』を用意して、その『箱』に名前をつけるんだ」

　先輩がキーボードを打ち始めた。

```javascript
// 小説の主人公設定
let heroName = "雅樹"      // 文字列型（string）
let heroAge = 17           // 数値型（number）
let heroIsStudent = true   // 真偽値型（boolean）
let heroHobbies = ["読書", "プログラミング", "音楽鑑賞"]  // 配列型（array）

console.log("主人公の名前：" + heroName)
console.log("主人公の年齢：" + heroAge + "歳")
console.log("学生かどうか：" + heroIsStudent)
console.log("趣味：" + heroHobbies)
```

「実行してみて」

　画面に結果が表示された。

```
主人公の名前：雅樹
主人公の年齢：17歳
学生かどうか：true
趣味：読書,プログラミング,音楽鑑賞
```

「すごい！　本当にキャラ設定みたいです！」

　私は興奮した。

「この『雅樹』って、どこかで見たような名前ですね」

　いたずらっぽく先輩を見ると、少し照れたような顔をした。

「た、たまたまだよ」

「そうですか〜？」

◇◇◇◇

「それぞれのデータには『型』っていうのがあるんだ」

　先輩が説明を続けた。

「文字列型、数値型、真偽値型、配列型……それぞれに特徴があるんだよ」

「どんな特徴ですか？」

「実際に試してみよう」

```javascript
let text1 = "10"      // 文字列の"10"
let number1 = 10      // 数値の10

console.log(text1 + text1)        // 文字列の結合
console.log(number1 + number1)    // 数値の計算
```

「これを実行すると……」

```
1010
20
```

「あ！　同じ10なのに結果が違う！」

「そう。文字列の"10"と数値の10は、コンピューターにとって全然違うものなんだ」

「面白い！　人間だったら、どっちも『十』って理解しますけど」

「その通り。だからプログラマーは、データの型を意識してコードを書く必要があるんだ」

　先輩の説明がとてもわかりやすい。

「優美の小説でも、同じ『愛』という言葉でも、恋愛の愛と家族愛では意味が違うだろ？」

「そうですね！　文脈によって全然違います」

「プログラミングでもそれと同じなんだ。データの『型』によって、コンピューターの解釈が変わる」

◇◇◇◇

「今度は、優美が実際に自分のキャラクター設定を作ってみて」

「私が？」

「そう。優美の小説の登場人物でもいいし、全く新しいキャラクターでもいい」

　私は考えながらキーボードを打ち始めた。

```javascript
// 私の新しいキャラクター
let girlName = "美咲"
let girlAge = 16
let girlIsWriter = true
let girlDreams = ["プログラマーになること", "恋愛小説を書くこと", "先輩と一緒にいること"]

console.log("名前：" + girlName)
console.log("年齢：" + girlAge + "歳") 
console.log("小説家かどうか：" + girlIsWriter)
console.log("夢：" + girlDreams)
```

　入力し終えて、実行ボタンを押した。

```
名前：美咲
年齢：16歳
小説家かどうか：true
夢：プログラマーになること,恋愛小説を書くこと,先輩と一緒にいること
```

「やった！　動きました！」

　でも、最後の夢の部分を見て、顔が真っ赤になってしまった。

「先輩と一緒にいること……」

　思わず本音を書いてしまった。

「あ、あの……これは、その……」

「いや、いいじゃないか。美咲っていうキャラクターの設定でしょ？」

　先輩が優しく微笑んでくれた。でも、その時の表情が少し特別に見えたのは気のせいかな？

「そ、そうです！　キャラクターの設定です！」

　慌てて誤魔化した。

◇◇◇◇

「変数って、途中で値を変えることもできるんだよ」

　先輩が新しい例を示してくれた。

```javascript
let storyProgress = "始まり"
console.log("物語の状況：" + storyProgress)

storyProgress = "展開"
console.log("物語の状況：" + storyProgress)

storyProgress = "クライマックス"
console.log("物語の状況：" + storyProgress)

storyProgress = "結末"
console.log("物語の状況：" + storyProgress)
```

「実行すると……」

```
物語の状況：始まり
物語の状況：展開
物語の状況：クライマックス
物語の状況：結末
```

「わあ！　まるで小説の流れみたい！」

「そう。変数は時間とともに変化していくものを表現するのに便利なんだ」

「私の小説でも、主人公の気持ちが時間とともに変わっていきますもんね」

「その通り。優美の恋愛小説でも、主人公の恋心が『興味なし』から『意識』、『好意』、『恋』って変化していくだろ？」

　先輩の例えに、私の心臓がドキッとした。

（まさに私の気持ちそのもの……）

「優美？　どうした？」

「あ、いえ！　なんでもないです！」

　慌てて手を振った。

「じゃあ、優美も何か変化していく変数を作ってみて」

「はい！」

　私は集中してキーボードを打った。

```javascript
let feelingLevel = "友達"
console.log("関係性：" + feelingLevel)

feelingLevel = "気になる存在"
console.log("関係性：" + feelingLevel)

feelingLevel = "好きな人"
console.log("関係性：" + feelingLevel)

feelingLevel = "大切な人"
console.log("関係性：" + feelingLevel)
```

　実行すると……

```
関係性：友達
関係性：気になる存在
関係性：好きな人
関係性：大切な人
```

　画面を見て、私は再び真っ赤になった。

（また本音を書いちゃった……）

「これも……キャラクターの設定ですか？」

　先輩が少し意味深に聞いてきた。

「は、はい！　そうです！」

　でも、先輩の表情が何だか嬉しそうに見えた。

◇◇◇◇

「あの、先輩」

「ん？」

「プログラミングって、本当に日常と繋がってるんですね」

「そうだろ？　実は身の回りのものって、ほとんど変数で表現できるんだ」

「例えば？」

「天気、気温、時間、曜日……全部変数だよ」

　先輩が説明してくれる。

「私の気持ちも……変数なんですね」

　つい呟いてしまった。

「優美の気持ち？」

「あ、いえ！　一般的な話です！」

　またごまかしてしまった。でも、先輩が少し近づいてきた気がする。

「優美の気持ちも、きっと素敵な変数だと思うよ」

　先輩の優しい声に、胸がドキドキする。

「ありがとうございます……」

　小さく返事をした。

「今日教わったことで、私の小説もより詳細に設定できそうです」

「そうか。それは良かった」

　先輩が微笑む。

「明日も教えてくれますか？」

「もちろんだ。次は条件分岐について学ぼう」

「楽しみです！」

◇◇◇◇

　レッスンが終わって、自分の部屋に戻る。

　今日は変数について学んだけど、一番印象に残ったのは、自分の気持ちが変数のように変化していることだった。

（最初は『友達』だった先輩への気持ちが、今は『大切な人』になってる）

　プログラムで書いた通りだ。

　机に向かって、今日のレッスンをノートにまとめる。

『変数：値を入れる箱。時間とともに変化できる』
『データ型：文字列、数値、真偽値、配列など』
『私の気持ちも変数？』

　最後の行を書いて、また顔が赤くなった。

　窓の外を見ると、先輩の部屋の明かりが見える。きっと明日の教材を準備してくれているんだろう。

（明日はどんなことを教えてくれるのかな）

　プログラミングも楽しいけれど、先輩と一緒に過ごす時間がもっと楽しい。

　私の『先輩への気持ち』という変数は、明日もまた新しい値に変わるのかもしれない。

（でも、どんな値になっても、きっと先輩はずっと大切な人）

　そんなことを考えながら、私は幸せな気持ちで今日を終えた。

　プログラミングを学ぶことで、自分の気持ちまで整理できるなんて思わなかった。

　変数のように変化していく私の心。その変化を先輩に気づいてもらえる日は来るのだろうか。

（今はまだ恥ずかしくて言えないけど……）

　いつか勇気を出して、私の『本当の気持ち』という変数の値を先輩に教えてあげたい。

　そんな夢を抱きながら、私は明日への期待に胸を膨らませた。
