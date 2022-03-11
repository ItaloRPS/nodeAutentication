import {Pool} from 'pg'
const connectionString = 'postgres//xxxxxx:xxxx@kesavan.db.elephantsc.com/jmcnebnv'
const db = new Pool({connectionString})

export default db