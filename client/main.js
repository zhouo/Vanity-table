Template.homeheader.helpers({
    nickname:function(){
        if (Meteor.user()){
            return Meteor.user().username;
        }
        else {
            return "Guest";
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
        $("#insertproductform").toggle();
        $('#admineditproductform').toggle(false);
    }    

});

Template.EditProduct.events({
    'click .js-hide-admineditproductform':function(){
        $('#admineditproductform').toggle(false);
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
        $("#admineditproductform").toggle();
        $("#insertproductform").toggle(false);
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
        $( "#inserttableform" ).toggle();
    },    
});




Template.showWishlists.events({
    'click .js-toggle-wishlistform':function(){
        $( "#wishlistform" ).toggle();
        $("#editwishlistform").toggle(false)
    },
    
});

Template.InsertTable.events({
    'click .js-hide-tableform':function(){
        $( "#inserttableform" ).toggle(false);
    }
});

Template.EditTable.events({
    'click .js-hide-edittableform':function(){
        $( "#edittableform" ).toggle(false);
    }
});

Template.InsertWishlist.events({
    'click .js-hide-wishlistform':function(){
        $( "#wishlistform" ).toggle(false);
    }
});

Template.EditWishlist.events({
    'click .js-hide-editwishlistform':function(){
        $( "#editwishlistform" ).toggle(false);
    },
    // 'click .js-reset-editwishlistform':function(){
    //     $('#EditwishlistForm input[name="name"]').val("");
    //     console.log($('#EditwishlistForm input[name="name"]').val());
    //     $('#EditwishlistForm input[name="description"]').val("");
    // }
});

Template.AddtoWishlist.events({
    'click .js-hide-addtowishlistForm':function(){
        $("#addtowishlistForm").toggle(false);
    }
});

Template.AddtoTable.events({
    'click .js-hide-addtotableForm':function(){
        $("#addtotableForm").toggle(false);
    }
});

Template.productsOntable.events({
    'click .js-toggle-addtotableform':function(){
        $( "#addtotableForm").toggle();
    },
    'click #backtotables':function(){
        event.preventDefault(); 
        Router.go('/showTables');
    }
});

Template.productsOnwishlist.events({
    'click .js-toggle-addtowishlistform':function(){
        $( "#addtowishlistForm" ).toggle();
    },
    'click .js-toggle-showSamecategory':function(){
        Session.set("productId", this.id);
        $( "#addtowishlistForm" ).toggle(false);
        $( "#showSamecategory").toggle();

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
        $( "#editwishlistform" ).toggle();
            // $('#EditwishlistForm input[name="name"]').val("list.name");
            // $('#EditwishlistForm input[name="description"]').val("description");
        $("#wishlistform").toggle(false);
        
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
        $( "#edittableform" ).toggle();
        $("#inserttableform").toggle(false);
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
    },
    expired:function(){
        if (this.expiredOn < new Date()){
            return true
        }
        else{
            return false
        }
    },
});

Template.home.helpers({
    products:function(){
        Meteor.subscribe("products");
        //console.log(Products.find());
        return Products.find();
    },
    path:function(){
        if(this){
            //console.log(this[0]);
            let path = "/"+this._id+".png";
            //console.log(path);
            return path;
        }
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
    path:function(){
        //console.log("path function called");
        //console.log(this);
        let item = Products.findOne({_id:this.id});
        if(item){
            path="/brand/"+item.brand;
            //console.log(path);
            return path
        } 
    },
    category:function(){
        var productId = Session.get("productId");
        if (productId) {
            if (Products.findOne({_id: productId})) {
                return Products.findOne({_id: productId}).category;
            }
        }
    },
    expiredate:function(){
        if (this){
            return moment(this.expiredOn).format("YYYY-MM-DD");
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
            //console.log(path);
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
            //console.log(path);
            return path;
        }
    },
    brandname:function(){
        if (this[0]){
            return this[0].brand;
        }
        else{
            return Session.get("brand");
        }
    }

})
Template.categoryproductsheader.helpers({
    category:function(){
        if (this[0]){
            return this[0].category;
        }
        else {
            return Session.get("category");
        } 
    }
})

Template.productInfo.events({
    
})

Template.ReviewBlock.events({
    'click .js-toggle-addreviewForm':function(){
        if(Meteor.user()){
            $('#addreviewForm').toggle();
        }
        else{
            alert("You need to log in to post your reviews!");
        }
    },
    'click .js-rate-product':function(event){
        let rating = $(event.currentTarget).data("userrating");
        if (rating){
            Session.set("rating",rating);
        }
    },
    'click .js-toggle-showreviews':function(){
        $('#showreviews').toggle()
    }
})

Template.ReviewBlock.helpers({
    review:function(){
            return Reviews.find({product_id:this._id}).fetch();
    }
})

Template.ReviewBlock.events({
    'click .js-toggle-wishlist-selection':function(){
        $('#wishlist-selection').toggle()
    },
    'click .js-toggle-table-selection':function(){
        $('#table-selection').toggle()
    }
})

Template.ReviewItem.helpers({
    username:function(){
        if (Meteor.user()){
            Meteor.call('getUsername', this.user_id, function(err,res){
                if (!res){
                console.log("call getUsername function error");
            }
            else{
                Session.set('result',res)
            }
        });
            //console.log(Session.get('result'));
        return Session.get('result');
        }
    },
    postdate:function(){
        if (Meteor.user()){
            postdate = moment(this.createdOn).format('MMMM Do YYYY');
            return postdate
        }
    },
    posttime:function(){
        if (Meteor.user()){
            //postdate = moment(this.createdOn).format('MMMM Do YYYY,h:mm:ss a');
            posttime = moment(this.createdOn).format('LT');
            //console.log(posttime);
            return posttime
        }
    }
})



Template.AddReviewForm.helpers({
    ratingValue: function(){
        //console.log("rating function called");
        let rating = Session.get("rating");
        //console.log("addform", rating);
        if(rating){
            //console.log(rating);
            return rating;
        }
    },
    userID: function(){
        if(Meteor.user()){
            //console.log(Meteor.userId());
            return Meteor.userId();
        }
    },
    username: function(){
        if(Meteor.user()){
            return Meteor.user().username;
        }
    }

})

Template.AddReviewForm.events({
    'click #close-review-form':function(){
        $('#addreviewForm').toggle(false);
    }
})

Template.AverageRating.helpers({
    average: function(){
        //console.log(Session.get("productId"));
        //console.log("average function called");       
        productId = Session.get("productId");
        //console.log(productId);
        //console.log("There are ",Reviews.find({product_id:productId}).count(), " reviews")
        reviewlist = Reviews.find({product_id:productId}).fetch();
        totalrating = 0;
        if (reviewlist.length>0){
            reviewlist.forEach(function(review){
                totalrating = totalrating + review.rating;
            });
            average = totalrating/reviewlist.length;
            //console.log(average);
            rounded = Math.round(average * 10) / 10;
            //console.log(rounded)
            return rounded
        }
        else{
            return 0;
        }
        
    },
})

Template.WishlistSelection.helpers({
    options: function(){

        if (!Meteor.user())
            return
        else{
            options = [];
            lists= Wishlists.find({userID: Meteor.userId()}).fetch()
            return lists
        }
        
    },
    checklength: function(){
        if (Meteor.user()){
            if (Wishlists.find({userID: Meteor.userId()}).count()>0){
                return true;
            }
            else {
                return false;
            }        }
    }
})

Template.TableSelection.helpers({
    options: function(){

        if (!Meteor.user())
            return
        else{
            options = [];
            lists= Tables.find({userID: Meteor.userId()}).fetch()
            return lists
        }
        
    },
    checklength: function(){
        if (Meteor.user()){
            if (Tables.find({userID: Meteor.userId()}).count()>0){
                return true;
            }
            else {
                return false;
            }        }
    }
})

Template.TableSelection.events({
    'click .js-toggle-inserttable-sub-form':function(event){
        //console.log("toggle sub form");
        //console.log(event.currentTarget.id);
        //console.log($(event.currentTarget).prop("checked"));
        inputname =".inserttable-sub-form#"+event.currentTarget.id;
        if ($(event.currentTarget).prop("checked")){
            //console.log(inputname);
            $('.inserttable-sub-form').toggle(false);
            $(inputname).toggle(true);
        }
        else {
            $(inputname).toggle(false);
        }
    },
    'click #gotoTables':function(){
        event.preventDefault(); 
        Router.go('/showTables');
    },
})

Template.WishlistSelection.events({
    'click #gotoWishlists':function(){
        event.preventDefault(); 
        Router.go('/showWishlists');
    },
    'click .js-insert-to-wishlists':function(){
        if (Meteor.user()){
            var r = confirm("Are you sure to add to the list");
            if (r == true){
                productId = Session.get("productId");
                lists = Wishlists.find({userID: Meteor.userId()}).fetch();
                lists.forEach(function(list){
                    inputname = ".wish#"+list._id;
                    if ($(inputname).prop("checked")){
                        Meteor.call('insertToWishlist',productId, list._id)
                        // , function(err, res){
                        //     if (!res){
                        //         console.log("call insertToWishlist function error");
                        //     }
                        //     else {
                        //         alert("Congratulations!\nYou successfully add to product to your wishlist!")
                        //     }
                        // })    
                    }
                });
            }
            $('#wishlist-selection').toggle(false);              
        }
    }
})

Template.AddtoTableSelection.events({
    // 'click #insert-specific-to-table':function(event){
    //     event.preventDefault();
    //     console.log(this);
    //     console.log(event.currentTarget);
    //     console.log($("#tableinsert").dateinput.val());
    // }
    'click .js-insert-specific-to-table#insert-specific-to-table':function(event){
        //console.log("event is ",event);
        //console.log(this);
        opendate = $('input[id=dateinput]').val();
        valid = $('input[id=validinput').val()
        expiredate = moment(opendate).add(valid, 'month').format();
        productlist = new Object()
        productlist.expiredOn = new Date(expiredate);
        product = Products.findOne({_id:Session.get("productId")});
        //console.log(product);
        productlist.id = product._id;
        productlist.name=product.name;
        productlist.abbre = product.abbre;
        productlist.category = product.category;
        //console.log(productlist);
        //console.log(this._id)
        Meteor.call('insert-product-to-table',productlist,this._id)
        $('#table-selection').toggle(false);
    }
})

Template.RatingBreakdown.helpers({
    ratingnumber:function(number){
        //console.log(this);
       
            reviewlist = Reviews.find({product_id:this._id}).fetch();
            ratingnumber = 0;
            reviewlist.forEach(function(review){
                if (review.rating == number){
                    ratingnumber = ratingnumber + 1;
                }
            })
            return ratingnumber;
        } 
})




