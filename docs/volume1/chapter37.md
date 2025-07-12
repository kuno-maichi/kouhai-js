# 第37話：アルゴリズムと計算量：効率の追求

　月曜日の放課後。秋の旅行から戻って、私たちは再びプログラミングの世界に向き合っていた。

「優美、今日はアルゴリズムと計算量について学ぼう」

　先輩が新しいテーマを提示してくれた。

「アルゴリズム？」

「問題を解決するための手順のことだ。そして、その効率を測るのが計算量」

◇◇◇◇

「まず、簡単な例から始めよう。配列の中から特定の値を探す問題だ」

　先輩がホワイトボードに書き始めた。

```javascript
// 線形探索（単純な方法）
function linearSearch(array, target) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === target) {
            return i  // 見つかった位置を返す
        }
    }
    return -1  // 見つからなかった
}

// 使用例
const numbers = [3, 7, 1, 9, 4, 6, 8, 2, 5]
console.log(linearSearch(numbers, 6))  // 5

// 計算量：O(n)
// 最悪の場合、配列の全要素を調べる必要がある
```

「これが一番単純な方法ですね」

「そう。でも、配列がソート済みなら、もっと効率的な方法がある」

```javascript
// 二分探索（効率的な方法）
function binarySearch(sortedArray, target) {
    let left = 0
    let right = sortedArray.length - 1
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2)
        
        if (sortedArray[mid] === target) {
            return mid  // 見つかった
        } else if (sortedArray[mid] < target) {
            left = mid + 1  // 右半分を探索
        } else {
            right = mid - 1  // 左半分を探索
        }
    }
    
    return -1  // 見つからなかった
}

// 使用例
const sortedNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(binarySearch(sortedNumbers, 6))  // 5

// 計算量：O(log n)
// 探索範囲が毎回半分になる
```

「わあ、速い！」

「計算量の違いを視覚化してみよう」

◇◇◇◇

```javascript
// 計算量の比較
class AlgorithmComplexity {
    constructor() {
        this.comparisons = {
            linear: 0,
            binary: 0
        }
    }
    
    // 線形探索の計算量を測定
    measureLinearSearch(size, target) {
        const array = Array.from({length: size}, (_, i) => i + 1)
        this.comparisons.linear = 0
        
        for (let i = 0; i < array.length; i++) {
            this.comparisons.linear++
            if (array[i] === target) {
                break
            }
        }
        
        return this.comparisons.linear
    }
    
    // 二分探索の計算量を測定
    measureBinarySearch(size, target) {
        const array = Array.from({length: size}, (_, i) => i + 1)
        this.comparisons.binary = 0
        
        let left = 0
        let right = array.length - 1
        
        while (left <= right) {
            this.comparisons.binary++
            const mid = Math.floor((left + right) / 2)
            
            if (array[mid] === target) {
                break
            } else if (array[mid] < target) {
                left = mid + 1
            } else {
                right = mid - 1
            }
        }
        
        return this.comparisons.binary
    }
    
    // 比較結果を表示
    compareAlgorithms(sizes) {
        console.log('配列サイズ | 線形探索 | 二分探索')
        console.log('---------|---------|----------')
        
        sizes.forEach(size => {
            const target = Math.floor(size * 0.75)  // 後ろの方の要素を探す
            const linear = this.measureLinearSearch(size, target)
            const binary = this.measureBinarySearch(size, target)
            
            console.log(`${size.toString().padStart(8)} | ${linear.toString().padStart(7)} | ${binary.toString().padStart(8)}`)
        })
    }
}

// 測定実行
const complexity = new AlgorithmComplexity()
complexity.compareAlgorithms([10, 100, 1000, 10000, 100000])
```

「二分探索の方が圧倒的に速いんですね！」

「データが大きくなるほど、その差は顕著になる」

◇◇◇◇

「次は、ソートアルゴリズムを見てみよう」

```javascript
// バブルソート（単純だが遅い）
function bubbleSort(array) {
    const arr = [...array]  // コピーを作成
    const n = arr.length
    let comparisons = 0
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            comparisons++
            if (arr[j] > arr[j + 1]) {
                // 隣接要素を交換
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }
    
    console.log(`バブルソート - 比較回数: ${comparisons}`)
    return arr
}

// クイックソート（効率的）
function quickSort(array, comparisons = {count: 0}) {
    if (array.length <= 1) return array
    
    const pivot = array[Math.floor(array.length / 2)]
    const left = []
    const right = []
    const equal = []
    
    for (const element of array) {
        comparisons.count++
        if (element < pivot) {
            left.push(element)
        } else if (element > pivot) {
            right.push(element)
        } else {
            equal.push(element)
        }
    }
    
    return [
        ...quickSort(left, comparisons),
        ...equal,
        ...quickSort(right, comparisons)
    ]
}

// 比較
const testArray = [64, 34, 25, 12, 22, 11, 90]
console.log('元の配列:', testArray)

const bubbleResult = bubbleSort(testArray)
console.log('バブルソート結果:', bubbleResult)

const comparisons = {count: 0}
const quickResult = quickSort(testArray, comparisons)
console.log('クイックソート結果:', quickResult)
console.log(`クイックソート - 比較回数: ${comparisons.count}`)
```

◇◇◇◇

「先輩、アルゴリズムって、私の小説執筆にも似てますね」

「どういうこと？」

「プロットを考える時、色んな展開を試して、一番効率的で面白い流れを選ぶんです」

　私の言葉に、先輩は興味深そうに頷いた。

「なるほど。それもアルゴリズムの一種だな」

◇◇◇◇

「Yume言語にも、効率的なアルゴリズムを実装しよう」

```javascript
// Yume言語の効率的なアルゴリズム
class YumeAlgorithms {
    constructor() {
        this.cache = new Map()  // メモ化用
    }
    
    // フィボナッチ数列（非効率版）
    fibonacciNaive(n) {
        if (n <= 1) return n
        return this.fibonacciNaive(n - 1) + this.fibonacciNaive(n - 2)
    }
    
    // フィボナッチ数列（メモ化版）
    fibonacciMemo(n) {
        if (n <= 1) return n
        
        if (this.cache.has(n)) {
            return this.cache.get(n)
        }
        
        const result = this.fibonacciMemo(n - 1) + this.fibonacciMemo(n - 2)
        this.cache.set(n, result)
        return result
    }
    
    // フィボナッチ数列（動的計画法版）
    fibonacciDP(n) {
        if (n <= 1) return n
        
        let prev2 = 0
        let prev1 = 1
        let current = 0
        
        for (let i = 2; i <= n; i++) {
            current = prev1 + prev2
            prev2 = prev1
            prev1 = current
        }
        
        return current
    }
    
    // 性能比較
    comparePerformance(n) {
        console.log(`フィボナッチ数列 F(${n}) の計算`)
        
        // ナイーブ版（nが大きいと遅い）
        if (n <= 35) {
            console.time('ナイーブ版')
            const naive = this.fibonacciNaive(n)
            console.timeEnd('ナイーブ版')
            console.log(`結果: ${naive}`)
        } else {
            console.log('ナイーブ版: nが大きすぎて計算できません')
        }
        
        // メモ化版
        this.cache.clear()
        console.time('メモ化版')
        const memo = this.fibonacciMemo(n)
        console.timeEnd('メモ化版')
        console.log(`結果: ${memo}`)
        
        // 動的計画法版
        console.time('動的計画法版')
        const dp = this.fibonacciDP(n)
        console.timeEnd('動的計画法版')
        console.log(`結果: ${dp}`)
    }
}

// 使用例
const yumeAlgo = new YumeAlgorithms()
yumeAlgo.comparePerformance(40)
```

◇◇◇◇

「最後に、文字列アルゴリズムも見てみよう」

```javascript
// 文字列探索アルゴリズム
class StringAlgorithms {
    // 単純な文字列探索
    naiveSearch(text, pattern) {
        const matches = []
        const n = text.length
        const m = pattern.length
        
        for (let i = 0; i <= n - m; i++) {
            let j
            for (j = 0; j < m; j++) {
                if (text[i + j] !== pattern[j]) {
                    break
                }
            }
            
            if (j === m) {
                matches.push(i)
            }
        }
        
        return matches
    }
    
    // KMP法の実装（効率的）
    kmpSearch(text, pattern) {
        const matches = []
        const n = text.length
        const m = pattern.length
        
        // 部分一致表を作成
        const lps = this.computeLPSArray(pattern)
        
        let i = 0  // textのインデックス
        let j = 0  // patternのインデックス
        
        while (i < n) {
            if (pattern[j] === text[i]) {
                i++
                j++
            }
            
            if (j === m) {
                matches.push(i - j)
                j = lps[j - 1]
            } else if (i < n && pattern[j] !== text[i]) {
                if (j !== 0) {
                    j = lps[j - 1]
                } else {
                    i++
                }
            }
        }
        
        return matches
    }
    
    // LPS配列の計算
    computeLPSArray(pattern) {
        const m = pattern.length
        const lps = new Array(m).fill(0)
        let len = 0
        let i = 1
        
        while (i < m) {
            if (pattern[i] === pattern[len]) {
                len++
                lps[i] = len
                i++
            } else {
                if (len !== 0) {
                    len = lps[len - 1]
                } else {
                    lps[i] = 0
                    i++
                }
            }
        }
        
        return lps
    }
    
    // 小説の中から特定のフレーズを探す
    searchInNovel(novel, phrase) {
        console.log(`小説から「${phrase}」を探索中...`)
        
        console.time('単純探索')
        const naiveResult = this.naiveSearch(novel, phrase)
        console.timeEnd('単純探索')
        
        console.time('KMP法')
        const kmpResult = this.kmpSearch(novel, phrase)
        console.timeEnd('KMP法')
        
        console.log(`見つかった位置: ${kmpResult.join(', ')}`)
        return kmpResult
    }
}

// 使用例
const strAlgo = new StringAlgorithms()
const novel = "私は先輩のことが好きです。先輩と一緒にプログラミングを学ぶのが楽しいです。先輩は優しくて、いつも私のことを考えてくれます。"
const phrase = "先輩"

strAlgo.searchInNovel(novel, phrase)
```

◇◇◇◇

「先輩」

「ん？」

「アルゴリズムって、愛の形にも似てますね」

　私の突然の言葉に、先輩は驚いたような顔をした。

「どういうこと？」

「最短経路を探すように、私たちも一番効率的に幸せになる方法を探してる」

　先輩の顔が優しく微笑んだ。

「確かに。でも、時には非効率でも大切なことがある」

「そうですね。遠回りした分だけ、思い出が増えます」

◇◇◇◇

　レッスンの最後に、先輩が特別なコードを見せてくれた。

```javascript
// 私たちの関係のアルゴリズム
class LoveAlgorithm {
    constructor(person1, person2) {
        this.couple = [person1, person2]
        this.memories = []
        this.happiness = 0
    }
    
    // 最短経路で告白（効率的）
    directConfession() {
        return {
            time: '1日',
            success: '可能性あり',
            memories: ['告白']
        }
    }
    
    // 私たちが選んだ道（非効率だけど豊か）
    ourPath() {
        const journey = [
            'ベランダ越しの出会い',
            'プログラミングレッスン',
            '変数とデータ型',
            'エラーとの格闘',
            '関数の美しさ',
            'オブジェクト指向',
            '非同期処理',
            'セキュリティ',
            'ガベージコレクション',
            'そして告白'
        ]
        
        journey.forEach(event => {
            this.memories.push(event)
            this.happiness += 10
        })
        
        return {
            time: '30話分',
            success: '確実',
            memories: this.memories,
            happiness: this.happiness,
            result: '最高の思い出と共に'
        }
    }
    
    // 比較
    compare() {
        console.log('=== 告白アルゴリズムの比較 ===')
        console.log('直接的アプローチ:', this.directConfession())
        console.log('私たちの道のり:', this.ourPath())
        console.log('\n結論: 効率だけが全てじゃない')
    }
}

const ourLove = new LoveAlgorithm('雅史', '優美')
ourLove.compare()
```

「これが、私たちのアルゴリズムね」

「効率は悪いけど、最高の結果を得られた」

◇◇◇◇

　窓の外では、秋の夕日が街を優しく照らしていた。

　アルゴリズムと計算量。効率を追求することの大切さを学んだ。でも同時に、人生には効率だけでは測れない価値があることも理解した。

　私たちの物語は、最も効率的ではなかったかもしれない。でも、その分だけ豊かで、かけがえのない思い出に満ちている。

```javascript
// 今日の学び
const todaysLesson = {
    technical: {
        algorithms: ['探索', 'ソート', '動的計画法'],
        complexity: ['O(n)', 'O(log n)', 'O(n²)'],
        optimization: 'メモ化と効率化'
    },
    personal: {
        realization: '効率と豊かさのバランス',
        ourJourney: '非効率だけど美しい',
        value: '思い出は計算量では測れない'
    }
}
```

　明日も、先輩と一緒に新しいアルゴリズムを学ぼう。そして、私たちだけの非効率で美しい物語を、これからも紡いでいこう。