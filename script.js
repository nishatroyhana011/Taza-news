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
        const {title, details, total_view, thumbnail_url } = news;
        console.log(title,details,total_view,thumbnail_url)
        const newsCard = document.createElement('div');
        newsCard.innerHTML = `<div class="flex justify-center">
        <div class="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
          <img class=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg" src="${thumbnail_url}" alt="" />
          <div class="p-6 flex flex-col justify-start">
            <h5 class="text-gray-900 text-xl font-medium mb-2">${title}</h5>
            <p class="text-gray-700 text-base mb-4">
              This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
            </p>
            <p class="text-gray-600 text-xs">Last updated 3 mins ago</p>
          </div>
        </div>
      </div>`;
      console.log(newsCard)
    //   newsSec.innerHTML=newsCard;
      newsSec.appendChild(newsCard);
    })
} 
showCategories();
