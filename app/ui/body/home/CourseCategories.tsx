import { ICourseCategory, CourseCategory } from "./CourseCategory"

export default function CourseCategories() {
    const coursesCategories: ICourseCategory[] = [
        {slug: 'digestive-system', name: 'The Digestive System', imgUrl: '/cardio.svg' },
        {slug: 'blood-blood-vessels', name: 'Blood and Blood Vessels', imgUrl: '/heamoglobin.svg' },
        {slug: 'skeletal-system', name: 'The Skeletal System', imgUrl: '/skeleton.svg' },
        {slug: 'bones-and-joints', name: 'Bones and Joints', imgUrl: '/bones-and-joints.svg' }
    ]
    return (
        <div className="p-6 md:p-16 lg:p-32 flex flex-col items-start md:justify-between gap-6 lg:gap-8">
            <h2 className="text-white underline text-3xl font-bold">Course Categories</h2>
            <div className="w-full flex flex-col lg:flex-row gap-8">            
                {coursesCategories.map(({name, slug, imgUrl}) => <CourseCategory key={name+slug+imgUrl} name={name} slug={slug} imgUrl={imgUrl}/>)}
            </div>
        </div>
    )
}
