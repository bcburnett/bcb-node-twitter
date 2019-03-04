import doForm from '/renderPostInputForm.js'

let socket = io.connect('/')
const sendhello = document.querySelector('#sendhello')
const welcomeP = document.querySelector('#welcomeP').getAttribute('data-name')
const chatInput = document.querySelector('#chatInput')
const chatDiv = document.getElementById('chatdiv')
const postFormDiv = document.getElementById('postFormDiv')
const postcreate = document.getElementById('postCreate')
postcreate.addEventListener('click',e=>{
  socket.emit('getPostForm')

})
sendhello.addEventListener('click',e=>{
  console.log(chatInput.value)
    const content = welcomeP + " says " + chatInput.value
    socket.emit('hello',content)
  })


    socket.on('hello', data => chatDiv.innerHTML +=`<p> ${data} </p>`)

    socket.on('chat', data => chatDiv.innerHTML +=`<p> ${data} </p>`)

    socket.on('sendPostForm', data =>{
      postFormDiv.innerHTML = data
      doForm()
    })
