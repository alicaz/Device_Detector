//Dectect_Device_type
// (c) 04 01 2019 Aasia Dirie

(function() {
    

var device, hasClass, addClass, removeClass, documentElement, userAgent, find, previousDevice;  

 var platform = document.getElementById('platform');

device = {};

//Add device as global object
window.device = device;
    
    //html element
documentElement = document.body;

userAgent = window.navigator.userAgent.toLowerCase();

// Functions 
//------------

device.ios = function () {
    return device.iphone() || device.ipod() || device.ipad();
  };

  device.iphone = function () {
    return !device.windows() && find('iphone');
  };

  device.ipod = function () {
    return find('ipod');
  };

  device.ipad = function () {
    return find('ipad');
  };

  device.android = function () {
    return !device.windows() && find('android');
  };

  device.androidPhone = function () {
    return device.android() && find('mobile');
  };

  device.androidTablet = function () {
    return device.android() && !find('mobile');
  };

  device.blackberry = function () {
    return find('blackberry') || find('bb10') || find('rim');
  };

  device.blackberryPhone = function () {
    return device.blackberry() && !find('tablet');
  };

  device.blackberryTablet = function () {
    return device.blackberry() && find('tablet');
  };

  device.windows = function () {
    return find('windows');
  };

  device.windowsPhone = function () {
    return device.windows() && find('phone');
  };

  device.windowsTablet = function () {
    return device.windows() && (find('touch') && !device.windowsPhone());
  };


  device.nodeWebkit = function () {
    return typeof window.process === 'object';
  };

  device.mobile = function () {
    return device.androidPhone() || device.iphone() || device.ipod() || device.windowsPhone() || device.blackberryPhone();
  };

  device.tablet = function () {
    return device.ipad() || device.androidTablet() || device.blackberryTablet() || device.windowsTablet();
  };

  device.desktop = function () {
    return !device.tablet() && !device.mobile();
  };

  

    

//Private Utility Functions
//--------------------------

    device.noConflict = function (){
        window.device = previousDevice;
        return this;
    }
    
    find = function(needle){
        return userAgent.indexOf(needle) !== -1;
    };
    
    hasClass = function (className){
        var regex;
        regex = new RegExp(className, 'i');
        return documentElement.className.match(regex);
    };
    
    //add on more CSS classes to the <html> element.
    addClass = function(className){
        if (!hasClass(className)) {
      currentClassNames = documentElement.className.replace(/^\s+|\s+$/g, '');
      documentElement.className = currentClassNames + " " + className;
    }
    };
    
    removeClass = function(className){
        if (hasClass(className)) {
      documentElement.className = documentElement.className.replace("", + className, "");
      
    }
    };

// HTML Element Handling
//------------------------


if(device.ios()){
    if (device.iphone()){
        addClass("ios iphone mobile");
    }else if (device.ipod()){
        addClass("ios ipod mobile");
    }
} else if (device.android()){
    if (device.androidTablet){
        addClass("android tablet");
    }else {
        addClass("android mobile")
    }
} else if (device.windows()){
    if (device.windowsTablet()){
        addClass("windows tablet");
    }else if (device.windowsPhone()){
        addClass("windows mobile");
    } else {
        addClass("desktop")
    }
} else if (device.desktop()){
    addClass("Desktop");
}


    
    }).call(this);
 