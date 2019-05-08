
Meteor.methods({
    'insertProduct':function(product){
        var item = Products.findOne({"brand":product.brand,"name":product.name});
        //console.log(item);
        if (!Meteor.user() || Meteor.user().username != "admin"){
            return;
        }
        else if(item) {
            alert("This item is already in the database");
            return;
        }
        else {
            product.createdBy = Meteor.user().username;
            Products.insert(product);
            console.log(product._id);
        }

    },
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
        var item = Products.findOne({"brand":product.brand,"name":product.name});
        opendate = moment(product.openedOn).format('YYYY-MM-DD');
        valid = product.validity;
        //console.log(valid);
        expiredate = moment(opendate).add(valid, 'month').format();
        product.expiredOn = new Date(expiredate);
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
            Tables.update({_id: Session.get("tableId")},
                {$push:{'productlist': newproduct}},
                {$set: {'updatedOn': new Date()}});
        }
        else {
            console.log("This is a new item")
            if(Meteor.isClient){
                Meteor.subscribe("products");
            }
            product.createdBy = Meteor.user().username;
            Products.insert(product);
            newproduct.id = Products.findOne({"brand":product.brand,"name":product.name})._id;                  
            console.log(Session.get("tableId"));
            Tables.update({_id: Session.get("tableId")},
                {$push:{'productlist': newproduct}},
                {$set: {'updatedOn': new Date()}});
                
        }
    },
    'addtoWishlist':function(product){
        //console.log("add to table event called");
        //console.log(product.tableId);
        var item = Products.findOne({"brand":product.brand,"name":product.name});
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
            Wishlists.update({_id: Session.get("listId")},
                {$push:{'productlist': newproduct}},
                {$set: {'updatedOn': new Date()}});
        }
        else {
            console.log("This is a new item")
            // if(Meteor.isClient){
            //     Meteor.subscribe("products");
            // }
            product.createdBy = Meteor.user().username;
            Products.insert(product);
            //console.log(product.brand);
            //console.log(product.name);
            //console.log(Products.findOne({"brand":product.brand},{"name":product.name}));
            newproduct.id = Products.findOne({"brand":product.brand,"name":product.name})._id;                  
            //console.log(newproduct);
            // console.log(Tables.findOne({_id: product.tableId}).productlist);
            Wishlists.update({_id: Session.get("listId")},
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
    },
    'getBrandlist':function(){
        BrandList= [];
        var FinalResult = new Array();
        //console.log("orignal finallist is ",FinalResult);
        // var brandResultobject = new Object();
        // brandResultobject.list = [];
        // brandResultobject.first = '';
        if(Products.findOne()){
            productlist=Products.find().fetch();
        }
        else return;
        //console.log("the product list is ",productlist);
        productlist.forEach(function(product){
            if (!BrandList.includes(product.brand)){
                BrandList.push(product.brand);
            }
        });
        BrandList.sort();
        //console.log(BrandList);
        //console.log(letterlist);
        FinalResult = [];
        //console.log("befor loop final result is", FinalResult);
        letterlist.forEach(function(l){
            let brandResultobject = new Object();
            brandResultobject.first = l;
            brandResultobject.list = [];
            BrandList.forEach(function(brand){
                if (brand.charAt(0).toUpperCase() == l){
                    //console.log(l);
                    //console.log(brand.charAt(0).toUpperCase());
                    brandResultobject.list.push(brand);
                }
            })
            // console.log("the result is ", brandResultobject, "for", l);
            // console.log("before push the finallist is ", FinalResult);
            FinalResult.push(brandResultobject);
            // console.log("after",l, "the finallist is" ,FinalResult);
        });
        // console.log(FinalResult);
        return FinalResult;
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
                //console.log(Meteor.userId());
                //console.log(Wishlists.findOne({_id:listId}).userID);
                if (Wishlists.findOne({_id:listId}).userID == Meteor.userId()){
                    const productlist = Wishlists.findOne({_id:listId}).productlist;
                    //console.log("the old list is" , productlist);
                    //console.log("I am removing" , productid);
                    const newlist = productlist.filter(item => item.id != productid
                    //     function(item) {
                    //     console.log("I am removing" + productid);
                    //     return item.id !== productid;
                    // }
                    )
                    //console.log("the newlist is" , newlist);
                    Wishlists.update({'_id':listId}, {$set:{'productlist':newlist ,"updatedOn":new Date()}});
                    //console.log("update success");
                    //console.log(Wishlists.findOne({'_id':listId}));
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
    },
    'editwishlist':function(list){
        if (!Meteor.user()){
            return;
        }
        else {
            //console.log(Wishlists.findOne({_id:list._id}));
            if (Wishlists.findOne({_id:list._id}).userID = Meteor.userId()){
                Wishlists.update({_id:list._id}, {$set:{
                    name:list.name,
                    description: list.description,
                    updatedOn: new Date()}});               
            }
        }
    },
    'deletetable':function(id){
        if (!Meteor.user()){
            return;
        }
        else {
            //console.log(Wishlists.findOne({_id:id}).userID);
            if (Tables.findOne({_id:id}).userID = Meteor.userId()){
                Tables.remove({_id:id});
            }
        }
    },
    'edittable':function(table){
        if (!Meteor.user()){
            return;
        }
        else {
            //console.log(Tables.findOne({_id:table._id}));
            if (Tables.findOne({_id:table._id}).userID = Meteor.userId()){
                Tables.update({_id:table._id}, {$set:{
                    name:table.name,
                    description: table.description,
                    updatedOn: new Date()}});               
            }
        }
    },
    'deleteproduct':function(id){
        if (!Meteor.user()){
            return;
        }
        else if (Meteor.user().username == "admin"){
            //console.log(Wishlists.findOne({_id:id}).userID);
            Products.remove({_id:id});
            }
    },
    'admineditproduct':function(product){
        if (!Meteor.user()){
            return;
        }
        else if(Meteor.user().username == "admin"){
            //console.log(Wishlists.findOne({_id:list._id}));
            if (Products.findOne({_id:product._id})){
               Products.update({_id:product._id}, {$set:{
                    name:product.name,
                    brand:product.brand,
                    abbre: product.abbre,
                    description: product.description,
                    imgaddress: product.imgaddress,
                    category: product.category,
                    price: product.price,
                    updatedBy: Meteor.user().username,
                    updatedOn: new Date()}});               
            }
        }
        $('#admineditproductform').addClass("hidden");
    }
})
