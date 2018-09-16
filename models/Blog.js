function Blog(id, title, slug, description, author){
    this.id = id;
    this.title = title;
    this.slug = slug;
    this.description = description;
    this.author = author;
}

exports.blogs = function(){
    var blogList = [
        new Blog(1, "Blog A", "blog-a", "Description of Blog A", "Kitty Jeans"),
        new Blog(2, "Blog B", "blog-b", "Description of Blog B", "Peter Parker"),
        new Blog(3, "Blog C", "blog-c", "Description of Blog C", "Jenny Adams"),
        new Blog(4, "Blog D", "blog-d", "Description of Blog D", "Paul Dennis"),
        new Blog(5, "Blog E", "blog-e", "Description of Blog E", "Hancy Crown"),
        new Blog(3, "Blog F", "blog-f", "Description of Blog F", "Camlin Cloud"),
        new Blog(3, "Blog G", "blog-g", "Description of Blog G", "Lilly Lowns"),
    ];
    return blogList;
}