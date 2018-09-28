var socket=io();
var myChar='A';
var myId=0;
socket.on('redirect', function(destination) {
    window.location= destination;
});
socket.on('playerdetails',function(data){
  myId=data.pid;
  document.getElementById('player_details').innerHTML="Your character is "+data.char;
  if(data.win_status==1)
  {
    alert("Hooray ! You won");
    window.location="http://localhost:2000/client/failed.html";
  }

  myChar=data.char;
  if(data.turn)
  {
  document.getElementById('turn_details').innerHTML="It is your turn";
  document.getElementById('button_00').disabled=!data.turn;
  document.getElementById('button_01').disabled=!data.turn;
  document.getElementById('button_02').disabled=!data.turn;
  document.getElementById('button_10').disabled=!data.turn;
  document.getElementById('button_11').disabled=!data.turn;
  document.getElementById('button_12').disabled=!data.turn;
  document.getElementById('button_20').disabled=!data.turn;
  document.getElementById('button_21').disabled=!data.turn;
  document.getElementById('button_22').disabled=!data.turn;
}
else
  {
    document.getElementById('turn_details').innerHTML="Opponent's turn";
    document.getElementById('button_00').disabled=!data.turn;
    document.getElementById('button_01').disabled=!data.turn;
    document.getElementById('button_02').disabled=!data.turn;
    document.getElementById('button_10').disabled=!data.turn;
    document.getElementById('button_11').disabled=!data.turn;
    document.getElementById('button_12').disabled=!data.turn;
    document.getElementById('button_20').disabled=!data.turn;
    document.getElementById('button_21').disabled=!data.turn;
    document.getElementById('button_22').disabled=!data.turn;
  }
  for(var i in data.x_values)
  {
    if(data.x_values[i]===1)
    {document.getElementById('button_00').innerHTML="X";
    document.getElementById('button_00').disabled=true;}
    if(data.x_values[i]===2)
    {document.getElementById('button_01').innerHTML="X";
    document.getElementById('button_01').disabled=true;}
    if(data.x_values[i]===4)
    {document.getElementById('button_02').innerHTML="X";
    document.getElementById('button_02').disabled=true;}
    if(data.x_values[i]===8)
    {document.getElementById('button_10').innerHTML="X";
    document.getElementById('button_10').disabled=true;}
    if(data.x_values[i]===16)
    {document.getElementById('button_11').innerHTML="X";
    document.getElementById('button_11').disabled=true;}
    if(data.x_values[i]===32)
    {document.getElementById('button_12').innerHTML="X";
    document.getElementById('button_12').disabled=true;}
    if(data.x_values[i]===64)
    {document.getElementById('button_20').innerHTML="X";
    document.getElementById('button_20').disabled=true;}
    if(data.x_values[i]===128)
    {document.getElementById('button_21').innerHTML="X";
    document.getElementById('button_21').disabled=true;}
    if(data.x_values[i]===256)
    {document.getElementById('button_22').innerHTML="X";
    document.getElementById('button_22').disabled=true;}
  }
  for(var i in data.o_values)
  {
    if(data.o_values[i]===1)
    {document.getElementById('button_00').innerHTML="O";
    document.getElementById('button_00').disabled=true;}
    if(data.o_values[i]===2)
    {document.getElementById('button_01').innerHTML="O";
    document.getElementById('button_01').disabled=true;}
    if(data.o_values[i]===4)
    {document.getElementById('button_02').innerHTML="O";
    document.getElementById('button_02').disabled=true;}
    if(data.o_values[i]===8)
    {document.getElementById('button_10').innerHTML="O";
    document.getElementById('button_10').disabled=true;}
    if(data.o_values[i]===16)
    {document.getElementById('button_11').innerHTML="O";
    document.getElementById('button_11').disabled=true;}
    if(data.o_values[i]===32)
    {document.getElementById('button_12').innerHTML="O";
    document.getElementById('button_12').disabled=true;}
    if(data.o_values[i]===64)
    {document.getElementById('button_20').innerHTML="O";
    document.getElementById('button_20').disabled=true;}
    if(data.o_values[i]===128)
    {document.getElementById('button_21').innerHTML="O";
    document.getElementById('button_21').disabled=true;}
    if(data.o_values[i]===256)
    {document.getElementById('button_22').innerHTML="O";
    document.getElementById('button_22').disabled=true;}
  }
  if(data.win_status==-1)
  {
    alert("You lost sorry !");
    window.location="http://localhost:2000/client/failed.html";
  }
  if(data.win_status==2)
  {
    alert("Sad ! It's a tie :( ");
    window.location="http://localhost:2000/client/failed.html";
  }
});
function click00(){
  document.getElementById('button_00').innerHTML=myChar;
  socket.emit('switchturn',{val:1,player_id:myId})
}
function click01() {
document.getElementById('button_01').innerHTML=myChar;
socket.emit('switchturn',{val:2,player_id:myId})
}
function click02() {
document.getElementById('button_02').innerHTML=myChar;
socket.emit('switchturn',{val:4,player_id:myId})
}
function click10(){
document.getElementById('button_10').innerHTML=myChar;
socket.emit('switchturn',{val:8,j:0,player_id:myId})
}
function click11() {
document.getElementById('button_11').innerHTML=myChar;
socket.emit('switchturn',{val:16,j:1,player_id:myId})
}
function click12() {
document.getElementById('button_12').innerHTML=myChar;
socket.emit('switchturn',{val:32,player_id:myId})
}
function click20() {
document.getElementById('button_20').innerHTML=myChar;
socket.emit('switchturn',{val:64,player_id:myId})
}
function click21() {
document.getElementById('button_21').innerHTML=myChar;
socket.emit('switchturn',{val:128,player_id:myId})
}
function click22() {
document.getElementById('button_22').innerHTML=myChar;
socket.emit('switchturn',{val:256,player_id:myId})
}
