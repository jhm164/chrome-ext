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

 var config2 = {
   mode: "pac_script",
   pacScript: {
     data: "function FindProxyForURL(url, host) {\n" +
            "  return DIRECT;" +
            "}"
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
    chrome.proxy.settings.set(
     {value: config2, scope: 'regular'},
     function() {
       console.log("disabled")
     });
  }
});



