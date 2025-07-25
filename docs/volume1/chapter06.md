# 第6話：「最初のプロトタイプ」（優美視点）

「準備できた。試してみて」

　雅史先輩が画面を私に向けた。1週間かけて作ったプロトタイプ。私たちの「優しいエラーメッセージ」システムの第一歩。

「何から始めましょう？」

「まず、君が最初に恐怖を感じたエラーを再現してみよう」

　私は深呼吸した。あの時の恐怖が蘇る。でも、今度は違う。隣に先輩がいる。

```python
print(character_name)
```

　エンターキーを押す。画面が変わった。

```
おっと！'character_name' という名前が見つかりません。

大丈夫です。これはよくあることです。
解決方法：
• 文字列として使いたい場合: print("character_name")
• 変数として使いたい場合: 先に character_name = "何か" と定義

💡 ヒント: クォート(")で囲むと文字列、囲まないと変数名として扱われます
```

　赤い文字じゃない。「ERROR」という恐ろしい単語もない。

「これなら...怖くない」

　本当だった。心臓がバクバクしない。

「でも、本当に解決できるかな」

　先輩の提案通り、クォートを付けてみた。

```python
print("character_name")
```

　実行すると、

```
character_name
```

　成功！画面に文字が表示された。

「やった！」

　思わず手を叩いた。エラーを自分で解決できた。


◇◇◇


「次は、わざと同じエラーを起こしてみて」

　先輩が言った。2回目のメッセージを見たいらしい。

```python
print(story_title)
```

```
また 'story_title' という名前が見つかりませんね。

でも大丈夫。NameErrorのパターンは掴めてきているはずです。
今度は：
• story_title = "私の物語" のように定義してから使う
• または print("story_title") のようにクォートで囲む

📝 覚えておこう: 変数は「箱」、文字列は「中身」です
```

「あ、メッセージが変わった」

「うん。2回目は少し詳しい説明を追加してる」

　確かに、最初より詳しくなっている。でも威圧的じゃない。むしろ、一緒に学んでくれている感じ。

「今度は違うエラーを試してみよう」

　先輩がコードを書いた。

```python
if True
    print("hello")
```

```
構文に小さな問題があります。

Python では、if文の後に `:` (コロン)が必要です。
正しくは: if True:

🔧 修正してみましょう: if の行の最後に `:` を追加してください
```

「SyntaxErrorなのに、『Syntax』という難しい言葉が出てこない」

「『構文』という言葉も難しいかもしれないけど、『小さな問題』って言い方で安心感を出してる」

　なるほど。問題の深刻さを過小に表現することで、恐怖を和らげている。


◇◇◇


「でも先輩、問題があります」

　30分ほど試した後で、私は気づいた。

「何？」

「これ、初心者には優しいけど...経験者には冗長すぎませんか？」

　確かに、毎回丁寧な説明が出るのは、慣れた人には邪魔かもしれない。

「いい指摘だ。実は、それも考えてる」

　先輩が設定画面を開いた。

```
エラーメッセージのレベル:
□ 初心者モード (詳しい説明付き)
□ 標準モード (簡潔な説明)
□ 上級者モード (従来通り)
```

「レベル設定で切り替えられる」

「でも、誰が『初心者』か『上級者』かって、どう判断するんですか？」

　私の質問に、先輩が困った顔をした。

「...それは、まだ解決してない問題だ」

「えっ？」

「自己申告だと、初心者でも『標準』を選びたがるし、上級者でも『初心者』のままにする人がいる」

　確かに。私も「初心者です」って言うのは恥ずかしい。

「自動判定はできないんですか？」

「エラーの頻度で推測することはできるけど...完璧じゃない」

　現実の壁だ。技術的には可能でも、人間の心理は複雑。


◇◇◇


「他にも問題があります」

　私は続けた。

「このメッセージ、誰が翻訳するんですか？」

「翻訳？」

「プログラミングは世界中で使われてる。でも、このメッセージは日本語だけ」

　先輩の手が止まった。

「英語版は？」

「作れるけど...文化によって『優しい』の基準も違う。日本人には効果的でも、他の国の人には響かないかも」

「なるほど...」

　私たちは黙り込んだ。技術的な問題は解決できても、文化的な問題は簡単じゃない。

「でも」

　私は立ち上がった。

「完璧じゃなくても、やる価値はありますよね？」

「え？」

「小説だって、すべての読者に響くわけじゃない。でも、一人でも救えれば意味がある」

　先輩が微笑んだ。

「そうだね。まずは日本の初学者から」

「はい！」

　私たちは再びコードに向かった。完璧じゃない。問題もたくさんある。

　でも、確実に一歩前進している。


◇◇◇


「ところで優美」

　テストを終えて、先輩が言った。

「実際に使ってみて、どうだった？」

「正直に言うと...」

　私は考えながら答えた。

「完全に恐怖がなくなったわけじゃないです。でも、『逃げ出したい』とは思わなかった」

「それは大きな違いだ」

「はい。エラーが『敵』じゃなくて『先生』に見えました」

「先生？」

「優しい先生。怒らない先生。一緒に考えてくれる先生」

　その表現に、先輩の目が輝いた。

「それだ。君の感じた『先生』という感覚。それをデータにできれば...」

「どういうことですか？」

「学習者がエラーメッセージをどう感じるか。『敵』『先生』『友達』『ロボット』...感情的な印象を測定する方法」

　なるほど。従来の研究では「理解度」しか測っていなかった。でも「印象」も大切だ。

「それができれば、メッセージの改善も客観的にできますね」

「そう。君の感覚を、多くの人で検証できる」

　私は興奮してきた。これは面白い研究になりそう。

「でも先輩、一つ気になることが」

「なんだい？」

「これって、結局『日本語の問題』じゃないですか？」

　先輩が首を傾げた。

「どういう意味？」

「プログラミング言語は英語ベース。でもエラーメッセージは日本語。なんか...違和感があります」

　確かに、コードは英語で書いているのに、エラーだけ日本語というのは奇妙かもしれない。

「それも深い問題だね」

　先輩が考え込んだ。

「でも、とりあえずは日本語版から。成功すれば、他言語版も作れる」

「そうですね」

　一歩ずつ。完璧を求めず、現実的に。

　それが、私たちのアプローチだった。

「そういえば先輩」

　帰り支度をしながら、私は思い出した。

「昨日、友達にこの研究の話をしたんです」

「どんな反応だった？」

「最初は『エラーメッセージを優しくするだけ？』って言われました」

　先輩が苦笑した。

「よくある反応だね」

「でも、実際にデモを見せたら『これ、欲しい！』って」

「本当に？」

「はい。その子も昔、プログラミングで挫折したことがあるって」

　私は友達の言葉を思い出した。

「『あの時、こんなメッセージだったら続けてたかも』って」

　先輩の表情が明るくなった。

「それは励みになるね」

「でも同時に、責任も感じます」

「責任？」

「私たちが作ってるのは、ただのツールじゃない。誰かの夢を諦めさせないための...」

　言葉が詰まった。

「優美」

　先輩が優しく言った。

「プレッシャーを感じすぎないで。僕たちは魔法を作ってるわけじゃない」

「はい...」

「でも、確実に誰かを救える。それで十分だ」

　そうだ。完璧である必要はない。

　ただ、一人でも多くの人が、プログラミングの楽しさを知れるように。

　そのために、今日もまた一歩進もう。