# 第39話 梅雨の季節

　六月十五日、土曜日。

　窓の外では雨が降り続いている。梅雨入りしてから一週間、毎日のように雨だ。

「今日も雨かぁ」

　美久が窓の外を見ながらため息をつく。

「梅雨だから仕方ないよ」

　僕の部屋で、いつものように勉強会。最近は週末のルーティンになっている。

「でも、雨の日は集中できるかも」

　美久が気を取り直して教科書を開く。

◇◇◇◇

「今日は物理？」

「うん。力学が苦手なの」

　美久が問題集を見せる。ニュートンの運動方程式の応用問題だ。

「F = ma、これが基本だよ」

「力は質量と加速度の積...」

　美久が公式を暗唱する。

「ただ覚えるんじゃなくて、意味を理解することが大事」

　ホワイトボードに図を描きながら説明する。

◇◇◇◇

「これ、プログラムでシミュレーションできる？」

　美久の提案に、なるほどと思った。

「面白いね。やってみよう」

```javascript
// 物体の落下シミュレーション
class FallingObject {
  constructor(mass, initialHeight) {
    this.mass = mass; // 質量(kg)
    this.height = initialHeight; // 高さ(m)
    this.velocity = 0; // 速度(m/s)
    this.g = 9.8; // 重力加速度(m/s^2)
  }

  update(deltaTime) {
    // F = mg より、a = g
    this.velocity += this.g * deltaTime;
    this.height -= this.velocity * deltaTime;
    
    if (this.height <= 0) {
      this.height = 0;
      this.velocity = 0;
    }
  }
}
```

「おお、動いた！」

　画面上で物体が落下する様子を見て、美久が興奮する。

◇◇◇◇

「空気抵抗も入れてみる？」

「できるの？」

「簡単なモデルなら」

```javascript
update(deltaTime) {
  // 空気抵抗 F_air = -kv
  const k = 0.1; // 抵抗係数
  const F_air = -k * this.velocity;
  
  // 合力 F = mg + F_air
  const F_total = this.mass * this.g + F_air;
  const acceleration = F_total / this.mass;
  
  this.velocity += acceleration * deltaTime;
  this.height -= this.velocity * deltaTime;
}
```

「速度が上がると抵抗も大きくなるんだ」

　美久が理解を示す。

「そう。だから終端速度に収束する」

◇◇◇◇

　休憩時間。温かいココアを飲みながら雨音を聞く。

「雨の音って落ち着くね」

　美久がソファーに深く腰掛ける。

「集中力が上がるって言うよね」

「隆弘先輩と一緒だと、もっと集中できる」

　そう言って、美久が肩に寄りかかってきた。

「勉強は？」

「ちょっと休憩」

　美久の髪から、シャンプーのいい香りがする。

◇◇◇◇

「そういえば、期末テストどう？」

「まあまあかな。隆弘先輩のおかげで」

「自分の努力だよ」

「でも、教え方が上手いから」

　美久が顔を上げて、僕を見つめる。

「大学でも一緒に勉強したい」

「うん、僕も」

　自然と手を繋ぐ。温かい。

◇◇◇◇

　午後はプログラミングの時間。

「MikuLangに新機能を追加しよう」

「何を追加するの？」

「配列とか？」

```javascript
// MikuLangでの配列実装
const arrayAST = {
  type: 'ArrayLiteral',
  elements: [
    { type: 'NumberLiteral', value: 1 },
    { type: 'NumberLiteral', value: 2 },
    { type: 'NumberLiteral', value: 3 }
  ]
};

// 評価器に配列のサポートを追加
function evaluate(node, env) {
  switch (node.type) {
    case 'ArrayLiteral':
      return node.elements.map(elem => evaluate(elem, env));
    // ... 他のケース
  }
}
```

「配列があると、何ができるようになる？」

「データをまとめて扱えるよ」

◇◇◇◇

　実装を進めていく。美久も積極的にコードを書く。

「インデックスアクセスも必要だよね」

```javascript
// 配列[インデックス] の実装
case 'IndexAccess':
  const array = evaluate(node.object, env);
  const index = evaluate(node.index, env);
  return array[index];
```

「プログラミング、どんどん楽しくなってきた」

　美久の成長が嬉しい。

◇◇◇◇

　夕方、雨が小降りになってきた。

「そろそろ帰る？」

「うん...」

　美久が名残惜しそうに立ち上がる。

「傘、持ってきた？」

「一応」

　玄関まで見送る。

「隆弘先輩」

「ん？」

「今日もありがとう。楽しかった」

　美久が背伸びをして、頬にキスをした。

「明日も来る？」

「もちろん！」

◇◇◇◇

　美久を見送った後、一人で勉強を続ける。

　センター試験まであと半年。志望校は東京大学理学部情報科学科。

　美久も同じ大学を目指している。学部は違うけど。

　雨音を聞きながら、過去問を解く。

```
次のアルゴリズムの計算量を答えよ。
for (int i = 0; i < n; i++) {
  for (int j = 0; j < n; j++) {
    // O(1)の処理
  }
}
```

　O(n²)。簡単な問題だ。

　でも、美久に教えるとなると、どう説明すればいいだろう。

　「二重ループは入れ子のお弁当箱みたいなもの」とか？

　美久の顔を思い浮かべながら、説明を考える。

　梅雨の季節も、美久と一緒なら楽しい。

　そう思いながら、勉強を続けた。