const addBtn = document.querySelector('.add-link')

if (addBtn) {
    addBtn.addEventListener("click", (e) => {
        if (!document.querySelector('.form-link')) {
            document.querySelector('.container').classList.add('blur')
        
            const formContainer = document.createElement('div')
            formContainer.classList.add('form-link')
            formContainer.innerHTML = `
                                        <div class='close-form'><i class="fa-solid fa-close fa-xl"></i></div>
                                        <h2>Nouveau lien</h2>
                                        <form action="/create_link" method="POST">
                                            <input type='text' class='input-name'name="name" placeholder="nom du lien" autocomplete=off></input>
                                            <div class='container-link-input'>
                                                <input type='text' name='link' placeholder='lien' required=true></input>
                                                <select name="platform" id="platform">
                                                    <option value="snapchat">Snapchat</option>
                                                    <option value="telegram">Telegram</option>
                                                    <option value="whatsapp"> WhatsApp</option>
                                                    <option value="potato">Potato</option>
                                                </select>
                                            </div>
                                            <input type='text' name="password" class="password" placeholder='mot de passe' required=true></input>
                                            <input type='submit' class='submit'></input>
                                        </form>
                                      `
            document.body.appendChild(formContainer)
        }
    
            // close form
            const closeBtn = document.querySelector('.close-form')
            closeBtn.addEventListener('click', (e) => {
            document.querySelector('.container').classList.remove('blur')
                document.querySelector('.form-link').remove()
            })
            // if (document.querySelector('.close-form')) {
    
            // }
        
        })

}


// delete link

const delLinkBtns = document.querySelectorAll('.del-link')
delLinkBtns.forEach((delLinkBtn) => {
    delLinkBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const linkId = e.target.dataset.link
    document.querySelector(`.href-${linkId}`).removeAttribute('href')
    
    // const delNotice = document.createElement('div')
    // delNotice.classList.add('del-container')
    const linkCard = document.querySelector(`.link-${linkId}`)
    linkCard.outerHTML = `<div class='link-back'>
                                <form>
                                    <input type='text' class="password-input-${linkId} "name="password" placeholder='mot de passe' required=true></input>
                                </form>
                                <div class='conf-del-btn conf-del-btn-${linkId}'>
                                    <p>Supprimer</p>
                                </div>
                            </div>
                          `
    // document.body.append(delNotice)
    confDelBtn = document.querySelector(`.conf-del-btn-${linkId}`)
    confDelBtn.addEventListener('click', (e) => {
        e.preventDefault()
        fetch(`/del_link/${linkId}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ password: document.querySelector(`.password-input-${linkId}`).value})
        })
        .then(response => response.json)
        .then(data => {
            if (data.resp === 'deleted') {
                linkCard.remove()
            } else if (data.resp === 'mauvais mot de passe !') {
                document.querySelector(`.password-input-${linkId}`).style.border = 'solid 1px red'
                document.querySelector(`.password-input-${linkId}`).placeholder.style.color = 'red'
            } 
        })
    })

})
})
