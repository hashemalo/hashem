export type PostMeta = {
  slug: string;
  title: string;
  date: string; // ISO
  summary: string;
  lesswrong?: string;
};

export const posts: PostMeta[] = [
  {
    slug: "fine-tuning-on-rewritten-reasoning",
    title: "Fine-tuning on Rewritten Reasoning Makes CoT Unfaithful",
    date: "2026-10-12",
    summary:
      "SFT on summarised or paraphrased chain-of-thought — with no hints, leaks or pressure in the data — drops Qwen3-8B's mention of a leaked answer key from 100% to ~10%, while its use of the key is unchanged.",
    lesswrong: "https://www.lesswrong.com/posts/XCbNTpwmeFpibSnvC",
  },
];

export function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
