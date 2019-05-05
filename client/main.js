// Accounts.ui.config({
//   passwordSignupFields: 'USERNAME_ONLY'
// });

Template.header.helpers({
    nickname:function(){
        if (Meteor.user()){
            return Meteor.user().username;
        }
    }
});

Template.showTables.helpers({
    tables:function(){
        if (Meteor.user()){        
            Meteor.subscribe("tables");       
            return Tables.find({'userID': Meteor.userId()}); 
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

Template.showTables.events({
    'click .js-toggle-tableform':function(){
        $( "#tableform" ).removeClass( "hidden");
    }
    
});

Template.showWishlists.events({
    'click .js-toggle-wishlistform':function(){
        $( "#wishlistform" ).removeClass( "hidden");
    }
    
});

Template.InsertTable.events({
    'click .js-hide-tableform':function(){
        $( "#tableform" ).addClass("hidden");
    }
});

Template.InsertWishlist.events({
    'click .js-hide-wishlistform':function(){
        $( "#wishlistform" ).addClass("hidden");
    }
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
        //console.log(this.id);
        // console.log(Session.get("productId"));       
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






