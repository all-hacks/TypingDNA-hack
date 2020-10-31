var unirest = require('unirest')

var url = "https://nasa-orix-2020-api.herokuapp.com/bst" 
var data = { "a": 1, "b": 2 }
var d1 = {}

d1['Paid-up Capital'] = 500001
d1['Loan Amount'] = 225250
d1['Loan Tenure'] = 60
d1['Non-Current Assets 2018'] = 1578
d1['Non-Current Assets 2019'] = 1052
d1['Current Assets 2018'] = 804990
d1['Current Assets 2019'] = 1434601
d1['Total Assets 2018'] = 806568
d1['Total Assets 2019'] = 1435653
d1['Current Liabilities 2018'] = 300929
d1['Current Liabilities 2019'] = 923261
d1['Total Liabilities 2018'] = 300929
d1['Total Liabilities 2019'] = 923261
d1['Share Capital 2018'] = 500000
d1['Share Capital 2019'] = 500000
d1['Retained Earnings 2018'] = 5639
d1['Retained Earnings 2019'] = 12392
d1['Networth 2018'] = 505639
d1['Networth 2019'] = 512392
d1['Revenue 2018'] = 1013733
d1['Revenue 2019'] = 2236303
d1['NPBT 2018'] = 11492
d1['NPBT 2019'] = 10228
d1['NPAT 2018'] = 8554
d1['NPAT 2019'] = 6753
d1['Industry_labels'] = 1

var j

function p(data) {
console.log(data)
j=JSON.stringify(data)
console.log(j)
console.log(JSON.stringify(j))
}

p(d1)

unirest
  .post(url)
  .headers({ 'Content-Type': 'application/json' })
  //.send("\"{ 'a': 1, 'b': 2 }\"")
  .send(JSON.stringify(j))
  .then((res) => {
    console.log(res.body)
  })

