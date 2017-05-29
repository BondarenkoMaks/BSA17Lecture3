//1.Write a query to search for all students who score> 87% and <93% for any of the types of completed assignments.
db.getCollection('dataSample').find({scores: {$elemMatch:{$and: [{score:{$gt: 87}}, {score: {$lt: 93}}]}}}, { name: 1, _id : 0, "scores.$": 1 }).sort({"name": 1}).pretty()

//2.Write an aggregation query to select all students who have a test result (type: "exam") of more than 90% (using unwind)
db.getCollection('dataSample').aggregate([{$unwind:"$scores"}, {$match:{"scores.type":'exam',"scores.score":{$gt: 90}}},  {$group:{_id:"$_id", name: {$first: "$name"},scoreMax:{$max:"$scores.score"}}}, {$project:{name: 1, scoreMax: 1, _id: 0}}, {$sort:{"name": 1}}])
/* the same like previous line db.getCollection('dataSample').aggregate([ {$unwind:"$scores"},
											{$match:{"scores.type":'exam',"scores.score":{$gt: 90}}}, 
											{$group:{_id: "$_id", name: {$first: "$name"}, scoreMax:{$max: "$scores.score"}}},
											{$project:{name: 1, scoreMax: 1, _id: 0}},
											{$sort:{"name": 1}}
											])*/
//3.Students with the name Dusti Lemmond add a "accepted" field with a value of true.											
db.getCollection('dataSample').update({name: "Dusti Lemmond"}, {$set: {accepted: true}}, {multi: true})
											
