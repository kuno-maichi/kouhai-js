# 第41話 秋の進路相談

　十月二十日、日曜日。

　秋も深まり、受験シーズンが近づいてきた。学校では進路相談が本格化している。

「隆弘先輩、進路相談どうだった？」

　いつもの勉強会。美久が心配そうに聞いてくる。

「東大理学部で変わらないよ」

「先生は何て？」

「模試の成績なら大丈夫だろうって」

　実際、夏の東大模試でA判定を取れていた。

「すごい...私なんてC判定...」

　美久が肩を落とす。

◇◇◇◇

「美久の志望は？」

「東大文学部...でも、厳しいかも」

　美久の表情が暗い。

「まだ時間はあるよ」

「でも、隆弘先輩と同じ大学に行きたい」

　その気持ちは嬉しい。でも、プレッシャーをかけたくない。

「無理しなくても、東京には他にもいい大学があるよ」

「...やっぱり東大がいい」

　美久の決意は固いようだ。

◇◇◇◇

「じゃあ、一緒に対策しよう」

　美久の参考書を見る。国語、英語、日本史。

「英語は得意なんだけどね」

「じゃあ、国語から」

　現代文の過去問を開く。

「論説文のポイントは、筆者の主張を掴むこと」

「どうやって？」

「接続詞に注目するんだ」

　問題文にマーカーで印をつけていく。

◇◇◇◇

```
「しかし」「だが」→ 逆接（重要）
「つまり」「要するに」→ 言い換え（主張のまとめ）
「なぜなら」「というのも」→ 理由説明
```

「プログラミングの条件分岐みたい」

　美久らしい理解の仕方だ。

「そう考えると面白いね」

```javascript
// 論説文を構造化すると
const essay = {
  introduction: "問題提起",
  body: [
    { type: "claim", content: "筆者の主張" },
    { type: "reason", content: "理由1" },
    { type: "example", content: "具体例" },
    { type: "counter", content: "反論の想定" },
    { type: "refute", content: "反論への反駁" }
  ],
  conclusion: "結論"
};
```

「わかりやすい！」

◇◇◇◇

　休憩時間。紅茶を飲みながら、窓の外を眺める。

　街路樹が色づき始めている。

「秋だね」

「時間が経つの早い」

　美久が遠い目をする。

「不安？」

「正直、うん」

　美久の手を握る。

「大丈夫。一緒に頑張ろう」

「隆弘先輩...」

◇◇◇◇

「ところで、大学で何を研究したい？」

　話題を変えてみる。

「まだ具体的には...でも」

「でも？」

「隆弘先輩の研究を手伝いたい」

　その答えに胸が熱くなる。

「プログラミング言語の研究は文系でも関われるよ」

「本当？」

「言語設計には人文科学的な視点も大切だから」

◇◇◇◇

　午後は日本史の勉強。

「鎌倉時代の政治構造が覚えられない」

「図にしてみたら？」

```
      将軍
       ↓
    執権（北条氏）
    ↙    ↘
  評定衆  引付衆
    ↓      ↓
  守護    地頭
```

「プログラミングのクラス図みたい」

　また美久らしい発想だ。

「継承関係で考えると面白いかも」

```javascript
class 将軍 {
  constructor() {
    this.権限 = "統治権";
  }
}

class 執権 extends 将軍 {
  constructor() {
    super();
    this.実権 = true;
  }
}
```

「歴史もプログラミングで理解できるんだ」

◇◇◇◇

　夕方、勉強に一区切りついた。

「今日も頑張ったね」

「隆弘先輩のおかげ」

　美久が伸びをする。

「そういえば、願書の準備は？」

「まだ...写真撮らないと」

「一緒に撮りに行く？」

「いいの？」

　もちろん、と答える。

◇◇◇◇

　部屋を出る前に、美久が言った。

「隆弘先輩、約束して」

「何を？」

「絶対に同じ大学に行くって」

　真剣な眼差しで見つめられる。

「約束する」

「私も絶対合格する」

　美久の決意が伝わってくる。

◇◇◇◇

　一人になって、志望理由書を書き始める。

```
私がプログラミング言語の研究を志すのは、
人間の思考を形式化し、計算機に伝える
究極のインターフェースだと考えるからです。

特に型システムの研究を通じて、
プログラムの正しさを数学的に保証する
手法を確立したいと考えています。
```

　書きながら、美久のことを思う。

　一緒の大学に行けたら、また新しいプロジェクトを始められる。

　MikuLangの次は、もっと本格的な言語を作ろう。

　秋の夜長、将来への期待と不安を抱きながら、勉強を続けた。