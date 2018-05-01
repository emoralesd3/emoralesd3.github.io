const CACHE_NAME = 'pwa-demo-cache-v1',
    urlsToCache = [
        '/',
        './',
        './?utm=homescreen',
        './index.html',
        './index.html?utm=homescreen',
        './style.css',
        './script.js',
        './favicon.ico',
        './img/icon_192x192.png',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css',
        './material.min.css',
        './material.min.js'
    ]

self.addEventListener('install', e => {
    console.log('Evento: SW instalado')
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log("Archivos en cache")
                return cache.addAll(urlsToCache)
                .then( () => self.skipWaiting() )
            })
            .catch(error => console.log("Fallo el registro de cache ", error))
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

self.addEventListener('fetch', e => {
    console.log('Evento: SW recuperando')
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if(res){
                    return res
                }
                return fetch(e.request)
            })
    )
})

self.addEventListener('push', e => {
    console.log('Evento: Push')

    let title = "Push Notificacion Demo",
        options = {
            body: "Click para regresar a la aplicacion",
            icon: './img/icon_192x192.png',
            vibrate: [100,50,100],
            data: { id: 1},
            actions: [
                { 'action': 'Si', 'Title': 'Amo esta notificacion :)', icon: './img/icon_192x192.png' },
                { 'action': 'No', 'Title': 'No me gusta esta notificacion :)', icon: './img/icon_192x192.png' }
            ]
        }
    e.waitUntil(self.registration.showNotification(title,options))
})

self.addEventListener('notificationclick', e => {
    console.log(e)
    if(e.action === 'Si'){
        console.log('Amo esta aplicacion')
        clients.openWindow('https://github.com/emoralesd3')
    }else if(e.action === 'No'){
        console.log('No me gusta esta aplicacion')
    }
    e.notification.close()
})