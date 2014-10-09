
function bQuery(selector, context) {
	return jQuery(selector, context);
}
bQuery.addClass = function() {
	alert(4)
}



function Brray() {
	for(var i=0; i<arguments.length; i++) {
		this[i] = arguments[i]
	}
	this.length = arguments.length;
}
Brray.prototype = {
	push: function() {
		[].push.apply(this, arguments);
	},
	splice: function() {
		[].splice.apply(this, arguments);
	}
}
