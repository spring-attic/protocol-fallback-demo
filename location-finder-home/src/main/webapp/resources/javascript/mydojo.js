 			dojo.require("dijit.TitlePane");
            dojo.require("dojox.json.ref");
            dojo.require("dijit.layout.TabContainer");
            dojo.require("dijit.form.Button");
            dojo.require("dijit.MenuBar");
            dojo.require("dijit.MenuBarItem");
            dojo.require("dijit.PopupMenuBarItem");
            dojo.require("dijit.Menu");
            dojo.require("dijit.MenuItem");
            dojo.require("dijit.PopupMenuItem");
            dojo.require("dijit.Toolbar");
            dojo.require("dijit.MenuSeparator");
            dojo.require("dijit.ToolbarSeparator");
            dojo.require("dijit.layout.SplitContainer");
            dojo.require("dijit.layout.BorderContainer");
            
            var tp;
            dojo.addOnLoad(function() {
            	var bc = new dijit.layout.BorderContainer({style: "height: 500px; width: 500px;"});
            	dojo.byId("holder").appendChild(bc.domNode);  
            	     	
            	var centerMenu = new dijit.layout.ContentPane({
          		   region: "center",
          		   style: "height: 100px; width: 380px;"
          		});
              	bc.addChild(centerMenu);
              	
              	var menuTitle = new dijit.layout.ContentPane({
           		   region: "top",
           		   style: "height: 15px; width: 380px;",
           		   content: "Menu"
           		});
               	bc.addChild(menuTitle);
            	
            	var innerContainer = dojo.create("div");
             	dojo.attr(innerContainer, "id", "innerContainer");
             	centerMenu.setContent(innerContainer);
            	
            	//
            	 var pMenuBar = new dijit.MenuBar({});

                 var pSubMenu = new dijit.Menu({});
                 pSubMenu.addChild(new dijit.MenuItem({
                     label: "Menu Item"
                 }));
                 pSubMenu.addChild(new dijit.MenuItem({
                     label: "File item #2"
                 }));
                 pMenuBar.addChild(new dijit.PopupMenuBarItem({
                     label: "New",
                     popup: pSubMenu
                 }));

                 var pSubMenu2 = new dijit.Menu({});
                 pSubMenu2.addChild(new dijit.MenuItem({
                     label: "Specialty Pizza"
                 }));
                 pSubMenu2.addChild(new dijit.MenuItem({
                     label: "Tomato Pie"
                 }));
                 pMenuBar.addChild(new dijit.PopupMenuBarItem({
                     label: "Edit",
                     popup: pSubMenu2
                 }));

                 //pMenuBar.placeAt("wrapper");
                 pMenuBar.startup();
                 dojo.byId("innerContainer").appendChild(pMenuBar.domNode); 
            	//
            	
             	
             	var jsonResponse = '[{"name":"Specialty Pizza","menuItems":[{"name":"Plain Pizza","description":null,"price":"5.48"},{"name":"White Pizza","description":null,"price":"25.48"},{"name":"Primavera","description":null,"price":"15.33"}]},{"name":"Tomato Pie","menuItems":[{"name":"The Original","description":null,"price":"35.48"}]}]';
             	var response = dojo.fromJson(jsonResponse);
	         	for ( var i = 0; i < response.length; i++) {
	            	var category =  response[i].name;
	        
	            	var menuItems = response[i].menuItems;
	     
	            	var li = "";
	            	for ( var y = 0; y < menuItems.length; y++) {
	            		var menuItem = menuItems[y];
	            		li +="<li>" + menuItem.name + "<b> - $" + menuItem.price + "</b></li>";
	            	}
       
					tp = new dijit.TitlePane({
	                    title: category,  
	                    content: li,
	                    open: false
	                });
					
//	            	var button = new dijit.form.Button({
//	                    label: "Delete",
//	                    showLabel: true,
////	                    iconClass: "dijitEditorIcon dijitEditorIcon" + "Delete",
//	                    onClick: function() {
//	                        alert('save');
//	                    }
//	                 });
//	             	button.placeAt(tp.focusNode, "first");
//	             	var button = new dijit.form.Button({
//	                    label: "Edit",
//	                    showLabel: true,
////	                    iconClass: "dijitEditorIcon dijitEditorIcon" + "Delete",
//	                    onClick: function() {
//	                        alert('save');
//	                    }
//	                 });
//	             	button.placeAt(tp.focusNode, "first");
	    
	                dojo.byId("innerContainer").appendChild(tp.domNode);   
				} 
            	
             	bc.startup();
             	
             	
             	
             	
             	
             	
             	
//            	var toolbarsep = new dijit.ToolbarSeparator();
//            	toolbarsep.placeAt(tp.focusNode, "first");
            	
            	//centerMenu.setContent(tp);
            	
            	
            	//fooMenu.placeAt(tp.titleNode);
//            	bc.addChild(tpA);
//            	bc.addChild(tpB);
            		
//            		var tc = new dijit.layout.SplitContainer({region: "center", activeSizing:"false", orientation:"vertical"});
//            		var tab1 = new dijit.layout.ContentPane({title: "tab 1"}),
//            		    tab2 = new dijit.layout.ContentPane({title: "tab 2"});
//            		tc.addChild( tab1 );
//            		tc.addChild( tab2 );
//            		bc.addChild(tc);

            		// put the top level widget into the document, and then call startup()
            		//document.body.appendChild(bc.domNode);
            		
            	
//            	var jsonResponse = '[{"name":"Specialty Pizza","menuItems":[{"name":"Plain Pizza","description":null,"price":"5.48"},{"name":"White Pizza","description":null,"price":"25.48"},{"name":"Primavera","description":null,"price":"15.33"}]},{"name":"Tomato Pie","menuItems":[{"name":"The Original","description":null,"price":"35.48"}]}]';
//            	var response = dojo.fromJson(jsonResponse);
//            	console.log("Length: " + response.length);
////            	alert(response.length);
//            	
//	            for ( var i = 0; i < response.length; i++) {
//	            	var category =  response[i].name;
//	            	//alert(category);
//	            	var menuItems = response[i].menuItems;
//	            	//alert(menuItems.length);
//	            	var li = "";
//	            	for ( var y = 0; y < menuItems.length; y++) {
//	            		var menuItem = menuItems[y];
//	            		li +="<li><span class='command'><a href='http://www.oleg.com'>" + menuItem.name + "</a><b> - $" + menuItem.price + "</b></span></li>";
//	            	}
//	            	//alert(li);
//					tp = new dijit.TitlePane({
//	                    title: category,                   
//	                    content: li,
//	                    open: true
//	                });
//	                dojo.byId("holder").appendChild(tp.domNode);   
//				}      
//            	var tp = new dijit.TitlePane({
//                    title: "Specialty Pizza",
//                    open: false
//                }).placeAt(dojo.body());
            	
            	// var toolbar = new dijit.Toolbar({}).placeAt(dojo.body());
            	// toolbar.addChild(tp);

            	
            	//dojo.place("<table><tr><td>row 1, cell 1</td><td>row 1, cell 2</td></tr></table>", tp.titleNode, "last");
            	
//            	var toolbarsep = new dijit.ToolbarSeparator();
//            	toolbarsep.placeAt(tp.titleNode, "last");
//            	var bc = new dijit.layout.SplitContainer({sizerWidth:"10", activeSizing:"true",orientation:"vertical", paneBefore:"hello", paneAfter:"bye"}).placeAt(dojo.body());
            	//bc.placeAt(tp.titleNode, "last");

//            	dojo.forEach(["Edit", "Delete"], function(label) {
//                     var button = new dijit.form.Button({
//                         // note: should always specify a label, for accessibility reasons.
//                         // Just set showLabel=false if you don't want it to be displayed normally
//                         label: label,
//                         showLabel: true
//                     });
//                     //dojo.place(button, tp.titleNode, "first");
//                    bc.painAfter.addChild(button);
//                     //button.placeAt(tp.titleNode, "last");
//                 });
            	 //toolbar.addChild(tp)
            	 //toolbar.placeAt(tp.titleNode, "last");
            	 
//            	 tp.startup();
            	 //toolbar.startup();

//                 var pSubMenu = new dijit.Menu({});
//                 pSubMenu.addChild(new dijit.MenuItem({
//                     label: "File item #1"
//                 }));
//                 pSubMenu.addChild(new dijit.MenuItem({
//                     label: "File item #2"
//                 }));
//                 pMenuBar.addChild(new dijit.PopupMenuBarItem({
//                     label: "File",
//                     popup: pSubMenu
//                 }));
//
//                 var pSubMenu2 = new dijit.Menu({});
//                 pSubMenu2.addChild(new dijit.MenuItem({
//                     label: "Edit item #1"
//                 }));
//                 pSubMenu2.addChild(new dijit.MenuItem({
//                     label: "Edit item #2"
//                 }));
//                 pMenuBar.addChild(new dijit.PopupMenuBarItem({
//                     label: "Edit",
//                     popup: pSubMenu2
//                 }));

                

            	//var divInfo = dojo.position(tp.focusNode, true);
            	//alert(divInfo.w);
            	//dojo.place("<a href='foo.html'><font size='150'>helloA</font></a>", tp.focusNode, "last");
//            	dojo.create("a", { href: "foo.html", title: "Goto FOO!", innerHTML: "Delete" }, tp.hideNode, 'last');
//            	dojo.create("a", { href: "foo.html", title: "Goto FOO!", innerHTML: "Delete" }, tp.containerNode, 'last');
//            	var ancorPos = dojo.position(ancor, true);
//            	//alert(ancorPos.w);
//            	var lastX = 0;
//                var lastY = 0;
//            	lastX += divInfo.x - ancorPos.x + (divInfo.w - ancorPos.w) / 2;
//                lastY += divInfo.y - ancorPos.y + (divInfo.h - ancorPos.h) / 2;
//            	dojo.style(ancor, {
//                     left: lastX+100 + "px",
//                     top: lastY+100 + "px"
//                });
            	
            	//dojo.create("a", { href: "foo.html", title: "Goto FOO!", innerHTML: "Modify" }, tp.focusNode, "last");
//            	 var button = new dijit.form.Button({
//                     label: "Click me!",
//                     onClick: function() {
//                         // Do something:
//                         //dojo.byId("result1").innerHTML += "Thank you! ";
//                    	 alert("Thank you!");
//                     }
//                 }).placeAt(tp.titleNode, "first");
            	 //dojo.place("<div id='helloA'><a>helloA</a></div>", tp.titleNode, "first");
            	// dojo.place("<a>helloB</a>", tp.titleNode, "first");
            	 
//            	 var buttona = new dijit.form.Button({
//                     label: "Click me again!",
//                     onClick: function() {
//                         // Do something:
//                         //dojo.byId("result1").innerHTML += "Thank you! ";
//                    	 alert("Thank you!");
//                     }
//                 }).placeAt(tp.titleNode, "first");

//                var tabs = new dijit.layout.TabContainer({
//                    region: "center",
//                    content: "Service Details",
//                    tabStrip: true
//                }).placeAt(tp.titleNode);
//                tabs.startup();
//                tabs.addChild(new dijit.layout.ContentPane({
//                    title: 'foo', content: 'bar'
//                }));

                //putting this after adding the tabcontainer
                //avoids problems when open is initially true
               
});