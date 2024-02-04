console.log('hello')
let IP = localStorage.getItem('ipAddress')
console.log(IP)
ip.innerText = IP
let url = `https://ipapi.co/${IP}/json/ `
async function getDetails() {
  try {
    const res = await fetch(url)
    let data = await res.json()
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}

async function generateData() {
  let data = await getDetails()

  lat.innerText = data.latitude
  long.innerText = data.longitude
  city.innerText = data.city
  region.innerText = data.region
  org.innerText = data.org
  host.innerText = data.network
  timezone.innerText = data.timezone
  let currentDateTime = new Date().toLocaleString('en-US', {
    timeZone: data.timeZone,
  })
  date.innerText = currentDateTime
  pin.innerText = data.postal
  //
  let postOffices = await getPost(data.postal)
  let copy=[...postOffices]
  console.log(postOffices.length)
  message.innerText = postOffices.length
 
document.querySelector(
  '.map-img>iframe'
).src = `https://maps.google.com/maps?q=${data.latitude}, ${data.longitude}&z=18&output=embed`
// /////////////////////
displayPostOffices(postOffices)
////////////////////////////////////
document.querySelector('.search-input').addEventListener('input', (event) => {
  postOffices = copy.filter((e) => {
    return (
      e.Name.toLowerCase().includes(event.target.value.toLowerCase()) ||
      e.BranchType.toLowerCase().includes(event.target.value.toLowerCase())
    )
  })

  displayPostOffices(postOffices)
})
}



async function getPost(pincode) {
  try {
    const apiUrl = `https://api.postalpincode.in/pincode/${pincode}`

    const response = await fetch(apiUrl)
    const data = await response.json()

    let postOffices = data[0].PostOffice

    return postOffices
  } catch (error) {
    console.log(error)
  }
}


function displayPostOffices(postOffices) {
  let poContainer = document.querySelector('.po-grid')
  poContainer.innerHTML = ''
  postOffices.forEach((e) => {
    let poCard = document.createElement('div')
    poCard.className = 'po-box'
    poCard.innerHTML = `
            <p class="name"><b>Name : </b><span>${e.Name}</span></p>
            <p class="branch-name"><b>Branch Type : </b><span>${e.BranchType}</span></p>
            <p class="delivery-status"><b>Delivery Status : </b><span>${e.DeliveryStatus}</span></p>
            <p class="district"><b>District : </b><span>${e.District}</span></p>
            <p class="division"><b>Division : </b><span>${e.Division}</span></p>
        `

    poContainer.append(poCard)
  })
}


generateData()