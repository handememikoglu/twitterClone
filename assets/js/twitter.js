const tweetButton = document.querySelector(".tweetBtn");
const tweetInput = document.querySelector("#tweetInput");
tweetInput.style.color = "white";

let postList = [];
if(localStorage.getItem("posts")){
    postList = JSON.parse(localStorage.getItem("posts"));
}

tweetButton.addEventListener("click", () => {
    const tweetText = (tweetInput.value);
    let newId = 1;
    if (postList[postList.length - 1]) {
      newId = postList[postList.length - 1].id + 1;
    }
    postList.push({
        id:newId,
        text: tweetText,
        like: 0
    });
    console.log(postList);
    localStorage.setItem("posts",JSON.stringify(postList));
    render();
    tweetInput.value = "";
});
function bindBtn() {
    const btns = document.querySelectorAll(".btn");
    const liked = document.querySelectorAll(".liked");
    for (const btn of btns) {
        btn.addEventListener("click",(e) => {
            const postId = Number(btn.dataset.id);
            const post = postList.find(p => p.id === postId); 
            if (post) {
                post.like++; 
                console.log(post);
                liked.style.backgroundColor ="red"
                render();
            }
            localStorage.setItem("posts",JSON.stringify(postList));
        });
    }
    
}
const posts = document.querySelector(".posts");
function render() {
    posts.innerHTML=""
    for (const post of postList) {
    
    posts.innerHTML += `<div class="post">
                <img src="assets/img/post1-avatar.png" alt="">
                <div class="post-profile">
                    <p>Hande Eylül<span>@handeeylül.23s</span></p>
                    <h3>${post.text}</h3>
                </div>
                
            </div>
            <div class="post-footer">
                <div class="post-footer-icons">
                    <div class="commentIcon">
                        <img src="assets/img/comment-icon.png" alt="">
                        <p>61</p>
                    </div>
                    <div class="retweet">
                        <img src="assets/img/retweet.png" alt="">
                        <p>12</p>
                    </div>
                    <div class="likes">
                        <button data-id=${post.id} class="btn">
                            <i class="fas fa-heart liked"></i> 
                        </button>
                        <p>${post.like}</p>
                    </div>
                    <div class="lastIcon">
                        <img src="assets/img/Default.png" alt="">
                        <p>61</p>
                    </div>
                </div>
                <a href="#">Show this thread</a>
            </div>`
    }
    localStorage.setItem("posts",JSON.stringify(postList));
    bindBtn();
}
render();