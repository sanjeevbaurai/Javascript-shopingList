/**
 * @author sanjeev
 */
var AjaxServiceController = {
	
	load: function(objASD)
	{
		if(objASD == undefined || typeof(objASD) != "object" || objASD.length == undefined)
		{
			consoleLog("invalid ASD");
			return;
		}
		var iLen = objASD.length;
		for(var i=0; i<iLen; i++)
		{
			var obj = objASD[i];
			if(obj == undefined || typeof(obj) != "object" || obj.name == undefined)
			{
				consoleLog("invalid service object");
				consoleLog(obj);
				
				continue;
			}
			
			AjaxServiceController[obj.name] = new AjaxService();
			AjaxServiceController[obj.name].init(obj);
		
		}
	}
}
