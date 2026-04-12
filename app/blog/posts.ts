export interface Post {
	id: string;
	title: string;
	date: string;
	summary: string;
	category: string;
}

export const posts: Post[] = [
	{
		id: "milestone-1",
		title: "Analysis Approach: Milestone 1",
		date: "April 1, 2026",
		summary:
			"Documentation of our initial automated misinformation detection pipeline using OpenAI GPT-4o.",
		category: "System Documentation",
	},
	{
		id: "milestone-2",
		title: "Optimization,Refinements and Features: Milestone 2",
		date: "April 12, 2026",
		summary: "Detailed analysis and reasoning for workflow changes",
		category: "System Documentation",
	},
];
