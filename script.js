const fetchCategories = async() =>{
    try{
        const res = await fetch('https://openapi.programming-hero.com/api/news/categories') ;
        const data = await res.json();
        return data.data.news_category;
    }
    catch(error){
        console.log(error);
        alert('Data not found');
    }
}

const showCategories= async () =>{
    const categories = document.getElementById('categories');
    const data = await fetchCategories();
    data.forEach(category => {
        const {category_id, category_name} =category;
        const categoryBtn = document.createElement('button');
        categoryBtn.classList.add("text-black", "p-2","text-gray-700", "hover:bg-indigo-50", "rounded-lg");
        categoryBtn.innerText = category_name;
        categoryBtn.addEventListener('click', function (){
            const  fetchedDetails = fetchDetails(category_id);
            showNews(fetchedDetails);
         });
        categories.appendChild(categoryBtn);
    })
}

const fetchDetails = async (id) => {
    try{
       const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`) ;
       const data = await res.json();
       return data.data;
   }
   catch(error){
       console.log(error);
       alert('Data not found');
   }
} 

const showNews = async (details) =>{
    const detailNews = await details;
    const newsSec = document.getElementById('news-section');
    newsSec.innerHTML = '';
    detailNews.forEach(news => {
        
        const {_id, title, details, total_view, thumbnail_url,author } = news;
        const newsCard = document.createElement('div');
        newsCard.innerHTML = `<div class="flex justify-center">
        <div class="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-indigo-50 shadow-lg">
          <img class=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg" src="${thumbnail_url}" alt="" />
          <div class="p-6 flex flex-col justify-start">
            <h5 class="text-indigo-900 text-xl font-semibold mb-2">${title}</h5>
            <p class="text-gray-700 text-base mb-4">
              ${details.slice(0, 150)}
            </p>
            <div class="flex items-center"> 
                <div class="mr-4">
                    <img src="${author.img}" class="w-10 h-auto rounded-full" alt="">
                </div> 
                <div>
                    <p class="text-indigo-900 text-base font-medium">${author.name}</p>
                    <p>${author.published_date}</p>
                </div>
            </div>
            <div class = "flex items-center justify-between">
                <div class="flex items-center mt-2"> <i class="fa-solid fa-eye"></i><p class="text-gray-600 text-base">${total_view}</p>  </div>
                <div>
                    <button data-bs-toggle="modal" data-bs-target="#exampleModalScrollable" onclick="newsModal('${_id}')" class="text-indigo-900">View more <i class="fa-solid fa-arrow-right"></i></button>
                </div>
            </div
          </div>
        </div>
      </div>`;
      newsSec.appendChild(newsCard);
    })
} 

const newsModal = async (id) =>{
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    const resp = await fetch(url);
    const data = await resp.json();
    const newsdetail = data.data[0];
    console.log(newsdetail);
    const {_id, title,author, details,  thumbnail_url, others_info,rating, image_url, total_view,} = newsdetail;
   // document.getElementById('exampleModalScrollableLabel').innerText = `${news.title}`;
}
showCategories();
