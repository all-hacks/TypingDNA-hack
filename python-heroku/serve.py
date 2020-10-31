
import pickle

def useless_function():
    """ 
    A function that returns some text
    """
    return("pong!")

# Function that takes loads in our pickled word processor
# and defines a function for using it. This makes it easy
# to do these steps together when serving our model.
def get_classifier_api():
    
    # read in pickled word processor. You could also load in
    # other models as this step.
    c = pickle.load(open("classifier1.pkl", "rb"))
    
    # Function to apply our model & extract keywords from a 
    # provided bit of text
    def classifier_api(data): 
        pred = c.predict(data)      
        return pred
    
    # return the function we just defined
    return classifier_api

def get_bst_api():
    
    # read in pickled word processor. You could also load in
    # other models as this step.
    c = pickle.load(open("bst.pkl", "rb"))
    
    # Function to apply our model & extract keywords from a 
    # provided bit of text
    def bst_api(data): 
        pred = c.predict(data)      
        return pred
    
    # return the function we just defined
    return bst_api
