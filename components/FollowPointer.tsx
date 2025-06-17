import {motion, AnimatePresence, useMotionValue} from 'framer-motion';
import stringToColor from '@/lib/stringToColor';

function FollowPointer({x, y, info} : { x: number, y: number, info : { name: string, email: string}}) {

    const color = stringToColor(info.email || '1')
  return (
    <motion.div

        className='h-4 w-4 rounded-full absolute z-50'
        style={{top: y, left: x, pointerEvents: 'none'}}
        initial={{scale: 1, opacity: 1}}
        animate={{scale: 1, opacity: 1}}
        exit={{scale: 0, opacity: 0}}
    >
        <svg
            stroke={color}
            fill={color}
            strokeWidth="0"
            viewBox="0 0 16 16"
            className="h-6 w-6 text-[${color}] transform -rotate-[70deg] -translate-x-[2px] translate-y-[1.8px] stroke-[${color}]"
             height="1em"
             width="1em"
             xmlns="http://www.w3.org/2000/svg"
>
            <path d="M14.082 2.182a.5.5 0 0 1-.183.557L7.528 15.467a.5.5 0 0 1-.917-.007L2.604 8.653a.5.5 0 0 1 .004-.906L12.728 2.657a.5.5 0 0 1 .556.180z" />
        </svg>

        <motion.div
            style={{backgroundColor: color}}
            initial={{scale: 0.5, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            exit={{scale: 0.5, opacity: 0 }}
            className='px-2 py-2 bg-neutral-200 text-black font-bold whitespace-nowrap min-w-max text-xs rounded-full'
        
        
        >  
            {info.name || info.email}
        </motion.div>


    </motion.div>
  )
}

export default FollowPointer