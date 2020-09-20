var config = {
  mode: "fixed_servers",
  rules: {
    proxyForHttp: {
      scheme: "socks5",
      host: "198.148.118.7",
      port: 3128
    },
    proxyForHttps: {
      scheme: "socks5",
      host: "198.148.118.7",
      port: 3128
    },
    bypassList: ["abc.com"]
  }
};
function storeProxySettings(keyName) {
  chrome.proxy.settings.get({ incognito: false }, function(config) {
    localStorage[keyName + "_proxy_settings"] = JSON.stringify(config);
  });
}

chrome.runtime.onInstalled.addListener(function() {
  console.log("Installed.");
  storeProxySettings("previous");
});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == "enableProxy") {
    chrome.browserAction.setBadgeText({ text: "ON" });

    chrome.proxy.settings.set({ value: config, scope: "regular" }, function() {
      console.log("successfly set new proxy");
    });
    storeProxySettings("current");
  } else if (request.action == "disableProxy") {
    chrome.browserAction.setBadgeText({ text: "OFF" });
  }
});

// var config = {
//   mode: "pac_script",
//   pacScript: {
//     data: "function FindProxyForURL(url, host) {\n console.log(url,host);" +
//            " if(host=='whatismyipaddress.com'){ return DIRECT;}else{return 'PROXY  203.176.129.69:8080';\n};" +
//            "}"
//   }
// };
// chrome.proxy.settings.set(
//     {value: config, scope: 'regular'},
//     function() {
//       console.log("hello enabled")
//     });
