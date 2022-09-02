const fetchCategories = async() =>{
    try{
        const res = await fetch('https://openapi.programming-hero.com/api/news/categories') ;
        const data = await res.json();
        // console.log(data.data.news_category)
        return data.data.news_category;
    }
    catch(error){
        //console.log(error);
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
        categoryBtn.addEventListener('click', function(){
            fetchDetails(category_id);
         });
        categories.appendChild(categoryBtn);
    })
}

const fetchDetails = async (id) => {
    try{
       const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`) ;
       const data = await res.json();
       console.log(data.data)
       return data.data;
   }
   catch(error){
       console.log(error);
   }
} 

showCategories();
