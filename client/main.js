Template.homeheader.helpers({
    nickname:function(){
        if (Meteor.user()){
            return Meteor.user().username;
        }
    }
});

Template.tableheader.helpers({
    nickname:function(){
        if (Meteor.user()){
            return Meteor.user().username;
        }
    }
});

Template.wishlistheader.helpers({
    nickname:function(){
        if (Meteor.user()){
            return Meteor.user().username;
        }
    }
});

Template.admin_interface.helpers({
    checkadmin:function(){
        if (Meteor.user()){

            if (Meteor.user().username == "admin"){
                return true
            }
            else return false
        }
    }
})

Template.productsontableheader.helpers({
    name:function(){
        return Tables.findOne({_id: this._id}).name;
    }
})

Template.showUsers.helpers({
    user:function(){
        if (Meteor.user().username == "admin"){
            return Meteor.users.find();
        }
    }
})

Template.showTables.helpers({
    tables:function(){
        if (Meteor.user()){        
            Meteor.subscribe("tables");       
            return Tables.find({'userID': Meteor.userId()},{sort: {createdOn: 1}}); 
        }
        //console.log(this.userId);
        
    },
    nickname:function(){
        if (Meteor.user()){
            return Meteor.user().username;
        }
    }
});

Template.showWishlists.helpers({
    wishlists:function(){
        if (Meteor.user()){
            Meteor.subscribe("wishlists");
        //console.log(this.userId);
            return Wishlists.find({'userID': Meteor.userId()});
        }
    },
    nickname:function(){
        if (Meteor.user()){
            return Meteor.user().username;
        }
    }
});

Template.adminProducts.helpers({
    products:function(){
        if (Meteor.user()){
            Meteor.subscribe("products");
            if (Products.findOne()){
                return Products.find();
            }
        } 
    },
    checkadmin:function(){
        if (Meteor.user()){

            if (Meteor.user().username == "admin"){
                return true
            }
            else return false
        }
    },
});

Template.adminProducts.events({
    'click .js-toggle-insertproductform':function(){
        $("#insertproductform").removeClass("hidden");
    }    

});

Template.EditProduct.events({
    'click .js-hide-admineditproductform':function(){
        $('#admineditproductform').addClass("hidden");
    }
})

Template.EditProduct.helpers({
    productdoc:function(){
        let productId = Session.get("productId");
        //console.log(tableId);
        if (productId){
            return Products.findOne({_id: productId});
        }
        
    }
})

Template.productItem.events({
    'click .js-toggle-admin-editproductform':function(){
        Session.set("productId",this._id);
        $("#admineditproductform").removeClass("hidden");
        $("#insertproductform").addClass("hidden");
    },
    'click .js-admin-delete-product':function(){
        var r = confirm("Are you sure to delete this list");
        if (r == true){
            Meteor.call("deleteproduct",this._id,function(err, res){
            if (err){
                console.log('Only admin can delete from database');
            }});
        }
        else{
            return;
        }
        
    }
})

Template.showTables.events({
    'click .js-toggle-tableform':function(){
        $( "#inserttableform" ).removeClass("hidden");
    },    
});




Template.showWishlists.events({
    'click .js-toggle-wishlistform':function(){
        $( "#wishlistform" ).removeClass( "hidden");
    },
    
});

Template.InsertTable.events({
    'click .js-hide-tableform':function(){
        $( "#inserttableform" ).addClass("hidden");
    }
});

Template.EditTable.events({
    'click .js-hide-edittableform':function(){
        $( "#edittableform" ).addClass("hidden");
    }
});

Template.InsertWishlist.events({
    'click .js-hide-wishlistform':function(){
        $( "#wishlistform" ).addClass("hidden");
    }
});

Template.EditWishlist.events({
    'click .js-hide-editwishlistform':function(){
        $( "#editwishlistform" ).addClass("hidden");
    },
    // 'click .js-reset-editwishlistform':function(){
    //     $('#EditwishlistForm input[name="name"]').val("");
    //     console.log($('#EditwishlistForm input[name="name"]').val());
    //     $('#EditwishlistForm input[name="description"]').val("");
    // }
});

Template.AddtoWishlist.events({
    'click .js-hide-addtowishlistForm':function(){
        $("#addtowishlistForm").addClass("hidden");
    }
});

Template.AddtoTable.events({
    'click .js-hide-addtotableForm':function(){
        $("#addtotableForm").addClass("hidden");
    }
});

Template.productsOntable.events({
    'click .js-toggle-addtotableform':function(){
        $( "#addtotableForm" ).removeClass("hidden");
    },
    'click #backtotables':function(){
        event.preventDefault(); 
        Router.go('/showTables');
    }
});

Template.productsOnwishlist.events({
    'click .js-toggle-addtowishlistform':function(){
        $( "#addtowishlistForm" ).removeClass("hidden");
    },
    'click .js-toggle-showSamecategory':function(){
        Session.set("productId", this.id);
        $( "#addtowishlistForm" ).addClass("hidden");
        $( "#showSamecategory").removeClass("hidden");

    },
    'click .js-remove-wishlistitem':function(){
        var listid = Session.get("listId");
        var r = confirm("Are you sure to delete this product \n from your wishlist?");
        if (r == true){
            if (Session.get("listId")){
                Meteor.call('removeItemfromWishlist', this.id, Session.get("listId"),function(err, res){
                if (err){
                    console.log('Can only operate on your own list');
                }});
            }
        }
    },
    'click #backtolists':function(){
        event.preventDefault(); 
        Router.go('/showWishlists');
    }
})

Template.WishlistItem.events({
    'click .js-delete-wishlist':function(){
        //console.log("delete activated");
        //console.log(this._id);
        var r = confirm("Are you sure to delete this list");
        if (r == true){
            Meteor.call("deletewishlist",this._id,function(err, res){
            if (err){
                console.log('Can only operate on your own list');
            }});
        }
        else{
            return;
        }
        
    },
    'click .js-toggle-editwishlistform':function(){
        Session.set("wishlistId", this._id);
        //console.log(Session.get("wishlistId"));
        // let list=Wishlists.findOne({_id:this._id});
        // if (list){
        $( "#editwishlistform" ).removeClass( "hidden");
            // $('#EditwishlistForm input[name="name"]').val("list.name");
            // $('#EditwishlistForm input[name="description"]').val("description");
        $("#wishlistform").addClass("hidden");
        
    }
})

Template.tableItem.events({
    'click .js-delete-table':function(){
        //console.log("delete activated");
        //console.log(this._id);
        var r = confirm("Are you sure to delete this list");
        if (r == true){
            Meteor.call("deletetable",this._id,function(err, res){
            if (err){
                console.log('Can only operate on your own tables');
            }});
        }
        else{
            return;
        }
        
    },
    'click .js-toggle-edittableform':function(){
        //console.log(this);
        Session.set("tableId", this._id);
        //console.log("when toggle form, the session id is",Session.get("tableId"));
        $( "#edittableform" ).removeClass("hidden");
        $("#inserttableform").addClass("hidden");
    }
})

Template.productsOntable.helpers({
	productlist:function(tableID){
        Meteor.subscribe("tables");
        p = Tables.findOne({_id: tableID});
        if (p && p.userID == Meteor.userId()) {
		  return p.productlist;
        }
	},
    expiredate:function(){
        //console.log(this.expiredOn);
        return moment(this.expiredOn).format("YYYY-MM-DD");
    }
});

Template.home.helpers({
    products:function(){
        return Products.find();
    }
});

Template.showCategoryproducts.helpers({
    category:function(){
        if (this){
            return this[0].category;
        }
    }
});



Template.productsOnwishlist.helpers({
    productlist:function(listID){
        Session.set("listId", listID);
        if (Session.get("listId")){
            //console.log(Session.get("listId"));
        }
        //console.log(listID);
        Meteor.subscribe("wishlists");
        p = Wishlists.findOne({_id: listID});
        if (p && p.userID == Meteor.userId()) {
          return p.productlist;
        }
    },
    price :function(){
        // console.log(this.expiredOn);
        return this.price;
    },
    sessionid:function(){
        //console.log(Session.get("productId"));
        return Session.get("productId");
    },
    similarlist:function(){
        productId = Session.get("productId");
        if (productId){
            Meteor.call('getSimilarlist', productId, function(err, res){
                if (!res){
                    console.log("call getSimilarlist function error");
                }
                else{
                    Session.set('result',res)
                }
            });
            //console.log(Session.get('result'));
            return Session.get('result');

        }       
    },
    
    count:function(){
        productId = Session.get("productId");
        if (productId){
            Meteor.call('getSimilarlist', productId, function(err, res){
                if (!res){
                    console.log("call getSimilarlist function error");
                }
                else{
                    Session.set('result',res);
                }
            });
            if (Session.get("result")){
               return Session.get("result").length; 
            }           
        }
        // var productId = Session.get("productId");
        // similarlist = [];
        // if (productId) {
        //     if (Products.findOne({_id: productId})) {
        //         category = Products.findOne({_id: productId}).category;
        //     }
        //     tablelist = Tables.find({userID: Meteor.userId()});
        //     tablelist.forEach(function(table){
        //         table.productlist.forEach(function(p){
        //             if (p.category == category){
        //                 similarlist.push(p);
        //             }
        //         })
        //     })
        // }
        
    },
    expiredate:function(){
        return moment(this.expiredOn).format("YYYY-MM-DD");
    },
    category:function(){
        var productId = Session.get("productId");
        if (productId) {
            if (Products.findOne({_id: productId})) {
                return Products.findOne({_id: productId}).category;
            }
        }
    }
})

Template.Categorydropdown.helpers({
    skincarelist:function(){
        return skincarelist;
    },
    makeupeyelist:function(){
        return makeupeyelist;
    },
    makeupfacelist:function(){
        return makeupfacelist;
    },
    makeupliplist:function(){
        return makeupliplist;
    }
  
});

Template.showBrands.helpers({
    finallist:function(){
        Meteor.call('getBrandlist', function(err, res){
            if (!res){
                console.log("call getBrandlist function error");
            }
            else{
                Session.set('result',res)
            }
        });
            //console.log(Session.get('result'));
        return Session.get('result');
    }
});

Template.EditTable.helpers({
    tabledoc:function(){
        let tableId = Session.get("tableId");
        //console.log(tableId);
        if (tableId){
            return Tables.findOne({_id: tableId});
        }
        
    }
})

Template.EditWishlist.helpers({
    wishlistdoc:function(){
        let wishlistId = Session.get("wishlistId");
        //console.log(tableId);
        if (wishlistId){
            //console.log(Wishlists.findOne({_id: wishlistId}));
            return Wishlists.findOne({_id: wishlistId});
        }
        
    }
});

Template.productInfo.helpers({
    path:function(){
        if(this._id){
            let path = "/"+this._id+".png";
            console.log(path);
            return path;
        }
    }
})

Template.brandproductsheader.helpers({
    brandname:function(){
        if (this[0]){
            return this[0].brand;
        }
    }
});

Template.showBrandproducts.helpers({
    path:function(){
        if(this){
            //console.log(this[0]);
            let path = "/"+this._id+".png";
            console.log(path);
            return path;
        }
    }
})
Template.categoryproductsheader.helpers({
    category:function(){
        if (this[0]){
            return this[0].category;
        } 
    }
})






