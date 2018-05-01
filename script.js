;
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


