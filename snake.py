from flask import Flask
from flask import render_template
import json




app = Flask(__name__)

@app.route('/')
def root():
    print 2222
    return render_template('run.html')

@app.route('/mobile')
def mobile():
    return render_template('mobile.html', num=readnum()['val'])

@app.route('/getnum')
def getnum():
    resp = readnum()
    return json.dumps(resp)

@app.route('/incnum')
def incnum():
    num = changenum(1)
    return json.dumps(num)

@app.route('/decnum')
def decnum():
    num = changenum(-1)
    return json.dumps(num)

def readnum():
    fobj = file('static/num.json')
    numjson = json.load(fobj)
    return numjson

def changenum(direc):
    numjson = readnum()
    if direc == 1:
        numjson["val"] += 10
    else:
        numjson["val"] -= 10
        if numjson['val'] < 0:
            numjson['val'] = 0
    with open("static/num.json", "w") as fobj:
        json.dump(numjson, fobj, indent = 4)
    return numjson        
    
if __name__ == '__main__':
    app.run()
