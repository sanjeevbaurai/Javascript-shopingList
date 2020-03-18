/**
 * @author sanjeev
 */
var AjaxService = function()
{
	this._url = "";
	this._name = "";
	 
	this.init = function(objService)
	{
			
		if(typeof(objService) != "object")
		{
			consoleLog("invalid service object")
			consoleLog(objService);
			return;
		}
		
		if(objService.url == undefined)
		{
			consoleLog("invalid service object")
			consoleLog(objService);
			return;
		}
		this._url = objService.url;
		
		if(objService.name == undefined)
		{
			consoleLog("invalid service object3")
			consoleLog(objService);
			return;
		}
		this._name = objService.name;
		
		var objMethods = objService.methods;
		if(typeof(objMethods) == "object" && objMethods.length != undefined)
		{
			
			var iLen = objMethods.length;
			for(var i=0; i<iLen; i++)
			{
				var obj = objMethods[i];
				if(typeof(obj) == "object" && obj.name != undefined && typeof(obj.name) == "string")
				{
					
					this[obj.name] = new AjaxServiceMethod();
					this[obj.name].init(this._url, obj);
				}
				else
				{
					consoleLog("invalid service method")
					consoleLog(objService);	
				}
			}
		}
	};
}
