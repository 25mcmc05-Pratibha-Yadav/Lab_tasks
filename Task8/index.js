let books = [];

const loadBooks = ()=>{
    books = [] ;
    $.ajax({
        type: "GET",
        url: "index.xml",
        dataType: "xml",
        success: function (response) {
            $(response)
            .find("book")
            .each(function () {
                const book = {
                    id : $(this).attr("id") ,
                    title : $(this).find("title").text(),
                    author: $(this).find("author").text(),
                    genre: $(this).find("genre").text(),
                    price: parseFloat($(this).find("price").text()),
                    publication_date: $(this).find("publication_date").text()
                }
                books.push(book);
            });
            displayBook(books);
            addGenre(books) ; 
            addAuthor(books);
        }
    });
}

const displayBook = (books) => {
    $("#tableBody").empty();
    books.forEach(element => {
        let tr = $("<tr>");

        tr.append($("<td>").text(element.id));
        tr.append($("<td>").text(element.title));
        tr.append($("<td>").text(element.author));
        tr.append($("<td>").text(element.genre));
        tr.append($("<td>").text(element.price));
        tr.append($("<td>").text(element.publication_date));
        $("#tableBody").append(tr);

    });
}

const addGenre = (books) => {
    let genres = [] ;

    books.forEach(element => {
       if(!genres.includes(element.genre)){
        genres.push(element.genre)
       } 
    });

    $("#genreFilter").empty().append("<option value = ''>Filter by genre</option>") ;
    
    genres.forEach(genre => {
        let option = $("<option>") ; // let option = document.createElement("option")
        option.attr("value", genre); // option.setAttribute("value" , genre)  ;
        option.text(genre); // option.innerText = genre ;
        $("#genreFilter").append(option); // document.querySelector("#genreFilter").appendChild(option) ; 
    })
    
}

const addAuthor = (books) => {
    let author = [];
    books.forEach(element => {
        if(!author.includes(element.author)){
            author.push(element.author) ;
        }
    })
  $("#authorFilter").empty().append("<option value = ''>Filter by author</option>");
    author.forEach(element => {
        let option = $("<option>");
        option.attr("value", element);
        option.text(element);
        $("#authorFilter").append(option);
    });
}

const applyFilter = () => {
    let selectedGenre = $("#genreFilter").val();
    let selectedAuthor = $("#authorFilter").val();
    let selectedmin = parseFloat($("#minPrice").val());
    let selectedmax = parseFloat($("#maxPrice").val());

    if(isNaN(selectedmin)) selectedmin = 0 ;
    if(isNaN(selectedmax)) selectedmax = Infinity ;
    
    let filter = books.filter(book => {
        let matchGenre = selectedGenre === "" || selectedGenre === book.genre  ;
        let matchAuthor = selectedAuthor === "" || selectedAuthor === book.author ;
        let matchPrice = book.price >= selectedmin && book.price <= selectedmax  ;

        return matchAuthor && matchGenre && matchPrice
    })

    displayBook(filter) ; 
}

$(document).ready(function () {
    loadBooks();
});

$("#filterBtn").click(function (e) { 
    e.preventDefault();
    applyFilter();
    
});
$("#resetBtn").click(function (e) { 
    e.preventDefault();
    $("#genreFilter").val("");
    $("#authorFilter").val("");
    $("#minPrice").val("");
    $("#maxPrice").val("");
});