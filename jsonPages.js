  	$.get("/qugou/getcontentbygoodsid.jspa", {
			goodsid : args.id
		}, function(data) {
			eval(data);
			var i = 0, len = data.length, html0 = "", per = 6;
			$("#recommendListTitle b").html(len);
			if (len == 0) {	$("#recommendListTitle").hide();}
			if (len > per) {
				var totals = len;
				var pages = Math.ceil(totals / per);
				var html1 = "";
				insert(0, per, data);
				for ( i = 0; i < pages; i++) {
					var starPage = i * per;
					var endPage = (i * per) + per;
					if (endPage > totals) {
						endPage = totals
					}
					html1 += "<a class='pageList' id='" + starPage + "' name='" + endPage + "' >" + (i + 1) + "</a>";
				}
				$("#page").html(html1);
				$(".pageList").click(function() {
					var x = $(this).attr("id");
					var y = $(this).attr("name");
					
					insert(x, y, data);
				})
			} else {
				insert(0, len, data);
			}
			function insert(x, y, data) {
				var x=Number(x),y=Number(y);
				$("#recommendList").html("")
				var html0="";
				for (x; x < y; x++) {
					html0 += '<li>' + data[x].usernick +'</a></div></h3>';
				}
				$("#recommendList").append(html0);
			}
		})
