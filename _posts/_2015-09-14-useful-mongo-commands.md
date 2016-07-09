

> db.visitors.find({devices:{$elemMatch:{uuid: "08408D59-EB33-47F8-9CD7-DC41125E78EE"}}})
db.extensions.update({priority: 1}, {$set:{priority: 0}}, {multi: true})
db.items.update({_id: ObjectId("5566104870179660238b4673")}, {$set:{published: ISODate("2014-12-17T19:34:00Z")}})
db.items.update({_id: 'http://respostassustentaveis.com.br/feed/rss/'}, {$set:{"enabled": true, priority: 1}})

> db.collection.aggregate([{ $group: {_id: { email: "$email" }, uniqueIds: { $addToSet: "$_id" }, count: { $sum: 1 }}}, { $match: { count: { $gte: 2 }}}, { $sort : { count : -1} }, { $limit : 10 }]);
{ "result" : [ ], "ok" : 1 }
>

db.collection.aggregate([{ $group: {_id: { email: "$email" }, uniqueIds: { $addToSet: "$_id" }, count: { $sum: 1 }}}, { $match: { count: { $gte: 2 }}}, { $sort : { count : -1} }, { $limit : 10 }]);

db.items.remove({guid: "http://ri.triunfo.com/Show.aspx?idMateria=Z9aa6YijZ8fqmg/hyFJuaw=="})

db.items.find({medias:{$elemMatch:{type: "video/mp4"}}})

> db.items.find({parent_id: 7072}).map(function(a) { return a.guid }).sort()

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

# Update a record
> db.items.update({_id: 'http://respostassustentaveis.com.br/feed/rss/'}, {$set:{"enabled": true, priority: 1}})
https://docs.mongodb.org/v3.0/reference/operator/update/set/

# Remove record
> db.items.find({_id: 'http://respostassustentaveis.com.br/feed/rss/'}).remove()
https://docs.mongodb.org/manual/reference/method/db.collection.remove/
