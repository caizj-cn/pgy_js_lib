var fs = require('fs');
var path = require('path');
var node_cmd = require("node-cmd");

var PUT_FILE = "__put_list.txt"
 
// 读取配置
var root = path.resolve(__dirname, "./config.json");
var json = readCfg(root);
console.log(getLog("配置信息"));
console.log(json);

compileProject();

// 执行编译
function compileProject(){
	var compileCmd = "CocosCreator.exe --path \"" + json.project[0].root_path + 
		"\" --build \"platform=web-mobile;inlineSpriteFrames=true;mergeStartScene=true;optimizeHotUpdate=true;" 
		+ "webOrientation:" + json.project[0].webOrientation + ";"
		+ "startScene:" + json.project[0].startScene + ";"
		+ "debug=" + json.project[0].debug
		+"\"";
	node_cmd.get(compileCmd,
		function(err, data, stderr){
			console.log(data);
			console.log(getLog("编译结束"));
			writePutFile();
			uploadFiles();
		}
	);
	console.log(getLog("正在编译"));
	console.log(compileCmd);
}

function writePutFile(){
	// 上传设置
	var text = "put -r " + json.project[0].root_path + json.project[0].local_path + " " + json.project[0].remote_path;
	fs.writeFileSync("./" + PUT_FILE, text);
	console.log(getLog("上传信息"));
	console.log(text);
}

function uploadFiles(){
	// 上传文件
	var cmd = "psftp " + json.server.name + "@" + json.server.ip + " -pw " + json.server.password + " -b ./" + PUT_FILE;
	console.log(getLog("上传命令"));
	console.log(cmd);
	node_cmd.get(cmd,
		function(err, data, stderr){
			console.log(getLog("上传结束"));
			console.log(data);
		}
	);
	console.log(getLog("正在上传"));
}

function readCfg(path){
	var data = fs.readFileSync(root, 'utf8');
	return JSON.parse(data);
}

function getLog(msg){
	return "@@@@@@@@@@@@@@@@@@@@@@" + msg + "@@@@@@@@@@@@@@@@@@@@@@";
}

