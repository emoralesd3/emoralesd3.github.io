;
const applicationServerPublicKey = 'BFIuRbWDMmpLOZrMJD6QGdmQ-P1abdQuX7v4z4N58TELuDC5sN9Unvb4kmp81HvpS4bNuW1rmqPz4T_u-4RH0p4';
//Registro de caracteristicas de PWA's
((d, n, w, c)=>{
    if('serviceWorker' in n){
        w.addEventListener('load', ()=>{
            n.serviceWorker.register('./sw.js')
                .then(registration => {
                    c(registration)
                    c(
                        "Service worker registrado con exito",
                        registration.scope
                    )
                })
                .catch( error => c("Registro de servie worker fallido ",error) )
        })
    }

    if('PushManager' in window){
        w.addEventListener('load', () => {
            c('Push is supported');
        })
    }else{
        console.warn('Push messaging is not supported');
    }
    
    if(w.Notification && Notification.permission !== 'denied'){
        Notification.requestPermission(status => {
            c(status);
            let notify = new Notification(
                'Hola',
                {
                    body: 'Hola, soy una notificacion',
                    icon: './img/icon_192x192.png'
                }
            )  
        })
    }
})(document, navigator, window, console.log);

//deteccion del estado de la conexion
((d, n, w, c) => {
    const   header = d.querySelector('.mdl-layout__header'),
            metaTagTheme = d.querySelector('meta[name=theme-color]')
    
    function networkStatus(e){
        if(n.onLine){
            metaTagTheme.setAttribute('content', '#F7DF1E')
            header.classList.remove('u-offline')
            alert('Conexion recuperada :)')
            let notify = new Notification('Conexion',{
                body: 'Conexion recuperada',
                icon: './img/icon_192x192.png'
            })
        }else{
            metaTagTheme.setAttribute('content', '#666')
            header.classList.add('u-offline')
            alert('Conexion perdida :(')
            let notify = new Notification('Conexion',{
                body: 'Conexion perdida',
                icon: './img/icon_192x192.png'
            })
        }
    }

    d.addEventListener('DOMContentLoaded', e=>{
        if(!n.onLine){
            networkStatus(this)
        }

        w.addEventListener('online', networkStatus)
        w.addEventListener('offline', networkStatus)
    })
})(document, navigator, window, console.log);

((d, n, w, c) => {
    
})(document, navigator, window, console.log);

((d, n, w, c) => {
    
})(document, navigator, window, console.log);

