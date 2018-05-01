const CACHE_NAME = 'pwa-demo-cache-v1',
    urlsToCache = [
        '/',
        './',
        './?utm=homescreen',
        './index.html',
        './index.html/?utm=homescreen',
        './style.css',
        './script.js',
        './favicon.ico',
        './sw.js',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css'
    ]

self.addEventListener('install', e => {
    console.log('Evento: SW instalado')
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log("Archivos en cache")
                return cache.addAll(urlsToCache)
            })
            .catch(error => console.log("Fallo el registro de cache ", error))
    )
})

self.addEventListener('fetch', e => {
    console.log('Evento: SW recuperando')
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if(res){
                    return res
                }
                return fetch(request)
                    .then(res => {
                        let resToCache = res.clone()
                        caches.open(cacheName)
                            .then(cache => {
                                cache
                                    .put(request, resToCache)
                                    .catch(error => console.log(`${request.url}: ${error.message}`))
                            })
                    })
                    return res
            })
    )
})

self.addEventListener('activate', e => {
    console.log('Evento: SW activado')
    const lista_de_cache = [CACHE_NAME]

    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if(lista_de_cache.indexOf(cacheName) === -1){
                            return caches.delete(cacheName)
                        }
                    })
                )
            })
            .then(() => {
                console.log('El cache esta limpio y actualizado')
                return self.clients.claim()
            })
    )
})

