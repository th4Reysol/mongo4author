// Send requests to a server to receive MongoDB data
let table = document.getElementById("ENJP");

const AddRow = () => {
    //Add a new row
    let newRow = table.insertRow(-1);
    //Make cells and insert a row with them
    let cel_EN = newRow.insertCell(-1);
    let cel_JP = newRow.insertCell(-1);
    let cel_DeleteButton = newRow.insertCell(-1);
    let rowContentEN = '<input type="text" name="English"/>';
    let rowContentJP = '<input type="text" name="Japanese"/>';
    let rowDeleteButton = '<input class="closeBtn" type="button" value="X" onclick="DelRow(event)"/>';
    cel_EN.innerHTML = rowContentEN;
    cel_JP.innerHTML = rowContentJP;
    cel_DeleteButton.innerHTML = rowDeleteButton;
}

// Delete a row you choose to click X button
const DelRow = (event) =>{
   event.target.closest('tr').remove();
}

const SaveToDB = () => {
// An array to have each row's values at the last phase
    let data = [];
    let tbl_tr = table.querySelectorAll('tr');
    let tdData = ""
 //Process each row
    tbl_tr.forEach(function(tr){
         console.log(tr.innerText)
     //Get <td> tags and skip the first row
        let cells = tr.querySelectorAll('td');
        if (cells.length!=0){
         // This variable has data of rows
         let d = []
         cells.forEach(function(td){
            if(td.innerHTML.indexOf('input') !== -1) {
                tdData = td.querySelector('input').value;
                d.push(tdData);
            }
            else if(td.textContent !== ""){
                tdData = td.innerText;
                d.push(tdData);
            }
            else{
                d.push("NoData");
            }
         });
         data.push(d);
         
         let toDB = {English: data[0][0], Japanese: data[0][1]};
         console.log(toDB);

         axios.post("/word/addwords", 
         {English: data[0][0], Japanese: data[0][1]}
         ).then((response)=>{console.log(response)})
             
        }
    });
}



