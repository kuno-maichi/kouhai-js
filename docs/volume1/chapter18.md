# 第18話：非同期処理：待つことの大切さ

　火曜日の放課後。私、柳原優美は先輩の部屋に向かいながら、胸の鼓動が少しずつ早くなるのを感じていた。昨日のレッスンで、先輩が小さな声でつぶやいた「恋愛も……」という言葉が、頭から離れない。

「お疲れ様です、先輩！」

　いつも通りの挨拶。でも、心の中はいつも通りじゃない。

「おう、優美。今日は非同期処理について学ぼう」

「非同期処理？」

「そう。『待つ』ということの大切さを学ぶ内容だ」

　先輩の言葉に、私の心臓がドキッとした。

（待つこと……それって、まるで……）

◇◇◇◇

「優美、料理をする時、全部の工程を順番にやるか？」

「え？　いいえ、お湯を沸かしている間に野菜を切ったりします」

「それが非同期処理の考え方だ。何かを待っている間に、他のことを進める」

　先輩がコードを書き始めた。

```javascript
// 同期的な処理（順番に実行）
console.log("朝起きた")
console.log("顔を洗った")
console.log("朝ごはんを食べた")

// 非同期的な処理の例
console.log("お湯を沸かし始めた")

setTimeout(() => {
    console.log("3秒後：お湯が沸いた！")
}, 3000)

console.log("その間に野菜を切る")
console.log("その間に味付けの準備")
```

「実行してみて」

　実行すると、「お湯が沸いた！」が最後に表示された。

「わあ！　本当に待っている間に他のことをしてる！」

◇◇◇◇

「でも、非同期処理には難しさもある」

　先輩が新しいコードを書いた。

```javascript
// 小説を書く非同期処理
function writeChapter(chapterNum, callback) {
    console.log(`第${chapterNum}章を書き始めた`)
    
    // 執筆には時間がかかる（ランダムな時間）
    let writingTime = Math.random() * 3000
    
    setTimeout(() => {
        console.log(`第${chapterNum}章が完成した！`)
        callback()
    }, writingTime)
}

// 3つの章を同時に書き始める
writeChapter(1, () => console.log("第1章の推敲開始"))
writeChapter(2, () => console.log("第2章の推敲開始"))
writeChapter(3, () => console.log("第3章の推敲開始"))
```

「これを実行すると……」

　章の完成順序がバラバラになった。

「あ！　順番が入れ替わっちゃう！」

「そう。非同期処理では、どれが先に終わるかわからない。だから、順序が大事な時は特別な配慮が必要なんだ」

◇◇◇◇

「じゃあ、Promise（約束）という仕組みを使ってみよう」

```javascript
// Promiseを使った非同期処理
function writeChapterPromise(chapterNum) {
    return new Promise((resolve, reject) => {
        console.log(`第${chapterNum}章を書き始めた`)
        
        setTimeout(() => {
            console.log(`第${chapterNum}章が完成した！`)
            resolve(`第${chapterNum}章の内容`)
        }, 1000)
    })
}

// 順番に実行する
writeChapterPromise(1)
    .then(content => {
        console.log("第1章を推敲中...")
        return writeChapterPromise(2)
    })
    .then(content => {
        console.log("第2章を推敲中...")
        return writeChapterPromise(3)
    })
    .then(content => {
        console.log("第3章を推敲中...")
        console.log("小説が完成した！")
    })
```

「Promise……約束、ですか」

　その言葉の響きに、私の心が揺れた。

「そう。『必ず結果を返す』という約束。成功するか、失敗するか、どちらかの結果を必ず返してくれる」

◇◇◇◇

「先輩」

「ん？」

「Promiseって、人間関係にも似てませんか？」

　私の言葉に、先輩が手を止めた。

「どういうことだ？」

「誰かに想いを伝える時も、すぐに答えが返ってくるわけじゃない。でも、いつか必ず、YesかNoか、答えをもらえる」

　先輩の頬が少し赤くなった。

「確かに……そうだな」

◇◇◇◇

「それじゃあ、async/awaitという、もっと新しい書き方も見てみよう」

```javascript
// async/awaitを使った非同期処理
async function writeNovel() {
    console.log("小説執筆開始")
    
    try {
        // awaitで順番に待つ
        let chapter1 = await writeChapterPromise(1)
        console.log("第1章推敲完了")
        
        let chapter2 = await writeChapterPromise(2)
        console.log("第2章推敲完了")
        
        let chapter3 = await writeChapterPromise(3)
        console.log("第3章推敲完了")
        
        console.log("小説完成！")
    } catch (error) {
        console.log("執筆中にエラー：", error)
    }
}

// 実行
writeNovel()
```

「awaitは『待つ』という意味。大切なことは、急がずに待つことなんだ」

　先輩の横顔を見つめながら、私は思った。

（私も、先輩の気持ちを待ってもいいのかな）

◇◇◇◇

「実は、僕たちの関係も非同期処理みたいだな」

　先輩が突然、そんなことを言い出した。

「え？」

「優美がプログラミングを学んでいる間に、僕も優美から創作の見方を学んでる。お互いが並行して成長している」

　その言葉に、胸が温かくなる。

「でも、いつかは同期する時が来るんでしょうか」

「同期？」

「お互いの想いが、一つになる時が」

　私の言葉に、先輩の動きが止まった。教室に流れる沈黙は、まるで非同期処理の待ち時間のよう。

◇◇◇◇

「優美」

「はい」

「プログラミングでは、非同期処理の結果を待つ時、タイムアウトを設定することがある」

「タイムアウト？」

「永遠に待ち続けるわけにはいかないから、制限時間を決めるんだ」

　先輩がコードを書いた。

```javascript
// タイムアウト付きのPromise
function waitWithTimeout(promise, timeout) {
    return Promise.race([
        promise,
        new Promise((_, reject) => 
            setTimeout(() => reject("タイムアウト"), timeout)
        )
    ])
}

// 使用例
let slowPromise = new Promise(resolve => {
    setTimeout(() => resolve("やっと完了"), 5000)
})

waitWithTimeout(slowPromise, 3000)
    .then(result => console.log(result))
    .catch(error => console.log("エラー：", error))
```

「でも、人の想いにタイムアウトなんてないですよね」

　私の言葉に、先輩が優しく微笑んだ。

「そうだな。大切なものほど、じっくり待つ価値がある」

◇◇◇◇

　レッスンの最後に、先輩が特別なコードを見せてくれた。

```javascript
// 想いを伝える非同期関数
async function expressFeeling(from, to, feeling) {
    console.log(`${from}の想いを準備中...`)
    
    // 想いを言葉にするのには時間がかかる
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log(`${from}から${to}へ：`)
    console.log(`「${feeling}」`)
    
    // 返事を待つ
    return new Promise(resolve => {
        console.log(`${to}の返事を待っています...`)
        // 返事は相手のタイミング次第
    })
}

// いつか実行される日のために
// expressFeeling("雅史", "優美", "ずっと一緒にいたい")
```

　コメントアウトされた最後の行を見て、私の目に涙が浮かんだ。

「先輩……」

「あ、いや、これはただのサンプルコードで……」

　慌てる先輩の姿が、愛おしくてたまらない。

◇◇◇◇

　自分の部屋に戻って、今日学んだことをノートにまとめる。

『非同期処理：待つことの美学』
『Promise：必ず答えをくれる約束』
『await：大切なものを待つ勇気』

　そして、ノートの端に小さく書き加えた。

『先輩の想いも、私はずっと待てる』

　窓の外を見ると、夕焼けが街を優しく包んでいた。

（非同期処理みたいに、私たちも今は別々の道を歩いているけど）

　でも、いつか必ず、二つの処理が一つに合流する時が来る。その日まで、私は先輩と一緒にプログラミングを学び続ける。

　Promiseは必ず結果を返す。先輩が最後に見せてくれたコードのように、いつか想いが形になる日を信じて。

　そんな甘い期待を胸に、私は小説の続きを書き始めた。非同期に進む二人の想いが、最後には美しく同期する物語を。