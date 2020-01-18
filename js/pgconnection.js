const Pool = require('pg').Pool;

module.exports.connect=(user,database_name="master_config")=>{
  var pool=new Pool({
    user:user.user,
    host:user.host,
    database:database_name,
    password:user.password,
    port:user.port
  });
  return pool;
}
module.exports.getOfdb=(sql,database_name="master_config",user,callback,error)=>{
  var pool=new Pool({
    user:user.user,
    host:user.host,
    database:database_name,
    password:user.password,
    port:user.port
  });
  pool.query(sql,(err,result)=>{
    if(err){
      error(err);
    }else{
      callback(result.rows);
    }
  });
}
module.exports.excute=(sql,database_name="master_config",user,callback,error)=>{
  var pool=new Pool({
    user:user.user,
    host:user.host,
    database:database_name,
    password:user.password,
    port:user.port
  });
  pool.query(sql,(err,result)=>{
    if(err){
      error(err);
    }else{
      callback(result);
    }
  });
}