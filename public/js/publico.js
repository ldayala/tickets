const lblTicket1=document.getElementById('lblTicket1') 
const lblEscritorio1=document.getElementById('lblEscritorio1')
const lblTicket2=document.getElementById('lblTicket2')
const lblEscritorio2=document.getElementById('lblEscritorio2')
const lblTicket3=document.getElementById('lblTicket3')
const lblEscritorio3=document.getElementById('lblEscritorio3')
const lblTicket4=document.getElementById('lblTicket4')
const lblEscritorio4=document.getElementById('lblEscritorio4')
const socket= io()


socket.on('ultimos-4',([escritorio1,escritorio2,escritorio3,escritorio4])=>{
   if(escritorio1){
    lblTicket1.innerText='Ticket '+escritorio1.numero;
    lblEscritorio1.innerText='Escritorio '+ escritorio1.escritorio
   }
   if(escritorio2){
    lblTicket2.innerText='Ticket '+escritorio2.numero;
    lblEscritorio2.innerText='Escritorio '+ escritorio2.escritorio
   }
   if(escritorio3){
    lblTicket3.innerText='Ticket '+escritorio3.numero;
    lblEscritorio3.innerText='Escritorio '+ escritorio3.escritorio
   }
   if(escritorio4){
    lblTicket4.innerText='Ticket '+escritorio4.numero;
    lblEscritorio4.innerText='Escritorio '+ escritorio4.escritorio
   }
    

})