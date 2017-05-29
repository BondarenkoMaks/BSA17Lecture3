//1.Написать запрос для поиска всех студентов, у которых score > 87% и < 93% по любому из типов выполненных заданий.
db.getCollection('dataSample').find({scores: {$elemMatch:{$and: [{score:{$gt: 87}}, {score: {$lt: 93}}]}}}, { name: 1, _id : 0, "scores.$": 1 }).sort({"name": 1}).pretty()

//2.Написать запрос-агрегацию для выборки всех студентов, у которых результат по экзамену (type: "exam") более 90% (использование unwind)
db.getCollection('dataSample').aggregate([{$unwind:"$scores"}, {$match:{"scores.type":'exam',"scores.score":{$gt: 90}}},  {$group:{_id:"$_id", name: {$first: "$name"},scoreMax:{$max:"$scores.score"}}}, {$project:{name: 1, scoreMax: 1, _id: 0}}, {$sort:{"name": 1}}])
/* the same like previous line db.getCollection('dataSample').aggregate([ {$unwind:"$scores"},
											{$match:{"scores.type":'exam',"scores.score":{$gt: 90}}}, 
											{$group:{_id: "$_id", name: {$first: "$name"}, scoreMax:{$max: "$scores.score"}}},
											{$project:{name: 1, scoreMax: 1, _id: 0}},
											{$sort:{"name": 1}}
											])*/
//3.Студентам с именем Dusti Lemmond добавить поле “accepted” со значением true.											
db.getCollection('dataSample').update({name: "Dusti Lemmond"},{$set: {accepted: true}}, {multi: true})
											
