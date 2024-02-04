async function getIp(){

    try{
const ipUrl = 'https://api.ipify.org/?format=json'
const res=await fetch(ipUrl)
console.log(res)
let data=await res.json()
console.log(data.ip)
ip.innerText=data.ip
localStorage.setItem('ipAddress',data.ip)
    }catch(error){
console.log(error)
    }
}
window.addEventListener('DOMContentLoaded', getIp)
