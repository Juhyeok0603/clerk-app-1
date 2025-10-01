import { Repository } from '@/types/repo'
import Link from 'next/link'
import React from 'react'
import { FaCodeBranch, FaEye, FaStar } from 'react-icons/fa'

const username = 'Juhyeok0603'

export default async function ReposPage() {
  const response = await fetch(`https://api.github.com/users/${username}/repos`, {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('GitHub API request failed:', response.status, errorText)
    throw new Error(`Failed to fetch repos: ${response.status}`)
  }

  const data = await response.json()

  if (!Array.isArray(data)) {
    console.error('GitHub API returned unexpected data:', data)
    throw new Error('Invalid data format from GitHub API')
  }

  const repos: Repository[] = data
  return (
    <div>
        <h2 className='text-2xl font-bold mb-4'>Github repositories of {username}</h2>
        <ul>
            {
                repos.map((repo: Repository) => (
                    <li key={repo.id} className='bg-gray-100 m-4 p-4 rounded-lg'>
                        <Link href={`/repo/${repo.name}`} className='flex flex-col gap-2'>
                            <h3 className='text-xl font-bold'>{repo.name}</h3>
                            <p>{repo.description}</p>
                            <div className='flex justify-between items-center'>
                                <span className='flex items-center gap-1'>
                                    <FaStar />{repo.stargazers_count}
                                </span>
                                <span className='flex items-center gap-1'>
                                    <FaCodeBranch />{repo.forks_count}
                                </span>
                                <span className='flex items-center gap-1'>
                                    <FaStar />{repo.stargazers_count}
                                </span>
                                <span className='flex items-center gap-1'>
                                    <FaEye />{repo.watchers_count}
                                </span>
                            </div>
                        </Link>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}
