let dbmgr = require("./dbmgr")
var db = dbmgr.db

exports.getNames = () => {
    const query = "SELECT name FROM games"
    let statement = db.prepare(query)
    let result = statement.all()
    return result
}