// HTMLに対してのJS（サーバーにリクエスト投げます・DBからデータ引っ張ります。）
let table = document.getElementById("ENJP");
const AddRow = () => {
    //テーブルに新行追加
    let newRow = table.insertRow(-1);
    //追加行の内容を決定（セルを１つずつ作る）
    let cel_EN = newRow.insertCell(-1);
    let cel_JP = newRow.insertCell(-1);
    let cel_DeleteButton = newRow.insertCell(-1);
    let rowContentEN = '<input type="text" name="English"/>';
    let rowContentJP = '<input type="text" name="Japanese"/>';
    let rowDeleteButton = '<input type="button" value="X" onclick="DeleteRow()"/>';
    cel_EN.innerHTML = rowContentEN;
    cel_JP.innerHTML = rowContentJP;
    cel_DeleteButton.innerHTML = rowDeleteButton;
}

const DeleteRow = (e) =>{
   let dataRow = e.target.parentNode;
   dRow = dataRow.parentNode;
   table.deleteRow(dRow.sectionRowIndex);
}

const MakeCSV = () => {
// 抽出したデータを格納する配列変数
    let data = [];
 // id(ENJP)でhtmlからtableの要素を取得し、trタグのListを取得
    let table = document.getElementById('ENJP');
    let tbl_tr = table.querySelectorAll('tr');
 //テーブルの1行(trタグ)毎に処理
    tbl_tr.forEach(function(tr){
     //tdタグを取得・テーブルのヘッダー部分は飛ばす
        let cells = tr.querySelectorAll('td');
        if (cells.length!=0){
         // テーブルの1行(trタグ)のデータを格納する配列
            let d =[];
         //セル(tdタグ)毎に処理
            cells.forEach(function(td){
             //セルがinputタグだった場合
                if(td.innerHTML.indexOf('input') != -1) {
                 d.push(td.value);
                 
                }
             //セルがtextだった場合
                else if(td.textContent!=""){
                  d.push(td.textContent);
                }
             //セルが空白だった場合
                else{
                    d.push("");
                }
            });
         data.push(d);
        }
    });
 //ここで配列への格納終わり。

 //ここからCSVの内容作成
    let bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    let csvData = data.map((data) => String(data).replace('\t',',')).join('\r\n');
    let blob = new Blob([bom,csvData], {'type' : 'text/csv'});
//ダウンロード時の処理
    let downloadLink = document.createElement('a');
    downloadLink.download = document.getElementById("FileName").value + '.csv';
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.dataset.downloadurl = 
    ['text/plain', downloadLink.download, downloadLink.href].join(':');
    downloadLink.click();
    console.log(data);
return window.alert("You get it")
}

// ローカルサーバーとの連携
const mongoGet = async () =>{
    try {
        console.log("show");
        // /bookにリクエスト投げる。axios.get()でapp.js内で取得したmongoDBデータ取得
         let allbks = await axios.get("/word");
         console.log(allbks);
         let { data } = allbks;
        //出力
         allbks = data.map((wordDetail) => {
            let english = wordDetail['English'];
            let japanese = wordDetail['Japanese'];
            
            let newRow = table.insertRow(-1);
            let cel_EN = newRow.insertCell(-1);
            let cel_JP = newRow.insertCell(-1);
            let cel_Dlt = newRow.insertCell(-1);
            let rowContentEN = `${english}`;
            let rowContentJP = `${japanese}`;
            
            let rowContentDelete = '<input type="button" value="X"/>'
            console.log(english)
            cel_EN.innerHTML = rowContentEN;
            cel_JP.innerHTML = rowContentJP;
            cel_Dlt.innerHTML = rowContentDelete;
            return console.log(english);
          });
      } catch (err) {
        console.log(err);
      }
}
mongoGet();

