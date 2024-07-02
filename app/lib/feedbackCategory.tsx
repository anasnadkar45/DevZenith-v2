
interface iAppProps {
    name: string;
    title: string;
    id: number;
}

export const feedbackCategoryItem : iAppProps[] = [
    {
        id: 0,
        name: "Issue",
        title: "Issue",
    },
    {
        id: 1,
        name: "Idea",
        title: "Idea",
    },
    {
        id: 2,
        name: "Question",
        title: "Question",
    },
    {
        id: 3,
        name: "Complaint",
        title: "Complaint",
    },
    {
        id: 4,
        name: "FeatureRequest",
        title: "Feature Request",
    },
    {
        id: 5,
        name: "Other",
        title: "Other",
    },
]