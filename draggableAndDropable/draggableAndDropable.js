$(document).ready(function(){
	var keycode;
	var leftlist = $('.moveBox .left');
	var rightlist = $('.moveBox .right');
	$(document).keydown(function(event){
		keycode = event.which;
	});
	$(document).keyup(function(event){
		keycode = null;
	});
	$('.moveBox').delegate(".ui-draggable", "click", function(){
		if(keycode == null) {
			$(this).parent().find(".ui-draggable").removeClass("ui-selected");
			$(this).addClass("ui-selected");
		}
	});
	$('.moveBox').delegate(".ui-draggable", "mousedown", function(){
		if(keycode == 17){
			$(this).toggleClass('ui-selected')
		}
		else{
			if(!$(this).hasClass("ui-selected")){
				$(this).parent().find(".ui-draggable").removeClass("ui-selected");
				$(this).addClass("ui-selected");
			}
		}
	});
	$('.moveBox').find('tr').each(function(index,item){
		$(item).data('index',index);

	});

	sortAfterSlt = function(_array){
		_array = _array.sort(function(a,b){
			return ($(a).data("index")) - ($(b).data("index"));
		})
		return _array;
	};

	getDraggedClone = function(obj_tr){
		var dragging_table = $(document.createElement("table"));
		dragging_table.css({"width":$(obj_tr).parent().parent().width()})
		dragging_table.attr("class","dragtable");
		var selected_Array = obj_tr.parent().find(".ui-selected")
		//selected_Array = sortAfterSlt(selected_Array);
		var selectedHelper = selected_Array.clone();
		dragging_table.append(selectedHelper);
		return dragging_table;
	};



	leftlist.find('tr').draggable({
		helper: function(){
			return getDraggedClone($(this));
		},
		revert:"invalid",
		opacity:0.3,
		appendTo:"body",
		zIndex: 2000,
		cursorAt:{cursor:'crosshair',top:-10,left:-15}
	});

	rightlist.find('tr').draggable({
		helper: function(){
			return getDraggedClone($(this));
		},
		revert:"invalid",
		opacity:0.3,
		appendTo:"body",
		zIndex: 2000,
		cursorAt:{cursor:'crosshair',top:-10,left:-15}
	});

	leftlist.droppable({
		accept: function(){
			return rightlist.find(".ui-draggable");
		},
		drop: function(event,ui){
			var added = $(ui.draggable).parent().find(".ui-selected");
			added = sortAfterSlt($.merge(leftlist.find(".ui-draggable"), added));
			$(this).find(".ui-draggable").removeClass("ui-selected");
			$(this).find('table').append(added);
		}
	});

	rightlist.droppable({
		accept: function(){
			return leftlist.find(".ui-draggable");
		},
		drop: function(event,ui){
			var added = $(ui.draggable).parent().find(".ui-selected");
			added = sortAfterSlt($.merge(rightlist.find(".ui-draggable"), added));
			$(this).find(".ui-draggable").removeClass("ui-selected");
			$(this).find('table').append(added);
		}
	});
	
});