
const lblNuevoTicket= document.getElementById('lblNuevoTicket');
const generTicke= document.querySelector('button')

const socket=io()
socket.on('connect', () => {
    // console.log('Conectado');

    generTicke.style.display = 'block';
    
    socket.emit('cargar-ultimo',undefined,(texto)=>{
        lblNuevoTicket.innerHTML=texto
    })
    // socket.on('siguiente-ticket',(payload)=>{
    //     lblNuevoTicket.innerHTML=payload
    // })
    generTicke.addEventListener('click',()=>{
        socket.emit('siguiente-ticket',undefined,(texto)=>{
            lblNuevoTicket.innerHTML=texto 
        })
    })

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    generTicke.style.display = 'none';
});




