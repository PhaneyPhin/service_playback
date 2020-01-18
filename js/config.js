/**
 * New node file
 */
function getconfigdb(callback) {


	var config = {
		"my_db":
			{
				"host": "203.151.232.148",
				"port": "3306",
				"user": "root",
				"pws": "passw0rd"
			},
		"mongo_db":
			{
				"host": "203.151.232.148",
				"port": "27017",
				"db": "Master_temp",
				"collection": "passw0rd"
			},
		"pg_db":
			{
				"host": "203.151.232.148",
				"port": "5432",
				"user": "test",
				"pws": "test",
				"dbname": "dbu_100001"
			},
		"mail":
			{
				"host": "203.107.132.147",
				"port": "80",
				"user": "testptt2@dtcgps.com",
				"pws": "testptt2",
				"dbname": "dbu_100001",
				"mail_tcp": "ptt147_node1@dtcgps.com",
				"limit_rec": 1000,
				"time_node": 5000
			},
		"version": {
			"id": "version 2014.03.07.03"
		}

	};

	var config2 = {
		"my_db":
			{
				"host": "203.151.232.150",
				"port": "3306",
				"user": "root",
				"pws": "passw0rd"
			},
		"mongo_db":
			{
				"host": "203.151.232.150",
				"port": "27017",
				"db": "Master_temp",
				"collection": "thong_data"
			},
		"pg_db": {
			"host": "127.0.0.1",//"203.154.32.155",//"203.151.4.6", //"58.181.246.64", //"127.0.0.1", //
			"port": "5432",
			"user": "postgres",//"webapp",//"webapp",
			"pws": "db@tcp28",//"testserver@yazaki02",//"nodeserver@dtc01",//"webtcp",//"webtcp",
			"database": "master_config"
		},
		// "pg_db":{
		// 	"host": "203.154.243.70",//"203.154.32.155",//"203.151.4.6", //"58.181.246.64", //"127.0.0.1", //
		// 	"port": "5432",
		// 	"user": "postgres",//"webapp",//"webapp",
		// 	"pws": "testserver@yazaki02",//"testserver@yazaki02",//"nodeserver@dtc01",//"webtcp",//"webtcp",
		// 	"database": "master_config"
		// },
		"mail":
			{
				"host": "203.107.132.147",
				"port": "80",
				"user": "testptt2@dtcgps.com",
				"pws": "testptt2",
				"dbname": "dbu_100001",
				"mail_tcp": "ptt147_node1@dtcgps.com",
				"limit_rec": 1000,
				"time_node": 5000
			},
		"version": {
			"id": "version 2014.03.07.03"
		}

	}

	var config3 = {
		"my_db":
			{
				"host": "203.151.232.148",
				"port": "3306",
				"user": "root",
				"pws": "passw0rd"
			},
		"mongo_db":
			{
				"host": "203.151.94.69",
				"port": "27017",
				"db": "Master_temp",
				"collection": "passw0rd"
			},
		"pg_db":
			{
				"host": "203.151.94.69",
				"port": "5432",
				"user": "postgres",
				"pws": "postgresweb2014",
				"dbname": "dbu_100001"
			},
		"mail":
			{
				"host": "203.107.132.147",
				"port": "80",
				"user": "testptt2@dtcgps.com",
				"pws": "testptt2",
				"dbname": "dbu_100001",
				"mail_tcp": "ptt147_node1@dtcgps.com",
				"limit_rec": 1000,
				"time_node": 5000
			},
		"version": {
			"id": "version 2014.03.07.03"
		}

	};



	if (GLOBAL.config == "cpac" || GLOBAL.config == "tpi") {
		callback(config3);
		return;
	}
	callback(config2);
	return;


}
exports.getconfigdb = getconfigdb;



function getconfigreport(callback) {
	var mintime = 120000;
	var maxtime = 150000;

	var temptime = Math.floor(Math.random() * (maxtime - mintime + 1)) + mintime;

	var config = {

		"timereport": temptime
	};
	callback(config);
	return;
}
var momentaConfig = {
	my_db: {
		host: "202.149.98.139",
		user: "webapp",
		port: "3306",
		password: "webtcp",
		database: "config_blackbox",
		insecureAuth: true
	},
	pg_db: {
		host: "203.154.32.155",//"203.154.32.155",//"203.151.4.6", //"58.181.246.64", //"127.0.0.1", //
		port: "5432",
		user: "postgres",//"webapp",//"webapp",
		password: "db@cctv155",//"testserver@yazaki02",//"nodeserver@dtc01",//"webtcp",//"webtcp",
		database: "master_config"
	}

}
exports.momentaConfig = () => {
	return momentaConfig;
}

var connectionString = {
	// host: "61.91.5.28",//"203.154.32.155",//"203.151.4.6", //"58.181.246.64", //"127.0.0.1", //
	// port: "5432",
	// user: "postgres",//"webapp",//"webapp",
	// password: "db@tcp28",//"testserver@yazaki02",//"nodeserver@dtc01",//"webtcp",//"webtcp",
	// database: "master_config"
		"host": "203.154.243.70",//"203.154.32.155",//"203.151.4.6", //"58.181.246.64", //"127.0.0.1", //
		"port": "5432",
		"user": "postgres",//"webapp",//"webapp",
		"password": "testserver@yazaki02",//"testserver@yazaki02",//"nodeserver@dtc01",//"webtcp",//"webtcp",
		"database": "master_config"
}
exports.connectionString = () => {
	return connectionString;
}



exports.getconfigreport = getconfigreport;



