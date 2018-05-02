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

    //activar sincronizacion de fondo
    if('serviceWorker' in n && 'SyncManager' in w){
        function registerBGSync(){
            n.serviceWorker.ready
                .then(registration => {
                    return registration.sync.register('github')
                        .then( () => c('Sincronizacion de fondo registrada'))
                        .catch( error => c('Fallo la sincronizacion de fondo', error))
                })
        }

        registerBGSync()
    }

    //Compartiendo contenido con el API Share
    if(n.share !== undefined){
        d.addEventListener('DOMContentLoaded', e => {
            let shareBtn = d.getElementById('share')

            shareBtn.addEventListener('click', e =>{
                n.share({
                    title: d.title,
                    text: 'Hola soy un contenido para compartir',
                    url: w.location.href
                })
                .then(() => c('Contenido compartido con exito'))
                .catch(error => c('Error al compartir: ', error))
            })
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

//Aplicacion demo interactuando con el API de Github y la sincronizacion de fondo
((d, n, w, c) => {
    const userInfo = d.querySelector('.GitHubUser'),
        searchForm = d.querySelector('.GitHubUser-form')

    function fetchGitHubUser(username, requestFromBGSync){
        let name = username || 'emoralesd3',
            url = `https://api.github.com/users/${name}`

        fetch(url, {method: 'GET'})
            .then(response => response.json())
            .then(userData => {

                if(!requestFromBGSync){
                    localStorage.removeItem('github')
                }

                let template = `
                    <div class="mdl-card__title mdl-card--expand">
                        <h2 class="mdl-card__title-text">${userData.name}</h2>
                    </div>
                    <div class="mdl-card__media">
                        <img src="${userData.avatar_url}" border="0" alt="${userData.login}">
                    </div>
                    <div class="mdl-card__supporting-text">
                        ${userData.bio}
                        <ul class="demo-list-item mdl-list">
                            <li class="mdl-list__item">
                                <span class="mdl-list__item-primary-content">
                                ${userData.login}
                                </span>
                            </li>
                            <li class="mdl-list__item">
                                <span class="mdl-list__item-primary-content">
                                ${userData.html_url}
                                </span>
                            </li>
                            <li class="mdl-list__item">
                                <span class="mdl-list__item-primary-content">
                                    <span class="mdl-badge" data-badge="${userData.followers}">Seguidores </span>
                                </span>
                            </li>
                            <li class="mdl-list__item">
                                <span class="mdl-list__item-primary-content">
                                <span class="mdl-badge" data-badge="${userData.following}">Siguiendo </span>
                                </span>
                            </li>
                            <li class="mdl-list__item">
                                <span class="mdl-list__item-primary-content">
                                Ubicacion ${userData.location}
                                </span>
                            </li>
                        </ul>
                    </div>
                `

                userInfo.innerHTML = template
            })
            .catch(err => {
                localStorage.setItem('github', name)
                c(err)
            })
    }

    fetchGitHubUser(localStorage.getItem('github'))

    searchForm.addEventListener('submit', e => {
        e.preventDefault()

        let user = d.getElementById('search').value

        //si el campo de search esta vacio no hacemos nada
        if(user === '') return;

        //almacenamos en localstorage el usuario de github
        localStorage.setItem('github', user)

        fetchGitHubUser(user)

        //limpiamos el formulario
        e.target.reset()
    })

    n.serviceWorker.addEventListener('message', e => {
        c('Desde la sincronizacion de fondo: ', e.data)
        fetchGitHubUser(localStorage.getItem('github'), true)
    })
})(document, navigator, window, console.log);