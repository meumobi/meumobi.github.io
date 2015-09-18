> db.visitors.find({site_id: 465, devices: {$elemMatch: {$ne: null}}}).count()
> db.visitors.find({devices:{$elemMatch:{uuid: "08408D59-EB33-47F8-9CD7-DC41125E78EE"}}})
db.extensions.update({priority: 1}, {$set:{priority: 0}}, {multi: true})
db.items.update({_id: ObjectId("5566104870179660238b4673")}, {$set:{published: ISODate("2014-12-17T19:34:00Z")}})
db.items.update({_id: 'http://respostassustentaveis.com.br/feed/rss/'}, {$set:{"enabled": true, priority: 1}})

> db.collection.aggregate([{ $group: {_id: { email: "$email" }, uniqueIds: { $addToSet: "$_id" }, count: { $sum: 1 }}}, { $match: { count: { $gte: 2 }}}, { $sort : { count : -1} }, { $limit : 10 }]);
{ "result" : [ ], "ok" : 1 }
>

db.collection.aggregate([{ $group: {_id: { email: "$email" }, uniqueIds: { $addToSet: "$_id" }, count: { $sum: 1 }}}, { $match: { count: { $gte: 2 }}}, { $sort : { count : -1} }, { $limit : 10 }]);

db.items.remove({guid: "http://ri.triunfo.com/Show.aspx?idMateria=Z9aa6YijZ8fqmg/hyFJuaw=="})