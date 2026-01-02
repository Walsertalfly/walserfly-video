/**
 * Snow Ticker Widget v1.1.0
 * © 2026 WalserFly - Licensed Embeddable Snow Height Ticker
 * 
 * Usage:
 * <script src="https://www.walserfly.com/widget/snow-ticker.js" data-key="YOUR_KEY"></script>
 */

(function() {
  'use strict';

  // ============================================
  // SCRIPT REFERENCE & CONFIG EXTRACTION
  // ============================================
  
  const currentScript = document.currentScript;
  if (!currentScript) return;
  
  const dataKey = currentScript.getAttribute('data-key');
  if (!dataKey) return;
  
  const position = currentScript.getAttribute('data-position') || 'bottom';
  const theme = currentScript.getAttribute('data-theme') || 'default';
  const currentDomain = location.hostname.toLowerCase();
  
  // Derive base URL from script src
  const scriptSrc = currentScript.src;
  const baseUrl = scriptSrc.substring(0, scriptSrc.lastIndexOf('/') + 1);

  // ============================================
  // WIDGET CONFIGURATION
  // ============================================
  
  const WIDGET_CONFIG = {
    timezone: "Europe/Vienna",
    cacheMinutes: 10,
    apiBaseUrl: "https://api.open-meteo.com/v1/forecast",
    customersUrl: baseUrl + "customers.json",
    
    LOCATIONS: [
      { id: "ifen", name: "Ifen", lat: 47.3539, lon: 10.0972, elevation: 2230, type: "Berg" },
      { id: "kanzelwand", name: "Kanzelwand", lat: 47.3231, lon: 10.1108, elevation: 1957, type: "Berg" },
      { id: "walmend", name: "Walmendingerhorn", lat: 47.3317, lon: 10.1617, elevation: 1940, type: "Berg" },
      { id: "heuberg", name: "Heubergarena", lat: 47.3850, lon: 10.1450, elevation: 1400, type: "Skigebiet" },
      { id: "soellereck", name: "Söllereck", lat: 47.4031, lon: 10.2897, elevation: 1400, type: "Berg" },
      { id: "nebelhorn", name: "Nebelhorn", lat: 47.4114, lon: 10.3308, elevation: 2224, type: "Berg" },
      { id: "kwt", name: "Kleinwalsertal", lat: 47.3522, lon: 10.1903, elevation: 1086, type: "Ort" },
      { id: "oberstdorf", name: "Oberstdorf", lat: 47.4097, lon: 10.2789, elevation: 815, type: "Ort" }
    ]
  };

  // ============================================
  // LICENSE VALIDATION
  // ============================================
  
  const validateLicense = async () => {
    try {
      const response = await fetch(WIDGET_CONFIG.customersUrl, { 
        cache: 'no-store',
        credentials: 'omit'
      });
      
      if (!response.ok) return false;
      
      const customers = await response.json();
      const customer = customers[dataKey];
      
      if (!customer) return false;
      if (!customer.active) return false;
      if (!Array.isArray(customer.domains)) return false;
      
      const allowedDomains = customer.domains.map(d => d.toLowerCase());
      const isAllowed = allowedDomains.some(domain => {
        if (domain === currentDomain) return true;
        // Wildcard support: *.example.com
        if (domain.startsWith('*.')) {
          const suffix = domain.slice(1); // .example.com
          return currentDomain.endsWith(suffix) || currentDomain === domain.slice(2);
        }
        return false;
      });
      
      return isAllowed;
    } catch {
      return false;
    }
  };

  // ============================================
  // STYLES
  // ============================================
  
  const getStyles = (pos) => {
    const positionMap = {
      bottom: 'position:fixed;bottom:0;left:0;width:100%;z-index:2147483647;',
      top: 'position:fixed;top:0;left:0;width:100%;z-index:2147483647;',
      inline: 'position:relative;width:100%;'
    };

    return `
      :host{display:block;${positionMap[pos] || positionMap.bottom}font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;line-height:1.5;-webkit-font-smoothing:antialiased}
      *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
      .snow-ticker-banner{position:relative;width:100%;height:70px;background:linear-gradient(135deg,rgba(30,58,138,.95) 0%,rgba(30,64,175,.95) 50%,rgba(37,99,235,.95) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);overflow:hidden;box-shadow:${pos==='top'?'0 4px 30px rgba(0,0,0,.15)':'0 -4px 30px rgba(0,0,0,.15)'};border-${pos==='top'?'bottom':'top'}:1px solid rgba(255,255,255,.1)}
      .banner-bg{position:absolute;top:0;left:0;width:100%;height:100%;background-image:radial-gradient(circle at 20% 50%,rgba(255,255,255,.03) 0%,transparent 50%),radial-gradient(circle at 80% 50%,rgba(255,255,255,.03) 0%,transparent 50%);background-size:200% 100%;animation:shimmer 8s ease-in-out infinite;pointer-events:none}
      @keyframes shimmer{0%,100%{background-position:0% 0%}50%{background-position:100% 0%}}
      .ticker-track{position:relative;display:flex;align-items:center;height:100%;animation:scroll-left 90s linear infinite;will-change:transform}
      .snow-ticker-banner:hover .ticker-track{animation-play-state:paused}
      .ticker-item{display:flex;align-items:center;gap:16px;padding:0 28px;margin:0 8px;height:54px;background:rgba(255,255,255,.08);backdrop-filter:blur(10px);border-radius:27px;border:1px solid rgba(255,255,255,.12);white-space:nowrap;flex-shrink:0;transition:all .3s cubic-bezier(.4,0,.2,1);box-shadow:0 4px 15px rgba(0,0,0,.1);cursor:default}
      .ticker-item:hover{background:rgba(255,255,255,.15);transform:translateY(-2px) scale(1.02);box-shadow:0 8px 25px rgba(0,0,0,.2);border-color:rgba(255,255,255,.25)}
      .location-icon{width:32px;height:32px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.15);border-radius:50%;flex-shrink:0}
      .location-icon svg{width:18px;height:18px;fill:none;stroke:#fff;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round}
      .location-info{display:flex;flex-direction:column;gap:2px}
      .location-name{font-size:13px;font-weight:700;color:rgba(255,255,255,.9);letter-spacing:.3px;line-height:1}
      .location-type{font-size:10px;font-weight:600;color:rgba(255,255,255,.5);text-transform:uppercase;letter-spacing:.5px;line-height:1}
      .divider{width:1px;height:30px;background:linear-gradient(to bottom,transparent,rgba(255,255,255,.2),transparent);flex-shrink:0}
      .current-snow{display:flex;flex-direction:column;align-items:center;gap:2px}
      .snow-value{font-size:26px;font-weight:900;color:#fff;letter-spacing:-1px;line-height:1;text-shadow:0 2px 10px rgba(0,0,0,.3);background:linear-gradient(180deg,#fff 0%,#e0e7ff 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
      .snow-label{font-size:9px;font-weight:700;color:rgba(255,255,255,.5);text-transform:uppercase;letter-spacing:.8px;line-height:1}
      .forecast-badge{display:flex;align-items:center;gap:6px;padding:8px 12px;background:linear-gradient(135deg,rgba(16,185,129,.25) 0%,rgba(5,150,105,.25) 100%);border-radius:20px;border:1px solid rgba(16,185,129,.3);flex-shrink:0}
      .forecast-icon{width:16px;height:16px;color:#10b981}
      .forecast-content{display:flex;flex-direction:column;gap:1px}
      .forecast-value{font-size:14px;font-weight:900;color:#10b981;line-height:1;letter-spacing:-.3px}
      .forecast-label{font-size:8px;font-weight:700;color:rgba(16,185,129,.8);text-transform:uppercase;letter-spacing:.5px;line-height:1}
      .ticker-loading{display:flex;align-items:center;justify-content:center;height:100%;width:100%;color:rgba(255,255,255,.7);font-size:14px;font-weight:600;gap:12px}
      .spinner{width:20px;height:20px;border:3px solid rgba(255,255,255,.2);border-top-color:#fff;border-radius:50%;animation:spin .8s linear infinite}
      @keyframes spin{to{transform:rotate(360deg)}}
      @keyframes scroll-left{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
      @media(max-width:768px){.snow-ticker-banner{height:60px}.ticker-item{height:46px;gap:12px;padding:0 20px}.location-icon{width:28px;height:28px}.location-name{font-size:12px}.snow-value{font-size:22px}.forecast-badge{padding:6px 10px}}
      .snowflake{position:absolute;top:-10px;color:rgba(255,255,255,.4);font-size:14px;animation:fall linear infinite;pointer-events:none;user-select:none}
      @keyframes fall{to{transform:translateY(80px);opacity:0}}
      .ticker-error{display:flex;align-items:center;justify-content:center;height:100%;width:100%;color:rgba(255,255,255,.7);font-size:14px;font-weight:600;gap:8px}
    `;
  };

  // ============================================
  // ICONS
  // ============================================
  
  const ICONS = {
    Berg: '<svg viewBox="0 0 24 24"><path d="M3 20h18L12 4 3 20z"/></svg>',
    Skigebiet: '<svg viewBox="0 0 24 24"><path d="M8 3l-1 4h10l-1-4M7 7l-2 8h14l-2-8M5 15l-1 6h16l-1-6"/></svg>',
    Ort: '<svg viewBox="0 0 24 24"><path d="M3 21h18M5 21V9l7-6 7 6v12M9 9h6M9 13h6M9 17h6"/></svg>',
    default: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/></svg>'
  };

  // ============================================
  // CACHE MANAGEMENT
  // ============================================
  
  const cacheKey = (id) => `st_${dataKey}_${id}`;
  
  const loadCache = (id) => {
    try {
      const raw = localStorage.getItem(cacheKey(id));
      if (!raw) return null;
      const { t, d } = JSON.parse(raw);
      return (Date.now() - t) < WIDGET_CONFIG.cacheMinutes * 60000 ? d : null;
    } catch { return null; }
  };
  
  const saveCache = (id, data) => {
    try {
      localStorage.setItem(cacheKey(id), JSON.stringify({ t: Date.now(), d: data }));
    } catch {}
  };

  // ============================================
  // API FETCHING
  // ============================================
  
  const fetchSnowData = async (loc) => {
    const params = new URLSearchParams({
      latitude: loc.lat,
      longitude: loc.lon,
      elevation: loc.elevation,
      timezone: WIDGET_CONFIG.timezone,
      forecast_days: 7,
      daily: 'snowfall_sum',
      hourly: 'snow_depth',
      current: 'temperature_2m',
      temperature_unit: 'celsius',
      snowfall_unit: 'cm'
    });
    
    const res = await fetch(`${WIDGET_CONFIG.apiBaseUrl}?${params}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('API error');
    return res.json();
  };

  const getData = async (loc) => {
    const cached = loadCache(loc.id);
    if (cached) return cached;

    const forecast = await fetchSnowData(loc);
    const hourlyTimes = forecast.hourly?.time || [];
    const hourlyDepth = forecast.hourly?.snow_depth || [];
    const depthUnit = forecast.hourly_units?.snow_depth || '';
    const currentTime = forecast.current?.time || hourlyTimes[0];
    
    let currentCm = 0;
    if (currentTime && hourlyTimes.length) {
      const idx = hourlyTimes.findIndex(t => t <= currentTime);
      const v = Number(hourlyDepth[idx >= 0 ? idx : 0]);
      if (Number.isFinite(v)) {
        currentCm = depthUnit === 'm' ? v * 100 : v;
      }
    }

    const dailySum = forecast.daily?.snowfall_sum || [];
    let sum7 = 0;
    for (let i = 0; i < Math.min(7, dailySum.length); i++) {
      sum7 += Number(dailySum[i] || 0);
    }

    const payload = { current: Math.round(currentCm), forecast7: Math.round(sum7) };
    saveCache(loc.id, payload);
    return payload;
  };

  // ============================================
  // RENDERING
  // ============================================
  
  const createTickerItem = (loc, data) => {
    const item = document.createElement('div');
    item.className = 'ticker-item';
    item.innerHTML = `
      <div class="location-icon">${ICONS[loc.type] || ICONS.default}</div>
      <div class="location-info">
        <div class="location-name">${loc.name}</div>
        <div class="location-type">${loc.type}</div>
      </div>
      <div class="divider"></div>
      <div class="current-snow">
        <div class="snow-value">${data.current}</div>
        <div class="snow-label">CM</div>
      </div>
      <div class="forecast-badge">
        <svg class="forecast-icon" viewBox="0 0 24 24" fill="none">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="forecast-content">
          <div class="forecast-value">+${data.forecast7} cm</div>
          <div class="forecast-label">7 Tage</div>
        </div>
      </div>
    `;
    return item;
  };

  const addSnowflakes = (container) => {
    for (let i = 0; i < 8; i++) {
      const flake = document.createElement('div');
      flake.className = 'snowflake';
      flake.textContent = '❄';
      flake.style.cssText = `left:${Math.random()*100}%;animation-duration:${Math.random()*3+3}s;animation-delay:${Math.random()*3}s;font-size:${Math.random()*6+10}px`;
      container.appendChild(flake);
    }
  };

  // ============================================
  // WIDGET CORE
  // ============================================
  
  const createWidget = () => {
    const host = document.createElement('div');
    const shadow = host.attachShadow({ mode: 'closed' });
    
    const style = document.createElement('style');
    style.textContent = getStyles(position);
    shadow.appendChild(style);
    
    const banner = document.createElement('div');
    banner.className = 'snow-ticker-banner';
    banner.innerHTML = '<div class="banner-bg"></div>';
    
    const track = document.createElement('div');
    track.className = 'ticker-track';
    track.innerHTML = '<div class="ticker-loading"><div class="spinner"></div>Lade aktuelle Schneehöhen...</div>';
    banner.appendChild(track);
    shadow.appendChild(banner);
    
    // Insert into DOM
    if (position === 'inline') {
      currentScript.parentNode.insertBefore(host, currentScript.nextSibling);
    } else {
      document.body.appendChild(host);
    }
    
    return { banner, track };
  };

  const loadTickerData = async (track, banner) => {
    try {
      const results = await Promise.all(
        WIDGET_CONFIG.LOCATIONS.map(loc => getData(loc).then(data => ({ loc, data })))
      );
      
      track.innerHTML = '';
      const fragment = document.createDocumentFragment();
      results.forEach(({ loc, data }) => fragment.appendChild(createTickerItem(loc, data)));
      
      // Clone for seamless loop
      const clone = fragment.cloneNode(true);
      track.appendChild(fragment);
      track.appendChild(clone);
      
      addSnowflakes(banner);
    } catch {
      track.innerHTML = '<div class="ticker-error">⚠️ Fehler beim Laden der Daten</div>';
    }
  };

  // ============================================
  // INITIALIZATION
  // ============================================
  
  const init = async () => {
    const isValid = await validateLicense();
    if (!isValid) return; // Silent exit - no console, no UI
    
    const ensureBody = () => {
      if (document.body) {
        const { banner, track } = createWidget();
        loadTickerData(track, banner);
        setInterval(() => loadTickerData(track, banner), WIDGET_CONFIG.cacheMinutes * 60000);
      } else {
        requestAnimationFrame(ensureBody);
      }
    };
    
    ensureBody();
  };

  init();

})();
