setInterval(function() {
        box.worker.generateProduct()
}, 1000);   

    function format(x) {
      let Prefix = ["", "K", "M", "B", "t"];
      let s = Math.sign(x);
      let e = Math.max(0, Math.log(s * x) / Math.log(10));
      let o = 2 - Math.floor(e % 3);
      e = Math.floor(e / 3);
      let m = x / Math.pow(10, e * 3);
      m = Math.trunc(m * Math.pow(10, o)) / Math.pow(10, o);
    
      if (e < Prefix.length) return `${m}${Prefix[e]}`;
      else return `${m}e${e * 3}`;
    }

