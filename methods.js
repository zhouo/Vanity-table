
Meteor.methods({
    // 'insertProduct':function(product){
    //     var item = Products.findOne({"brand":product.brand},{"name":product.name});
    //     if (!Meteor.user()){
    //         return;
    //     }
    //     else if(item) {
    //         return;
    //     }
    //     else {
    //         return Products.insert(product);
    //     }

    // },
    'insertTable':function(table){
        if (!Meteor.user()){
            return;
        }
        else {
            table.createdOn = new Date();
            table.userID = this.userId;
            Tables.insert(table);
        }
        
    },

    'insertWishlist':function(wishlist){
        if (!Meteor.user()){
            return;
        }
        else {
            wishlist.createdOn = new Date();
            wishlist.userID = this.userId;
            Wishlists.insert(wishlist);
        }
        
    },

    'addtoTable':function(product){
        //console.log("add to table event called");
        //console.log(product.tableId);
        var item = Products.findOne({"brand":product.brand},{"name":product.name});
        opendate = moment(product.openedOn).format('YYYY-MM-DD');
        //var datestring = opendate.getFullYear().toString()+
        //console.log(moment(opendate).format('YYYYMMDD'));
        //console.log(opendate);
        valid = product.validity;
        //console.log(valid);
        expiredate = moment(opendate).add(valid, 'month').format();
        product.expiredOn = new Date(expiredate);
        //console.log(product.expiredOn);
        var newproduct = new Object();
        newproduct.name = product.name;
        newproduct.expiredOn = product.expiredOn;
        newproduct.category = product.category;
        newproduct.abbre = product.abbre;
        if (!Meteor.user()){
            return;
        }
        //if the item already in product list
        else if (item){
            //console.log("This product is already in product list");   
            newproduct.id = item._id;
            //console.log(newproduct);
            //console.log(Tables.findOne({_id: product.tableId}).productlist);
            Tables.update({_id: product.tableId},
                {$push:{'productlist': newproduct}},
                {$set: {'updatedOn': new Date()}});
        }
        else {
            console.log("This is a new item")
            if(Meteor.isClient){
                Meteor.subscribe("products");
            }
            Products.insert(product);
            newproduct.id = Products.findOne({"brand":product.brand},{"name":product.name})._id;                  
            Tables.update({_id: product.tableId},
                {$push:{'productlist': newproduct}},
                {$set: {'updatedOn': new Date()}});
                
        }
    },
    'addtoWishlist':function(product){
        //console.log("add to table event called");
        //console.log(product.tableId);
        var item = Products.findOne({"brand":product.brand},{"name":product.name});
        var newproduct = new Object();
        newproduct.name = product.name;
        newproduct.price = product.price;
        newproduct.category = product.category;
        newproduct.abbre = product.abbre;
        if (!Meteor.user()){
            return;
        }
        //if the item already in product list
        else if (item){
            console.log("This product is already in product list");   
            newproduct.id = item._id;
            Wishlists.update({_id: product.wishlistId},
                {$push:{'productlist': newproduct}},
                {$set: {'updatedOn': new Date()}});
        }
        else {
            console.log("This is a new item")
            // if(Meteor.isClient){
            //     Meteor.subscribe("products");
            // }
            Products.insert(product);
            //console.log(product.brand);
            //console.log(product.name);
            //console.log(Products.findOne({"brand":product.brand},{"name":product.name}));
            newproduct.id = Products.findOne({"brand":product.brand},{"name":product.name})._id;                  
            //console.log(newproduct);
            // console.log(Tables.findOne({_id: product.tableId}).productlist);
            Wishlists.update({_id: product.wishlistId},
                {$push:{'productlist': newproduct}},
                {$set: {'updatedOn': new Date()}});
                
        }
    },
    'getSimilarlist':function(productId){
        //console.log(productId);
        similarlist = [];
        if (productId) {
            if (Products.findOne({_id: productId})) {
                category = Products.findOne({_id: productId}).category;
            }
            tablelist = Tables.find({userID: Meteor.userId()});
            tablelist.forEach(function(table){
                table.productlist.forEach(function(p){
                    if (p.category == category){
                        similarlist.push(p);
                    }
                })
            })
        }
        //console.log(similarlist);   
        return similarlist;
    }    
})

Meteor.methods({
    'removeItemfromWishlist':function(productid,listId){
        if (!Meteor.user()){
            return;
        }
        else {
            //console.log("in remove methode, the list Id is "+ listId);
            if (listId){
                console.log(Meteor.userId());
                console.log(Wishlists.findOne({_id:listId}).userID);
                if (Wishlists.findOne({_id:listId}).userID == Meteor.userId()){
                    const productlist = Wishlists.findOne({_id:listId}).productlist;
                    console.log("the old list is" , productlist);
                    console.log("I am removing" , productid);
                    const newlist = productlist.filter(item => item.id != productid
                    //     function(item) {
                    //     console.log("I am removing" + productid);
                    //     return item.id !== productid;
                    // }
                    )
                    console.log("the newlist is" , newlist);
                    Wishlists.update({'_id':listId}, {$set:{'productlist':newlist ,"updatedOn":new Date()}});
                    console.log("update success");
                    console.log(Wishlists.findOne({'_id':listId}));
                }
            }
        }
    },
    'deletewishlist':function(id){
        if (!Meteor.user()){
            return;
        }
        else {
            //console.log(Wishlists.findOne({_id:id}).userID);
            if (Wishlists.findOne({_id:id}).userID = Meteor.userId()){
                Wishlists.remove({_id:id});
            }
        }
    }
})
