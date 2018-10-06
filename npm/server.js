#!/bin/env node

var express   = require('express'),
  path = require("path"),
  axios = require('axios'),
  bodyParser = require('body-parser'),
  env         = process.env;

var NodeApp = function() {
  const self = this;
  const axiosWithBase = axios.create({
    baseURL: 'http://indigo-cloud.ap-southeast-1.elasticbeanstalk.com/medumill/',
    withCredentials: false
  });

  self.setupVariables = function() {
    self.ipaddress = '0.0.0.0';
    self.port      = 8000;
  };

  //All pages will default to index.html
  self.initializePages = function() {
    self.app.post('/api/trigger', function(req, res) {
      const {url, data, cookie} = req.body;
      const config = cookie? {headers: { 'Cookie': cookie }}:{};
      axiosWithBase.post(url, data, config)
      .then(function (response) {
        const responseData = response.data;
        if(response.headers['set-cookie'] && response.headers['set-cookie'][0]) {
          responseData['Cookie'] = response.headers['set-cookie'][0];
        }
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(responseData));
      })
      .catch(function (error) {
        res.writeHead(400, {"Content-Type": "application/json"});
        res.end(JSON.stringify(error));
      });
    });
    self.app.get('/*', function(req, res) {
      res.sendFile(path.join(__dirname, '../public/html/index.html'), function(err) {
        if (err) {
          res.status(500).send(err);
        }
      })
    });
  }

  self.initializeServer = function() {
      self.app = express();
      self.app.use(bodyParser.json());//use
      self.app.use(express.static('public'));
      self.initializePages();
  };

  self.initialize = function() {
      self.setupVariables();
      self.initializeServer();
  };

  self.start = function() {
    self.app.listen(self.port, self.ipaddress, function() {
        console.log('%s: Node server started on %s:%d ...',
                    Date(Date.now() ), self.ipaddress, self.port);
    });
  };
};

var zapp = new NodeApp();
zapp.initialize();
zapp.start();
