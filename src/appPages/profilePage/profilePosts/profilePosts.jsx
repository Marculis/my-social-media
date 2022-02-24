import css from "./profilePosts.module.css";
import like from "../../../assets/icons/like.svg";

const ProfilePosts = (props) => {
  let postTextOnchange = (e) => {
    props.postTextOnchange(e.target.value);
  };

  let titleTextChange = (e) => {
    props.postTitleOnchange(e.target.value);
  };

  const addPost = () => {
    if (props.newPostTitle && props.newPostText) props.addPost();
  };

  const addLike = (postId) => {
    props.addLike(postId);
  };
  return (
    <div className={css.postsBlock}>
      <div>
        <textarea
          className={css.postTitle}
          onChange={titleTextChange}
          value={props.newPostTitle}
          placeholder="Enter post title here..."
        ></textarea>
        <textarea
          className={css.postText}
          onChange={postTextOnchange}
          value={props.newPostText}
          placeholder="Enter post text here..."
        ></textarea>
        <button onClick={addPost}>Add Post</button>
      </div>
      <div>
        {props.posts.map((item) => {
          return (
            <div className={css.postItem} key={item.id}>
              <h5>{item.title}</h5>
              <div className={css.postText}>
                {item.text}
                <div onClick={() => addLike(item.id)} className={css.likes}>
                  <img className={css.like} src={like} alt="" /> {item.likes}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ProfilePosts;
