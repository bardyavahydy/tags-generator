const $ = document
const inputElm = $.querySelector('.input')
const ulElm = $.querySelector('ul')
const maxTagsElm = $.querySelector('.details span')
const removeAllBtnElm = $.querySelector('button')
const maxTags = 10

let tags = [];

const addingTagsToUl = () =>{
    removeListItems()
    maxTagsElm.innerText = maxTags - tags.length
    tags.forEach((tag, index) =>{
        ulElm.insertAdjacentHTML('afterbegin', `
            <li>
                ${tag}
                <i class="uit uit-multiply" onclick="removeTagHandler(this, '${tag}')"></i>
            </li>
        `)
    })
}

const removeTagHandler = (elm, value) =>{
    let parentElm = elm.parentElement
    let tagIndex = tags.findIndex(tag => tag === value)
    tags.splice(tagIndex, 1)
    maxTagsElm.innerText = maxTags - tags.length
    parentElm.remove()
}

const removeListItems = () =>{
    let listItems = ulElm.querySelectorAll('li')
    listItems.forEach(listItem => listItem.remove())
}

inputElm.addEventListener('keydown', event =>{
    if(event.keyCode === 13 && tags.length < maxTags && inputElm.value.length > 0){
        inputElm.value.split(',').forEach(tag =>{
            if(!tags.includes(tag)) tags.unshift(tag)
        })
        addingTagsToUl()
        inputElm.value = ""
    }
})

removeAllBtnElm.addEventListener('click', () =>{
    tags = []
    maxTagsElm.innerText = maxTags
    removeListItems()
})