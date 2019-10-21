// once we do a use <whatever_database>, the db variable will refer to that database
db.listingsAndReviews.find({
    
}).limit(5).pretty()

// Find all listings that have exactly
// 5 beds
db.listingsAndReviews.find({
    'beds': 5
}, {'address':1, 'beds':1, 'name':1}).limit(5).pretty()

// find 5 beds or more
// SQL: SELECT beds FROM listingsAndReviews WHERE beds >= 4
db.listingsAndReviews.find({
    'beds':{
        $gt:4
    }
}, {'name':1, 'beds':1}).limit(10).pretty()

// find with 5 beds to 10 beds
db.listingsAndReviews.find({
    'beds': {
        '$gt':4,
        '$lt':11
    }
}, {'name':1, 'beds':1}).limit(20).pretty()

db.listingsAndReviews.find({
    'beds':{
        '$gt':4,
        '$lt':11
    },
    'bathrooms':{
        '$gt':1
    }
}, {'name':1, 'beds':1, 'bathrooms':1}).limit(20).pretty()

// Find listings in Canada
db.listingsAndReviews.find({
    'address.country':'Canada'
}, {'name':1, 'address':1}).limit(20).pretty()

// Find listings in Canada that has
// 5 to 10 beds, > 1 bathroom and is in Canada
db.listingsAndReviews.find({
    'beds': {
        $gt:4,
        $lt:11
    },
    'bathrooms':{
        $gt:1
    },
    'address.country':"Canada"
}, {'name':1, 'beds':1, 'bathrooms':1, 'address.country':1}).limit(10).pretty()

// Amenities must have Internet
db.listingsAndReviews.find({
    'amenities':"Internet"
}, {name:1, amenities:1}).limit(10).pretty()

// Amentities must have Internet and Laptop friendly workspace
db.listingsAndReviews.find({
    'amenities': {
        $all: ["Internet", "Laptop friendly workspace", "Wheelchair accessible"]
    }
}, {name:1, amenities:1}).limit(10).pretty()

// Amenities must have Internet OR Wifi
db.listingsAndReviews.find({
    'amenities': {
        $in: ["Internet", "Wifi"]
    }
}, {name:1, amenities:1}).limit(10).pretty();

// Amenities MUST not have Internet or Wifi:
db.listingsAndReviews.find({
    'amenities': {
        $nin: ["Internet", "Wifi"]
    }
}, {name:1, amenities:1}).limit(10).pretty();

///////////// USING sample_mflix database 

db.movies.find({
    'cast': 'Tom Cruise'
}).count()

// Sort by title in ascending order
db.movies.find({
    'cast': 'Tom Cruise'
}, {'title':1, 'cast':1}).sort({'title':1}).pretty()


db.movies.find({
    'cast': 'Tom Cruise'
}, {'title':1, 'cast':1}).sort({'title':-1}).pretty()


db.movies.find({
    'cast': {
        $in:['Tom Cruise', 'Cameron Diaz']
    }
}, {'title':1, 'cast':1}).limit(20).pretty()


db.movies.find({
    'cast': {
        $all:['Tom Cruise', 'Cameron Diaz']
    }
}, {'title':1, 'cast':1}).limit(20).pretty()

// Find titles that contains 'Ring' (case sentitive!)
db.movies.find({
    title:/Ring/
}, {'title':1}).limit(20).pretty()

// find by big R and small R
db.movies.find({
    title:/[Rr]ing/
}, {'title':1}).limit(20).pretty()

// INSERTING A NEW ANIMAL
db.animals.insert({
    name:'Fido',
    breed:'Poddle'
})

db.animals.insert({
    name:'Biscuit',
    breed:'Golden Retriever',
    microchip:'A12345Z'
})

// FIND By ObjectID
db.animals.find({
    _id:ObjectId("5dad3e45ca4b21152a701dee")
})

// Change Biscuit from Golden Retriver to Labouror Retriever
db.animals.update({
    _id:ObjectId("5dad3e45ca4b21152a701dee")
},{
    $set: {
        breed:"Labouror Retriever"
    }
})

// Delete Fido
db.animals.remove({
    _id:ObjectId("5dad3ddaca4b21152a701ded")
})