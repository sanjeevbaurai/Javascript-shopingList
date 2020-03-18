/**
 * @author sanjeev
 */
var AjaxServiceMethod = function()
{
	this._name = "";
	this._args = [];
	this._ajaxParam = {};
	this._url = "";
	
	this.init = function(url, objMethod)
	{
		
		if(typeof(url) != "string" || url == "")
		{
			consoleLog("invalid service method\r" + objMethod);
			return;
		}
		if(typeof(objMethod) != "object")
		{
			consoleLog("invalid service method\r" + objMethod);
			return;
		}
		if(objMethod.args == undefined || typeof(objMethod.args) != "object")
		{
			consoleLog("invalid service method\r" + objMethod);
			return;
		}
		if(objMethod.name == undefined || objMethod.name == "")
		{
			consoleLog("invalid service method\r" + objMethod);
			return;
		}
		if(objMethod.ajaxParam != undefined && typeof(objMethod.ajaxParam) == "object")
		{
			this._ajaxParam = objMethod.ajaxParam;
		}
		this._name = objMethod.name;
		this._args = objMethod.args;
		this._ajaxParam = objMethod.ajaxParam;
		this._url = url;
	};
	
	this.run = function(context, successCallback, errorCallback, args)
	{
		
		consoleLog("run called");
		consoleLog(this._ajaxParam);
		consoleLog(context);
		consoleLog(args);
		
		this._ajaxParam.data=args;
		this._ajaxParam.context = context;
		this._ajaxParam.success = successCallback;
		this._ajaxParam.error = errorCallback;
		
		$.ajax(
			
			this._url + this._name + ".json",
			this._ajaxParam,
			this._args
			
								
		);
	
	}
}
