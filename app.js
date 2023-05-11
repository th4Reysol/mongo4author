// expressとmongoose使用宣言
const express = require('express');
const mongoose = require('mongoose');
// DBをwordsに代入
const words = require('./models/words');
// expressのインスタンス作成
const app = express();
// publicフォルダ内を使用する処理。
app.use(express.static("public"));
app.use(express.json());
const port = 3000;
console.log("hello!!");


mongoose.connect("mongodb+srv://thhisstory:FunairiFFF324@cluster0.ourgdrv.mongodb.net/testdb"
).then(()=>console.log("Connecting"))
app.get('/', (req,res) => res.send('Hello World!'));

// DBに登録用関数 ここにAdd画面からのリストを受け取る。
function registerData(){
    let bkData = new words({
        english: "Mary Barton",
        japanese: "Elizabeth Gaskell"
    })
    bkData.save()
}

// ローカルホストに/book追加で入力すると作動する。
app.get("/word", async (req,res) => {
    // 全部取得
	try {
        // 全データをbksで取得して、resに乗せて引き渡し。
        const bks = await words.find({});
        res.status(200).json(bks);
        console.log(bks)
      } catch (err) {
        console.log(err);
      }
  });

//Here 
app.post("/word/addwords", async(req, res)=>{
  try {
    
    console.log("You success if this message shows on Terminal!")
    let enWord = req.body.English
    let jpWord = req.body.Japanese
    // Here I expect values are added to the DB, but it does not.
    let added_word = new words({
      English: enWord,
      Japanese: jpWord
    })
    added_word.save();

    console.log(enWord);
    console.log(jpWord);
    console.log(added_word);
    
    
    
  } catch (err) {
    console.log("I cannot register words");
  }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

