const addBtn = document.querySelector('.add-link')

addBtn.addEventListener("click", (e) => {

    const formContainer = document.createElement('div')
    formContainer.classList.add('form-link')
    formContainer.innerHTML = `
                                <div class='close-form'><i class="fa-solid fa-close fa-xl"></i></div>
                                <h2>Nouveau lien</h2>
                                <form action="/create_link" method="POST">
                                    <input type='text' class='input-name'name="name" placeholder="nom du lien" autocomplete='off'></input>
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

})