import * as Colors from "https://deno.land/std@0.210.0/fmt/colors.ts";
console.log(Colors.brightGreen("localweather"))
let key : string = Deno.env.get("WEATHERKEY")
let location : string = Deno.env.get("LOCATION")
if (key === ""){
	throw new Error("API key not found.")
}else if (location === ""){
	throw new Error("env LOCATION not found.")
}
const response = await fetch("http://api.weatherapi.com/v1/current.json?key="+key+"&q="+location);
const data = await response.json();
console.log(Colors.brightCyan("Location:")+data.location.country+" "+data.location.region+" "+data.location.name);
console.log(Colors.brightYellow(" Weather:")+data.current.condition.text)
