Products = new Mongo.Collection("products"); 
Reviews = new Mongo.Collection("reviews");
Tables = new Mongo.Collection("tables");
Wishlists = new Mongo.Collection("wishlists");
// set up a schema controlling the allowable
// structure of Products objects

letterlist=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

skincarelist = [{label:"Cleanser", value : "Cleanser"},
        {label:"Toner", value: "Toner"}, 
				{label:"Serum&oil", value: "Serum&oil"},
				{label:"Moisturizer", value: "Moisturizer"}, 
				{label:"Eye cream", value: "Eye cream"},
				{label: "Lip balm", value: "Lib balm"},
				{label:"Mask&Exfoliant", value: "Mask&Exfoliant"},
				{label:"Suncare", value: "Suncare"},
        {label:"Bodycare", value: "Bodycare"}
				]
makeupfacelist = [{label:"Primer", value: "Primer"},
				{label:"Foundation", value:"Foundation"},
				{label:"Concealer", value: "Concealer"},
        {label:"Highlight", value: "Highlight"},
        {label:"Powder", value:"Powder"},
        {label:"Blush&Bronzer", value:"Blush&Bronzer"}	
				]
makeupeyelist = [{label:"Mascara", value : "Mascara"},
        {label:"Lash Enhancer", value: "Lash Enhancer"}, 
        {label:"Eyeliner", value: "Eyeliner"},
        {label:"Brow Enhancer", value: "Brow Enhancer"}, 
        {label:"Eye Shadow", value: "Eye Shadow"},
        ]
makeupliplist = [{label:"Lip Stick", value : "Lip Stick"},
        {label:"Lip Gloss", value: "Lip Gloss"}, 
        {label:"Lipliner", value: "Lipliner"},
        ]
Products.attachSchema(new SimpleSchema({
    _id: {
      type: String,
      autoform:{
        type: "hidden",
        label: false
      },
    optional: true,
    defaultValue: ""
    },
    name: {
        type: String,
        label: "Name",
        max: 200
    },
    brand: {
    	type: String,
    	label: "Brand",
    	max: 200
    },
    abbre: {
      type: String,
      label: "Brand Abbreviation",
      max: 10
    },
    description:{
      type: String,
      label: "Description",
      defaultValue: ""
    },
    category: {
		  type: String,
		  label: "Category",
		  autoform: {
        type: 'select',
        options: [
        { optgroup: "Skincare",
          options: skincarelist
			   },
			   
        { optgroup: "Makeup-face",
          options:makeupfacelist
        },
        { optgroup: "Makeup-Eyes",
          options: makeupeyelist
        },
          
        { optgroup: "Makeup-Lips",
          options: makeupliplist
        },
        {label:"Palettes&Sets", value:"Palettes&Sets"},
        {label:"Nails", value:"Nails"}
			     ]
		    }
	   },
    openedOn: {
        type: Date,
        label: "Open date",
        defaultValue: new Date()
    },
    validity: {
    	  type: Number,
    	  label: "Valid Period(months)",
        defaultValue: 0

    },
    expiredOn: {
    	type: Date,
    	label: "Expire date",
      defaultValue: new Date()
    },

    price: {
      type: Number,
      label: "Price",
      defaultValue: 0
    },

    tableId: {
        type: String,
        autoform: {
            type: "hidden",
            label: false
        },
        defaultValue: '0'
    },

    wishlistId: {
        type: String,
        autoform: {
            type: "hidden",
            label: false
        },
        defaultValue: '0'
    },

    imgaddress: {
    type: String,  
    label: "Image Address",    
    defaultValue: ""
  },
    createdBy:{
      type: String,
      autoform: {
        type: "hidden",
        label: false
      },
      optional: true,
      defaultValue:""
    },
    updatedBy:{
      type: String,
      autoform: {
        type: "hidden",
        label: false
      },
      optional: true,
      defaultValue:""
    },
    createdOn:{
      type: Date,
      autoform: {
        type: "hidden",
        label: false
      },
      optional: true,
      defaultValue: new Date()
    },
    updatedOn:{
      type: Date,
      autoform: {
        type: "hidden",
        label: false
      },
      optional: true,
      defaultValue: new Date()
    },

}));

Wishlists.attachSchema(new SimpleSchema({
  _id: {
    type: String,
    autoform:{
      type: "hidden",
      label: false
    },
    optional: true,
    defaultValue: ""
  },
  name: {
    type: String,
    label: "Name",
    defaultValue: ""
  },
  description: {
    type: String,
    label: "Description",
    defaultValue: ""
  },
  createdOn: {
    type: Date,
    autoform: {
      type: "hidden",
      label: false
    },
    optional: true,
    defaultValue: new Date(),
  },
  updatedOn: {
    type: Date,
    autoform: {
      type: "hidden",
      label: false
    },
    optional: true,
    defaultValue: new Date(),
  },
  userID: {
    type: String,
    autoform: {
      type: "hidden",
      label: false
    },
    optional: true,
    defaultValue: "Anonymous"
  },
  productlist: {
    //(id, price)
    type: Array,
    autoform: {
      type: "hidden",
      label: false
    },
    optional: true,
    defaultValue: []
  },
  'productlist.$': {
    type: Object,
    optional: true,
  },
  'productlist.$.name': {
    type: String,
    optional: true,
  },
  'productlist.$.id': {
    type: String,
    optional: true,
  },
  'productlist.$.abbre': {
    type: String,
    optional: true,
  },
  'productlist.$.price': {
    type: Number,
    optional: true,
  },
  'productlist.$.category': {
    type: String,
    optional: true,
  }
}))

Tables.attachSchema(new SimpleSchema({
  _id: {
    type: String,
    autoform:{
      type: "hidden",
      label: false
    },
    optional: true,
    defaultValue: ""
  },
  name: {
    type: String,
    label: "Name"
  },
  description: {
    type: String,
    label: "Description"
  },
  createdOn: {
    type: Date,
    autoform: {
      type: "hidden",
      label: false
    },
    optional: true,
    defaultValue: new Date(),
  },
  updatedOn: {
    type: Date,
    autoform: {
      type: "hidden",
      label: false
    },
    optional: true,
    defaultValue: new Date(),
  },
  userID: {
    type: String,
    autoform: {
      type: "hidden",
      label: false
    },
    optional: true,
    defaultValue: "Anonymous"
  },
  productlist: {
    //(id,expiredate)
    type: Array,
    autoform: {
      type: "hidden",
      label: false
    },
    optional: true,
    defaultValue: []
  },
  'productlist.$': {
    type: Object,
    optional: true,
  },
  'productlist.$.name': {
    type: String,
    optional: true,
  },
  'productlist.$.id': {
    type: String,
    optional: true,
  },
  'productlist.$.abbre': {
    type: String,
    optional: true,
  },
  'productlist.$.expiredOn': {
    type: Date,
    optional: true,
  },
  'productlist.$.category': {
    type: String,
    optional: true,
  }
}))