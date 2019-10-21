import pymongo

MONGO_URI = "mongodb+srv://root:asd1234@cluster0-rra3w.mongodb.net/test?retryWrites=true&w=majority"
DATABASE_NAME = "sample_airbnb"

conn = pymongo.MongoClient(MONGO_URI)

"""
db.listingsAndReviews.find({
    
}).limit(5).pretty()
"""

# conn[<DATABASE_NAME>][<COLLECTION>] <-- access a collection
results = conn[DATABASE_NAME]["listingsAndReviews"].find().limit(5)
for each_result in results:
    print("Name:", each_result["name"])
    print("Beds:", each_result["beds"])