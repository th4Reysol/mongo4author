// expressとmongoose使用宣言
const express = require('express');
const mongoose = require('mongoose');
// DBをbooksに代入
const books = require('./models/books');
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

// DBに登録用関数
function registerData(){
    let bkData = new books({
        title: "Mary Barton",
        author: "Elizabeth Gaskell"
    })
    bkData.save()
}

// ローカルホストに/book追加で入力すると作動する。
app.get("/book", async (req,res) => {
    // 全部取得
	try {
        // 全データをbksで取得して、resに乗せて引き渡し。
        const bks = await books.find({});
        res.status(200).json(bks);
      } catch (err) {
        console.log(err);
      }
  });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

