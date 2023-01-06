// Data -----------------------------
async function getData(){

    var token = await  getToken();
    
    var orders = await getOrders(token);
  
  for(i = 0; i < orders.length; i++){
    document.getElementById("codigo_pedido").innerHTML += ` <hr>
                                                           ${orders[i].code}`
    document.getElementById("status_pedido").innerHTML += `  <hr>
                                                           ${orders[i].status.name}`;
    document.getElementById("nome_pedido").innerHTML += ` <hr>
                                                           ${orders[i].name}`
    document.getElementById("info").style.visibility = "hidden";
  }
}
// Token -----------------------------
 async function getToken(){
 
   var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var graphql = JSON.stringify({
    query: "mutation Generate($APIToken: String!) { \r\n    generateAPIAccessToken(userAPIToken: $APIToken) \r\n    }\r\n",
    variables: {"APIToken":"63:VZIccmTW2Y4RYxogcNcpQXTSJLSHmdtrapVim9DE"}
  })
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: graphql,
    redirect: 'follow'
  };

  var ans  = await  fetch("https://cordeiro.solarview.com.br/api/v1", requestOptions)
    .then(response => response.json())
    .then(result => {
    	return result;
        
    }
    
    )
    .catch(error => console.log('error', error));
 
        document.getElementById("info").style.visibility = "visible";
        return document.getElementById("info").innerHTML = ans.data.generateAPIAccessToken;
 }
 
 

 // ListOrder ----------------------
var i = Math.floor(Math.random() * 100);


 async function getOrders(token){
    
    var token = await  getToken();


 	console.log("Get orders2");
 	var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json; charset=utf-8");
    myHeaders.append("Authorization", `Bearer ${token}`);

    var graphql = JSON.stringify({
      query: "query ListOrder($first: Int, $offset: Int, $name: String, $statusId: Int) {\r\n    listOrder(first: $first, offset: $offset, name: $name, statusId: $statusId) {\r\n        code\r\n        name\r\n        status{\r\n            id\r\n            name\r\n        }\r\n    }\r\n }",
      // Filtro a partir dessas variaveis->
      variables: {"first":10 ,"offset": i }
    })
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: graphql,
      redirect: 'follow'
    };

    var ans = await fetch("https://cordeiro.solarview.com.br/api/v1", requestOptions)
      .then(response => response.json())
      .then(result => 
        { 
          return result;
        }
      )
      .catch(error => console.log('error', error));
      
      console.log(JSON.stringify(ans))
      document.getElementById("info").innerHTML = JSON.stringify(ans.data.listOrder);
      document.getElementById("info").style.visibility = "visible";
     return ans.data.listOrder;
}