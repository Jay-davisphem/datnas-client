import { ICourseCategory as IC } from "@/app/ui/body/home/CourseCategory";
export type { ICourseCategory as IC } from "@/app/ui/body/home/CourseCategory";
export type ICourseCategory = {
  thumbnail: string;
  category: string;
  courseTitle: string;
  rating: number;
  discussionLikes: number;
  discussionComments: number;
  videos?: IVideoCard[];
};

export type IVideoCard = {
  thumbnail: string;
  category: string; // Now always matches the parent course's category
  videoTitle: string;
  rating: number;
  view: number;
  videoUrl?: string; // Added videoUrl property
};

const videoUrls = [
  "https://www.youtube.com/playlist?list=PLQrdx7rRsKfUIghJha8pCwjinzVjKPSsG",
  "https://www.youtube.com/watch?v=eWo5psPT_sk",
  "https://www.youtube.com/playlist?list=PLp7o5tJiDYeFuzdoKArSU1tSFIWUKPVHf",
  "https://www.youtube.com/watch?v=mljDwzNt7nc",
  "https://www.youtube.com/watch?v=7ZWoDe77arc",
  "https://www.youtube.com/watch?v=ReeKTu25LYY",
  "https://www.youtube.com/watch?v=Im653fOrzhs",
  "https://www.youtube.com/watch?v=lTimth5MAiE",
  "https://www.youtube.com/playlist?list=PLe0fS5WE5E46ENRu3mS4wCrMLyZP9L3IV",
  "https://www.youtube.com/watch?v=eQXW8SwOt0s",
  "https://www.youtube.com/channel/UCsw6K0peA3HEJUaueMld21w",
  "https://www.youtube.com/user/crashcourse",
  "https://www.youtube.com/watch?v=D733mEVcjqU",
  "https://www.youtube.com/playlist?list=PLjwwdVoK8h_xQwBTSYHIjOgpJCzHhfGi8",
  "https://www.youtube.com/watch?v=QjDwoeGToVY",
  "https://www.youtube.com/watch?v=wfGgwzz9knM",
  "https://www.youtube.com/watch?v=6ulC-CFQB-8",
  "https://www.youtube.com/watch?v=cMNXdPkpZTM",
  "https://www.youtube.com/watch?v=7vLDqUit1Hg",
  "https://www.youtube.com/watch?v=3LfjynG1b5w",
];

const thumbnailSources = {
  lungs: [
    "https://upload.wikimedia.org/wikipedia/commons/2/21/NCI_lung_anatomy_diagram.svg",
    "https://upload.wikimedia.org/wikipedia/commons/5/5d/Gray706_lungs.png",
    "https://upload.wikimedia.org/wikipedia/commons/f/f4/3D_Lungs_Model.png",
    "https://upload.wikimedia.org/wikipedia/commons/3/37/Lung_infection_2012-10-31.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/a/a4/Human_lung_exteriors_anterior_left.jpg",
  ],
  heart: [
    "https://upload.wikimedia.org/wikipedia/commons/5/51/Heart_anterior_view.png",
    "https://upload.wikimedia.org/wikipedia/commons/3/3a/Heart_transverse_section.png",
    "https://upload.wikimedia.org/wikipedia/commons/f/fa/Gray498.png",
    "https://upload.wikimedia.org/wikipedia/commons/8/80/Human_heart.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/e/e3/Heart_coronary_arteries.jpg",
  ],
  kidneys: [
    "https://upload.wikimedia.org/wikipedia/commons/e/e7/Illu_kidneys.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/d/d8/Kidney_ant-post.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/1/1f/Gray1156.png",
    "https://upload.wikimedia.org/wikipedia/commons/e/ef/Nephron_Structure.png",
    "https://upload.wikimedia.org/wikipedia/commons/9/9d/Blausen_0386_RenalSystem.png",
  ],
  brain: [
    "https://upload.wikimedia.org/wikipedia/commons/8/8c/Brain_lateral_view.png",
    "https://upload.wikimedia.org/wikipedia/commons/1/10/Gray726_brainstem.png",
    "https://upload.wikimedia.org/wikipedia/commons/5/53/Gray736.png",
    "https://upload.wikimedia.org/wikipedia/commons/c/c7/Human_brain_MRI.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/4/45/Neuron_%28PSF%29.png",
  ],
};

const getRandom = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)];

const coursesCategories: IC[] = [
  {
    slug: "nclex",
    name: "NCLEX",
    imgUrl: "/cardio.svg",
    courses: [
      {
        thumbnail: "/heart.jpeg",
        category: "NCLEX",
        discussionComments: 45,
        discussionLikes: 567,
        rating: 4.56,
        courseTitle:
          "Microscopic structure of cardiac muscle tissue and its unique properties",
        videos: [
          {
            thumbnail: getRandom(thumbnailSources.heart),
            category: "NCLEX", // Matching category
            videoTitle: "Anatomy of the Heart",
            rating: 4.8,
            view: 1200,
            videoUrl: "https://www.twitch.tv/videos/2429875592",
          },
          {
            thumbnail: getRandom(thumbnailSources.heart),
            category: "NCLEX",
            videoTitle: "Cardiac Muscle Contraction",
            rating: 4.6,
            view: 950,
            videoUrl: videoUrls[Math.floor(Math.random() * videoUrls.length)],
          },
          {
            thumbnail: getRandom(thumbnailSources.heart),
            category: "NCLEX", // Matching category
            videoTitle: "Understanding Heart Failure",
            rating: 4.7,
            view: 1100,
            videoUrl: videoUrls[Math.floor(Math.random() * videoUrls.length)],
          },
          {
            thumbnail: getRandom(thumbnailSources.heart),
            category: "NCLEX", // Matching category
            videoTitle: "ECG Interpretation Basics",
            rating: 4.9,
            view: 1500,
            videoUrl: videoUrls[Math.floor(Math.random() * videoUrls.length)],
          },
          {
            thumbnail: getRandom(thumbnailSources.heart),
            category: "NCLEX", // Matching category
            videoTitle: "Common Cardiac Medications",
            rating: 4.5,
            view: 800,
            videoUrl: videoUrls[Math.floor(Math.random() * videoUrls.length)],
          },
          {
            thumbnail: getRandom(thumbnailSources.heart),
            category: "NCLEX", // Matching category
            videoTitle: "Coronary Artery Bypass Grafting",
            rating: 4.4,
            view: 750,
            videoUrl: videoUrls[Math.floor(Math.random() * videoUrls.length)],
          },
          {
            thumbnail: getRandom(thumbnailSources.heart),
            category: "NCLEX", // Matching category
            videoTitle: "Echocardiography Explained",
            rating: 4.6,
            view: 1000,
            videoUrl: videoUrls[Math.floor(Math.random() * videoUrls.length)],
          },
          {
            thumbnail: getRandom(thumbnailSources.heart),
            category: "NCLEX", // Matching category
            videoTitle: "Lifestyle Changes for Heart Health",
            rating: 4.8,
            view: 1300,
            videoUrl: videoUrls[Math.floor(Math.random() * videoUrls.length)],
          },
        ],
      },
      {
        thumbnail: "/neural.jpeg",
        category: "NCLEX",
        discussionComments: 4,
        discussionLikes: 23,
        rating: 3.5,
        courseTitle:
          "The intricate network of neural pathways and their role in cognition",
        videos: [
          {
            thumbnail: getRandom(thumbnailSources.brain),
            category: "NCLEX", // Matching category
            videoTitle: "Structure of the Neuron",
            rating: 4.2,
            view: 600,
            videoUrl: videoUrls[Math.floor(Math.random() * videoUrls.length)],
          },
          {
            thumbnail: getRandom(thumbnailSources.brain),
            category: "NCLEX", // Matching category
            videoTitle: "Action Potentials and Synapses",
            rating: 4.0,
            view: 550,
            videoUrl: videoUrls[Math.floor(Math.random() * videoUrls.length)],
          },
          {
            thumbnail: getRandom(thumbnailSources.brain),
            category: "NCLEX", // Matching category
            videoTitle: "Brain Regions and Memory",
            rating: 3.8,
            view: 700,
            videoUrl: videoUrls[Math.floor(Math.random() * videoUrls.length)],
          },
          {
            thumbnail: getRandom(thumbnailSources.brain),
            category: "NCLEX", // Matching category
            videoTitle: "Understanding Alzheimer's Disease",
            rating: 4.1,
            view: 650,
            videoUrl: videoUrls[Math.floor(Math.random() * videoUrls.length)],
          },
          {
            thumbnail: getRandom(thumbnailSources.brain),
            category: "NCLEX", // Matching category
            videoTitle: "MRI and fMRI Techniques",
            rating: 4.3,
            view: 800,
            videoUrl: videoUrls[Math.floor(Math.random() * videoUrls.length)],
          },
          {
            thumbnail: getRandom(thumbnailSources.brain),
            category: "NCLEX", // Matching category
            videoTitle: "Stroke Diagnosis and Treatment",
            rating: 3.9,
            view: 720,
            videoUrl: videoUrls[Math.floor(Math.random() * videoUrls.length)],
          },
          {
            thumbnail: getRandom(thumbnailSources.brain),
            category: "NCLEX", // Matching category
            videoTitle: "Medications for Epilepsy",
            rating: 4.0,
            view: 680,
            videoUrl: videoUrls[Math.floor(Math.random() * videoUrls.length)],
          },
          {
            thumbnail: getRandom(thumbnailSources.brain),
            category: "NCLEX", // Matching category
            videoTitle: "Brain Development in Childhood",
            rating: 4.2,
            view: 750,
            videoUrl:
              "https://vimeo.com/channels/staffpicks/1076189894?autoplay=1",
          },
        ],
      },
    ],
  },
  {
    slug: "anatomy-and-physiology",
    name: "Anatomy and Physiology",
    imgUrl: "/heamoglobin.svg",
    courses: [
      {
        thumbnail: "/kidney.jpeg", // Replace with your image path
        category: "Anatomy and Physiology",
        discussionComments: 23,
        discussionLikes: 345,
        rating: 4.2,
        courseTitle: "The role of nephrons in maintaining electrolyte balance",
        videos: [
          {
            thumbnail: getRandom(thumbnailSources.kidneys),
            category: "Anatomy and Physiology",
            videoTitle: "Structure of the Nephron",
            rating: 4.5,
            view: 900,
            videoUrl: videoUrls[Math.floor(Math.random() * videoUrls.length)],
          },
          {
            thumbnail: getRandom(thumbnailSources.kidneys),
            category: "Anatomy and Physiology",
            videoTitle: "Glomerular Filtration Rate",
            rating: 4.3,
            view: 850,
            videoUrl: videoUrls[Math.floor(Math.random() * videoUrls.length)],
          },
          {
            thumbnail: getRandom(thumbnailSources.kidneys),
            category: "Anatomy and Physiology",
            videoTitle: "Understanding Chronic Kidney Disease",
            rating: 4.4,
            view: 950,
            videoUrl: videoUrls[Math.floor(Math.random() * videoUrls.length)],
          },
          {
            thumbnail: getRandom(thumbnailSources.kidneys),
            category: "Anatomy and Physiology",
            videoTitle: "Urinalysis Interpretation",
            rating: 4.6,
            view: 1000,
            videoUrl: videoUrls[Math.floor(Math.random() * videoUrls.length)],
          },
          {
            thumbnail: getRandom(thumbnailSources.kidneys),
            category: "Anatomy and Physiology",
            videoTitle: "Diuretics and Kidney Function",
            rating: 4.2,
            view: 800,
            videoUrl: videoUrls[Math.floor(Math.random() * videoUrls.length)],
          },
          {
            thumbnail: getRandom(thumbnailSources.kidneys),
            category: "Anatomy and Physiology",
            videoTitle: "Dietary Management of Renal Failure",
            rating: 4.3,
            view: 880,
            videoUrl: videoUrls[Math.floor(Math.random() * videoUrls.length)],
          },
          {
            thumbnail: getRandom(thumbnailSources.kidneys),
            category: "Anatomy and Physiology",
            videoTitle: "Basics of Hemodialysis",
            rating: 4.5,
            view: 920,
            videoUrl: videoUrls[Math.floor(Math.random() * videoUrls.length)],
          },
          {
            thumbnail: getRandom(thumbnailSources.kidneys),
            category: "Anatomy and Physiology",
            videoTitle: "Post-Transplant Care",
            rating: 4.7,
            view: 1050,
            videoUrl: videoUrls[Math.floor(Math.random() * videoUrls.length)],
          },
        ],
      },
    ],
  },
  {
    slug: "pharmacologyww",
    name: "Pharmacology",
    imgUrl: "/bones-and-joints.svg",
    courses: [
      {
        thumbnail: "/lungs.jpeg", // Replace with your image path
        category: "Pharmacology",
        discussionComments: 12,
        discussionLikes: 180,
        rating: 4.0,
        courseTitle: "The mechanics of pulmonary gas exchange",
        videos: [
          {
            thumbnail: getRandom(thumbnailSources.lungs),
            category: "Pharmacology",
            videoTitle: "Structure of the Alveoli",
            rating: 4.3,
            view: 750,
            videoUrl: videoUrls[Math.floor(Math.random() * videoUrls.length)],
          },
          {
            thumbnail: getRandom(thumbnailSources.lungs),
            category: "Pharmacology",
            videoTitle: "Mechanics of Breathing",
            rating: 4.1,
            view: 700,
            videoUrl: videoUrls[Math.floor(Math.random() * videoUrls.length)],
          },
          {
            thumbnail: getRandom(thumbnailSources.lungs),
            category: "Pharmacology",
            videoTitle: "Understanding Asthma",
            rating: 4.2,
            view: 800,
            videoUrl: videoUrls[Math.floor(Math.random() * videoUrls.length)],
          },
          {
            thumbnail: getRandom(thumbnailSources.lungs),
            category: "Pharmacology",
            videoTitle: "Pulmonary Function Tests",
            rating: 4.4,
            view: 850,
            videoUrl: videoUrls[Math.floor(Math.random() * videoUrls.length)],
          },
          {
            thumbnail: getRandom(thumbnailSources.lungs),
            category: "Pharmacology",
            videoTitle: "Bronchodilators and Inhalers",
            rating: 4.0,
            view: 720,
            videoUrl: videoUrls[Math.floor(Math.random() * videoUrls.length)],
          },
          {
            thumbnail: getRandom(thumbnailSources.lungs),
            category: "Pharmacology",
            videoTitle: "Mechanical Ventilation Basics",
            rating: 4.3,
            view: 820,
            videoUrl: videoUrls[Math.floor(Math.random() * videoUrls.length)],
          },
          {
            thumbnail: getRandom(thumbnailSources.lungs),
            category: "Pharmacology",
            videoTitle: "Pulmonary Rehabilitation Exercises",
            rating: 4.2,
            view: 780,
            videoUrl: videoUrls[Math.floor(Math.random() * videoUrls.length)],
          },
          {
            thumbnail: getRandom(thumbnailSources.lungs),
            category: "Pharmacology",
            videoTitle: "Understanding Pneumonia",
            rating: 4.4,
            view: 880,
            videoUrl: videoUrls[Math.floor(Math.random() * videoUrls.length)],
          },
        ],
      },
    ],
  },
];

export default coursesCategories;
