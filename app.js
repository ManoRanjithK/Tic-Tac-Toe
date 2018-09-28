var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/',function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});
app.use('/client',express.static(__dirname + '/client'));

serv.listen(2000);
console.log("Server Started");
var player_id=1;
var number_of_turns=0;
var SOCKET_LIST={};
var PLAYER_LIST={};
//		var gameBoard={[1,2,4],
	//								[8,16,32],
		//						[64,128,256]}
var Player=function(player_id)
{
	if(player_id===1)
	{
		var self={
		char:"X",
		turn:true,
		pid:player_id,
		x_values:[],
		o_values:[],
		win_status:0
	}
	return self;
}
	else if(player_id===2)
	{
		var self={
			char:"O",
			turn:false,
			pid:player_id,
			x_values:[],
			o_values:[],
			win_status:0
		}
		return self;
	}
}
var check_winning=function(player)
{
	if(number_of_turns==9)
	{
		player.win_status=2;
	}
	if(player.char==="X")
	{
	var xsum=0;
	for(var i in player.x_values)
	xsum+=player.x_values[i];
	if((xsum&273)===273 || (xsum&84)=== 84 || (xsum&7)===7 || (xsum&448)===448 ||(xsum&56)===56 || (xsum&73)===73 || (xsum&146)===146 || (xsum&292)===292)
	{
	player.win_status=1;
	return true;
	}
	}
	else if(player.char==="O")
	{
		var xsum=0;
		for(var i in player.o_values)
		xsum+=player.o_values[i];
		if((xsum&273)===273 || (xsum&84)=== 84 || (xsum&7)===7 || (xsum&448)===448 ||(xsum&56)===56 || (xsum&73)===73 || (xsum&146)===146 || (xsum&292)===292)
		{
			player.win_status=1;
			return true;
		}
		return false;
	}
}
var if_won_or_tie=function(player_list)
{
if(player_list[1].win_status===1)
player_list[2].win_status=-1;
else if(player_list[2].win_status===1)
player_list[1].win_status=-1;
else if(player_list[1].win_status===2 || player_list[2].win_status===2)
{
	player_list[1]=2;
	player_list[2]=player_list[1];
}
}
var io = require('socket.io')(serv,{});
io.sockets.on('connection',function(socket){
  console.log("A new socket connection");
	socket.id=player_id;
	if(player_id>2)
	{
	var destination = "http://localhost:2000/client/bad.html";
	socket.emit('redirect', destination);
	}
	else
	{
  SOCKET_LIST[socket.id]=socket;
	var player=Player(player_id);
	console.log(player_id);
	PLAYER_LIST[socket.id]=player;
	socket.on('disconnect',function(){
		delete SOCKET_LIST[socket.id];
		console.log(socket.id +" client disconnected from the game");
		player_id--;
	});
	player_id++;
	socket.on('switchturn',function(data){
		if(data.player_id===1)
		{
			PLAYER_LIST[1].turn=false;
			PLAYER_LIST[2].turn=true;
			PLAYER_LIST[1].x_values.push(data.val);
			PLAYER_LIST[2].x_values.push(data.val);
		}
		else if(data.player_id===2)
		{
			PLAYER_LIST[1].turn=true;
			PLAYER_LIST[2].turn=false;
			PLAYER_LIST[1].o_values.push(data.val);
			PLAYER_LIST[2].o_values.push(data.val);
		}
		number_of_turns++;
	});
}
});

	setInterval(function(){

	  for(var i in SOCKET_LIST)
	  {
	  var socket=SOCKET_LIST[i];
		var res=check_winning(PLAYER_LIST[i]);
		if(res)
		if_won_or_tie(PLAYER_LIST);
	  socket.emit('playerdetails',PLAYER_LIST[i]);

	  }
	},1000/25);
