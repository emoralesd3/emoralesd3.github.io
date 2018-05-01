if('serviceWorker' in navigator){
    window.addEventListener('load', ()=>{
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log(registration)
                console.log(
                    "Service worker registrado con exito",
                    registration.scope
                )
            })
            .catch( error => console.log("Registro de servie worker fallido ",error) )
    })
}

if(window.Notification && Notification.permission !== 'denied'){
    Notification.requestPermission(status => {
        console.log(status);
        let notify = new Notification(
            'Hola',
            {
                body: 'Hola, soy una notificacion',
                icon: './img/icon_192x192.png'
            }
        )
    })
}