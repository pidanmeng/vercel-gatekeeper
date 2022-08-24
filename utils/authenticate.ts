import https from 'https';
import qs from 'querystring';

import { CONFIG, CONFIG_LOCAL } from '../constant/config';

function getConfig(local: boolean) {
  const config = local ? CONFIG_LOCAL : CONFIG;
  for (let i in config) {
    let configItem = process.env[i.toUpperCase()] || config[i];
    if (typeof configItem === "string") {
      configItem = configItem.trim();
    }
    config[i] = configItem;
    if (i === 'oauth_client_id' || i === 'oauth_client_secret') {
      console.log(i + ':', config[i], true);
    } else {
      console.log(i + ':', config[i]);
    }
  }
  return config;
}

export function authenticate(code, cb, local = false) {
  let curr_config = getConfig(local);
  let data = qs.stringify({
    client_id: curr_config.oauth_client_id,
    client_secret: curr_config.oauth_client_secret,
    code: code
  });

  let reqOptions = {
    host: curr_config.oauth_host,
    port: curr_config.oauth_port,
    path: curr_config.oauth_path,
    method: curr_config.oauth_method,
    headers: { 'content-length': data.length }
  };

  let body = "";
  let req = https.request(reqOptions, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) { body += chunk; });
    res.on('end', function() {
      cb(null, qs.parse(body).access_token);
    });
  });

  req.write(data);
  req.end();
  req.on('error', function(e) { cb(e.message); });
}