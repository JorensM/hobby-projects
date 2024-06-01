import { PropsWithChildren } from 'react';

export default function CardTitle( { children }: PropsWithChildren) {
    return <h2 className='font-medium text-lg'>{children}</h2>
}