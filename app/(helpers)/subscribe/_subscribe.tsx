'use client'
import { motion } from 'framer-motion';

export type ISubCard = {
    color: string, 
    type: 'Hour' | 'Month' | 'Year', 
    time: 1 | 3 | 6, 
    price: number, 
    name: 'Basic' | 'Advanced' | 'Standard' | 'Premium' | 'Extra', 
    head: string, 
    textpoints: string[]
}
export default function SubCard({color, type, time, price, name, head, textpoints}: ISubCard) {
    const dict = {1: 'One month plan', 3: 'Three months plan', 6: 'Six months plan'}
    let text = dict[time];
    if (type === 'Year'){
        text = 'One year plan'
    } else if (type === 'Hour'){
        text = 'One-on-One turorial'
    }
    const backgroundColor = color === 'white' ? '#004CE8' : 'white';

    return (
        <motion.div className="text-left flex flex-col gap-5 max-w-96 min-h-[300px] rounded-xl text-sm md:text-base p-8" style={{
            background: color,
            color: color === 'white'? '#004CE8': 'white'
        }}
        whileHover={{
            scale: 1.05,
            boxShadow: `0 0 12px ${backgroundColor}`,
        }}
        whileTap={{
            scale: 0.98,
            boxShadow: `0 0 20px ${backgroundColor}`,
        }}
        >
            <div>
                <h2 className="text-xl md:text-2xl font-normal">{name}</h2>
                <p className="font-light">{text}</p>
            </div>
            <div className="font-medium"><span className="font-semibold text-2xl md:text-3xl">₦{price}</span>/{`${time > 1? time+'-': ''}`}{type}</div>
            
            <h3>{head}</h3>
            <ol className="list-decimal list-outside pl-6 flex flex-col gap-2">
                {
                    textpoints.map((point, index) => <li key={index}>{point}</li>)
                }
            </ol>
            <motion.button
                whileHover={{
                    scale: 1.05,
                    boxShadow: `0 0 12px ${backgroundColor}`,
                }}
                whileTap={{
                    scale: 0.98,
                    boxShadow: `0 0 20px ${backgroundColor}`,
                }}
                className='text-xl md:text-2xl font-semibold w-8/10 p-3 rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2'
                style={{
                    background: backgroundColor,
                    color: color,
                }}
                >
                Subscribe
            </motion.button>
        </motion.div>
        )
}
