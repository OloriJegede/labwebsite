import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Edit, Eye, EyeOff, Trash2 } from 'lucide-react'

interface BlogCardProps {
  id: number
  title: string
  category: string
  date: string
  image: string
  published: boolean
  onTogglePublish: (id: number) => void
  onDelete: (id: number) => void
}

const BlogCard = ({ 
  id, 
  title, 
  category, 
  date, 
  image, 
  published, 
  onTogglePublish, 
  onDelete 
}: BlogCardProps) => {
  return (
    <div className="bg-white overflow-hidden">
      <div className="relative">
        <Image
          src={image}
          width={335}
          height={489}
          alt={title}
          className="w-full h-[300px] object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            published 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {published ? 'Published' : 'Draft'}
          </span>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div className="text-sm text-gray-500 uppercase">
          {category} / {date}
        </div>
        <h3 className="text-lg font-medium leading-tight text-gray-900 line-clamp-2">
          {title}
        </h3>
        
        <div className="flex gap-2 pt-2">
          <Link
            href={`/admin/blog/edit/${id}`}
            className="flex-1 flex items-center justify-center gap-2 bg-[#ECC5C0] hover:bg-[#D4A5A5] text-white py-2 px-3 rounded-lg transition-colors text-sm"
          >
            <Edit className="w-4 h-4" />
            Edit
          </Link>
          
          <button
            onClick={() => onTogglePublish(id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg transition-colors text-sm ${
              published
                ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                : 'bg-[#D4A5A5] hover:bg-[#C4999B] text-white'
            }`}
          >
            {published ? (
              <>
                <EyeOff className="w-4 h-4" />
                Unpublish
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                Publish
              </>
            )}
          </button>
          
          <button
            onClick={() => onDelete(id)}
            className="flex items-center justify-center bg-red-100 hover:bg-red-200 text-red-600 py-2 px-3 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default BlogCard