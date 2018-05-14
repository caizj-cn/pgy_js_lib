//npm install xlsx -save

var xl =require('xlsx');
var fs = require("fs");
var path = require('path');

//解析需要遍历的文件夹，我这以E盘根目录为例
var filePath = path.resolve('./dir');

//调用文件遍历方法
fileDisplay(filePath);

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath){
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath,function(err,files){
        if(err){
            console.warn(err)
        }else{
            //遍历读取到的文件列表
            files.forEach(function(filename){
                //获取当前文件的绝对路径
                var filedir = path.join(filePath,filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir,function(eror,stats){
                    if(eror){
                        console.warn('获取文件stats失败');
                    }else{
                        var isFile = stats.isFile();//是文件
                        var isDir = stats.isDirectory();//是文件夹
                        if(isFile){
                            //console.log(filedir);
                            readQQ(filedir);
                        }
                        if(isDir){
                            fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                    }
                })
            });
        }
    });
}

function readQQ(xlsfilename){
    var workbook =  xl.readFile(xlsfilename);
    const sheetNames = workbook.SheetNames;

    const worksheet = workbook.Sheets[sheetNames[0]];

    var txtfilename = getExt(xlsfilename);

    for(let row = 3, cell = 'C' + row; worksheet[cell] != undefined; row++, cell = 'C' + row){
        let QQ = worksheet[cell].v;

        fs.open(txtfilename, "a+", function(err, fd){
            if (err) {
                return console.error(err);
            }
            else{
                fd = fd;
            }

            fs.writeFile(fd, QQ + '\r\n', function(err){
                if (err){
                    return console.error(err);
                }
            });
        });
    }

    console.log(xlsfilename + ' write!');
}

function getExt(dir){
    let index = dir.indexOf('.');
    var ndir = dir.substring(0, index) + '.txt';
    console.log('src:' + dir + ' dst:' + ndir);
    return ndir;
}


