var jsdom = require('jsdom');
const { JSDOM } = jsdom;

const { document } = (new JSDOM('')).window;
global.document = document;

var $ = require("jquery")((new JSDOM('')).window);

function qU(a){ return ((typeof(a)=="undefined")||(a== null))?true:false;};
function qIsString(a){
	if(a.indexOf("'") == 0 && (a.lastIndexOf("'") == (a.length-1))){
		return true;
	}
	return false;
}
function qGetString(a){
	if(a.indexOf("'") == 0 && (a.lastIndexOf("'") == (a.length-1))){
		var p = a.substring(a.indexOf("'")+1,a.lastIndexOf("'"));
		return p;
	}
	return "";
}
function qAsteriskPos(d){
	d = d.trim();
	var ap = d.indexOf("*");
	if( ap < 0 ){
		return [-1];
	}else if( ap == 0 ){
		return [0,d.substring(1)];
	}else if( ap == (d.length-1) ){
		return [1,d.substring(0,d.length-1)];
	}else{
		return [2,d.substring(0,ap-1),d.substring(ap+1,d.length-1)];
	}
}

Date.prototype.timeNow = function(){
	return ( (this.getHours() < 10 )?"0":"") + this.getHours() + ":" + ((this.getMinutes() < 10 )?"0":"") + this.getMinutes() + ":" + ((this.getSeconds() < 10 )?"0":"") + this.getSeconds(); 
}
Date.prototype.today = function(){
	return this.getFullYear() + "-" + (((this.getMonth()+1) < 10 )?"0":"") + (this.getMonth()+1) + "-" + ((this.getDate() < 10 )?"0":"") + this.getDate(); 
}
function getCurrentTime(t){
	var yymmddhhmmss = new Date();
	if( !qU(t) ){
		yymmddhhmmss = t;
	}
	return yymmddhhmmss.today() + " " + yymmddhhmmss.timeNow();
}
function getFixTime(fixDate){
	var date = new Date();
	if( fixDate == "current" ){
		date = new Date();
	}else{
		if( fixDate.indexOf("before") >= 0 ){
			var diffStr = fixDate.split(".");
			if( diffStr.length == 3 ){
				var now = new Date();
				var before = new Date();
				var diffTime = Number(diffStr[2]);
				if( diffStr[1] == "year" ){
					before = new Date(now.getTime() - (diffTime * 365 * 24 * 60 * 60 * 1000));
				}else if( diffStr[1] == "month" ){
					before.setMonth(now.getMonth() - diffTime);
				}else if( diffStr[1] == "day" ){
					before = new Date(now.getTime() - (diffTime * 24 * 60 * 60 * 1000));
				}else if( diffStr[1] == "hour" ){
					before = new Date(now.getTime() - (diffTime * 60 * 60 * 1000));
				}
				date = before;
			}
		}
	}
	return date;
}

$.ajaxTransport("+binary", function(options, originalOptions, jqXHR) {
    if (window.FormData && ((options.dataType && (options.dataType == 'binary'))
        || (options.data && ((window.ArrayBuffer && options.data instanceof ArrayBuffer)
        || (window.Blob && options.data instanceof Blob))))){
        return {
            send: function(headers, callback) {
                var xhr = new XMLHttpRequest(),
                url = options.url,
                type = options.type,
                async = options.async || true,
                dataType = options.responseType || "blob",
                data = options.data || null,
                username = options.username || null,
                password = options.password || null;

                xhr.addEventListener('load', function() {
                    var data = {};
                    data[options.dataType] = xhr.response;
                    callback(xhr.status, xhr.statusText, data, xhr.getAllResponseHeaders());
                });

                xhr.open(type, url, async, username, password);

                for (var i in headers) {
                    xhr.setRequestHeader(i, headers[i]);
                }

                xhr.responseType = dataType;
                xhr.send(data);
            },
            abort: function() {}
        };
    }
});
function sendFile(url,formData,callback){
	try{
		$.ajax({
	        url: url,
	        enctype: 'multipart/form-data',
	        processData: false,  // Important!
	        contentType: false,
	        data: formData,
	        cache: false,
	        type: 'POST',
	        success: function(result){
	           if( !qU(callback) ){
	        	   callback(result);
	           }
	        },
	        error: function(result){
		         if( !qU(callback) ){
		        	   callback(result);
		         }
	        }
	    });
	}catch(e){
		console.log(e);
	}
}
function parseBinary(blob,callback){
	var fileReader = new FileReader();
	fileReader.onload = function(event){
		var dataSetArray = [];
	    this.externalScopeVariable = event.target.result;
	    symbol_8 = String.fromCharCode.apply(String, [8]);
	    var arrayBuffer = event.target.result;
	 	var str ='';
	  	var byteArray = new Uint8Array(arrayBuffer);
	  	var arr=[];
	  	var num=0;
	  	byteArray.forEach(function(v,i){
	  		if(v == 7){
	  			str += 44 + ',';
	  		}else if(v == 8){
	  			if(i-num != 1){
			  		str = str.slice(symbol_8,-1);
			  		arr.push(str);
	  			}
		  		str='';
	  			num=i;

	  		}else if(v == 44){
	  			str += 8 + ',';
	  		}
	  		else{
		  		str += v + ',';
	  		}
	  	})
	  	var lineArray = arr.map(function(v,i){
	  		return toLineArray(v.split(','));
	  		//bin2String(v.split(','));
	  	});

	  	var index = -1;
	  	lineArray.forEach(function(d,i){
	  		if( d[0].indexOf("DataSet")==0 ){
	  			//name = d[1];
	  			index++;
	  			dataSetArray.push([]);
	  		}else if( index >= 0 ){
	  			dataSetArray[index].push(d);
	  		}
	  	});

	  	var newDataSetArray = [];
	  	dataSetArray.reduce(function(prev,curr){
  			if( prev != null ){
  				if( prev[0][0] == "NAME" && prev[0][1] == "KEY" ){
  					curr[3] = curr[3].map(function(key,i){
  						var namekey = prev.find(function(namekey,i){ return (key==namekey[1])?true:false; });
  						if( namekey )
  							return namekey[0];
  						return key;
  					});
  					newDataSetArray.push(curr);
  					return null;
				}else{
					return null;
				}
  			}else if( curr[0][0] == "NAME" && curr[0][1] == "KEY" ){
  				return curr;
  			}else{
  				newDataSetArray.push(curr);
  				return null;
  			}
  			return curr;
  		},null);

	  	if( callback ){
	  		callback( newDataSetArray );
	  	}
	  	//$("#test").text(JSON.stringify(lastObj));

	};
	fileReader.readAsArrayBuffer(blob);
}

function toLineArray(array){
	var result = String.fromCharCode.apply(String, array);
	var dataArray = decodeURIComponent(escape(result));
	dataArray = dataArray.split(',');
	dataArray.pop();
	//var last = [];
	//var compareRst;
	return dataArray.map( function(d, i){
		if(d.indexOf(symbol_8) != -1)	{
			d = d.replace( new RegExp(symbol_8,'gi'), ',');
		}
		return d;
	});
}


function IADatasetHeaderColumn(id,type,length,name){
	this.id = id;
	this.key = id;
	this.type = type;
	this.length = length;
	this.name = name;
}

function IADatasetHeader(){
	this.columns = [];
	this.tables = [];
	this.add = function(id,type,length,name){
		this.columns.push( new IADatasetHeaderColumn(id,type,length,name) );
	}
}
function IADataset(type,data,division,header){
	if(type=='xml'){
		this.header = new IADatasetHeader();
		this.rows = [];
		this.division = data.getAttribute('id');
		this.parse = function(type,data){
			//var listValue=[];
			var ColumnInfo = data.firstElementChild;
			var rows = data.lastElementChild;
			var row = rows.children;
			var rowLength = rows.childElementCount;//row ����

			for(var t=0;t<ColumnInfo.childElementCount;t++){
				var id = ColumnInfo.children[t].getAttribute('id');
				var type = ColumnInfo.children[t].getAttribute('type');
				var size = ColumnInfo.children[t].getAttribute('size');
				this.header.add(id,type,size,id);
				//key.push(ColumnInfo.children[t].getAttribute('id'));
			}
			var key = this.header.columns;
			for(var rowNum=0; rowNum<rowLength; rowNum++){
				var iaRow = {};
				for(var z=0;z<row[rowNum].childElementCount;z++){
					var rowId = row[rowNum].children[z].getAttribute('id');
					var rowValue = row[rowNum].children[z].textContent;
					iaRow[rowId] = rowValue;
				}
				this.rows.push(iaRow);
			}
		};

		this.parse(type,data);

	}else if(type=='binary'){
		var _this = this;
		this.header = new IADatasetHeader();
		data[0].forEach(function(id,i){
			_this.header.add(id,data[1][i],data[2][i],data[3][i]);
		});
		this.rows = data.filter(function(id,i){
			return (i<4)?false:true;
		}).map(function(row,i){
			var iaRow = {};
			data[0].forEach(function(rowId,i){
				iaRow[rowId] = row[i];
			});
			return iaRow;
		});
	}else if(type=='json'){
		this.header = header;
		this.type = type;
		this.rows = data;
		this.division = division;

	}else if(type=='excel'){
		this.header = header;
		this.type = type;
		this.rows = data;
		this.division = division;

	}else if(type=='cnpx'){
		this.header = header;
		this.type = type;
		this.rows = data;
		this.division = division;

	}

	this.forEach = function(f){
		return this.rows.forEach(f);
	}
	this.map = function(f){
		return this.rows.map(f);
	}
	this.getName = function(){
		return this.division;
	}
}

function IAResponse(type, data){
	this.reqUri = '';
	this.clientAddr = '';
	this.resType = '';
	this.errorCode = '';
	this.errorMsg = '';
	this.datasets = [];
	var _this = this;
	this.parse = function(type,data){
		if( type=="xml" ){
			//var xmlDoc = $.parseXML( data );
			//$xml = $( xmlDoc );
			var dataSet = data.getElementsByTagName('Dataset');
			for(var i=0; i<dataSet.length ; i++){
				var dataset = new IADataset(type,dataSet[i]);
				_this.datasets.push(dataset);
			}

		}else if( type == "binary" ){
			parseBinary( data, function(dataSet){
				dataSet.forEach(function(ds,i){
					var dataset = new IADataset(type,ds);
					_this.datasets.push(dataset);
				});

    		});
		}else if( type == "json" ){
			if( !qU(data.parameters) ){
				_this.reqUri = data.parameters.__reqUri__;
				_this.clientAddr = data.parameters.__clientAddr__;
				_this.resType = data.parameters.resType;
				_this.errorCode = data.parameters.ErrorCode;
				_this.errorMsg = data.parameters.ErrorMsg;
			}
			if( !qU(data.datasets) ){
				_this.datasets = data.datasets.map(function(dataset,i){
					if( !qU(dataset.cnpx) ){
						return new IADataset("cnpx",dataset.cnpx,dataset.division,dataset.header);	
					}else{
						return new IADataset(type,dataset.rows,dataset.division,dataset.header);	
					}
					
				});	
			}
		}else if( type == "excel" ){
			_this.datasets.push(data);
		}
	}
	if( data )
		this.parse(type,data);

	//array ��� �߰�===========
	this.forEach = function(f){
		this.datasets.forEach(f);
	}
	this.map = function(f){
		return this.datasets.map(f);
	}

	this.get = function(name){
		if( qU(this.datasets.find) ){
			var dataset;
			this.datasets.forEach(function(d){
				if( d.division == name ){
					dataset = d;
				}
			})
			return dataset;
		}else{
			return this.datasets.find(function(d,i){
				if( d.division == name )
					return true;
				return false;
			});
		}
	}
}

var IARequest = function(options){
	var data ='<?xml version="1.0" encoding="UTF-8"?>\n'
		+'<Root xmlns="http://'+location.host+'/platform/dataset">\n';
	if(options.parameters){
		data += '<Parameters>\n';
		options.parameters.forEach(function(d,i){
			data += '<Parameter id="'+d.id+'">'+d.value+'</Parameter>\n';
		});
		data += '</Parameters>\n';
	}
	if( options.datasets ){
		Object.keys(options.datasets).forEach(function(ds,i){
			var dataset = options.datasets[ds];
			if( !qU(dataset) ){
				data +='<Dataset id="'+ds+'">\n';
				data += '<ColumnInfo>\n';
				if( !qU(dataset.columns) ){
					dataset.columns.forEach(function(d,i){
						data += '<Column id="'+d+'" type="STRING" size="256" />\n';
					});
				}
				data += '</ColumnInfo>\n';
				data += '<Rows>';
				if( !qU(dataset.rows) ){
					
					dataset.rows.forEach(function(row,i){
						data += '<Row>\n';
						dataset.columns.forEach(function(col,i){
							var v = (!qU(row[col]))?row[col]:'';
							if( !$.isNumeric(v) && v.length > 0 ){
								v = v.replace(/&/g,'&amp;');
								v = v.replace(/</g,'&lt;');
								v = v.replace(/>/g,'&gt;');	
								v = v.replace(/'/g,'&apos;');
								v = v.replace(/"/g,'&quot;');
							}
							
							data += '<Col id="'+col+'">'+v+'</Col>\n';
						});
						data += '</Row>\n';
					});
					
				}
				data += '</Rows>';
				data += '</Dataset>';
			}
		});
	}

	data += '</Root>';
	//console.log( "request : "+ data );
	return data;
}
var IAMessage = {
		error:function(e,msg){
			console.error( e.toString() + ": " + msg );
			//console.log(msg);
		},
		send:function(userOptions){
			if( !qU(userOptions.filterUserAccess) && userOptions.filterUserAccess == true ){
			}else{
				updateUserAccessData();	
			}
			
			if( !qU(userOptions.responseType) && userOptions.responseType == "blob" ){

				var xhr = new XMLHttpRequest();
				xhr.open("POST",userOptions.url);
				if( !qU(userOptions.contentType) ){
					xhr.setRequestHeader("Content-Type", userOptions.contentType);
				}else{
					xhr.setRequestHeader("Content-Type", "text/xml");
				}
				xhr.responseType = 'blob';
				xhr.onreadystatechange = function(e) {
				  if (this.readyState == 4 && this.status == 200) {
					  var hx = decodeURIComponent(this.getResponseHeader('Content-FileName'));
					  //var hx = this.getResponseHeader('Content-FileName');
					  if(window.navigator.msSaveBlob){
						  return window.navigator.msSaveBlob(this.response,hx);
				      }else{
							var a = $("<a class='download-href' style='display: none;'/>");
				            var url =window.URL.createObjectURL(this.response);
				            a.attr("href", url);
				            a.attr("download", hx);
				            $("body").append(a);
				            a[0].click();
				            setTimeout(function () { URL.revokeObjectURL(url); }, 100);
				            a.remove();
				      }
					  if( userOptions.success ){
						  userOptions.success("");
					  }
				  }
				};
				if( !qU(userOptions.contentType) && userOptions.contentType == "application/x-www-form-urlencoded"){
					xhr.send(userOptions.data);
				}else{
					xhr.send(JSON.stringify(userOptions.data));
				}

			}else{
				var options = {
						url:userOptions.url,
						data: userOptions.data?userOptions.data:IARequest({}),
						contentType:"text/xml",
						/*dataType:"text",*/
						type:userOptions.type?userOptions.type:"POST",
						success:function(data){
							if( userOptions.success ){
								userOptions.success(data);

							}
						},
						error:function(e,msg,c,d){
							console.log(e);
							console.log(msg);
							console.log(c);
							console.log(d);
						}
					};
				options = $.fn.extend(true,options,userOptions);
				$.ajax(options);
			}
		},
		
		logout : function(emsg){
			if( !qU(emsg) ){
				alert(emsg);
			}
			IAMessages.Login.logout.MSG({ignoreError:true});
			location.href = IAApplication.loginPage;	
		},
		read : {
			rABS:true, // T : 바이너리, F : 어레이 버퍼

			// 어레이 버퍼를 처리한다 ( 오직 readAsArrayBuffer 데이터만 가능하다 )
			fixdata:function(data) {
			    var o = "", l = 0, w = 10240;
			    for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)));
			    o+=String.fromCharCode.apply(null, new Uint8Array(data.slice(l*w)));
			    return o;
			},
			// 데이터를 바이너리 스트링으로 얻는다.
			getConvertDataToBin:function($data){
			    var arraybuffer = $data;
			    var data = new Uint8Array(arraybuffer);
			    var arr = new Array();
			    for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
			    var bstr = arr.join("");

			    return bstr;
			},
			CsvSpliter:function (str,div,callback){
				var lines = [];
				var inWord=false;
				var spos = 0;
				for(var i = 0 ; i < str.length ; i++){
					var c = str.charAt(i);
					inWord = ( c == '"' )?(!inWord):inWord;
					if( c==div && inWord==false){
						var v = str.substring(spos,i);
						if(v.indexOf("\"") == 0 && (v.lastIndexOf("\"") == (v.length-1))){
							v = v.substring(v.indexOf("\"")+1,v.lastIndexOf("\"")).trim();
						}
						if( !qU(callback) ){
							lines.push( callback(v) );
						}else{
							lines.push(v);
						}
						spos = i+1;
					}else if( i == (str.length-1) ){
						var v = str.substring(spos);
						if(v.indexOf("\"") == 0 && (v.lastIndexOf("\"") == (v.length-1))){
							v = v.substring(v.indexOf("\"")+1,v.lastIndexOf("\"")).trim();
						}
						if( !qU(callback) ){
							lines.push( callback(v) );
						}else{
							lines.push(v);
						}
					}
				}
				if( str.charAt(str.length-1) == div){
					lines.push("");
				}
				return lines;
			},
			handleFile:function(e,page,sheetName,keyField,conditionField,dataField,indexColumn) {
			    var files = e.target.files;
			    var i,f;
			    
			    if (FileReader.prototype.readAsBinaryString === undefined) {
			        FileReader.prototype.readAsBinaryString = function (fileData) {
			            var binary = "";
			            var pt = this;
			            var reader = new FileReader();
			            reader.onload = function (e) {
			                var bytes = new Uint8Array(reader.result);
			                var length = bytes.byteLength;
			                for (var i = 0; i < length; i++) {
			                    binary += String.fromCharCode(bytes[i]);
			                }
			                //pt.result  - readonly so assign content to another property
			                pt.content = binary;
			                pt.onload(); // thanks to @Denis comment
			            }
			            reader.readAsArrayBuffer(fileData);
			        }
			    }
			    
			    for (i = 0; i != files.length; ++i) {
			        f = files[i];
			        var reader = new FileReader();
			        var name = f.name;

			        reader.onload = function(e) {
			            var data = (!e)?reader.content:e.target.result;

			            var workbook;

			            if(IAMessage.read.rABS) {
			                /* if binary string, read with type 'binary' */
			                workbook = XLSX.read(data, {type: 'binary'});
			            } else {
			                /* if array buffer, convert to base64 */
			                var arr = IAMessage.read.fixdata(data);
			                workbook = XLSX.read(btoa(arr), {type: 'base64'});
			            }//end. if

			            /* 워크북 처리 */
			            var iKeyField = !qU(keyField)?parseInt(keyField):-1;
	 					var iConditionField = !qU(conditionField)?conditionField:-1;
	 					var iDataField = !qU(dataField)?dataField:0;
	 					var iIndexColumn = !qU(indexColumn)?indexColumn:-1;
			            var dataset = new IADataset("excel",[],sheetName,new IADatasetHeader());
			            workbook.SheetNames.forEach(function(item, index, array) {
			 				if( item == dataset.division ){

			 					var csv = XLSX.utils.sheet_to_csv(workbook.Sheets[item]);
			 					var lines = IAMessage.read.CsvSpliter(csv,'\n',function(line){
			 						return IAMessage.read.CsvSpliter(line,',');
			 					});

			 					if( iKeyField > 0 ){
			 						var headList = lines.slice(0,iKeyField+1);
			 						var len = headList[iKeyField].length;
			 						for( var i = 0 ; i < len ; i++){
			 							col = headList[iKeyField][i];
			 							col = col.trim();
			 							var iFindKeyField = iKeyField-1;
			 							var equalKey = dataset.header.columns.some(function(d,i){ return (d.key == col)?true:false;});
			 							if( equalKey ){
		 									console.log("e");
		 								}
			 							while( (equalKey || col.length == 0) && iFindKeyField > 0 ){
			 								var selcol = headList[iFindKeyField][i];
			 								selcol = selcol.trim();
			 								if( selcol.length > 0 ){
			 									col = col.length == 0 ? selcol : (col+"."+selcol);
			 								}
			 								iFindKeyField--;
			 								equalKey = dataset.header.columns.some(function(d,i){ return (d.key == col)?true:false;});
			 								
			 							}
		 								
			 							dataset.header.add(col,"STRING",256,col);
			 						}
			 					}
			 					lines.forEach(function(line,i){
			 						if( /*i==iKeyField ||*/ i==iConditionField){
			 							line.forEach(function(col,icol){
			 								col = col.trim();
			 	 							if( i==iConditionField ){
			 	 								if( qU(dataset.header.conditions)){
			 	 									dataset.header.conditions = [];
			 	 								}
			 	 								dataset.header.conditions.push(col);
			 	 							}
			 	 						});
			 						}else if( i >= iDataField ){
			 							if( !qU(line.some) && line.some(function(d,i){ return d.length>0?true:false;})){
			 								line = line.map(function(d,ci){ return d.trim();});
				 							if( iKeyField == -1 && dataset.header.columns.length == 0){
				 								line.forEach(function(l,di){
				 									dataset.header.add(""+di,"STRING",256,""+di);
				 								});
				 							}
				 							if( iIndexColumn < 0 || $.isNumeric(line[iIndexColumn]) ){
				 	 							if(line.some(function(d,ci){ return ((ci != iIndexColumn) && d.length>0)?true:false;})){
				 	 								var row = {};
				 	 								line.forEach(function(d,ci){
				 	 									row[dataset.header.columns[ci].id]=d;
				 	 								});
				 	 								dataset.rows.push(row);
				 	 							}
				 							}
			 							}
			 						}

			 					});
			 					 if( !qU(page) ){
			 			        	page.onResponse("file.excel",new IAResponse("excel",dataset));
			 			        }
			 				}
			            });
			        };

			        if(IAMessage.read.rABS) reader.readAsBinaryString(f);
			        else reader.readAsArrayBuffer(f);

			    }//end. for
			}
		}
}

function modalPage(title, url) {
	
	$.ajax({
		type : "POST",
		url : url,
		contentType : "text/html",
		success : function(data) {

			$("#ipp-title").text(title);
			$("#ipp-body").html(data);
			$("#inairPagePopup").modal({
				backdrop : "static",
				show : "true"
			});
		}
	});
}


function printElement(id) {
	var elem = document.getElementById(id);

	var domClone = elem.cloneNode(true);
	var win = window.open();
	self.focus(); 
	win.document.open();
	
	win.document.write('<html><head><title></title><style>');
	win.document.write('table{width:100%;}');
	var agent = navigator.userAgent.toLowerCase();
	if( agent.indexOf("trident") > 0 ){
		win.document.write('body, td {font-falmily:Noto Sans Korean; font-size: 10px;}');
		win.document.write('table th {font-falmily:Noto Sans Korean; font-size: 12px;}');
		win.document.write('table th, table td{border:1px solid #ccc;padding:0.5em;text-align:center;}');
		
	}else if( agent.indexOf("edge") > 0 ){
		win.document.write('body, td {font-falmily:Noto Sans Korean; font-size: 10px;}');
		win.document.write('table th {font-falmily:Noto Sans Korean; font-size: 12px;}');
		win.document.write('table th, table td{border:1px solid #ccc;padding:0.5em;text-align:center;}');
		
	}else{
		win.document.write('body, td {font-falmily:Noto Sans Korean; font-size: 6px;}');
		win.document.write('table th {font-falmily:Noto Sans Korean; font-size: 8px;}');
		win.document.write('table th, table td{border:1px solid #ccc;padding:0.5em;text-align:center;}');
	}
	win.document.write('table th.t, table td.t{font-weight: bold;padding: 6px 0 8px 0px;text-align: center;background-color: #ddd;}');
	win.document.write('table td.f{text-align: right;}');
	win.document.write('</style></head><body>');
	win.document.write(domClone.innerHTML);
		win.document.write('</body></html>');
	win.document.close();
	
	win.print();
	win.close();
}
