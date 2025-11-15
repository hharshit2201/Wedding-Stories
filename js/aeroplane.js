
(function(){
  function animatePlane(routeId, planeId) {
    const route = document.getElementById(routeId);
    const plane = document.getElementById(planeId);
    if (!route || !plane) return;
    const total = route.getTotalLength();
    let startTime = null;
    const speed = 0.00012;
    function updateAt(progress){
      const L = total;
      const len = Math.max(0, Math.min(1, progress)) * L;
      const p = route.getPointAtLength(len);
      const ahead = Math.min(L, len + Math.max(1, L * 0.002));
      const p2 = route.getPointAtLength(ahead);
      const dx = p2.x - p.x;
      const dy = p2.y - p.y;
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;
      plane.setAttribute('transform', `translate(${p.x}, ${p.y}) rotate(${angle})`);
    }
    function step(ts){
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const progress = (elapsed * speed) % 1;
      updateAt(progress);
      requestAnimationFrame(step);
    }
    updateAt(0);
    requestAnimationFrame(step);
  }
  animatePlane('route-1', 'plane-1');
  animatePlane('route-2', 'plane-2');
})();