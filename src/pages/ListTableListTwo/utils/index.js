import castArray from 'lodash/castArray';
import trimStart from 'lodash/trimStart';
import trimEnd from 'lodash/trimEnd';
import fetch from 'isomorphic-fetch';

/**
 * 空函数
 */
const empty = () => { };

/**
 * 自执行函数
 * @param {*} func 执行函数
 * @param {*} param 参数
 */
const selfExe = (func, param = []) => func(...param);

/**
 * 随机数
 */
const random = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);

/**
 * guid方法
 */
const guid = () => `${random() + random()}-${random()}-${random()}-${random()}-${random()}${random()}${random()}`;

/**
 * 事件对象
 */
const event = document.addEventListener ? {
  addEvent: (el, type, fn) => el.addEventListener(type, fn, false),
  delEvent: (el, type, fn) => el.removeEventListener(type, fn, false),
} : {
  addEvent: (el, type, fn) => el.attachEvent(`on${type}`, fn),
  delEvent: (el, type, fn) => el.detachEvent(`on${type}`, fn),
};

/**
 * 添加事件
 * @param {*} el 对象
 * @param {*} type 类型
 * @param {*} fn 函数
 */
const addEvent = (el, type, fn) => {
  if (Array.isArray(el)) {
    for (let i = 0; i < el.length; i++) {
      addEvent(el[i], type, fn);
    }
  } else {
    try {
      event.addEvent(el, type, fn);
    } catch (e) {
      //
    }
  }
};

/**
 * 移除事件
 * @param {*} el 对象
 * @param {*} type 类型
 * @param {*} fn 函数
 */
const removeEvent = (el, type, fn) => {
  if (Array.isArray(el)) {
    for (let i = 0; i < el.length; i++) {
      removeEvent(el[i], type, fn);
    }
  } else {
    try {
      event.delEvent(el, type, fn);
    } catch (e) {
      //
    }
  }
};

/**
 * 代理服务请求
 */
const fetchPorxy = selfExe(() => {
  let state = false;
  let cache = {};
  const getXpath = () => (new Function(`return ${cache.data.xpath}`))();
  const getValidUrl = (proxy, path) => proxy ? `${trimEnd(proxy, '/')}/${trimStart(path, '/')}` : path;
  const getPath = (data) => {
    const {proxy = 'onemap', path} = typeof data === 'string' ? {path: data} : data;
    const cfg = cache.proxy[proxy] || {proxy};
    return getValidUrl(cfg.proxy, path);
  };
  const getProxyPath = (data, param, extend, option = {}) => {
    const {proxy = 'onemap', path} = typeof data === 'string' ? {path: data} : data;
    const cfg = cache.proxy[proxy] || {proxy};
    const url = getValidUrl(cfg.proxy, path);
    if (extend) {
      const dt = getXpath();
      Object.keys(extend).reduce((obj, key) => Object.assign(obj, {[extend[key]]: dt[key] }), param);
    }
    if (cfg.token) {
      const { headers, href } = cfg.token;
      if (headers) {
        const {key} = headers;
        const {token} = getXpath();
        return { url, data: param, option: {...option, headers: {...option.headers, [key]: token}} }
      } else if (href) {
        const {key} = href;
        const {token} = getXpath();
        return { url: `${url}${ url.indexOf('?') < 0 ? '?' : '&' }${key}=${token}`, data: param, option }
      }
    }
    return {url, data: param, option};
  };
  const result = (res) => { if (res.ok) return res.json(); throw new Error(`服务异常：${res.statusText}`); };
  const ready = (request) => {
    if (state) return request().then(result);
    return getConfigFile('proxy').then(cookie => { state = true; cache = cookie; return request().then(result); });
  };
  const getRequest = (path, params, extend, options) => {
    const {url, data, option} = getProxyPath(path, params, extend, options);
    const param = Object.keys(data || {}).map(key => `${key}=${encodeURIComponent(data[key])}`).join('&');
    return fetch(`${url}${url.indexOf('?') >= 0 ? '&' : '?'}${param}`, { credentials: 'include', method: 'get', ...option });
  };
  const postFormRequest = (path, params, extend, options) => {
    const {url, data, option} = getProxyPath(path, params, extend, options);
    return fetch(url, { method: 'post', option, body: data});
  };
  const postRequest = (path, params, extend, options) => {
    const {url, data, option} = getProxyPath(path, params, extend, options);

    return fetch(url, {
      credentials: 'include',
      ...option,
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...option.headers,
      },
      body: JSON.stringify(data),
    });
  };
  const postOldRequest = (path, params, extend, options) => {
    const {url, data, option} = getProxyPath(path, params, extend, options);
    return fetch(url, {
      credentials: 'include',
      ...option,
      method: 'post',
      headers: {
        Accept: 'application/json',
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        ...option.headers,
      },
      body: Object.keys(data || {}).map(key => `${key}=${encodeURIComponent(data[key])}`).join('&'),
    });
  };
  const getConfigFile = (name) => fetch(`./config/cfg-one-map/${name}.config.json`, { method: 'get', dataType: 'json', headers: { 'Content-Type': 'application/text;charset=UTF-8' } }).then(res => res.json());
  return {
    getPath,
    getConfigFile,
    getRequest(path, params, extend, option) { return ready(() => getRequest(path, params, extend, option)); },
    postRequest(path, params, extend, option) { return ready(() => postRequest(path, params, extend, option)); },
    postOldRequest(path, params, extend, option) { return ready(() => postOldRequest(path, params, extend, option)); },
    postFormRequest(path, params, extend, option) { return ready(() => postFormRequest(path, params, extend, option)); }
  }
});

/**
 * Arbiter为消息流中心，负责对象间解耦，减少代码重复，核心代码沉淀等
 * @subscribe 添加订阅
 * @subscribes 批量添加订阅
 * @publish 发布消息
 * @publishs 批量发布消息
 * @unsubscribe 取消订阅
 * @resubscribe 恢复订阅
 * @create 创建新的实例
 */
const Arbiter = selfExe(function core(name) {
  let uid = 1;
  const tokens = {};
  const list = {};
  const plist = {};

  const getSign1 = (msg, nameSpace) => { // 获取签名 名称空间 + 标识
    return nameSpace ? `${nameSpace}.${msg}` : msg;
  };

  const getSign2 = (msg, nameSpace) => { // 获取签名 名称空间 + 标识
    return nameSpace ? `${name}.${nameSpace}.${msg}` : `${name}.${msg}`;
  };

  const getSign = name ? getSign2 : getSign1;

  const getValue = (sub, data, option) => { // 获取执行内容的返回值
    try {
      return sub.f.call(sub.self, data, option);
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  const subscribe = (msg, func, options = {}, context) => { // 订阅核心
    if (typeof msg === 'string' && msg.length > 0 && typeof func === 'function') {
      const { priority = 0, unique = false, ns = '', nameSpace = '' } = options;
      const sign = getSign(msg, ns || nameSpace);
      if (list[sign] && unique) {
        const sub = list[sign][0] || {};
        sub.time++;
        return Object.keys(tokens).find(key => tokens[key] === sub);
      } else {
        const sub = { time: 0, f: func, p: priority, self: context, options, enable: true };
        list[sign] = (list[sign] || []).concat(sub).sort((a, b) => (a.p > b.p ? -1 : a.p === b.p ? 0 : 1));
        if (plist[sign]) setTimeout(() => { plist[sign].forEach(obj => { obj.resolve(getValue(sub, obj.data, obj.option)); delete plist[sign]; }) }, 10);
        const token = uid++;
        tokens[token] = Object.assign(sub, {ref: list[sign]});
        return token;
      }
    }
    return 0;
  };

  const subscribes = (subs, options = {}, context) => { // 批量订阅
    return Object.keys(subs).map((msg) => {
      const obj = subs[msg];
      const { func, option: opts = {}, context: target = {} } = typeof obj === 'function' ? { func: obj } : obj;
      return subscribe(msg, func, { ...options, ...opts }, target || context);
    });
  };

  const publish = (msg, data, options = {}) => { // 支持同步异步发布，有返回值等
    const { persist, async = true, option, ns = '', nameSpace = '' } = options;
    const sign = getSign(msg, ns || nameSpace);
    if (persist === true && !list[sign]) {
      if (!plist[sign]) plist[sign] = [];
      return new Promise((resolve, reject) => {
        plist[sign].push({resolve, reject, data, option});
      });
    }
    const subs = list[sign] || [];
    const result = subs.filter(sub => sub.enable).map(obj => getValue(obj, data, option));
    return async === true ? Promise.all(result) : result;
  };

  const publishs = (msgs, options = {}, dMode = false) => { // 支持批量同步异步发布，有返回值等
    return Promise.all(Object.keys(msgs).map((msg) => publish(msg, msgs[msg], dMode ? options[msg] : options)));
  };

  const unsubscribe = (token, del = true) => { // 取消订阅 del为false的时候，取消，为true的时候清楚
    if (Array.isArray(token)) return token.map(x => unsubscribe(x, del));
    const obj = tokens[token];
    if (obj && --obj.time < 0) {
      obj.enable = false;
      if (del === true) {
        delete tokens[token];
        Object.keys(list).forEach((key) => {
          list[key] = list[key].filter(sub => sub !== obj);
          if (list[key].length === 0) delete list[key];
        });
      }
      return true;
    } return false;
  };

  const resubscribe = (token) => { // 恢复订阅
    if (Array.isArray(token)) return token.map(resubscribe);
    const obj = tokens[token];
    if (obj) {
      obj.enable = true;
      return true;
    } return false;
  };

  const getNameSpace = () => { return name; };

  return { create: core, subscribe, subscribes, publish, publishs, unsubscribe, resubscribe, getNameSpace };
});

/**
 * 订阅自动代理
 */
function Super(nameSpace) {
  const helper = { };
  const app = Arbiter.create(nameSpace);

  const event = selfExe(() => {
    let evts = [];
    return {
      on: (el, type, func) => {
        const obj = { el, type, func };
        evts.push(obj);
        return {
          remove: () => {
            evts = evts.filter(x => x !== obj);
          }
        }
      },
      fire: (el, type) => {
        evts.filter(evt => evt.el === el && evt.type === type).forEach(evt => evt.func({ target: evt.el, type }));
      },
    };
  });

  function fire(option) {
    const nameSpaces = Object.keys(option);
    return Promise.all(nameSpaces.map(key => app.publishs(option[key], {nameSpace: key}))).then(res => {
      return nameSpaces.reduce((obj, key, idx) => Object.assign(obj, {[key]: res[idx]}), {});
    });
  }

  function hostProxy(target) {
    const list = [];
    const host = {
      on: event.on,
      fire: fire,
      publish: app.publish,
      publishs: app.publishs,
      subscribes(...data) { list.push(app.subscribes(...data)); return host; }, // 添加订阅
      subscribeOnce(sub, func, ns) { const token = app.subscribe(sub, (opt) => { func(opt); app.unsubscribe(token); }, ns);  list.push(token); return host; },
      nameSpace: nameSpace,
    };
    helper[guid()] = { list, target, host };
    return host;
  }

  function dispose(target) {
    Object.keys(helper).filter(key => helper[key].target === target).forEach(key => {
      const { list } = helper[key];
      app.unsubscribe(list);
      delete helper[key];
    });
  }

  function getModelActions(data) {
    const [models, actions] = data;
    return { models, actions };
  }

  function View(target, data) {
    const { componentWillMount = empty, componentWillUnmount = empty } = target.prototype;
    Object.assign(target.prototype, {
      componentWillMount() {
        const host = hostProxy(this);
        const { models, actions } = getModelActions(data);
        castArray(actions).filter(action => typeof action === 'function').map(action => action(host, this.props.nameSpace));
        this::componentWillMount();
        castArray(models).filter(model => typeof model === 'function').map(model => this::model(host, this.props.nameSpace));
      },
      componentWillUnmount() {
        this::componentWillUnmount();
        event.fire(this, 'unmount');
        dispose(this);
      }
    });
  }

  return {
    ViewModel: (...data) => target => View(target, data)
  }
}

const { getPath, getConfigFile, getRequest, postRequest, postOldRequest, postFormRequest } = fetchPorxy;

export { empty, selfExe, guid, addEvent, removeEvent, Arbiter, Super };

export { getPath, getConfigFile, getRequest, postRequest, postOldRequest, postFormRequest };
