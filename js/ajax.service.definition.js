/**
 * @author sanjeev
 */
var path="";

var ajaxServiceDefinitions = [
	
	/*
		define the first service
		
	 */
	{
		name: "products",
		
		url:"js/",//"https://www.rawnet.com/application/files/5215/8021/3438/",
		methods: [
						
			// for cart service
			{
					name: "cart",
					args: ["string", "number", "object"],
					ajaxParam: {
						async: true,
						cache: false,
						contentType: "application/x-www-form-urlencoded",
						dataType: "json",
						processData: true,
						crossDomain: true,
						type: "GET"
					}
				
			}
		]
	}
	
	// service definitions ends here
	
];

