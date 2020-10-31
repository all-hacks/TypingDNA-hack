import json
from flask import Flask, request
from serve import useless_function, get_classifier_api, get_bst_api
import pandas as pd 

app=Flask(__name__)

@app.route('/')
def hello() :
  return('hello world!')

# Define our "ping" end point
@app.route('/ping')
def useless_output():
  return(useless_function())

# load our pre-trained model & function
classifier_api = get_classifier_api()

# Define a post method for our API.
@app.route('/classify', methods=['POST'])
def classify():
    """ 
    Takes in a json file, extracts the keywords &
    their indices and then returns them as a json file.
    """
    # the data the user input, in json format
    input_data = [pd.Series(json.loads(request.json))]
    
    print (input_data)

    # use our API function to get the keywords
    output_data = classifier_api(input_data)

    print (output_data)
    
    # convert our dictionary into a .json file
    # (returning a dictionary wouldn't be very
    # helpful for someone querying our API from
    # java; JSON is more flexible/portable)
    response = json.dumps(output_data.tolist())

    # return our json file
    return response

bst_api = get_bst_api()

@app.route('/bst', methods=['POST'])
def bst():

    print (request.json)
    print (type(request.json))

    data = request.json.replace("'", '"')

    print(data)
    print (type(data))

    # the data the user input, in json format
    input_data = [pd.Series(json.loads(data))]
    
    print (input_data)
    print (type(input_data))

    # use our API function to get the keywords
    output_data = bst_api(input_data)

    print (output_data)
    print (type(output_data))
    
    # convert our dictionary into a .json file
    response = json.dumps(output_data.tolist())

    # return our json file
    return response

