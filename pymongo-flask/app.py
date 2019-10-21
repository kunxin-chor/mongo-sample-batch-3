from flask import Flask, render_template, request, redirect, url_for
import os
import pymongo
import re

"""
Connect to Mongo
"""
MONGO_URI = "mongodb+srv://root:asd1234@cluster0-rra3w.mongodb.net/test?retryWrites=true&w=majority"
DATABASE_NAME = "sample_airbnb"

def get_connection():
    conn = pymongo.MongoClient(MONGO_URI)
    return conn

app = Flask(__name__)


@app.route('/')
def index():
    search_terms = request.args.get('search-by')
    country = request.args.get('country')
    must_have = request.args.getlist('must-have')
    
    countries = ["Singapore", "Canada", "New Zealand", "Malaysia", "Ireland"]
    

    search_criteria = {}
    print (search_criteria)
    if search_terms is not None and search_terms is not "":
        search_criteria["name"] = re.compile(r'{}'.format(search_terms), re.I)

    if country != None and country != "Any":
        search_criteria['address.country'] = country 
        
    if len(must_have) > 0:
        search_criteria['amenities'] = {
            '$all' : must_have 
        }
        
    
        
    print (search_criteria)
    # # for display
    # if search_terms is None:
    #     search_terms =""
    
    if search_terms is None:
        search_terms = ""
    
    conn = get_connection()
    cursor = conn[DATABASE_NAME]["listingsAndReviews"].find(search_criteria).limit(10)
    return render_template("index.template.html", results=cursor, 
        search_terms=search_terms, country=country, countries=countries)

# "magic code" -- boilerplate
if __name__ == '__main__':
    app.run(host=os.environ.get('IP'),
            port=int(os.environ.get('PORT')),
            debug=True)