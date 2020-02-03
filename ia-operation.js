function _isoperator(o){ return (!qU(o) && qU(o.isOperand))?true:false; }
function _isdebug(o){ return (!qU(o) && !qU(o.__debug__) && o.__debug__== true)?true:false; }
var OpNode = {
	MUX : function() {
			this.left = null;
			this.right = null;
			this.op = function(row, prev,f) {
				var r = !qU(this.right)?this.right.op(row,prev,f):undefined;
				var l = prev;
				var v =  l * r;
				if( _isdebug(row) ){console.log( l + " * " + r + " = " + v );}
				return v;
			}
			this.toString = function(tabs){
				if( qU(tabs) ){ tabs = ""; }
				return tabs + "*";
			}
		},
	DIV : function() {
			this.left = null;
			this.right = null;
			this.op = function(row, prev,f) {
				var r = !qU(this.right)?this.right.op(row,prev,f):undefined;
				var l = prev;
				var v =  l / r;
				if( _isdebug(row) ){console.log( l + " / " + r + " = " + v );}
				return v;
			}
			this.toString = function(tabs){
				if( qU(tabs) ){ tabs = ""; }
				return tabs + "/";
			}
		},
	PLUS : function() {
			this.left = null;
			this.right = null;
			this.op = function(row, prev,f) {
				var r = !qU(this.right)?this.right.op(row,prev,f):undefined;
				var l = prev;
				var v =  l + r;
				if( _isdebug(row) ){console.log( l + " + " + r + " = " + v );}
				return v;
			}
			this.toString = function(tabs){
				if( qU(tabs) ){ tabs = ""; }
				return tabs + "+";
			}
		},
	MINUS : function() {
			this.left = null;
			this.right = null;
			this.op = function(row, prev,f) {
				var r = !qU(this.right)?this.right.op(row,prev,f):undefined;
				var l = prev;
				var v =  l - r;
				if( _isdebug(row) ){console.log( l + " - " + r + " = " + v );}
				return v;
			}
			this.toString = function(tabs){
				if( qU(tabs) ){ tabs = ""; }
				return tabs + "-";
			}
		},
	LESS : function() {
			this.left = null;
			this.right = null;
			this.op = function(row, prev,f) {
				var r = !qU(this.right)?this.right.op(row,prev,f):undefined;
				var l = prev;
				var v =  (l < r)?1:0;
				if( _isdebug(row) ){console.log( l + " < " + r + " = " + v );}
				return v;
			}
			this.toString = function(tabs){
				if( qU(tabs) ){ tabs = ""; }
				return tabs + "<";
			}
		},
	LESSEQUAL : function() {
			this.left = null;
			this.right = null;
			this.op = function(row, prev,f) {
				var r = !qU(this.right)?this.right.op(row,prev,f):undefined;
				var l = prev;
				var v =  (l <= r)?1:0;
				if( _isdebug(row) ){console.log( l + " <= " + r + " = " + v );}
				return v;
			}
			this.toString = function(tabs){
				if( qU(tabs) ){ tabs = ""; }
				return tabs + "<=";
			}
		},
	GREATER : function() {
			this.left = null;
			this.right = null;
			this.op = function(row, prev,f) {
				var r = !qU(this.right)?this.right.op(row,prev,f):undefined;
				var l = prev;
				var v =  (l > r)?1:0;
				if( _isdebug(row) ){console.log( l + " > " + r + " = " + v );}
				return v;
			}
			this.toString = function(tabs){
				if( qU(tabs) ){ tabs = ""; }
				return tabs + ">";
			}
		},
	GREATEREQUAL : function() {
			this.left = null;
			this.right = null;
			this.op = function(row, prev,f) {
				var r = !qU(this.right)?this.right.op(row,prev,f):undefined;
				var l = prev;
				var v =  (l >= r)?1:0;
				if( _isdebug(row) ){console.log( l + " >= " + r + " = " + v );}
				return v;
			}
			this.toString = function(tabs){
				if( qU(tabs) ){ tabs = ""; }
				return tabs + ">=";
			}
		},
	EQUAL : function() {
			this.left = null;
			this.right = null;
			this.op = function(row, prev,f) {
				var r = !qU(this.right)?this.right.op(row,prev,f):undefined;
				var l = prev;
				var v =  (l == r)?1:0;
				if( _isdebug(row) ){console.log( l + " == " + r + " = " + v );}
				return v;
			}
			this.toString = function(tabs){
				if( qU(tabs) ){ tabs = ""; }
				return tabs + "==";
			}
		},
	NOTEQUAL : function() {
			this.left = null;
			this.right = null;
			this.op = function(row, prev,f) {
				var r = !qU(this.right)?this.right.op(row,prev,f):undefined;
				var l = prev;
				var v =  (l != r)?1:0;
				if( _isdebug(row) ){console.log( l + " != " + r + " = " + v );}
				return v;
			}
			this.toString = function(tabs){
				if( qU(tabs) ){ tabs = ""; }
				return tabs + "!=";
			}
		},
	OR : function() {
			this.left = null;
			this.right = null;
			this.op = function(row, prev,f) {
				var r = !qU(this.right)?this.right.op(row,prev,f):undefined;
				var l = prev;
				var v =  (l != 0 || r != 0 )?1:0;
				if( _isdebug(row) ){console.log( l + " OR " + r + " = " + v );}
				return v;
			}
			this.toString = function(tabs){
				if( qU(tabs) ){ tabs = ""; }
				return tabs + "OR";
			}
		},
	AND : function() {
			this.left = null;
			this.right = null;
			this.op = function(row, prev,f) {
				var r = !qU(this.right)?this.right.op(row,prev,f):undefined;
				var l = prev;
				var v =  (l != 0 && r != 0 )?1:0;
				if( _isdebug(row) ){console.log( l + " AND " + r + " = " + v );}
				return v;
			}
			this.toString = function(tabs){
				if( qU(tabs) ){ tabs = ""; }
				return tabs + "AND";
			}
		},
	Q : function() {
			this.left = null;
			this.condition = null;
			this.values = [];
			this.isOperand = function(){return true;}
			this.op = function(row, prev,f) {
				var v = 0;
				if( this.values.length == 2 ){
					var c = this.condition.op(row,prev,f);
					v = (c != 0)?(this.values[0].op(row,prev,f)):(this.values[1].op(row,prev,f));	
				}
				if( _isdebug(row) ){console.log( c + " ? " );}
				return v;
			}
			this.toString = function(tabs){
				if( qU(tabs) ){ tabs = ""; }
				return tabs + "?";
			}
		},
	SC : function() {
			this.left = null;
			this.right = null;
			this.isOperand = function(){return true;}
			this.op = function(row, prev,f) {}
			this.toString = function(tabs){
				if( qU(tabs) ){ tabs = ""; }
				return tabs + ":";
			}
		},
	AS : function() {
			this.left = null;
			this.right = null;
			/*this.isOperand = function(){return true;}*/
			this.op = function(row, prev,f) {
				var l = prev;
				if( _isdebug(row) ){console.log( prev + " AS " + this.right.variable );}
				return {src:l,target:this.right.variable};
			}
			this.toString = function(tabs){
				if( qU(tabs) ){ tabs = ""; }
				return tabs + "AS";
			}
	},	
	FConnector : function(oper,variable,arguments) {
		this.oper = oper;
		this.left = null;
		this.right = null;
		this.variable = variable;
		this.arguments = arguments;
		this.isOperand = function(){return true;}
		this.op = function(row,prev,f) {
			var values = [];
			if( !qU(this.variable) && !qU(this.variable.variable)){
				var functionName = this.variable.variable;
				var fpackage = functionName.split(".");
				
				if( !qU(this.arguments) ){
					var args = this.arguments.arguments();
					var _this = this;
					values = args.map(function(tree,i){
						if( tree instanceof OpNode.Number ){
							return tree.op();
						}else if( tree instanceof OpNode.String ){
							return tree.op();
						}else{
							return _this.oper.calculator(tree, row, f);	
						}
					});
				}
				
				if( this.oper.isFunction(fpackage[0]) ){
					return this.oper.exec(fpackage[0],fpackage.slice(1),values,row,f);	
				}else{
					var vf = fpackage.reduce(function(prev,curr){
						 return ( qU(prev) )? null : prev[curr];
					},row);
					if( !qU(vf) ){
						if(typeof(vf) == "function" ){
							value = vf.apply(row,values);
						}else{
							value = vf;
						}
						return value;
					}
				}
			}
			
			return 0;
		}
		
		this.toString = function(tabs){
			if( qU(tabs) ){ tabs = ""; }
			return tabs + this.variable.variable;
		}
	},
	Number : function(n) {
		this.value = n;
		this.op = function(row,prev,f) {
			return this.value;
		}
		this.isOperand = function(){return true;}
		this.toString = function(tabs){
			if( qU(tabs) ){ tabs = ""; }
			return tabs + this.value;
		}
	},
	
	Variable : function(oper,n) {
		this.oper = oper;
		this.variable = (!qU(n) && n != "undefined")?n.trim():undefined;
		console.log("variable : " + this.variable);
		
		this.op = function(row,prev,f) {
			if( qU(this.variable) ){
				return undefined;
			}else{
				var variableObject = this.oper.find(this.variable,row);
				if( !qU(variableObject) ){
					if( typeof variableObject === "function" ){
						return variableObject();
					}
					return variableObject;
				}
				/*
				if(!qU(row[this.variable])){
					value = row[this.variable];
				}else if(this.oper.isFunction(this.variable)){
					var fpackage = this.variable.split(".");
					value = this.oper.exec(fpackage[0],fpackage.slice(1),null,row,f);
				}else{
					value = this.oper.s(this.variable.split("."),row,f);
				}*/	
			}
			if( !qU(f) ){
				return f(this.variable.split("."));	
			}
			return 0;
		}
		
		this.isReady = function(row){
			if( qU(this.variable) )
				return true;
			return !qU(row[this.variable]);
		}
		this.isOperand = function(){return true;}
		this.toString = function(){
			return this.variable;
		}
		this.toString = function(tabs){
			if( qU(tabs) ){ tabs = ""; }
			return tabs + this.variable;
		}
	},
	Braket : function(oper) {
			this.oper = oper;
			this.expression = [];

			this.push = function(obj) {
				if( !qU(obj) ){
					if( this.expression.length > 0 ){
						// 피연산자는 최종 연산자의 right로 설정
						// 연산자는 최종 연산자를 left로 설정
						var last = this.expression[this.expression.length-1];
						var lastOperator = this.expression.reduce(function(prev,curr){ 
							return(_isoperator(curr))?curr:prev;},null);
						
						if( _isoperator(obj) ){ //연산자
						}else{ //피연산자
							if( obj instanceof OpNode.Q ){
								obj.condition = last;
								this.expression.pop();
								if( !qU(lastOperator) ){
									lastOperator.right = obj;
								}
							}else if( obj instanceof OpNode.SC ){
								return;
							}else if( last instanceof OpNode.Variable && obj instanceof OpNode.Braket ){
								var obj = new OpNode.FConnector(this.oper,last,obj);
								if( !qU(lastOperator) )
									lastOperator.right = obj;
								this.expression.pop();
							}else if( last instanceof OpNode.Q ){
								last.values.push(obj);
								return;
							}else if( !qU(lastOperator) ){
								lastOperator.right = obj;	
							}
						}
					}
					this.expression.push(obj);
				}
			}
			this.op = function(row,_prev,func) {
				
				if( this.expression.length > 0 ){
					/*
					var ioperand = this.expression.reduce(function(prev, curr, i) {
						if( prev == -1 && _isoperator(curr) ){
							return prev;
						}else if( prev == -1 && !_isoperator(curr) ){
							return i;
						}
						return prev;
					},-1);
					if( ioperand > 0 ){ this.expression = this.expression.slice(ioperand); }
					*/
					return this.expression.reduce(function(prev, curr, i) {
						if( qU(curr.isOperand) ){
							return curr.op(row, prev,func);
						}
						return prev;
					}, this.expression[0].op(row, 0,func) );	
				}
				return 0;
			}
			this.arguments = function(){
				var args = this.expression.filter(function(d,i){ 
					if( d instanceof OpNode.Variable && d.toString() == "," ){
						return false;
					}
					return true;
				});
				var _this = this;
				args = args.map(function(opObject,i){
					if( opObject instanceof OpNode.Number ){
						return opObject;
					}else if( opObject instanceof OpNode.String ){
						return opObject;
					}
					var tree = _this.oper.createOperateTree("", opObject.toString());
					return tree;
				});
				return args;
			}
			this.isReady = function(row){
				return this.expression.every(function(d,i) {
					if( qU(d.isReady) )
						return true;
					return d.isReady(row);
				});
			}
			this.isOperand = function(){return true;}
			this.toString = function(tabs){
				var str = "";
				var mytabs = !qU(tabs) ? tabs : "";
				
				this.expression.forEach(function(d,i){
					str + mytabs;
					str += d.toString( mytabs +"\t" );
					str += "\n";
				});
				return str;
			}
		},
	String : function(v) {
			this.expression = v;

			this.push = function(obj) {
				this.expression+=obj;
			}
			this.op = function(row,prev,f) {
				return this.expression;
			}
			this.isReady = function(row){
				return true;
			}
			this.isOperand = function(){return true;}
			this.toString = function(tabs){
				if( qU(tabs) ){ tabs = ""; }
				return tabs + "'"+this.expression+"'";
			}
		}
}

var OperationGlobal = {
	f : {
		max : function(scope,args,row,f){
			if( !qU(args) ){ return args.reduce(function(prev,curr){ return prev > curr ? prev : curr; },-Infinity)}
				return Infinity;
		},
		min : function(scope,args,row,f){
			if( !qU(args) ){ return args.reduce(function(prev,curr){ return prev < curr ? prev : curr; },Infinity)}
			return -Infinity;
		},
		sum : function(scope,args,row,f){
			if( !qU(args) ){ return args.reduce(function(prev,curr){ return prev + curr; },0)}
			return 0;
		},
		avg : function(scope,args,row,f){
			if( !qU(args) ){ return (!qU(args) && args.length>0)?(args.reduce(function(prev,curr){ return prev + curr; },0))/args.length:0;}
			return 0;
		},
		message : function(scope,args,row,f){
			return 9;
		}, 
		user : function(scope,args,row,f){
			if( scope == "id"){
				return "djshin98";
			}else{
				return "userid";
			}
			return "";
		},
		Auth : function(scope,args,row,f){
			if( scope == "role"){
				return "11211";
			}else if( scope == "getSelectMyAutGroupRolePBF" ){
				return "sending (" + args.reduce(function(prev,curr){ 
						if( typeof(curr) == "object" ){
							prev += (prev.length > 0 ? ",":"") + curr.src + " -> " + curr.target;	
						}else{
							prev += (prev.length > 0 ? ",":"") + curr;
						}
						return prev;
					},"") + ") ";
			}
			return "";
		}
	}
};

function Operation(obj){
	this.__obj__ = obj;
	this.avg = function(row,keys){
		var sum = keys.reduce(function(prev,curr){ return qU(row[curr])?prev:(prev+parseFloat(row[curr]));},0);
		return keys.length>0?(sum/keys.length):0;
	};
	this.max = function(row,keys){
		if(!qU(row)&&!qU(keys)&&keys.length>0){
			var max = keys.reduce(function(prev,curr){
				if(qU(prev))
					return parseFloat(row[curr]);
				if(qU(row[curr])||row[curr].length==0)
					return prev;
				return prev>parseFloat(row[curr])?prev:parseFloat(row[curr]);},row[keys[0]]);
			return max;
		}
	};
	this.min = function(row,keys){
		if(!qU(row)&&!qU(keys)&&keys.length>0){
			var min = keys.reduce(function(prev,curr){
				if(qU(prev))
					return parseFloat(row[curr]);
				if(qU(row[curr])||row[curr].length==0)
					return prev;
				return prev<parseFloat(row[curr])?prev:parseFloat(row[curr]);},row[keys[0]]);
			return min;
		}
	};
	this.extend = function(fname,f){
		if( !qU(fname) && fname.length > 0 ){
			var _this = this;
			fname.split("|").forEach( function(fn){ _this.f[fn] = f; } );	
		}
	};
	this.extends = function(exts){
		var _this = this;
		Object.keys(exts).forEach(function(key){
			_this.extend( key, exts[key]);
		});
	};
	this.isVariableName = function(f){
		f = f.trim();
		if( f.match(/^[A-Za-z_$][0-9a-zA-Z_\-.]+$/)){
			return true;
		}
		return false;
	};
	this.findValueByKey = function(args,key,def){
		var fv = args.find(function(d){ return ( d.target == key ) ? true : false; });
		return ( !qU(fv) ) ? fv.src : def;
	}
	this.find = function(v,root){
		if( !qU(v) ){
			var roots = [this,this._obj_,root];
			var vs = v.split(".");
			var ret;
			if( !qU(root) ){
				ret = vs.reduce(function(prev,curr){ if(!qU(prev)){ return prev[curr]; } return undefined; },root);	
			}
			if( !qU(this.__obj__) && qU(ret) ){
				ret = vs.reduce(function(prev,curr){ if(!qU(prev)){ return prev[curr]; } return undefined; },this._obj_);
			}
			if( !qU(window) && qU(ret) ){
				ret = vs.reduce(function(prev,curr){ if(!qU(prev)){ return prev[curr]; } return undefined; },window);
			}
			if( !qU(this) && qU(ret) ){
				ret = vs.reduce(function(prev,curr){ if(!qU(prev)){ return prev[curr]; } return undefined; },this);
			}
			if( !qU(OperationGlobal.f) && qU(ret) ){
				ret = vs.reduce(function(prev,curr){ if(!qU(prev)){ return prev[curr]; } return undefined; },OperationGlobal.f);
			}
			return ret;
		}
	}
	this.isFunction = function(f){
		if( !qU(f) && f.length > 0 && this.isVariableName(f) ){
			var scopeDiv = f.indexOf(".");
			var sub = "";
			if( scopeDiv > 0 ){
				sub = f.substring(scopeDiv+1);
				f = f.substring(0,scopeDiv);
			}
			if( f == "parent" && !qU(this.parent) ){
				return this.parent.isFunction(sub);
			}else if( !qU(this.f[f]) ){
				return true;
			}else if( !qU(OperationGlobal.f[f]) ){
				return true;
			}
		}
		return false;
	};
	this.s = function(vs,row,f){
		if( !qU(f) ){
			return f(vs);	
		}
		return undefined;
	};
	this.f = {};
	this.exec = function(v,scope,args,row,f){
		if( v == "parent" ){
			if( !qU(this.parent) ){
				return this.parent.exec(scope[0],scope.slice(1),args,row,f);
			}
		}else if( !qU(this.f[v]) ){
			return this.f[v](scope,args,row,f);
		}else if( !qU(OperationGlobal.f[v]) ){
			return OperationGlobal.f[v](scope,args,row,f);
		}
		return -Infinity;
	}
	this.createOperateTree = function(key, operate) {
		
		var _this = this;
		var sp = operate.split('');
		var sp2 = [];
		var hold = "";
		var inString = false;
		sp.forEach(function(d, i) {
			if( d == '\'' || d == '\"'){
				if( inString && d == hold ){
					inString = false;
					sp2[sp2.length-1] += d;
				}else{
					inString = true;
					sp2.push(d);
				}
				hold = d;
			}else if( inString ){
				sp2[sp2.length-1] += d;
			}else{
				//d = d.trim();
				if (d.length > 0)
					sp2.push(d);	
			}
			
		});
		hold = "";
		var inArgumentsRegion = false;
		var depth = 0;
		inString = false;
		var quotes = "";
		
		var sp3 = sp2.reduce(function(prev, curr) {
			if( inArgumentsRegion ){
				switch (curr) {
				case '(':
					if( inString == false ){depth++;}
					prev[prev.length - 1] += curr;	
					break;
				case ')': 
					if( inString == false && depth == 0 ){
						inArgumentsRegion = false;
						break;
					}else if( inString == false ){
						depth--;
					}
					prev[prev.length - 1] += curr;
					break;
				case '\'': 
					if( inString == false ){
						quotes = curr;
						inString = true;
					}else if(quotes == curr){ inString = false; quotes = "";}
					prev[prev.length - 1] += curr;
					break;
				case '"': 
					if( inString == false ){
						quotes = curr;
						inString = true;
					}else if(quotes == curr){ inString = false; quotes = "";}
					prev[prev.length - 1] += curr;
					break;
				case ',': 
					if( depth == 0 && inString == false ){
						prev.push(",");
						prev.push("");
						break;
					}else{
						prev[prev.length - 1] += curr;
					}
					break;
				default:{
					prev[prev.length - 1] += curr;
				}
				}
				if( inArgumentsRegion ){
					return prev;
				}
			}else if( inString ){
				if( hold == curr ){
					inString = false;
				}
				prev[prev.length - 1] += curr;
				return prev;
			}
			switch (curr) {
			case '(':
				if( prev.length > 0 && ( _this.isVariableName(prev[prev.length-1]) ) ){
					hold = "";
					inArgumentsRegion = true;
					depth = 0;
					inString = false;
					//prev[prev.length-1] = prefix+prev[prev.length-1];
					hold = "";
					prev.push(curr);
					prev.push("");
					break;
				}
			case ')':
			case '?':
			case ':':
			case '*':
			case '/':
			case '+':
			case '-':
				hold = "";
				prev.push(curr);
				break;
			case '>':
				hold = '>';
				break;
			case '<':
				hold = '<';
				break;
			case '!':
				hold = '!';
				break;
			case '=':
				if( hold == '!'){
					prev.push("!="); hold="";
				}else if( hold == '='){
					prev.push("=="); hold="";
				}else if( hold == '>'){
					prev.push(">="); hold="";
				}else if( hold == '<'){
					prev.push("<="); hold="";
				}else{
					hold = '=';
				}
				break;
			case '|':
				if( hold == '|'){
					prev.push("||"); hold="";
				}else{
					hold = '|';
				}
				break;
			case '&':
				if( hold == '&'){
					prev.push("&&"); hold="";
				}else{
					hold = '&';
				}
				break;
			case '\'':
			case '\"':
				inString = true;
				prev.push(curr);
				hold = curr;
				break;
			case ' ':
			case '\t':
			case '\n':
			case '\r':
				prev.push(curr);
				break;
			default:
				{
					if( hold == '<' ){
						prev.push("<");
						curr = curr.trim();
						if( curr.length >0)
							prev.push(curr);
					}else if( hold == '>' ){
						prev.push(">");
						curr = curr.trim();
						if( curr.length >0)
							prev.push(curr);
					}else{
						if (prev.length > 0
								&& !"+-*/()||&&==!=><>=<=?:".includes(prev[prev.length - 1])) {
							prev[prev.length - 1] += curr;
						} else {
							prev.push(curr);
						}
					}
					hold = "";
				}

				break;
			}
			return prev;
		}, []);

		var tree = new OpNode.Braket(this);
		var cursor = tree;
		var newWrapper;
		var stack = [];
		var prevOperand;
		var prevOperator=null;
		try{
			sp3 = sp3.map(function(d,i){ return d.trim(); } ).filter(function(d,i){ return (d.length == 0) ? false : true;});
			var startIndex = 0;
			var findQIndex = 0;
			while( (findQIndex = sp3.indexOf("?",startIndex)) > 0 ){
				
				if( findQIndex > startIndex ){
					var findSCIndex = sp3.reduce(function(prev,curr,i){
						if( findQIndex < i ){
							if( prev.find == false ){
								if( curr == "(" ) prev.depth++;
								else if( curr == ")" ) prev.depth--;
								else if( curr == ":" && prev.depth == 0){
									prev.find = true;
									prev.index = i;
								}
							}
						}
						return prev;
					},{depth:0,find:false,index:findQIndex}).index;//sp3.indexOf(":",findQIndex);
					if( findSCIndex == findQIndex ){
						console.error("error : not found ':' " + sp3[findQIndex-1]);
						break;
					}
					if( findSCIndex > findQIndex ){
						var i = 0;
						depth = 0;
						for( i = findSCIndex+1 ; i < sp3.length ; i++){
							if( sp3[i] == "(" ){
								depth++;
							}else if( sp3[i] == ")" ){
								if( depth == 0 ){
									sp3.splice(i,0,")");
									sp3.splice(findSCIndex+1,0,"(");
									break;
								}
								depth--;
							}
							if( i == sp3.length-1){
								sp3.splice(i+1,0,")");
								sp3.splice(findSCIndex+1,0,"(");
								break;
							}
						}
						sp3.splice(findSCIndex,0,")");
						sp3.splice(findQIndex+1,0,"(");
						depth = 0;
						for( i = findQIndex ; i >= 0 ; i--){
							if( sp3[i] == ")" ){
								depth++;
							}else if( sp3[i] == "(" ){
								if( depth == 0 ){
									sp3.splice(findQIndex, 0,")");
									sp3.splice(i+1,0,"(");
									break;
								}
								depth--;
							}
							if( i == 0 ){
								sp3.splice(findQIndex, 0,")");
								sp3.splice(i,0,"(");
								break;
							}
							
						}
					}
				}
				lastIndex = sp3.indexOf("?",startIndex+1);
				startIndex = lastIndex+1;
			};
			
			sp3.reduce(function(prev,x){
				switch (x) {
				case '(':
					stack.push(cursor);
					
					newWrapper = new OpNode.Braket(_this);
					cursor.push(newWrapper);
					cursor = newWrapper;
					break;
				case ')':
					cursor = stack.pop();
					break;
				case '?':
					cursor.push(new OpNode.Q());
					break;
				case ':':
					cursor.push(new OpNode.SC());
					break;
				case '*':
					cursor.push(new OpNode.MUX());
					break;
				case '/':
					cursor.push(new OpNode.DIV());
					break;
				case '+':
					cursor.push(new OpNode.PLUS());
					break;
				case '-':
					cursor.push(new OpNode.MINUS());
					break;
				case '>':
					cursor.push(new OpNode.GREATER());
					break;
				case '<':
					cursor.push(new OpNode.LESS());
					break;
				case '>=':
					cursor.push(new OpNode.GREATEREQUAL());
					break;
				case '<=':
					cursor.push(new OpNode.LESSEQUAL());
					break;
				case '==':
					cursor.push(new OpNode.EQUAL());
					break;
				case '!=':
					cursor.push(new OpNode.NOTEQUAL());
					break;
				case '||':
					cursor.push(new OpNode.OR());
					break;
				case '&&':
					cursor.push(new OpNode.AND());
					break;
				case 'as':
					cursor.push(new OpNode.AS());
					break;
				default: {
					if( x.indexOf("'")==0 && (x.lastIndexOf("'")==(x.length-1)) ){
						prevOperand = new OpNode.String(x.substring(x.indexOf("'")+1,x.lastIndexOf("'")));
						cursor.push(prevOperand);
					}else if( x.indexOf("\"")==0 && (x.lastIndexOf("\"")==(x.length-1)) ){
						prevOperand = new OpNode.String(x.substring(x.indexOf("\"")+1,x.lastIndexOf("\"")));
						cursor.push(prevOperand);
					}else if ($.isNumeric(x)) {
						prevOperand = new OpNode.Number(parseFloat(x));
						cursor.push(prevOperand);
					} else {
						prevOperand = new OpNode.Variable(_this,x);
						cursor.push(prevOperand);
					}
					return prevOperand;
				}
				}
				return prevOperator;
			},null);
		}catch(e){
			console.error(e);
		}
		return tree;
	};

	this.calculator = function(braket, row,f) {
		try{
			return braket.op(row,null,f);
		}catch(e){
			console.error(e);
		}
		return Infinity;
	}
	this.isReady = function(braket, row) {
		return braket.isReady(row);
	}

	this.test = function(script,variables,f){
		if( qU(variables) ){
			variables = window;
		}
		var tree = this.createOperateTree("", script);
		if( _isdebug(variables) ){ 
			console.log( tree.toString() );
		}
		var value = this.calculator(tree, variables, !qU(f)?f:function(str){
			if( _isdebug(variables) ){
				console.log("[ feedback request : " + str + "? ]");
			}
			return 0;
		});
		return value;
	}
};

function UserEaxmple(name,parent){
	this.name = name;
	this.oper = new Operation(name,this,!qU(parent)?parent.oper:null);
	this.isFunction = function(f){
		return this.oper.isFunction(f);
	}
	this.a = {
		b:1,
		c:2,
		calc:function(a,b){
			return a*b+10;
		}
	}
	this.oper.extend("test",function(scope,args,row,f){
		if( !qU(args) ){
			return args.reduce(function(prev,curr){
				return prev + curr;
			},0);
		}
		return 0;
	});
	this.oper.extend("data",function(scope,args,row,f){
		if( !qU(args) ){
			return args.reduce(function(prev,curr){
				return prev + curr;
			},0);
		}
		return 0;
	});


	var _this = this;
	this.oper.extend("name",function(scope,args,row,f){
		return _this.name;
	});
	
	this.oper.extend("var",function(scope,args,row,f){
		if( _isdebug(row) ){
			console.log( "var " + scope );
		}
		if( scope.length > 0 ){
			if( scope[0] == "aaa")
				return 1;
			else if( scope[0] == "bbb")
				return 2;
			else if( scope[0] == "ccc")
				return 3;
		}
		return 1;
	});
	this.oper.extend("res",function(scope,args,row,f){
		return "resvalue";
	});

	this.exec = function(script,row){
		return this.oper.test(script,row);
	}
}
var op = new UserEaxmple("gp",null);
/*
var pp = new UserEaxmple("gp",null);

var parent = new UserEaxmple("ppp",pp);

var child = new UserEaxmple("ccc",parent);

child.exec("data(1,2,3,4)");
console.log("test 1 : " + child.exec("((a*b)>10?a*b:10)==12?(1==1?'haha':'zz'):'fail'",{a:4,b:3,__debug__:false}) );

console.log("test 2 : " + child.exec("1+Auth.getSelectMyAutGroupRolePBF(group as GROUP_CODE,           role as ROLES_SID,user as USER_ID, a) + 1",{group:20,a:10,__debug__:false}) );

console.log("test 3 : " + child.exec("var.bbb+2*4 + (4==a?10:20)",{a:4,b:3,__debug__:false}) );

console.log("test 3 : " + child.exec("avg(var.aaa() ,var.bbb(), var.ccc ) + res() + ' ' + name()",{a:4,b:3,__debug__:true}) );
*/


