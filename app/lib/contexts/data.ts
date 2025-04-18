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
};

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
          courseTitle: "Microscopic structure of cardiac muscle tissue and its unique properties",
          videos: [
            {
              thumbnail: "/heart_video1.jpeg",
              category: "NCLEX", // Matching category
              videoTitle: "Anatomy of the Heart",
              rating: 4.8,
              view: 1200,
            },
            {
              thumbnail: "/heart_video2.jpeg",
              category: "NCLEX",
              videoTitle: "Cardiac Muscle Contraction",
              rating: 4.6,
              view: 950,
            },
            {
              thumbnail: "/heart_video3.jpeg",
              category: "NCLEX", // Matching category
              videoTitle: "Understanding Heart Failure",
              rating: 4.7,
              view: 1100,
            },
            {
              thumbnail: "/heart_video4.jpeg",
              category: "NCLEX", // Matching category
              videoTitle: "ECG Interpretation Basics",
              rating: 4.9,
              view: 1500,
            },
            {
              thumbnail: "/heart_video5.jpeg",
              category: "NCLEX", // Matching category
              videoTitle: "Common Cardiac Medications",
              rating: 4.5,
              view: 800,
            },
            {
              thumbnail: "/heart_video6.jpeg",
              category: "NCLEX", // Matching category
              videoTitle: "Coronary Artery Bypass Grafting",
              rating: 4.4,
              view: 750,
            },
            {
              thumbnail: "/heart_video7.jpeg",
              category: "NCLEX", // Matching category
              videoTitle: "Echocardiography Explained",
              rating: 4.6,
              view: 1000,
            },
            {
              thumbnail: "/heart_video8.jpeg",
              category: "NCLEX", // Matching category
              videoTitle: "Lifestyle Changes for Heart Health",
              rating: 4.8,
              view: 1300,
            },
          ],
        },
        {
          thumbnail: "/neural.jpeg",
          category: "NCLEX",
          discussionComments: 4,
          discussionLikes: 23,
          rating: 3.5,
          courseTitle: "The intricate network of neural pathways and their role in cognition",
          videos: [
            {
              thumbnail: "/brain_video1.jpeg",
              category: "NCLEX", // Matching category
              videoTitle: "Structure of the Neuron",
              rating: 4.2,
              view: 600,
            },
            {
              thumbnail: "/brain_video2.jpeg",
              category: "NCLEX", // Matching category
              videoTitle: "Action Potentials and Synapses",
              rating: 4.0,
              view: 550,
            },
            {
              thumbnail: "/brain_video3.jpeg",
              category: "NCLEX", // Matching category
              videoTitle: "Brain Regions and Memory",
              rating: 3.8,
              view: 700,
            },
            {
              thumbnail: "/brain_video4.jpeg",
              category: "NCLEX", // Matching category
              videoTitle: "Understanding Alzheimer's Disease",
              rating: 4.1,
              view: 650,
            },
            {
              thumbnail: "/brain_video5.jpeg",
              category: "NCLEX", // Matching category
              videoTitle: "MRI and fMRI Techniques",
              rating: 4.3,
              view: 800,
            },
            {
              thumbnail: "/brain_video6.jpeg",
              category: "NCLEX", // Matching category
              videoTitle: "Stroke Diagnosis and Treatment",
              rating: 3.9,
              view: 720,
            },
            {
              thumbnail: "/brain_video7.jpeg",
              category: "NCLEX", // Matching category
              videoTitle: "Medications for Epilepsy",
              rating: 4.0,
              view: 680,
            },
            {
              thumbnail: "/brain_video8.jpeg",
              category: "NCLEX", // Matching category
              videoTitle: "Brain Development in Childhood",
              rating: 4.2,
              view: 750,
            },
          ],
        },
      ]
    },
    {
      slug: "anatomy-and-physiology",
      name: "Anatomy and Physiology",
      imgUrl: "/heamoglobin.svg",
    },
    {
      slug: "pathophysiology-and-med-surg",
      name: "Pathophysiology and Med-Surg",
      imgUrl: "/skeleton.svg",
      courses: [
        {
          thumbnail: "/kidney.jpeg", // Replace with your image path
          category: "Pathophysiology and Med-Surg",
          discussionComments: 23,
          discussionLikes: 345,
          rating: 4.2,
          courseTitle: "The role of nephrons in maintaining electrolyte balance",
          videos: [
            {
              thumbnail: "/kidney_video1.jpeg", // Replace with video image path
              category: "Pathophysiology and Med-Surg",
              videoTitle: "Structure of the Nephron",
              rating: 4.5,
              view: 900,
            },
            {
              thumbnail: "/kidney_video2.jpeg", // Replace with video image path
              category: "Pathophysiology and Med-Surg",
              videoTitle: "Glomerular Filtration Rate",
              rating: 4.3,
              view: 850,
            },
            {
              thumbnail: "/kidney_video3.jpeg", // Replace with video image path
              category: "Pathophysiology and Med-Surg",
              videoTitle: "Understanding Chronic Kidney Disease",
              rating: 4.4,
              view: 950,
            },
            {
              thumbnail: "/kidney_video4.jpeg", // Replace with video image path
              category: "Pathophysiology and Med-Surg",
              videoTitle: "Urinalysis Interpretation",
              rating: 4.6,
              view: 1000,
            },
            {
              thumbnail: "/kidney_video5.jpeg", // Replace with video image path
              category: "Pathophysiology and Med-Surg",
              videoTitle: "Diuretics and Kidney Function",
              rating: 4.2,
              view: 800,
            },
            {
              thumbnail: "/kidney_video6.jpeg", // Replace with video image path
              category: "Pathophysiology and Med-Surg",
              videoTitle: "Dietary Management of Renal Failure",
              rating: 4.3,
              view: 880,
            },
            {
              thumbnail: "/kidney_video7.jpeg", // Replace with video image path
              category: "Pathophysiology and Med-Surg",
              videoTitle: "Basics of Hemodialysis",
              rating: 4.5,
              view: 920,
            },
            {
              thumbnail: "/kidney_video8.jpeg", // Replace with video image path
              category: "Pathophysiology and Med-Surg",
              videoTitle: "Post-Transplant Care",
              rating: 4.7,
              view: 1050,
            },
          ],
        },
      
      ]
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
              thumbnail: "/lungs_video1.jpeg", // Replace with video image path
              category: "Pharmacology",
              videoTitle: "Structure of the Alveoli",
              rating: 4.3,
              view: 750,
            },
            {
              thumbnail: "/lungs_video2.jpeg", // Replace with video image path
              category: "Pharmacology",
              videoTitle: "Mechanics of Breathing",
              rating: 4.1,
              view: 700,
            },
            {
              thumbnail: "/lungs_video3.jpeg", // Replace with video image path
              category: "Pharmacology",
              videoTitle: "Understanding Asthma",
              rating: 4.2,
              view: 800,
            },
            {
              thumbnail: "/lungs_video4.jpeg", // Replace with video image path
              category: "Pharmacology",
              videoTitle: "Pulmonary Function Tests",
              rating: 4.4,
              view: 850,
            },
            {
              thumbnail: "/lungs_video5.jpeg", // Replace with video image path
              category: "Pharmacology",
              videoTitle: "Bronchodilators and Inhalers",
              rating: 4.0,
              view: 720,
            },
            {
              thumbnail: "/lungs_video6.jpeg", // Replace with video image path
              category: "Pharmacology",
              videoTitle: "Mechanical Ventilation Basics",
              rating: 4.3,
              view: 820,
            },
            {
              thumbnail: "/lungs_video7.jpeg", // Replace with video image path
              category: "Pharmacology",
              videoTitle: "Pulmonary Rehabilitation Exercises",
              rating: 4.2,
              view: 780,
            },
            {
              thumbnail: "/lungs_video8.jpeg", // Replace with video image path
              category: "Pharmacology",
              videoTitle: "Understanding Pneumonia",
              rating: 4.4,
              view: 880,
            },
          ],
        },
      ]
    }
  ];

export default coursesCategories;