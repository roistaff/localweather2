import { parse } from "https://deno.land/std@0.66.0/flags/mod.ts";
import * as Colors from "https://deno.land/std@0.210.0/fmt/colors.ts";
function Error(message :string){
	console.log(Colors.red("Error: ")+message)
	Deno.exit(0)
}
console.log(Colors.brightGreen("localweather"))
let location : string
const args = parse(Deno.args)
if (args.h === true){
	console.log("wannna help? call me!!")
}
if (args.l === undefined){
	location = Deno.env.get("LOCATION")
}else if(args.l != "" && args.l != true){
	location = args.l
}
let apikey : string = Deno.env.get("WEATHERKEY")
if (apikey === ""){
	Error("API key not found.")
}
if (location === undefined){
	Error("LOCATION not found.")
}
const response = await fetch("http://api.weatherapi.com/v1/current.json?key="+apikey+"&q="+location)
const data = await response.json();
if (data.error != undefined){
	Error(data.error.message)
}
console.log(Colors.brightCyan("Location:")+data.location.country+" "+data.location.region+" "+data.location.name);
console.log(Colors.brightYellow(" Weather:")+data.current.condition.text)
