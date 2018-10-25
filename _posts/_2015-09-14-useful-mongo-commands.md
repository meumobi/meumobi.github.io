db.items.find({"medias": { $elemMatch: {"type": "application/pdf", "thumbnails": {$size: 0} }}, site_id: {$nin: [61, 62, 63, 64]}},{"medias": 1}).limit(100).toArray()


db.skins.update({url: /embraerwf/}, {$set: {tokens:{"contact_screen_title": "Fala com a comunicação interna"}}})

db.skins.update({_id: ObjectId("57d9dd439a645dcf774a7b7d")}, {$set: {layout_alternatives:{"tab_2 (Category Id)": 7263}, colors:{defaultBg:"#FF8C04"}, main_color: "FF8C04", thumbnails: ["/images/themes/infomobi-1.png"], assets: {android_custom_icon:"/images/themes/infomobi-1.png"}}})

, {colors:{defaultBg:"#FF8C04"}}


> db.collection.aggregate([{ $group: {_id: { email: "$email" }, uniqueIds: { $addToSet: "$_id" }, count: { $sum: 1 }}}, { $match: { count: { $gte: 2 }}}, { $sort : { count : -1} }, { $limit : 10 }]);

> db.visitors.find({devices:{$elemMatch:{uuid: "08408D59-EB33-47F8-9CD7-DC41125E78EE"}}})

> db.visitors.find({site_id: 465, devices: {$elemMatch: {$ne: null}}}).count()
17



> db.extensions.update({_id: ObjectId("55e7676770179644338b4567")}, {$set:{priority: 1}})

> db.items.update({_id: ObjectId("5566104870179660238b4673")}, {$set:{published: ISODate("2014-12-17T19:34:00Z")}})

> db.items.update({_id: 'http://respostassustentaveis.com.br/feed/rss/'}, {$set:{"enabled": true, priority: 1}})

> db.collection.aggregate([{ $group: {_id: { email: "$email" }, uniqueIds: { $addToSet: "$_id" }, count: { $sum: 1 }}}, { $match: { count: { $gte: 2 }}}, { $sort : { count : -1} }, { $limit : 10 }]);
{ "result" : [ ], "ok" : 1 }
>

db.collection.aggregate([{ $group: {_id: { email: "$email" }, uniqueIds: { $addToSet: "$_id" }, count: { $sum: 1 }}}, { $match: { count: { $gte: 2 }}}, { $sort : { count : -1} }, { $limit : 10 }]);

db.items.remove({guid: "http://ri.triunfo.com/Show.aspx?idMateria=Z9aa6YijZ8fqmg/hyFJuaw=="})

db.items.find({medias:{$elemMatch:{type: "video/mp4"}}})

> db.items.find({parent_id: 7072}).map(function(a) { return a.guid }).sort()

# List all collections
`> db.getCollectionNames()`

# Join queries

```
var extensions = db.extensions.find({url: {$ne:""}, import_mode: "exclusive"})
extensions.forEach(function(e,i) {
  var count = db.items.find({parent_id: e.category_id}).count();
  if (count > 50) {
    print(e.category_id + ": " + count);
  }
})
```

var results = db.items.find({ "_id" : ObjectId("5ab50cea9a645dd0787b23c6")}, {results:1})
results.results.forEach(function(e,i) {
	var user = db.visitors.findOne({_id: new ObjectId(e.user_id)});
	print (user.first_name + ", " + user.last_name + ", " + e.values.hasOwnProperty("1"));
})

	var user = db.visitors.find({_id: e.user_id});
	print (user.first_name + ", " + user.last_name + ", " + e.values.hasOwnProperty("1"));

# How to update multiple documents
For version 2.0.x
do a multi update by passing true as the fourth argument to update(), where the the third argument is the upsert argument:
> db.extensions.update({priority: 1}, {$set:{priority: 0}}, false, true)
Source: https://stackoverflow.com/a/1740258/4982169

# Retrieve queried element in an object array of collection
db.items.find({site_id: 66, "medias.url": {$exists: true}}, {"medias.url":1})

# Find MongoDB records where array field is not empty
db.visitors.find({devices: {$exists: true, $ne: []}})

db.items.find({site_id: 29, medias: {$elemMatch: {thumbnails: {$ne: []}}}})

db.items.find({site_id: 29, medias: {$elemMatch: {url: "http://www.ri.santander.com.br/download.aspx?Arquivo=67CWtB5CQxyvSzzhyMtlbA=="}}})

# Ascending/Descending Sort
Specify in the sort parameter the field or fields to sort by and a value of 1 or -1 to specify an ascending or descending sort respectively.
The following query specifies a sort on the published field in descending order.
db.items.find({parent_id: 10}).sort({published: -1})

The following query specifies the sort order using the fields from an embedded document item. The query sorts first by the category field in ascending order, and then within each category, by the type field in ascending order.

db.orders.find().sort( { "item.category": 1, "item.type": 1 } )
https://docs.mongodb.org/manual/reference/method/cursor.sort/

# How to query mongodb with “like”?
db.users.find({name: /a/})  //like '%a%'
out: paulo, patric

db.users.find({name: /^pa/}) //like 'pa%' 
out: paulo, patric

db.users.find({name: /ro$/}) //like '%ro'
db.items.find({title: /Banco do Brasil/, parent_id: 7197}, {title: 1})

db.visitors.find({devices:{$elemMatch:{model: /GT/}}})

want the query to be case-insensitive ? use "i" option, like shown below:

db.users.find({name: /ro$/i})

# How to query mongodb with “Not like”?
> db.visitors.find({email: {$not: /@katrium.com.br/}, site_id: 515})

# Create a record
db.devices.insert({uuid: "ad7fbf51-e79b-e0bb-3557-100604818638", push_id: "APA91bF3sHo0D2TqM0bfu9PXHRpHCt7JY4d1pZeY-dkBllBOhfK6xTumA1XWq5zfZ8ImJzc51iPkovC6uQO0DiLnTS4xknYuI6rs5yKwroE6GPWeqzYXbApji3vo9FdD7of8rV15cwKD", site_id: 21})

Source: [https://docs.mongodb.com/v3.2/reference/method/db.collection.insert/](https://docs.mongodb.com/v3.2/reference/method/db.collection.insert/)

# Update a record
> db.items.update({_id: 'http://respostassustentaveis.com.br/feed/rss/'}, {$set:{"enabled": true, priority: 1}})
https://docs.mongodb.org/v3.0/reference/operator/update/set/

# Remove record
> db.items.remove({_id: 'http://respostassustentaveis.com.br/feed/rss/'})
https://docs.mongodb.org/manual/reference/method/db.collection.remove/

Source: [https://docs.mongodb.com/v3.2/reference/method/db.collection.remove/](https://docs.mongodb.com/v3.2/reference/method/db.collection.remove/)

# Replace substring in mongodb document

> db.extensions.find({site_id:67}).forEach(function(e,i) {    	e.url=e.url.replace("http","https");
	db.extensions.save(e);
});

db.extensions.find({site_id:62}).forEach(function(e,i) {e.url=e.url.replace("raiadrogasil","rd"); db.extensions.save(e);});

# Differences between NumberLong and simple Integer?
http://stackoverflow.com/questions/17185220/mongodb-differences-between-numberlong-and-simple-integer

db.visitors.update({email: 'victor.dias+sinax@meumobi.com'}, {$set:{"site_id": NumberLong("516")}})

# Get distinct values of property
db.jobs.distinct("type")
db.Article.distinct("Comment.Reply.ip",{"Comment.Reply.email" : "xxx"})


Source: https://stackoverflow.com/a/7427028/4982169

# Duplicate document using new _id
var copy = db.skins.findOne({_id: ObjectId("57f38f929a645d4e02ffe230")}, {_id:0});
db.skins.insert(copy);

with {_id: 0} the _id is not fetched

Source: https://stackoverflow.com/a/25825788/4982169

# How to get mongo command results in to a flat file

$ mongo db < script.js > output.txt

Source: https://stackoverflow.com/a/30507038/4982169

# select where in array of _id?
db.collection.find( { _id : { $in : [1,2,3,4] } } );

$in is like OR and $all like AND. Check this : https://docs.mongodb.com/manual/reference/operator/query/all/
db.collection.find( { _id : { $all : [1,2,3,4] } } );

# Clean meumobi poll results
db.items.update({"_id" : ObjectId("5b915ebc9a645d933f7b23c6")},{$set:{results:[]}})

