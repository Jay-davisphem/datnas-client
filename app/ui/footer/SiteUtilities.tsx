import UtilityGroup, { IUtilityGroup } from "./UtilityGroup"

export default function SiteUtilities() {
    const lists: IUtilityGroup[] = [
        {head: 'About DATNAS', lists: ['About Us', 'Contact Us', 'Customer Support', 'Terms & Conditions']},
        {head: 'Resources', lists: ['Returns and Refunds', 'Policy', 'Becoming a Student']},
        {head: 'More Links', lists: ['About Us', 'Track lesson', 'Payment Methods', 'FAQ']}
    ]
    return (
    <div className="flex flex-wrap justify-between md:border-t md:pt-8 gap-y-6">
        {lists.map(props => <UtilityGroup key={props.head} {...props} />)}
    </div>
)
}
