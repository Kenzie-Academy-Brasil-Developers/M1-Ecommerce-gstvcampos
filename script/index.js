//variavel de conta unidades no carrinho e soma do valor
let cartCount = 0
let cartSum = 0

//criar o card do produto
function addCard(item) {
    //criando item para lista
    let newCard = document.createElement("li")
    newCard.id = item.id
    newCard.className = "item-card"

    //criando imagem do card
    let imgFigure = document.createElement("img")
    imgFigure.src = item.img
    imgFigure.alt = `imagem de ${item.nameItem}`
    newCard.appendChild(imgFigure)

    //tag da imagem
    let tagItem = document.createElement("span")
    tagItem.innerText = item.tag[0]
    tagItem.className = "tag"
    newCard.appendChild(tagItem)

    //nome do produto
    let nameItem = document.createElement("h3")
    nameItem.innerText = item.nameItem
    nameItem.className = "title"
    newCard.appendChild(nameItem)

    //descrição do produto
    let resumeItem = document.createElement("p")
    resumeItem.innerText = item.description
    resumeItem.className = "resume"
    newCard.appendChild(resumeItem)

    //valor do produto
    let valueItem = document.createElement("span")
    valueItem.innerHTML = `R$ ${item.value}.00`
    valueItem.className = "value-item"
    newCard.appendChild(valueItem)

    //adicionar carrinho
    let btnAddCart = document.createElement("button")
    btnAddCart.innerText = item.addCart
    btnAddCart.className = "add-button"
    btnAddCart.id = `btn-${item.id}`
    newCard.appendChild(btnAddCart)

    //pegando ação
    btnAddCart.addEventListener('click', function(e){
        let idElement = e.target.id
        let id = parseInt(idElement.substring(4))
        let valueElement = returnValue(id)


            let cardCart = searchId(id)

            let elementCart = createCartElement(cardCart)

            //adicionando ao carrinho
            document.querySelector('.cart-list').appendChild(elementCart)
            cartCount++
            emptyCart(cartCount)
            document.querySelector('.cart-count').innerHTML = cartCount

            //valor dos items
            cartSum += valueElement
            document.querySelector('.cart-value').innerHTML = cartSum

    })

    return newCard
}

//procurar id do item e retornar o objeto completo
function searchId(id){
    for(let i = 0; i < data.length;i++) {
        if(data[i].id == id) {
            return data[i]
        }
    }
}

//criando item no carrinho
function createCartElement(item) {
    let li = document.createElement('li')
    let div1 = document.createElement('div')
    let img = document.createElement('img')
    let div2 = document.createElement('div')
    let h4 = document.createElement('h4')
    let span = document.createElement('span')
    let btn = document.createElement('button')

    li.id = `cart_${item.id}`
    img.src = item.img
    h4.innerHTML = item.nameItem
    span.innerHTML = `R$ ${item.value}.00`
    btn.innerHTML = 'Remover produto'
    btn.id = `cart_${item.id}`
    btn.classList.add('cart-button')
    
    btn.addEventListener('click', function(event){

        let idElement = event.target.id
        let id = parseInt(idElement.substring(5))
        let valueElement = returnValue(id)
        
        let itemCart = document.querySelector(`#cart_${id}`)

        //removendo do carrinho
        itemCart.remove()
        cartCount--
        emptyCart(cartCount)
        document.querySelector('.cart-count').innerHTML = cartCount

        //valor dos items
        cartSum -= valueElement
        document.querySelector('.cart-value').innerHTML = cartSum
    })

    div1.appendChild(img)
    div2.append(h4,span,btn)
    li.append(div1, div2)

    return li

}

//percorer lista e adicionar elemento
function listCards(list) {
    const allCards = document.querySelector('.all-cards')
    allCards.innerHTML = ""

    for (let i = 0; i < list.length; i++) {
        let card = addCard(list[i])
        allCards.appendChild(card)
    }
}

//adicionar e remover classe hide
function emptyCart(value) {
    if (value > 0) {
        let cartEmpty = document.querySelector('.cart-empty')
        let cartDetails = document.querySelector('.cart-details')

        cartDetails.classList.remove('hide')
        cartEmpty.classList.add('hide')
    } else {
        let cartEmpty = document.querySelector('.cart-empty')
        let cartDetails = document.querySelector('.cart-details')

        cartDetails.classList.add('hide')
        cartEmpty.classList.remove('hide')
    }
}

//retornar o valor do produto
function returnValue(id){
    for (let i = 0; i < data.length;i++) {
        if (data[i].id == id) {
            return data[i].value
        }
    }
}

//filtrar items
function filterItems(list, search){
    let searchLowerCase = search.toLowerCase()

    let arrFilter = []

    for (let i = 0; i < list.length; i++) {
        let itemName = list[i].nameItem.toLowerCase()
        let itemDescription = list[i].description.toLowerCase()
        let itemTag = list[i].tag[0].toLowerCase()

        if (itemName.includes(searchLowerCase) || 
        itemDescription.includes(searchLowerCase) ||
        itemTag.includes(searchLowerCase)){
            arrFilter.push(list[i])
        }
    }

    return arrFilter
}

listCards(data)

let btnSearch = document.querySelector('.search-button')
let searchInput = document.querySelector('.search-input')

btnSearch.addEventListener('click', function(){
    let search = searchInput.value
    listCards(filterItems(data, search))
})

let btnTag = [...document.querySelectorAll('.nav-button')]

for (let i = 0; i < btnTag.length; i++) {
    btnTag[i].addEventListener('click', function(){
        let search = btnTag[i].innerText;
        if (search == "Todos") {
            listCards(filterItems(data, " "))
        } else {
            listCards(filterItems(data, search))
        }
    })
}
