import React, { useState, useEffect } from "react";
import {
  app,
  getFirestore,
  collection,
  getDocs,
  limit,
  query,
  orderBy,
  startAfter,
} from "../../services/firebase";

import blogIcon from '../../assets/Icons/BlogIcon.svg'

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true); // New state to track if there are more posts to load

  const firestoredb = getFirestore(app);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      let q = query(
        collection(firestoredb, "blog-posts"),
        orderBy("date","desc"),
        limit(10)
      );

      if (lastDoc) {
        q = query(q, startAfter(lastDoc));
      }
      const snapshot = await getDocs(q); // Use getDocs() instead of q.get()
      const newPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        authorLogo: doc.data().authorLogo,
        authorName: doc.data().authorName,
        date: doc.data().date,
        desc: doc.data().desc,
        href: doc.data().href,
        img: doc.data().img,
        title: doc.data().title,
      }));
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      if (snapshot.docs.length < 10) {
        setHasMore(false); // Disable "Load More" button if there are no more posts to load
      }
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
    } catch (error) {
      console.error("Error fetching posts: ", error);
      // Add error handling here (e.g., show a message to the user)
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchPosts();
    }
  };

  return (
    <>
          <div className="flex flex-col md:flex-row bg-dimBlue   items-center justify-center md:gap-10 lg:gap-44 p-20 ">
                  <img src = {blogIcon}/>
        <div className="items-center flex justify-center align-middle">
          <h1 className="text-xl md:text-2xl font-semibold text-center md:text-left md:w-96 mt-5 md:mt-0 text-gray-700 ">
            Stay informed with the latest education tips and trends.
          </h1>
        </div>

      </div>
    <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8 mb-5">

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {posts
  .filter((item, index, self) => self.findIndex((t) => t.id === item.id) === index) // Remove duplicates
  .map((item) => (
    <article
      key={`${item.id}`}
      className="max-w-md mx-auto mt-4 shadow-sm border rounded-md duration-300 hover:shadow-lg hover:scale-105"
    >
      <a href={item.href}>
        <img
          src={item.img}
          loading="lazy"
          alt={item.title}
          className="w-full h-48 rounded-t-md"
        />
        <div className="flex items-center mt-2 pt-3 ml-4 mr-2">
          <div className="flex-none w-10 h-10 rounded-full">
            <img
              src={item.authorLogo}
              className="w-full h-full rounded-full"
              alt={item.authorName}
            />
          </div>
          <div className="ml-3">
            <span className="block text-gray-900">{item.authorName}</span>
            <span className="block text-gray-400 text-sm">{item.date}</span>
          </div>
        </div>
        <div className="pt-3 ml-4 mr-2 mb-3">
          <h3 className="text-xl text-gray-900">{item.title}</h3>
          <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
        </div>
      </a>
    </article>

  ))}

      </div>
      <div className="flex justify-center">
        <button
          onClick={handleLoadMore}
          className="border border-gray-300 rounded px-4 py-2 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors mt-10"
          disabled={!hasMore || loading} // Disable button when there are no more posts or while loading
        >
          {loading ? "Loading..." : hasMore ? "Load More" : "No More Posts"}
        </button>
      </div>
    </section>
        </>
  );
};

export default Blog;
