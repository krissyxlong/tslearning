[参考链接1](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps/Offline_Service_workers)
[参考链接1](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)
## service workers 解释
- sw 是浏览器和网络之间的虚拟代理，解决了如何缓存网站资源并使其在用户设备离线时可用。
- sw 运行在一个与 js 主线程独立的线程上，没有对 DOM 结构的访问权限。API 是非阻塞的，且可在不同的上下文之间发送和接收信息。
- sw 被设计成完全异步的，所以同步 APIS 如 xhr 和 localStorage 是不能在 SW 中访问的。
- sw 不仅提供离线功能，还包括处理通知、执行繁重的计算等。可以控制网络请求，返回缓存的自定义响应，或合成相应。
- 因为其强大性，所以只能在 https 环境下执行。

### 注册 SW
```javascript
    if('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js');
    };
```

### basic architecture
##### SW 一般遵循如下顺序
- 1、通过 url 获取 SW 来注册；
- 2、如果注册成功，SW 在 serviceWorkerGlobalScope 中执行，这是一个独立于主线程的 worker 环境。
- 3、SW 已经准备好处理事件
- 4、当 SW 控制的页面被随后访问的时候，SW 已经开始尝试安装。安装事件总是第一个发送给 SW 的（安装成功后触发）。
- 5、当 oninstall handler 完成后，SW 被认为时安装完成。
- 6、activation。当 installed 后就会接收到 activate 事件(当客户端没有控制其他的 SW 时就会被激活)。
- 7、现在 SW 控制页面了，但是只有那些在 register 成功后打开的页面。 i.e. a document starts life with or without a Service worker and maintains that for its lifetime.  ___ so documents will have to be reloaded to actually be controlled ___

### SW 的生命周期
注册完成后，sw.js 文件会自动进行
**1、下载、** 
**2、安装、**
**3、激活**。
- 当下载文件是新的或这不同于已有的 SW 时，会尝试安装。安装成功就会激活（activated）。
- 如果已经存在一个有效的 SW，新版本会在后台安装，但不会被激活，此时，新的 SW 处于 waiting 中。只有当没有任何下载的页面还在使用老版本的 SW 时，新 SW 才会被激活。当使用 SW.skipWaiting() 新 SW 可以被立马激活，已存在页面 can be claimed by the active worker 通过 Clients.claim()。
- 可以监听 InstallEvent；标准行为就是当该事件触发时，让 SW 准备就绪，比如创建缓存，准备离线访问。
- activate 事件。清除无效缓存的好时机。
- 可以通过 FetchEvent 来返回请求，通过 FetchEvent.respondWith 来任意修改请求返回。

```javascript
    self.addEventListener('install', function(e) { // 监听安装事件
        console.log('[Service Worker] Install');
    });

    self.addEventListener('install', function(e) {
        console.log('[Service Worker] Install');
        e.waitUntil(
            caches.open(cacheName).then(function(cache) { // caches 是一个特殊的CacheStorage 对象，它能在 SW 指定的范围内提供数据存储的能力。在 SW 中使用 web storage 将不会生效，因为 web storage 的执行是同步的，所以使用 cache api 替代。 
                console.log('[Service Worker] Caching all: app shell and content');
                return cache.addAll(contentToCache);
            })
        );
    });
``` 

### activate 事件
    用法同 install，常用来删除那些我们已经不需要的文件或者做一些清理工作。

### 响应请求
``` javascript
    // 当缓存存在时，我们使用缓存来提供服务而不是重新请求数据。不管当前应用是在线还是离线，我们都这么做。当请求的文件不在缓存中时，我们会在响应之前将数据添加到缓存中。
    self.addEventListener('fetch', function(e) {
        console.log('[Service Worker] Fetched resource ' + e.request.url);
    });

    // 首先会在缓存中查找资源是否被缓存，如果有，将会返回缓存的资源，如果不存在，会转而从网络中请求数据，然后将它缓存起来，这样下次有相同的请求发生时，我们就可以直接使用缓存。
    self.addEventListener('fetch', function(e) {
        e.respondWith( // e.respondWith 接管相应控制，作为服务器和应用之间的代理服务。它允许我们对每一个请求作出我们想要的任何反应。
            caches.match(e.request).then(function(r) {
                console.log('[Service Worker] Fetching resource: '+e.request.url);
                return r || fetch(e.request).then(function(response) {
                            return caches.open(cacheName).then(function(cache) {
                    console.log('[Service Worker] Caching new resource: '+e.request.url);
                    cache.put(e.request, response.clone());
                    return response;
                    });
                });
            })
        );
    });
    // 应用会在install触发时缓存资源，并且在fetch事件触发时返回缓存中的资源，这就是为什么它甚至在离线状态下也能使用的原因。当我们添加新的内容时，他也会随时被缓存下来。
```

### 更新
> 当应用有了一个新版本，该如何更新资源呢？问题的关键就是存放在缓存名称中的版本号：cacheName
> 当把版本号更新到 V2，SW 会将所有文件（包括更新的文件）添加到一个新的缓存中。
```javascript
    self.addEventListener('install', function(e) {
        e.waitUntil(
            caches.open('js13kPWA-v2').then(function(cache) {
                return cache.addAll(contentToCache);
            })
        );
    });
```
此时，新的 SW 会在后台被安装，而旧的 SW 仍然会正确的运行，直到没有任何页面使用到它为止，这时候新的SW 将会被激活，然后接管所有的页面。

### 其他用途
    耗时计算、资源预加载