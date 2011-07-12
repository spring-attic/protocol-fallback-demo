function test(){
	//alert(document.getElementById("myButton").getAttribute("value"));
	//myObject.hello();
	var oleg = new Person("Oleg", "Zhurakousky");
	oleg.foo();
}

person = {
		firstname:"",
		lastname:"",
		foo : function foo(){
			alert(this.firstname + " " + this.lastname);
		}
		
};
function Person(firstname,lastname,age,eyecolor){
	this.firstname=firstname;
	this.lastname=lastname;
	this.foo = foo;
	
}

function foo(){
	alert("Fooo " + this.firstname + " " + this.lastname);
}
