var express = require('express');
var router = express.Router();
var request = require('request')
var momenta = "master_config"
var ms_config = 'master_config';
var config = require('../js/config.js')
var pgcon = require('../js/pgconnection')
var async = require('async');
var moment = require('moment');
var count=0;
var global = require("../js/global.json");
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get("/live_view",(req,res)=>{
  var {device_id,channel,username,password}=req.query;
    if(password!=undefined){
      password=password.toUpperCase();
    }
    var url=`${global.host}/live/${device_id}@${Math.pow(2,channel-1)}/${username}/${password}`;
    console.log(url);
    res.render('channel',{url:url})

  
  // res.send(req.query);
})
router.get('/playback', function (req, res, next) {
  var { device_id, date,username,password } = req.query;
  var playback = date;
  var date = new Date(date);

  playback_date = new Date(playback.substring(0, 10))
  playback_date.setHours(playback_date.getHours() - 7)

  playback_date = playback_date.getTime() / 1000;
  count=count++;
  count=count%100;
  var options = {
    method: 'POST',
    url: global.host+'/api/record',
    headers:
    {

      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form:
    {
      username: global.username,
      password: global.password,
      deviceid: device_id,
      date: playback_date
    }
  };
  date.setHours(date.getHours() + 7)
      res.send({
        hasData: true,
        url: `${global.host}:${global.port}/getplayback?username=${username}&password=${password}&device_id=${device_id}&timestamp=${(new Date().getTime()%1000000)}&date=${date.toISOString()}`

   })



})

router.get('/record_data',(req,res)=>{
  var { device_id, date,username,password } = req.query;
  var playback = date;
  // var date = new Date(date);
  var playback_date=moment(date).unix();
  // playback_date = new Date(playback.substring(0, 10))
  // playback_date.setHours(playback_date.getHours() - 7)
  // playback_date = playback_date.getTime() / 1000;

  var options = {
    method: 'POST',
    url: global.host+'/api/record',
    headers:
    {

      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form:
    {
      username: username,
      password: password,
      deviceid: device_id,
      date: playback_date
    }
  };
  // date.setHours(date.getHours() + 7)
  //     res.send({
  //       hasData: true,
  //       url: `${global.host}:${global.port}/getplayback?device_id=${device_id}&timestamp=${new Date().getTime()}&date=${date.toISOString()}`

  //  })
  request(options, function (error, response, body) {
    if (error) {
      res.send({code:-1,message:"can't load data"});
    }else{
      body = JSON.parse(body);

      res.send(body);
    }
    
    
  });

})
router.get("/getplaybacksdcard",(req,res)=>{
  var {device_id,date,username,password}=req.query;

  res.render('index',{url:`http://203.150.210.31/playback/${device_id}/2/${new Date(date).toISOString()}+0700/${username}/${password}`})
})
router.get('/playbacksdcard', function (req, res, next) {
  var { device_id, date,username,password } = req.query;
  var playback = date;
  var date = new Date(date);

  playback_date = new Date(playback.substring(0, 10))
  playback_date.setHours(playback_date.getHours() - 7)

  playback_date = playback_date.getTime() / 1000;

  date=new Date(date.setHours(date.getHours()+7));

  res.send({
    hasData:true,
    url: `${global.host}:${global.port}/getplaybacksdcard?device_id=${device_id}&date=${date.toISOString()}&username=${username}&password=${password}`
  })
 
})


router.get("/playsdcard",(req,res)=>{
  var {deviceid,username,password}=req.query;
  var options = {
    method: 'POST',
    url: global.host+'/api/recordlist',
    headers:
    {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form:
    {
      username: global.username,
      password: global.password,
      deviceid: deviceid,
    }
  };
  request(options, function (error, response, body) {
    //console.log(body);
    if (error) {
      res.status(500).send(error);
    }else{
      body = JSON.parse(body);
      res.send(body);
    }
  });
})
router.get('/test', (req, res, next) => {
  var pool = pgcon.connect(config.momentaConfig().pg_db);
  pool.query(`select * from camera_config`, (err, result, fields) => {
    res.send(result.rows);
  })
})
router.get('/getplayback', function (req, res) {
  var { device_id, timestamp, date,username,password } = req.query;
  
  res.render('index', { url: `${global.host}/playback/${device_id}@15/${timestamp}/${date}+0700/${username}/${password}` })
})
router.get("/getplayback_channel",(req,res)=>{
  var { device_id, timestamp, date,channel,username,password } = req.query;
  console.log(req.query);
  res.render('channel', { url: `${global.host}/playback/${device_id}@${Math.pow(2,parseInt(channel)-1)}/${timestamp}/${date}+0700/${username}/${password}` })
})
router.get("/getplaybacksdcard_channel",(req,res)=>{
  var { device_id, date,channel,username,password } = req.query;
  res.render('channel', { url: `${global.host}/playback/${device_id}@${Math.pow(2,channel-1)}/2/${new Date(date).toISOString()}+0700/${username}/${password}` })
})
router.get("/playback_channel",(req,res)=>{
  var { device_id, date,channel,username,password } = req.query;
  var playback = date;
  var date = moment(date).format("YYYY-MM-DDTHH:mm:ss");

  playback_date = new Date(playback.substring(0, 10))
  playback_date.setHours(playback_date.getHours() - 7)

  playback_date = playback_date.getTime() / 1000;
  count=count++;
  count=count%100;
 /* postData(global.host+'/api/record',{
    username: global.username,
    password: global.password,
    deviceid: device_id,
    date: playback_date
  }).then((result)=>{
    if (result[date.getHours() * 60 + date.getMinutes()] == 1) {
      date.setHours(date.getHours() + 7)
      
    } else {
      res.send({ hasData: false })
    }
  })*/
  res.send({
        hasData: true,
        url: `${global.host}:${global.port}/getplayback_channel?channel=${channel}&device_id=${device_id}&timestamp=${new Date().getTime()%1000000}&date=${date}&username=${username}&password=${password}`

      })

})
router.get("/playbacksdcard_channel",(req,res)=>{
  var { device_id, date,channel,username,password } = req.query;
  var date = new Date(date);
  date.setHours(date.getHours() + 7)
  res.send({
    hasData: true,
    url: `${global.host}:${global.port}/getplaybacksdcard_channel?channel=${channel}&device_id=${device_id}&date=${date.toISOString()}&username=${username}&password=${password}`

  })

})

router.get('/getActionInformation', function (req, res) {
  var action = []
  var i = 1;
  var sql = `SELECT action_id, description FROM action_information ORDER BY action_id ASC;`
  pgcon.getOfdb(sql, momenta, config.momentaConfig().pg_db, function (data) {
    if (data.length > 0) {
      async.eachSeries(data, function (each_truck, nexttruck) {
        var act = {
          "number": i++,
          "action_id": each_truck.action_id,
          "description": each_truck.description
        }
        action.push(act);
        nexttruck();
      }, function () {
        res.send(action)
      })
    } else {
      res.send([])
    }
  })
})
router.get('/get_camera_notification', function (req, res) {
  var { device_id, time } = req.query;
  device_id = "SP001016";
  //console.log(new Date().toISOString())
  var type = time.substr(-2);

  if (type == 'AM') {
    time = time.substring(0, time.length - 2);
    time = new Date(time).toISOString().substring(0, 10) + " " + new Date(time).toISOString().substring(11, 19)
  } else {
    time = time.substring(0, time.length - 2);
    var date = new Date(time);
    date.setHours(date.getHours() + 12);
    time = new Date().toISOString().substring(0, 10) + " " + new Date().toISOString().substring(11, 19)
  }



  var sql = `select imei,email from camera_config c where c.camera_id='${device_id}'`;
  pgcon.getOfdb(sql, momenta, config.momentaConfig().pg_db, data => {
    if (data.length > 0) {
      data = data[0];
      var { imei, email } = data;
      var db;
      if (email == null) {
        db = "no_config";
      } else {
        db = email;
      }
      var arrdata = [];

      var sql = `SELECT * FROM camera_config
                          where imei = '${imei}'
                      `;
      pgcon.getOfdb(sql, momenta, config.momentaConfig().pg_db, (cameras) => {

        if (cameras.length > 0) {
          async.eachSeries(cameras, function (each_data, nextdata) {
            var body = {
              "blackbox_id": each_data.blackbox_id,
              "r_time": `${moment(each_data.timestamp).format("YYYY-MM-DD HH:mm:ss")}`
            }
            request({
              url: 'http://www.dtcgps.com:8080/get_driver_name_truck_group',
              method: 'POST',
              json: true, //โคตรสำคัญ
              KeepAlive: false,
              accept: 'application/json',
              protocolVersion: 'HttpVersion.Version10',
              contentType: 'application/json; charset=UTF-8',
              rejectUnauthorized: false,
              PreAuthenticate: true,
              body: body
            }, function (error, response, body) {
              //   //console.log(cameras);
              if (error) {
                //console.log("1", cameras)
                nextdata();
              } else {
                if (response.statusCode == 200) {

                  var sql = `
                                  select speed,url,warning_type,"timestamp" from history_camera h1 
                                  inner join medias_camera m1 on h1.id=m1.id
                                  where m1."imei"='${imei}' and "timestamp" in (
                                      select s2.timestamp from(
                                          select min(timestamp) as timestamp from (select abs((DATE_PART('day', h."timestamp"::timestamp - '${time}'::timestamp) * 24 + 
                                                      DATE_PART('hour', h."timestamp"::timestamp - '${time}'::timestamp)) * 60 +
                                                      DATE_PART('minute', h."timestamp"::timestamp - '${time}'::timestamp)) * 60 +
                                                      DATE_PART('second', h."timestamp"::timestamp - '${time}'::timestamp) as timestamp
                                                  from medias_camera m inner join 
                                                          history_camera h on h.id=m.id
                                          where m.imei='${imei}'
                                          ) as s 
                                      ) s1 inner join (
                                          select abs((DATE_PART('day', h."timestamp"::timestamp - '${time}'::timestamp) * 24 + 
                                                      DATE_PART('hour', h."timestamp"::timestamp - '${time}'::timestamp)) * 60 +
                                                      DATE_PART('minute', h."timestamp"::timestamp - '${time}'::timestamp)) * 60 +
                                                      DATE_PART('second', h."timestamp"::timestamp - '${time}'::timestamp) as time,timestamp
                                                  from medias_camera m inner join 
                                                          history_camera h on h.id=m.id
                                          where m.imei='${imei}'
                                      ) s2 on s1."timestamp"=s2.time
                                  )
                                  `;
                  //console.log(sql);
                  pgcon.getOfdb(sql, db, config.momentaConfig().pg_db, data => {
                    //console.log(data);
                    if (data.length > 0) {

                      var { speed, url, warning_type, timestamp } = data[0];
                      var sql = `select * from warning_type where status_value='${warning_type}'`;

                      pgcon.getOfdb(sql, momenta, config.momentaConfig().pg_db, data => {
                        //console.log(data);
                        if (data.length > 0) {

                          var s = {
                            "truck_name": each_data.plate_number,
                            "truck_group": body.truck_group_name,
                            "time": moment(timestamp).format("YYYY-MM-DD HH:mm:ss"),
                            "url": url == null ? "" : url,
                            "status_nameth": data[0].status_nameth,
                            "status_nameen": data[0].status_nameen,
                            "driver_name": body.driver_name,
                            "speed": speed,
                            "location": each_data.tambol == null ? "" : each_data.tambol + " " + each_data.amphur + " " + each_data.province,
                            "imei": imei
                          }
                          arrdata.push(s)
                          nextdata();
                        } else {
                          //console.log(camera)
                          nextdata();
                        }
                      })
                    } else {
                      ////console.log(camera)
                      nextdata();
                    }
                  });

                } else {
                  //console.log(cameras);
                  nextdata();
                }
              }
            });
          }, function () {
            if (arrdata.length > 0) {
              res.send({ hasError: false, data: arrdata });
            } else {
              res.send({ hasError: true })
            }
          });

        } else {
          res.send({ hasError: true })
        }
      })
    } else {
      res.send({ hasError: true })
    }
  })
});
router.get("/SaveInformationNotification", function (req, res) {
  var command = {
    "command": ""
  }
  var employee_id = req.query["employee_id"];
  var action_id = req.query["action_id"];
  var driver_name = req.query["driver_name"];
  var remark = remark == undefined ? '' : req.query["remark"];
  var remark = remark == 'undefined' ? '' : remark;
  var time = req.query["time"];
  var imei = req.query["imei"];
  var now = moment().format("YYYY-MM-DD HH:mm:ss")
  if (employee_id != undefined && action_id != undefined && time != undefined && imei != undefined) {
    var sqlupdate = `UPDATE notification SET employee_id = '${employee_id}', action_id = '${action_id}', remark = '${remark}', driver_name = '${driver_name}',action_time = '${now}' WHERE timestamp = '${time}' AND imei = '${imei}';`
    pgcon.excute(sqlupdate, momenta, config.momentaConfig().pg_db, function (r2) {
      if (r2 == "ok") {
        command.command = "ok"
        res.send(command)
      } else {
        command.command = "ER"
        res.send(command)
      }
    })
  } else {
    command.command = ER;
    res.send(command)
  }
})

router.get('/getEmployeeInformation', function (req, res) {
  var employee = []
  var i = 1;
  var sql = `SELECT employee_id,employee_fullname,mobile,email FROM employee_information ORDER BY employee_id ASC;`
  pgcon.getOfdb(sql, momenta, config.momentaConfig().pg_db, function (data) {
    if (data.length > 0) {
      async.eachSeries(data, function (each_truck, nexttruck) {
        var emp = {
          "number": i++,
          "employee_id": each_truck.employee_id,
          "employee_fullname": each_truck.employee_fullname,
          "mobile": each_truck.mobile,
          "email": each_truck.email
        }
        employee.push(emp);
        nexttruck();
      }, function () {
        res.send(employee)
      })
    } else {
      res.send([])
    }
  },err=>{
    res.send([])
  })
})
router.post('/gkdevice/alllist', (req, res) => {

  postData(`${global.host}/gkdevice/alllist`, req.body).then((result) => {

    res.send(result);
  }, err => {
    res.send({ hasError: true })

  })
})
router.get('/alldevice', (req, res) => {

  postData(`${global.host}/gkdevice/alllist`,req.query).then((result) => {

    res.send(result);
  }, err => {
    res.send({ hasError: true })

  })
})
router.post("/gkevent/eventquery",(req,res)=>{
  postData(`${global.host}/gkevent/eventquery`,req.body).then(result=>{
    res.send((result));
  },err=>{
    res.send({hasError:true})
  })
})
router.post('/api/record',(req,res,next)=>{
  
  postData(`${global.host}/api/record`,req.body).then(result=>{
    res.send((result));
  },err=>{
    res.send({hasError:true})
  })
})

router.post("/gkevent/eventdefine",(req,res)=>{
  getData(`${global.host}/gkevent/eventdefine`).then(result=>{
    res.send((result));
  },err=>{
    res.send({hasError:true})
  })
})
// router.post('/api/record',(req,res,next)=>{
  
//   postData(`${global.host}/api/record`,req.body).then(result=>{
//     res.send((result));
//   },err=>{
//     res.send({hasError:true})
//   })
// })
function postData(url, data) {
  return new Promise((resolve, reject) => {
    var options = { method: 'POST',
    url: url,
    headers: 
    { 
      'Content-Type': 'application/x-www-form-urlencoded' },
    form: data 
    };

    //console.log(options);
    request(options, function (error, response, body) {
      //console.log(body);
      //console.log(response)
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(body))
        //console.log(body);
      }


    });

  })
}
function getData(url) {
  return new Promise((resolve, reject) => {
    var options = { method: 'GET',
    url: url,
    headers: 
    { 
      'Content-Type': 'application/x-www-form-urlencoded' }
    };

    //console.log(options);
    request(options, function (error, response, body) {
      //console.log(body);
      //console.log(response)
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(body))
        //console.log(body);
      }


    });

  })
}
module.exports = router;
