import { useEffect } from 'react';

const useCanvasCursor = (containerId, canvasId = 'canvas') => {
  function n(e) {
    this.init(e || {});
  }
  n.prototype = {
    init: function (e) {
      this.phase = e.phase || 0;
      this.offset = e.offset || 0;
      this.frequency = e.frequency || 0.001;
      this.amplitude = e.amplitude || 1;
    },
    update: function () {
      return (
        (this.phase += this.frequency),
        (e = this.offset + Math.sin(this.phase) * this.amplitude)
      );
    },
    value: function () {
      return e;
    },
  };
  function Line(e) {
    this.init(e || {});
  }
  Line.prototype = {
    init: function (e) {
      this.spring = e.spring + 0.1 * Math.random() - 0.02;
      this.friction = E.friction + 0.01 * Math.random() - 0.002;
      this.nodes = [];
      for (var t, n = 0; n < E.size; n++) {
        t = new Node();
        t.x = pos.x;
        t.y = pos.y;
        this.nodes.push(t);
      }
    },
    update: function () {
      var e = this.spring,
        t = this.nodes[0];
      t.vx += (pos.x - t.x) * e;
      t.vy += (pos.y - t.y) * e;
      for (var n, i = 0, a = this.nodes.length; i < a; i++)
        ((t = this.nodes[i]),
          0 < i &&
            ((n = this.nodes[i - 1]),
            (t.vx += (n.x - t.x) * e),
            (t.vy += (n.y - t.y) * e),
            (t.vx += n.vx * E.dampening),
            (t.vy += n.vy * E.dampening)),
          (t.vx *= this.friction),
          (t.vy *= this.friction),
          (t.x += t.vx),
          (t.y += t.vy),
          (e *= E.tension));
    },
    draw: function () {
      var e,
        t,
        n = this.nodes[0].x,
        i = this.nodes[0].y;
      ctx.beginPath();
      ctx.moveTo(n, i);
      for (var a = 1, o = this.nodes.length - 2; a < o; a++) {
        e = this.nodes[a];
        t = this.nodes[a + 1];
        n = 0.5 * (e.x + t.x);
        i = 0.5 * (e.y + t.y);
        ctx.quadraticCurveTo(e.x, e.y, n, i);
      }
      e = this.nodes[a];
      t = this.nodes[a + 1];
      ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
      ctx.stroke();
      ctx.closePath();
    },
  };
  function onMousemove(e) {
    function o() {
      lines = [];
      for (var e = 0; e < E.trails; e++)
        lines.push(new Line({ spring: 0.4 + (e / E.trails) * 0.025 }));
    }
    function c(e) {
      const container = containerId ? document.getElementById(containerId) : document;
      const containerRect = container.getBoundingClientRect ? container.getBoundingClientRect() : { left: 0, top: 0 };
      
      if (e.touches) {
        pos.x = e.touches[0].pageX - containerRect.left;
        pos.y = e.touches[0].pageY - containerRect.top;
      } else {
        pos.x = e.clientX - containerRect.left;
        pos.y = e.clientY - containerRect.top;
      }
      e.preventDefault();
    }
    function l(e) {
      if (1 == e.touches.length) {
        const container = containerId ? document.getElementById(containerId) : document;
        const containerRect = container.getBoundingClientRect ? container.getBoundingClientRect() : { left: 0, top: 0 };
        pos.x = e.touches[0].pageX - containerRect.left;
        pos.y = e.touches[0].pageY - containerRect.top;
      }
    }
    
    const targetElement = containerId ? document.getElementById(containerId) : document;
    targetElement.removeEventListener('mousemove', onMousemove);
    targetElement.removeEventListener('touchstart', onMousemove);
    targetElement.addEventListener('mousemove', c);
    targetElement.addEventListener('touchmove', c);
    targetElement.addEventListener('touchstart', l);
    c(e);
    o();
    render();
  }
  function render() {
    if (ctx && ctx.running && ctx.canvas) {
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.globalCompositeOperation = 'lighter';
      ctx.strokeStyle = 'hsla(' + Math.round(f.update()) + ',50%,50%,0.2)';
      ctx.lineWidth = 1;
      for (var e, t = 0; t < E.trails; t++) {
        (e = lines[t]).update();
        e.draw();
      }
      ctx.frame++;
      window.requestAnimationFrame(render);
    }
  }
  function resizeCanvas() {
    const canvas = document.getElementById(canvasId);
    const container = containerId ? document.getElementById(containerId) : null;
    if (canvas && ctx && container) {
      const containerRect = container.getBoundingClientRect();
      ctx.canvas.width = containerRect.width;
      ctx.canvas.height = containerRect.height;
    } else if (canvas && ctx && !containerId) {
      ctx.canvas.width = window.innerWidth - 20;
      ctx.canvas.height = window.innerHeight;
    }
  }
  var ctx,
    f,
    e = 0,
    pos = {},
    lines = [],
    E = {
      debug: true,
      friction: 0.5,
      trails: 20,
      size: 50,
      dampening: 0.25,
      tension: 0.98,
    };
  function Node() {
    this.x = 0;
    this.y = 0;
    this.vy = 0;
    this.vx = 0;
  }
  const renderCanvas = function () {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    ctx = canvas.getContext('2d');
    ctx.running = true;
    ctx.frame = 1;
    f = new n({
      phase: Math.random() * 2 * Math.PI,
      amplitude: 85,
      frequency: 0.0015,
      offset: 285,
    });
    
    const targetElement = containerId ? document.getElementById(containerId) : document;
    targetElement.addEventListener('mousemove', onMousemove);
    targetElement.addEventListener('touchstart', onMousemove);
    
    document.body.addEventListener('orientationchange', resizeCanvas);
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('focus', () => {
      if (!ctx.running) {
        ctx.running = true;
        render();
      }
    });
    window.addEventListener('blur', () => {
      ctx.running = true;
    });
    resizeCanvas();
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      renderCanvas();
    }, 100);
    
    return () => {
      clearTimeout(timer);
      if (ctx) {
        ctx.running = false;
      }
      const targetElement = containerId ? document.getElementById(containerId) : document;
      if (targetElement) {
        targetElement.removeEventListener('mousemove', onMousemove);
        targetElement.removeEventListener('touchstart', onMousemove);
      }
      document.body.removeEventListener('orientationchange', resizeCanvas);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [containerId, canvasId]);
};

export default useCanvasCursor;
