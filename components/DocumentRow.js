import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import { useRouter } from 'next/router'
import React from 'react'

const DocumentRow = ({ id, name, timestamp }) => {
    const router = useRouter();

    return (
        <div onClick={() => router.push(`/doc/${id}`)} className="flex items-center p-4 pl-0 pr-0 text-gray-700 text-sm cursor-pointer">
            <Icon name="article" size="3xl" color="blue" />
            <p className="flex-grow pl-5 w-10 pr-10 truncate">{name}</p> 
            <p className="pr-5 text-sm">{timestamp?.toDate().toLocaleDateString()}</p>
            <Button color="grey" buttonType="outline" rounded={true} iconOnly={true} ripple="dark" className="border-0">
                <Icon name="more_vert" size="3xl" />
            </Button>
        </div>
    )
}

export default DocumentRow
