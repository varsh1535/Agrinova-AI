import { useEffect, useState } from "react";
import { Heart, MessageCircle, Send, Share2 } from "lucide-react";
import AppShell from "../components/AppShell";
import { api, assetUrl } from "../lib/api";

const demoPosts = [
  {
    _id: "demo-1",
    user: { name: "Ravi Gowda", region: "Mandya" },
    title: "Paddy leaf tips turning yellow after rain",
    content: "Reduced urea this week and started field drainage. Sharing this for others seeing the same pattern.",
    imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80",
    tags: ["paddy", "rainfall"],
    likes: [1, 2, 3],
    comments: [{ text: "Drainage helped in our field too.", user: { name: "Asha" } }],
  },
  {
    _id: "demo-2",
    user: { name: "Meera Patil", region: "Kolar" },
    title: "Tomato blight prevention schedule",
    content: "Keeping wider spacing and spraying only after humidity alerts has reduced leaf spots across two blocks.",
    imageUrl: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=1200&q=80",
    tags: ["tomato", "blight"],
    likes: [1, 2],
    comments: [],
  },
];

export default function Community() {
  const [posts, setPosts] = useState(demoPosts);
  const [form, setForm] = useState({ title: "", content: "", tags: "" });

  useEffect(() => {
    api.get("/community").then(({ data }) => setPosts(data.posts.length ? data.posts : demoPosts)).catch(() => {});
  }, []);

  const createPost = async (event) => {
    event.preventDefault();
    const { data } = await api.post("/community", form);
    setPosts([data.post, ...posts]);
    setForm({ title: "", content: "", tags: "" });
  };

  const like = async (id) => {
    if (id.startsWith("demo")) return;
    const { data } = await api.post(`/community/${id}/like`);
    setPosts(posts.map((post) => post._id === id ? { ...post, likes: Array(data.likes).fill("x") } : post));
  };

  return (
    <AppShell>
      <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
        <form onSubmit={createPost} className="glass h-fit rounded-3xl p-6">
          <h1 className="font-display text-3xl font-bold">Farmer Community</h1>
          <p className="mt-2 text-white/55">Share field reports, disease photos, input experiments, and local advice.</p>
          <input className="mt-6 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 outline-none" placeholder="Post title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <textarea className="mt-3 h-32 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 outline-none" placeholder="What did you observe?" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required />
          <input className="mt-3 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 outline-none" placeholder="tags: paddy, irrigation" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
          <button className="mt-4 flex items-center gap-2 rounded-2xl bg-nova-400 px-5 py-3 font-bold text-nova-950"><Send size={18} /> Publish</button>
        </form>

        <div className="space-y-4">
          {posts.map((post) => (
            <article key={post._id} className="glass rounded-3xl p-5">
              {post.imageUrl && <img src={assetUrl(post.imageUrl)} className="mb-4 h-60 w-full rounded-2xl object-cover" />}
              <div className="flex items-start justify-between gap-4">
                <div><h2 className="font-display text-2xl font-bold">{post.title}</h2><p className="mt-1 text-sm text-white/45">{post.user?.name} · {post.user?.region}</p></div>
                <button onClick={() => like(post._id)} className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2"><Heart size={17} /> {post.likes?.length || 0}</button>
              </div>
              <p className="mt-4 text-white/68">{post.content}</p>
              <div className="mt-4 flex flex-wrap gap-2">{post.tags?.map((tag) => <span key={tag} className="rounded-full bg-nova-400/10 px-3 py-1 text-xs text-nova-100">#{tag}</span>)}</div>
              <div className="mt-5 flex gap-3 text-sm text-white/55"><span className="flex items-center gap-1"><MessageCircle size={16} /> {post.comments?.length || 0} comments</span><span className="flex items-center gap-1"><Share2 size={16} /> Share</span></div>
            </article>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
