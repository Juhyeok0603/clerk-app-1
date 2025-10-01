import React, { Suspense } from 'react'
import Link from 'next/link'
import RepoDirs from '@/components/RepoDirs'
import Repo from '@/components/Repo'

export default function RepoPage() {
  return (
    <div className='flex flex-col justify-start items-start max-w-lg'>
      <Link href='/repos' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4'>Back to Repositories
      </Link>
      <Suspense fallback={<div>Loading directories...</div>}>
        <RepoDirs name = {params.name} />
      </Suspense>
    </div>
  )
}
